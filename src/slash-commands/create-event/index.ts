import {
  ActionRowBuilder,
  ActionRowData,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  CommandInteractionOption,
  CommandInteractionOptionResolver,
  EmbedBuilder,
  MessageComponentInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { services } from "../../db";
import { CommandInteraction } from "discord.js";

interface Args {
  type: string;
  adversary: string;
  date: string;
  hour: string;
  "principal-caller": string;
  "sub-caller": string;
}

export const createEvent = {
  data: {
    name: "create-event",
    description: "Creates an event",
  },
  run: async (interaction: CommandInteraction): Promise<void> => {
    const { options } = interaction;
    let args: Args = {
      type: "",
      adversary: "",
      date: "",
      hour: "",
      "principal-caller": "",
      "sub-caller": "",
    };

    if (options) {
      options.data.forEach((option) => {
        const name = option.name as keyof Args;
        args[name] = option.value as Args[keyof Args];
      });
    }

    console.log(args);
    const exampleEmbed = new EmbedBuilder()
      .setColor(0xff6347)
      .setTitle(args.type === "gvg" ? "Liga dos clãs" : "<Nome do evento>")
      .setDescription(
        "A Liga dos Clãs no Ragnarok Origin é tipo um torneio entre clãs, onde eles se juntam para se enfrentar em batalhas dentro do jogo. O objetivo é ganhar respeito, prêmios legais e mostrar as habilidades individuais e de equipe 💪. É uma competição bem animada e empolgante no mundo do Ragnarok Origin!"
      )
      .setThumbnail(
        "https://dl.memuplay.com/new_market/img/com.gravity.roona.aos.icon.2022-02-08-18-39-18.png"
      )
      .addFields(
        { name: "Autor", value: `<@${interaction.user.id}>`, inline: true },
        { name: "Adversário", value: `${args.adversary}`, inline: true },
        {
          name: "Data",
          value: `${args.date} ${args.hour}`,
          inline: true,
        }
      )
      .addFields(
        {
          name: "Call principal",
          value: `<@${args["principal-caller"]}>`,
          inline: true,
        },
        {
          name: "Call secundária",
          value: args["sub-caller"] != null ? `<@${args["sub-caller"]}>` : " ",
          inline: true,
        },
        { name: "Confirmados ✅", value: `0/110`, inline: true }
      )
      .setImage(
        "https://api.duniagames.co.id/api/content/upload/file/6482935601636713341.JPG"
      )
      .setTimestamp()
      .setFooter({
        text: "Mais informações ou dúvidas, consulte alguém da staff",
      });

    const confirmButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setLabel("Confirmar Presença")
      .setCustomId("confirm_presence");

    const justifyButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Danger)
      .setLabel("Justificar Ausência")
      .setCustomId("justify_absence");

    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      confirmButton,
      justifyButton
    );

    interaction.reply({
      embeds: [exampleEmbed],
      components: [actionRow],
    });

    const filter = (interaction: MessageComponentInteraction) => {
      return (
        interaction.customId === "confirm_presence" ||
        interaction.customId === "justify_absence"
      );
    };

    const collector = interaction.channel!.createMessageComponentCollector({
      filter,
      time: 3600000,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "confirm_presence") {
        await interaction.deferUpdate();
        const { user } = interaction;
        const { CharacterService } = services;

        try {
          //   const newCharacter = await CharacterService.createCharacter({
          //     discordId: user.id,
          //     characterName: "Darkzera",
          //     characterClass: "algoz",
          //   });
          await interaction.followUp("Personagem criado com sucesso!");
        } catch (error) {
          console.error("Erro ao criar personagem:", error);
          await interaction.followUp("Ocorreu um erro ao criar o personagem.");
        }
        await interaction.reply("Presença confirmada!");
      } else if (interaction.customId === "justify_absence") {
        // Abre o modal para justificar ausência
        const justifyModal = new ModalBuilder()
          .setCustomId("justify-modal")
          .setTitle("Justificar Ausência");

        const hobbiesInput = new TextInputBuilder()
          .setCustomId("hobbiesInput")
          .setLabel("Por favor, informe o motivo da sua ausência:")
          .setStyle(TextInputStyle.Paragraph);

        const firstActionRow =
          new ActionRowBuilder<TextInputBuilder>().addComponents(hobbiesInput);

        justifyModal.addComponents(firstActionRow);

        await interaction.showModal(justifyModal);
      }
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        interaction.followUp({
          content: "Tempo limite excedido para interação.",
          ephemeral: true,
        });
      }
    });
  },
};
