import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // alterado aqui
import 'firebase/compat/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Home.css"
import cat from "../assets/cat.gif"
import googleImagem from "../assets/google.png"

// Configure Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCaipy3SYhXAhOJzqCNNmrEs02jatj0pTI",
    authDomain: "fir-react-d2317.firebaseapp.com",
    projectId: "fir-react-d2317",
    storageBucket: "fir-react-d2317.appspot.com",
    messagingSenderId: "468164298855",
    appId: "1:468164298855:web:480264bb499d801b162cc2"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

function Home(){
    

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
        window.location.href="/tarefas"
      });
      setError(null);
      setSuccessMessage('Login realizado com sucesso!');

    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleCadastro = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setError(null);
      setSuccessMessage('Cadastro realizado com sucesso!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const userCredential = await firebase.auth().signInWithPopup(provider);
      setError(null);
      setUser(userCredential.user);
      setSuccessMessage('Login com Google realizado com sucesso!');
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  
  return(
    <div>

    <img className='cat' src={cat}></img>
    <h1>Firebase Authentication</h1>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      placeholder="Senha"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={handleLogin}>Logar</button>
    <button onClick={handleCadastro}>Cadastrar</button>
    <br/>
    <button className='loginGoogle' onClick={handleGoogleLogin}> <img className='googleImagem' src={googleImagem}/> Fazer login com o Google</button>

    {error && <p className="error">{error}</p>}
    {successMessage && <p className="success">{successMessage}</p>}
    {user && (
              window.location.href="/tarefas"
    )}
  </div>
  )
}

export default Home