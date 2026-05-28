import {
  LayoutDashboard,
  Package,
  Factory,
  ShoppingCart,
  Users,
  FileBarChart,
  MessageSquare,
  Settings
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/estoque', label: 'Estoque', icon: Package },
  { path: '/producao', label: 'Produção', icon: Factory },
  { path: '/vendas', label: 'Vendas', icon: ShoppingCart },
  { path: '/clientes', label: 'Clientes', icon: Users },
  { path: '/relatorios', label: 'Relatórios', icon: FileBarChart },
  { path: '/atendimento', label: 'Atendimento', icon: MessageSquare },
  { path: '/configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <Factory className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sidebar-foreground font-semibold">Smart Estoque</h1>
            <p className="text-xs text-muted-foreground">Charcutaria Mantovani</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
            DM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-sidebar-foreground truncate">Douglas Mantovani</p>
            <p className="text-xs text-muted-foreground truncate">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
