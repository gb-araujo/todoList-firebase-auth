import "./App.css"
import Tarefas from './components/Tarefas';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/tarefas"
          element={<Tarefas />}
        />
        <Route
          path="/"
          element={<Home />}
        />
      </Routes>
    </Router>
  );
}

function NavigateToRedirectedPath() {
  const navigate = useNavigate();
  navigate('/redirectedPath'); // Replace with your desired path
  return null;
}

export default App;
