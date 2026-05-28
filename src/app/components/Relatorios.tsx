import { useState } from 'react';
import { Download, Filter, FileBarChart, Calendar, DollarSign, Package, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: 'Jan', vendas: 185000, perdas: 4200, producao: 1200 },
  { month: 'Fev', vendas: 198000, perdas: 3800, producao: 1350 },
  { month: 'Mar', vendas: 220000, perdas: 4100, producao: 1450 },
  { month: 'Abr', vendas: 235000, perdas: 3500, producao: 1600 },
  { month: 'Mai', vendas: 248500, perdas: 4280, producao: 1842 },
];

const productSalesData = [
  { product: 'Linguiça Toscana', value: 68000, percentage: 27 },
  { product: 'Presunto Cozido', value: 52000, percentage: 21 },
  { product: 'Mortadela', value: 45000, percentage: 18 },
  { product: 'Salame', value: 40000, percentage: 16 },
  { product: 'Outros', value: 43500, percentage: 18 },
];

const wastageData = [
  { product: 'Linguiça Toscana', waste: 15, percentage: 10.7 },
  { product: 'Presunto Cozido', waste: 15, percentage: 15.8 },
  { product: 'Mortadela', waste: 10, percentage: 9.5 },
  { product: 'Salame', waste: 12, percentage: 16.7 },
  { product: 'Peito de Peru', waste: 8, percentage: 11.4 },
];

const topProducts = [
  { product: 'Linguiça Toscana', quantity: 850, revenue: 68000 },
  { product: 'Presunto Cozido', quantity: 620, revenue: 52000 },
  { product: 'Mortadela Bologna', quantity: 780, revenue: 45000 },
  { product: 'Salame Italiano', quantity: 410, revenue: 40000 },
  { product: 'Peito de Peru', quantity: 520, revenue: 38000 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function Relatorios() {
  const [reportType, setReportType] = useState('vendas');
  const [period, setPeriod] = useState('mes-atual');
  const [format, setFormat] = useState('pdf');

  const handleExport = () => {
    const reportNames: { [key: string]: string } = {
      vendas: 'Relatório de Vendas',
      producao: 'Relatório de Produção',
      perdas: 'Relatório de Perdas',
      financeiro: 'Relatório Financeiro'
    };
    alert(`Exportando ${reportNames[reportType]} em ${format.toUpperCase()}...`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-2xl">Relatórios</h2>
          <p className="text-sm text-muted-foreground mt-1">Análises e indicadores de desempenho</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Gerar Relatório</CardTitle>
          <CardDescription>Selecione os filtros e exporte o relatório desejado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Tipo de Relatório</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vendas">Relatório de Vendas</SelectItem>
                  <SelectItem value="producao">Relatório de Produção</SelectItem>
                  <SelectItem value="perdas">Relatório de Perdas</SelectItem>
                  <SelectItem value="financeiro">Relatório Financeiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Período</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger id="period">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hoje">Hoje</SelectItem>
                  <SelectItem value="semana">Esta Semana</SelectItem>
                  <SelectItem value="mes-atual">Mês Atual</SelectItem>
                  <SelectItem value="mes-anterior">Mês Anterior</SelectItem>
                  <SelectItem value="trimestre">Último Trimestre</SelectItem>
                  <SelectItem value="ano">Este Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="format">Formato</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger id="format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel (XLSX)</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleExport} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Faturamento Total</CardDescription>
              <DollarSign className="w-4 h-4 text-chart-4" />
            </div>
            <CardTitle className="text-3xl">R$ 248.500</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-chart-4">
              <TrendingUp className="w-4 h-4" />
              <span>+23% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Produção Total</CardDescription>
              <Package className="w-4 h-4 text-chart-2" />
            </div>
            <CardTitle className="text-3xl">1.842 kg</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-chart-4">
              <TrendingUp className="w-4 h-4" />
              <span>+18% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Perdas Totais</CardDescription>
              <AlertCircle className="w-4 h-4 text-destructive" />
            </div>
            <CardTitle className="text-3xl">R$ 4.280</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-chart-2">
              <TrendingUp className="w-4 h-4" />
              <span>-8% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardDescription>Rendimento Médio</CardDescription>
              <FileBarChart className="w-4 h-4 text-chart-4" />
            </div>
            <CardTitle className="text-3xl">86.8%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-chart-4">
              <TrendingUp className="w-4 h-4" />
              <span>+2.3% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">Vendas</TabsTrigger>
          <TabsTrigger value="production">Produção</TabsTrigger>
          <TabsTrigger value="wastage">Perdas</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Vendas</CardTitle>
              <CardDescription>Faturamento mensal nos últimos 5 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="vendas" name="Vendas (R$)" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vendas por Produto</CardTitle>
              <CardDescription>Participação de cada produto no faturamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productSalesData}
                      dataKey="value"
                      nameKey="product"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={(entry) => `${entry.percentage}%`}
                    >
                      {productSalesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {productSalesData.map((item, index) => (
                    <div key={item.product} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm text-foreground">{item.product}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        R$ {item.value.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Produção Mensal</CardTitle>
              <CardDescription>Volume de produção em kg nos últimos 5 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Bar dataKey="producao" name="Produção (kg)" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Produtos Mais Produzidos</CardTitle>
              <CardDescription>Ranking de produção no período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topProducts.map((item, index) => (
                  <div key={item.product} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium">{item.product}</p>
                      <p className="text-xs text-muted-foreground">{item.quantity} kg produzidos</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground font-semibold">
                        R$ {item.revenue.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wastage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Perdas</CardTitle>
              <CardDescription>Valor de perdas em R$ nos últimos 5 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="perdas" name="Perdas (R$)" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perdas por Produto</CardTitle>
              <CardDescription>Produtos com maior índice de perda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wastageData.map((item) => (
                  <div key={item.product} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{item.product}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{item.waste} kg</span>
                        <span className="text-sm text-destructive font-medium">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-destructive h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparativo de Desempenho</CardTitle>
              <CardDescription>Vendas vs Produção por mês</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Legend />
                  <Bar dataKey="vendas" name="Vendas (R$)" fill="#3b82f6" />
                  <Bar dataKey="producao" name="Produção (kg)" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
