// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3OZSNsTzAxqB9cPdDW-X8Q7BzOfTEKfI",
  authDomain: "base-15b6a.firebaseapp.com",
  projectId: "base-15b6a",
  storageBucket: "base-15b6a.firebasestorage.app",
  messagingSenderId: "519880668805",
  appId: "1:519880668805:web:7746ddfeb8e05ed7eb9bec"
// Configuração do Firebase
  };
  
  // Inicializa o Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  // Função para cadastrar um novo usuário
  function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Verifica se os campos estão preenchidos
    if (!email || !password) {
      document.getElementById('message').textContent = "Por favor, preencha todos os campos.";
      return;
    }
  
    // Cria um novo usuário no Firebase
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        document.getElementById('message').textContent = `Usuário cadastrado com sucesso! Email: ${user.email}`;
        console.log("Usuário cadastrado:", user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById('message').textContent = `Erro ao cadastrar: ${errorMessage}`;
        console.error("Erro ao cadastrar:", errorMessage);
      });
  }