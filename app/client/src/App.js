import logo from './logo.svg';
import './App.css';
import AuthPage from './pages/Auth/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/home" element={<h1>Home</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
