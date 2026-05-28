import { TrendingUp, TrendingDown, Package, Factory, DollarSign, AlertCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const stats = [
  {
    title: 'Estoque Total',
    value: '8.547',
    unit: 'kg',
    change: '+12%',
    trend: 'up',
    icon: Package,
    color: 'text-chart-1'
  },
  {
    title: 'Produções no Mês',
    value: '1.842',
    unit: 'kg produzidos',
    change: '+18%',
    trend: 'up',
    icon: Factory,
    color: 'text-chart-2'
  },
  {
    title: 'Faturamento',
    value: 'R$ 248.500',
    unit: 'este mês',
    change: '+23%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-chart-4'
  },
  {
    title: 'Perdas',
    value: 'R$ 4.280',
    unit: 'este mês',
    change: '-8%',
    trend: 'down',
    icon: AlertCircle,
    color: 'text-destructive'
  },
];

const lowStockTable = [
  { id: 1, product: 'Carne Suína (Pernil)', current: 45, minimum: 200, status: 'critical', code: 'MP-001', unit: 'kg' },
  { id: 2, product: 'Toucinho Defumado', current: 12, minimum: 50, status: 'critical', code: 'MP-045', unit: 'kg' },
  { id: 3, product: 'Tripa Natural Suína', current: 28, minimum: 100, status: 'critical', code: 'MP-012', unit: 'metros' },
  { id: 4, product: 'Queijo Mussarela', current: 78, minimum: 150, status: 'warning', code: 'MP-023', unit: 'kg' },
  { id: 5, product: 'Temperos Especiais', current: 95, minimum: 180, status: 'warning', code: 'MP-056', unit: 'kg' },
  { id: 6, product: 'Sal de Cura', current: 142, minimum: 250, status: 'warning', code: 'MP-089', unit: 'kg' },
];

const recentProduction = [
  { id: 1, product: 'Linguiça Toscana', date: '13/05/2026', quantity: 125, operator: 'João Silva', code: 'PROD-001', unit: 'kg' },
  { id: 2, product: 'Presunto Cozido', date: '13/05/2026', quantity: 80, operator: 'Maria Santos', code: 'PROD-002', unit: 'kg' },
  { id: 3, product: 'Mortadela Bologna', date: '12/05/2026', quantity: 95, operator: 'Pedro Costa', code: 'PROD-003', unit: 'kg' },
  { id: 4, product: 'Salame Italiano', date: '12/05/2026', quantity: 60, operator: 'Ana Oliveira', code: 'PROD-004', unit: 'kg' },
  { id: 5, product: 'Peito de Peru Defumado', date: '11/05/2026', quantity: 70, operator: 'Carlos Lima', code: 'PROD-005', unit: 'kg' },
  { id: 6, product: 'Linguiça Calabresa', date: '11/05/2026', quantity: 110, operator: 'João Silva', code: 'PROD-006', unit: 'kg' },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-2xl">Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">Visão geral das operações</p>
        </div>
        <Button onClick={() => navigate('/estoque')} className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Entrada
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

          return (
            <div key={stat.title} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{stat.title}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <h3 className="text-foreground">{stat.value}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{stat.unit}</span>
                  <div className={`flex items-center gap-1 text-xs ${
                    stat.trend === 'up' ? 'text-chart-4' : 'text-chart-2'
                  }`}>
                    <TrendIcon className="w-3 h-3" />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabela de Estoque Baixo */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-foreground">Estoque Baixo - Ação Necessária</h3>
          <p className="text-sm text-muted-foreground mt-1">Produtos que precisam de reposição urgente</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Código</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Produto</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Saldo Atual</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Nível Mínimo</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {lowStockTable.map((item) => {
                const percentage = (item.current / item.minimum) * 100;

                return (
                  <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-5 py-4 text-sm text-muted-foreground">{item.code}</td>
                    <td className="px-5 py-4 text-sm text-foreground">{item.product}</td>
                    <td className="px-5 py-4 text-sm text-foreground text-right">{item.current.toLocaleString('pt-BR')} {item.unit}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground text-right">{item.minimum.toLocaleString('pt-BR')} {item.unit}</td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs ${
                          item.status === 'critical'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-chart-5/10 text-chart-5'
                        }`}>
                          {item.status === 'critical' ? 'Crítico' : 'Atenção'}
                        </span>
                        <div className="w-full max-w-[80px] bg-muted rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              item.status === 'critical' ? 'bg-destructive' : 'bg-chart-5'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabela de Produções Recentes */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-foreground">Produções Recentes</h3>
          <p className="text-sm text-muted-foreground mt-1">Últimos produtos processados na linha de produção</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Código</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Produto</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Data</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Quantidade</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Operador</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentProduction.map((item) => (
                <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-5 py-4 text-sm text-muted-foreground">{item.code}</td>
                  <td className="px-5 py-4 text-sm text-foreground">{item.product}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{item.date}</td>
                  <td className="px-5 py-4 text-sm text-foreground text-right">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-chart-4/10 text-chart-4">
                      +{item.quantity.toLocaleString('pt-BR')} {item.unit}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{item.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
