const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder, ModalBuilder, StringSelectMenuBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('checkin')
        .setDescription('Envia uma mensagem de check-in para todos os membros do servidor'),

    async execute(interaction) {
        // Verifica se o usuário tem permissão para executar o comando
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return await interaction.reply({ content: 'Você não tem permissão para usar este comando.', ephemeral: true });
        }

        // Busca todos os membros do servidor
        const guildMembers = await interaction.guild.members.fetch();
        const realMembers = guildMembers.filter(member => !member.user.bot);

        console.debug(`Total de usuários: ${realMembers.size}`);

        const confirm = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Sim')
            .setStyle(ButtonStyle.Success);

        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Não')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
            .addComponents(confirm, cancel);



        // const classSelect = new StringSelectMenuBuilder()
        //     .setCustomId('class_select')
        //     .setPlaceholder('Selecione sua classe')
        //     .addOptions(
        //         new StringSelectMenuOptionBuilder()
        //             .setLabel('Bruxo')
        //             .setValue('wiz'),
        //         new StringSelectMenuOptionBuilder()
        //             .setLabel('Algoz')
        //             .setValue('sinx'),
        //         new StringSelectMenuOptionBuilder()
        //             .setLabel('Sacer')
        //             .setValue('sacer'),
        //         // new StringSelectMenuOptionBuilder()
        //         //     .setLabel('Lord Knight')
        //         //     .setValue('lk'),
        //         // new StringSelectMenuOptionBuilder()
        //         //     .setLabel('Mestre')
        //         //     .setValue('monk'),
        //         // new StringSelectMenuOptionBuilder()
        //         //     .setLabel('Sniper')
        //         //     .setValue('sniper'),
        //     );

        // const powerInput = new TextInputBuilder().setCustomId('power_input').setLabel("Informe seu power atual")
        //     .setStyle(TextInputStyle.Short);



        // const classRow = new ActionRowBuilder()
        //     .addComponents(classSelect);
        // const powerRow = new ActionRowBuilder().addComponents(powerInput);


        // Envia a mensagem de check-in para cada membro com menu suspenso e campo de texto
        realMembers.forEach(async member => {
            try {
                console.debug(`Enviando mensagem para ${member.user.tag}`);
                await member.send({
                    content: 'Olá! Você estará disponível para o evento?',
                    components: [row]
                });
            } catch (error) {
                console.error(`Erro ao enviar mensagem para ${member.user.tag}:`, error);
            }
        });

        await interaction.reply({ content: 'Mensagem de check-in enviada para todos os membros do servidor.', ephemeral: true });
    },
};
