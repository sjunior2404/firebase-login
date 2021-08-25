import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

// Essa configuração é aquela que você obteve no quarto passo
// A mostrada a seguir é um exemplo. Não copie. Use a sua.




const firebaseConfig = {
  apiKey: "AIzaSyDXYMMwwLaENHIcR7MHUSz20BONupU7sWA",
  authDomain: "cadastro-livros-f0988.firebaseapp.com",
  projectId: "cadastro-livros-f0988",
  storageBucket: "cadastro-livros-f0988.appspot.com",
  messagingSenderId: "928550153288",
  appId: "1:928550153288:web:14bfaebf10acbb67813c7d"
};
firebase.initializeApp(firebaseConfig);

export default firebase;