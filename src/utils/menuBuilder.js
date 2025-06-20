const {  StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder } = require('discord.js');

function initMessage(client, totalAccounts = 0) {
    const startTime = Math.floor(Date.now() / 1000 - client.uptime / 1000);
    return new EmbedBuilder()
        .setTitle('Auto post by Rvnaa')
        .setDescription(`🕒 **Uptime:** <t:${startTime}:R>\n👥 **Total Accounts:** ${totalAccounts}`)
        .setColor('Random')
        .setFooter({ text: 'Develop by Kamizuru', iconURL: 'https://cdn.discordapp.com/attachments/1367017380567449662/1385577227537879040/6f8aff325636309c726ca707f69b2476.jpg?ex=685692d9&is=68554159&hm=1e1eb4c01dcb3be188acf25544d722e4e8dee1b6123c0ec041f7fad7f2089594&' })
        .setTimestamp();
}

function createMain() {
    const select = new StringSelectMenuBuilder()
        .setCustomId('main_menu')
        .setPlaceholder('Select an option')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Edit Account')
                .setValue('edit_account')
                .setDescription('Edit existing account settings'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Add Account')
                .setValue('add_account')
                .setDescription('Add a new account'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Start / Stop Auto Post')
                .setValue('toggle_post')
                .setDescription('Start or stop auto posting'),
                
            new StringSelectMenuOptionBuilder()
                .setLabel('Delete Config')
                .setValue('delete_config')
                .setDescription('Delete the configuration')
        );

    return new ActionRowBuilder().addComponents(select);
}

function selectAccount(accounts, purpose = 'edit') {
    const select = new StringSelectMenuBuilder()
        .setCustomId(`account_select_${purpose}`)
        .setPlaceholder(purpose === 'edit' ? 'Select an account to edit' : 'Select an account to toggle auto-post');

    accounts.forEach(account => {
        select.addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(`ChannelID: ${account.channelId}`)
                .setValue(account.token)
                .setDescription(`Message: ${account.message.substring(0, 50)}...`)
        );
    });

    return new ActionRowBuilder().addComponents(select);
}

function accountModals(isEdit = false) {
    const modal = new ModalBuilder()
        .setCustomId(isEdit ? 'edit_account_modal' : 'add_account_modal')
        .setTitle(isEdit ? 'Edit Account' : 'Add New Account');

    const tokenInput = new TextInputBuilder()
        .setCustomId('token')
        .setLabel('Token')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const messageInput = new TextInputBuilder()
        .setCustomId('message')
        .setLabel('Message')
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    const channelInput = new TextInputBuilder()
        .setCustomId('channelId')
        .setLabel('Channel ID')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const delayInput = new TextInputBuilder()
        .setCustomId('delay')
        .setLabel('Delay (ms)')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const rows = [
        new ActionRowBuilder().addComponents(tokenInput),
        new ActionRowBuilder().addComponents(messageInput),
        new ActionRowBuilder().addComponents(channelInput),
        new ActionRowBuilder().addComponents(delayInput)
    ];

    modal.addComponents(rows);
    return modal;
}

module.exports = { initMessage, createMain, selectAccount, accountModals };