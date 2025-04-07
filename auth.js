
// Evento de mudança no select de chat privado
document.getElementById('privateChatSelect').addEventListener('change', function() {
    const selectedUser = this.value;
    if (selectedUser) {
        // Inicia o chat privado com o usuário selecionado
        const privateChatContent = document.getElementById('privateChat');
        privateChatContent.innerHTML = `<p>Iniciando chat privado com ${selectedUser}...</p>`;
        
        // Aqui você pode adicionar a lógica para carregar as mensagens do chat privado
    } else {
        document.getElementById('privateChat').innerHTML = '<p>Selecione um usuário para iniciar o chat privado.</p>';
    }
});

// Função para enviar mensagem no chat
document.getElementById('sendMessage').addEventListener('click', function() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    if (!message) {
        alert('Por favor, digite uma mensagem.');
        return;
    }

    const activeTab = document.querySelector('.chat-tab.active').getAttribute('data-tab');
    if (activeTab === 'public') {
        // Lógica para enviar mensagem no chat público
        addMessageToChat('publicChat', currentUser, message);
    } else if (activeTab === 'private') {
        const selectedUser = document.getElementById('privateChatSelect').value;
        if (!selectedUser) {
            alert('Selecione um usuário para iniciar o chat privado.');
            return;
        }
        // Lógica para enviar mensagem no chat privado
        addMessageToChat('privateChat', currentUser, message, selectedUser);
    }

    // Limpa o campo de entrada após enviar a mensagem
    messageInput.value = '';
});

// Função para adicionar mensagens ao chat
function addMessageToChat(chatId, sender, message, recipient = null) {
    const chatContent = document.getElementById(chatId + 'Chat');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');

    if (recipient) {
        messageElement.innerHTML = `<strong>[Privado para ${recipient}]</strong> <span>${sender}:</span> ${message}`;
    } else {
        messageElement.innerHTML = `<span>${sender}:</span> ${message}`;
    }

    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight; // Rola para a última mensagem
}

// Atualizar usuários online periodicamente
setInterval(updateOnlineUsers, 5000); // Atualiza a cada 5 segundos

// Inicialização
updateOnlineUsers();
