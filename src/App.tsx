import { BrowserRouter, Route, Routes } from "react-router-dom"
import Produtos from "./pages/Produtos/Produtos"
import Home from "./pages/Home/Home"
import CadastroListagem from "./pages/CadastroListagem/CadastroListagem"
import Login from "./pages/Login/Login"
import RotaProtegida from "./components/RotaProtegida/RotaProtegida"
import ConsultoraVirtual from "./pages/ConsultoraVirtual/ConsultoraVirtual"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produtos/:categoria" element={<Produtos />} />
        <Route path="/produtos/cadastroListagem" element={
          <RotaProtegida>
            <CadastroListagem />
          </RotaProtegida>
        } />
        <Route path="/produtos/pesquisa" element={<Produtos />} />
        <Route path="/consultora" element={<ConsultoraVirtual />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App
