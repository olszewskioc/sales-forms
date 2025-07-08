import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./shared/components/Layout";
import Home from "./features/Home/pages/Home";
import NoPage from "./shared/components/NoPage";
import Documentos from "./features/Docs/pages/Documentos";
import Contatos from "./features/Contacts/pages/Contatos";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/docs" element={<Layout />}>
          <Route index element={<Documentos />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/contact" element={<Layout />}>
          <Route index element={<Contatos />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
