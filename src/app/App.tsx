import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Estoque } from './components/Estoque';
import { Producao } from './components/Producao';
import { Vendas } from './components/Vendas';
import { Clientes } from './components/Clientes';
import { Relatorios } from './components/Relatorios';
import { Atendimento } from './components/Atendimento';
import { Configuracoes } from './components/Configuracoes';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <BrowserRouter>
      <div className="size-full flex bg-background">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-auto bg-muted/30">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/estoque" element={<Estoque />} />
              <Route path="/producao" element={<Producao />} />
              <Route path="/vendas" element={<Vendas />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/atendimento" element={<Atendimento />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
            </Routes>
          </main>
        </div>

        <Toaster />
      </div>
    </BrowserRouter>
  );
}