// Simula um banco de dados usando localStorage
class Database {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('chatUsers')) || [];
        this.publicMessages = JSON.parse(localStorage.getItem('publicMessages')) || [];
        this.privateMessages = JSON.parse(localStorage.getItem('privateMessages')) || [];
        this.onlineUsers = JSON.parse(localStorage.getItem('onlineUsers')) || [];
    }

    // Métodos para usuários
    addUser(username, password) {
        const user = { username, password };
        this.users.push(user);
        this.saveUsers();
    }

    getUser(username) {
        return this.users.find(user => user.username === username);
    }

    userExists(username) {
        return this.users.some(user => user.username === username);
    }

    saveUsers() {
        localStorage.setItem('chatUsers', JSON.stringify(this.users));
    }

    // Métodos para mensagens públicas
    addPublicMessage(sender, content) {
        const message = {
            sender,
            content,
            timestamp: new Date().toISOString()
        };
        this.publicMessages.push(message);
        this.savePublicMessages();
    }

    getPublicMessages() {
        return this.publicMessages;
    }

    savePublicMessages() {
        localStorage.setItem('publicMessages', JSON.stringify(this.publicMessages));
    }

    // Métodos para mensagens privadas
    addPrivateMessage(sender, receiver, content) {
        const message = {
            sender,
            receiver,
            content,
            timestamp: new Date().toISOString()
        };
        this.privateMessages.push(message);
        this.savePrivateMessages();
    }

    getPrivateMessagesBetween(user1, user2) {
        return this.privateMessages.filter(msg => 
            (msg.sender === user1 && msg.receiver === user2) || 
            (msg.sender === user2 && msg.receiver === user1)
        );
    }

    savePrivateMessages() {
        localStorage.setItem('privateMessages', JSON.stringify(this.privateMessages));
    }

    // Métodos para usuários online
    addOnlineUser(username) {
        if (!this.onlineUsers.includes(username)) {
            this.onlineUsers.push(username);
            this.saveOnlineUsers();
        }
    }

    removeOnlineUser(username) {
        this.onlineUsers = this.onlineUsers.filter(user => user !== username);
        this.saveOnlineUsers();
    }

    getOnlineUsers() {
        return this.onlineUsers.filter(username => 
            this.users.some(user => user.username === username)
        );
    }

    saveOnlineUsers() {
        localStorage.setItem('onlineUsers', JSON.stringify(this.onlineUsers));
    }
}

const db = new Database();