import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TablaPage from './pages/TablaPage'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PerfilPage from './pages/perfilPage';
import { RutaPrivada } from './components/rutasprivadas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/tabla" element={<TablaPage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/admin" element={
          <RutaPrivada rolRequerido="admin">
            
          </RutaPrivada>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
