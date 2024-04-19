import React, { useState, useEffect } from 'react';
import './Tarefas.css';
import firebase from 'firebase/compat/app'; // Import for Firebase functionality
import { useNavigate } from 'react-router-dom'; // Import for navigation

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const navigate = useNavigate(); // Utilize useNavigate for navigation

  useEffect(() => {
    const tarefasArmazenadas = JSON.parse(localStorage.getItem('tarefas'));
    if (tarefasArmazenadas) {
      setTarefas(tarefasArmazenadas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() !== '') {
      setTarefas([...tarefas, novaTarefa]);
      setNovaTarefa('');
      setMostrarFormulario(false);
    }
  };

  const removerTarefa = (index) => {
    const novaLista = [...tarefas];
    novaLista.splice(index, 1);
    setTarefas(novaLista);
  };

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        navigate("/"); // Redirect to Home after logout
      })
      .catch((error) => {
        console.error(error); // Handle logout error
      });
  };

  return (
    <div className="lista-de-tarefas">
      <h1>Tarefas</h1>
      {mostrarFormulario && (
        <div className="adicionar-tarefa">
          <input
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Digite uma nova tarefa"
          />
          <button onClick={adicionarTarefa}>Adicionar</button>
        </div>
      )}
      {!mostrarFormulario && (
        <button className="botao-flutuante" onClick={() => setMostrarFormulario(true)}>+</button>
      )}
      <ul>
        {tarefas.map((tarefa, index) => (
          <li key={index} className="tarefa">
            <div>{tarefa}</div>
            <div className="remover-tarefa" onClick={() => removerTarefa(index)}>Deslize para excluir</div>
          </li>
        ))}
      </ul>
      <button className="logoutButton" onClick={handleLogout}>SAIR</button>  {/* Logout button */}
    </div>
  );
}

export default Tarefas;
