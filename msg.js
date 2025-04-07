// Função para enviar mensagem privada
function sendMessage() {
  const recipientId = document.getElementById('recipient-id').value;
  const messageText = document.getElementById('message-text').value;

  if (!recipientId || !messageText) {
    console.error("Preencha todos os campos.");
    return;
  }

  const currentUser = auth.currentUser;
  if (!currentUser) {
    console.error("Você precisa estar logado para enviar mensagens.");
    return;
  }

  // Salva a mensagem no Firestore
  db.collection("messages").add({
    senderId: currentUser.uid,
    recipientId: recipientId,
    text: messageText,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(() => {
      console.log("Mensagem enviada com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao enviar mensagem:", error.message);
    });
}