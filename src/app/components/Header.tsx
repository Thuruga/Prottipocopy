import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const pageInfo: { [key: string]: { title: string; subtitle: string } } = {
  '/dashboard': { title: 'Visão Geral', subtitle: 'Acompanhamento em tempo real' },
  '/estoque': { title: 'Gestão de Estoque', subtitle: 'Controle de matérias-primas' },
  '/producao': { title: 'Produção', subtitle: 'Registros e rendimento' },
  '/vendas': { title: 'Vendas', subtitle: 'Faturamento e pedidos' },
  '/clientes': { title: 'Clientes', subtitle: 'Base de clientes' },
  '/relatorios': { title: 'Relatórios', subtitle: 'Análises e indicadores' },
  '/atendimento': { title: 'Atendimento', subtitle: 'Central de mensagens' },
  '/configuracoes': { title: 'Configurações', subtitle: 'Preferências do sistema' },
};

export function Header() {
  const location = useLocation();
  const currentPage = pageInfo[location.pathname] || { title: 'Smart Estoque', subtitle: 'Sistema de Gestão' };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Page Info */}
      <div className="flex-1">
        <h1 className="text-lg text-foreground font-medium">{currentPage.title}</h1>
        <p className="text-xs text-muted-foreground">{currentPage.subtitle}</p>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar produtos, clientes..."
            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-accent rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
        </button>
      </div>
    </header>
  );
}
