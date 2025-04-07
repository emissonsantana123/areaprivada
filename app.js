// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3OZSNsTzAxqB9cPdDW-X8Q7BzOfTEKfI",
  authDomain: "base-15b6a.firebaseapp.com",
  projectId: "base-15b6a",
  storageBucket: "base-15b6a.firebasestorage.app",
  messagingSenderId: "519880668805",
  appId: "1:519880668805:web:7746ddfeb8e05ed7eb9bec"
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