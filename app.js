// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBB-7xEw0UC7uJoe8a7cWfJXW6vAubcpcc",
  authDomain: "test-e7dc5.firebaseapp.com",
  projectId: "test-e7dc5",
  storageBucket: "test-e7dc5.appspot.com",
  messagingSenderId: "202121098578",
  appId: "1:202121098578:web:2ddc1acfaf4b84182768b"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Função de Cadastro
function signUp() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário cadastrado:", user.email);

      // Salva informações adicionais no Firestore
      db.collection("users").doc(user.uid).set({
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .catch((error) => {
      console.error("Erro ao cadastrar:", error.message);
    });
}

// Função de Login
function logIn() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Usuário logado:", user.email);
    })
    .catch((error) => {
      console.error("Erro ao fazer login:", error.message);
    });
}