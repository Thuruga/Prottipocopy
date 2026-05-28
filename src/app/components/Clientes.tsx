import { useState } from 'react';
import { Plus, Search, Filter, Edit, Eye, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

const clientesData = [
  {
    id: 1,
    code: 'CLI-001',
    name: 'Restaurante Bella Italia',
    type: 'PJ',
    document: '12.345.678/0001-90',
    phone: '(11) 98765-4321',
    email: 'contato@bellaitalia.com.br',
    city: 'São Paulo',
    totalPurchases: 15,
    totalValue: 18750.00,
    lastPurchase: '13/05/2026',
    status: 'active'
  },
  {
    id: 2,
    code: 'CLI-002',
    name: 'Supermercado Central',
    type: 'PJ',
    document: '23.456.789/0001-01',
    phone: '(11) 97654-3210',
    email: 'compras@supercentral.com.br',
    city: 'São Paulo',
    totalPurchases: 28,
    totalValue: 45200.00,
    lastPurchase: '13/05/2026',
    status: 'active'
  },
  {
    id: 3,
    code: 'CLI-003',
    name: 'Maria Silva',
    type: 'PF',
    document: '345.678.901-23',
    phone: '(11) 96543-2109',
    email: 'maria.silva@email.com',
    city: 'São Paulo',
    totalPurchases: 8,
    totalValue: 1840.50,
    lastPurchase: '12/05/2026',
    status: 'active'
  },
  {
    id: 4,
    code: 'CLI-004',
    name: 'Churrascaria Gaúcha',
    type: 'PJ',
    document: '34.567.890/0001-12',
    phone: '(11) 95432-1098',
    email: 'pedidos@churrascariagraucha.com.br',
    city: 'São Paulo',
    totalPurchases: 22,
    totalValue: 32500.00,
    lastPurchase: '12/05/2026',
    status: 'active'
  },
  {
    id: 5,
    code: 'CLI-005',
    name: 'João Santos',
    type: 'PF',
    document: '456.789.012-34',
    phone: '(11) 94321-0987',
    email: 'joao.santos@email.com',
    city: 'Guarulhos',
    totalPurchases: 5,
    totalValue: 850.00,
    lastPurchase: '11/05/2026',
    status: 'active'
  },
];

const recentPurchases = [
  { id: 1, date: '13/05/2026', items: 5, total: 1250.00 },
  { id: 2, date: '10/05/2026', items: 3, total: 890.00 },
  { id: 3, date: '05/05/2026', items: 7, total: 1580.50 },
];

export function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewClientDialog, setShowNewClientDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<typeof clientesData[0] | null>(null);
  const [newClient, setNewClient] = useState({
    name: '',
    type: 'PF' as 'PF' | 'PJ',
    document: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  });

  const filteredData = clientesData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.document.includes(searchTerm) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveClient = () => {
    if (!newClient.name || !newClient.document) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    toast.success('Cliente cadastrado com sucesso!', {
      description: `${newClient.name} foi adicionado ao sistema.`
    });
    setShowNewClientDialog(false);
    setNewClient({
      name: '',
      type: 'PF',
      document: '',
      phone: '',
      whatsapp: '',
      email: '',
      address: '',
      city: '',
      notes: ''
    });
  };

  const handleViewDetails = (client: typeof clientesData[0]) => {
    setSelectedClient(client);
    setShowDetailsDialog(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-2xl">Clientes</h2>
          <p className="text-sm text-muted-foreground mt-1">Gestão de clientes e histórico de compras</p>
        </div>
        <Button onClick={() => setShowNewClientDialog(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total de Clientes</CardDescription>
            <CardTitle className="text-3xl">{clientesData.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Clientes Ativos</CardDescription>
            <CardTitle className="text-3xl">{clientesData.filter(c => c.status === 'active').length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pessoa Jurídica</CardDescription>
            <CardTitle className="text-3xl">{clientesData.filter(c => c.type === 'PJ').length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Pessoa Física</CardDescription>
            <CardTitle className="text-3xl">{clientesData.filter(c => c.type === 'PF').length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, documento ou código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Código</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Cliente</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Tipo</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Contato</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Compras</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Total Gasto</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Última Compra</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.map((client) => (
                <tr key={client.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-5 py-4 text-sm text-muted-foreground">{client.code}</td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm text-foreground font-medium">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.document}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Badge variant={client.type === 'PJ' ? 'default' : 'secondary'}>
                      {client.type}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[200px]">{client.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-foreground text-right">{client.totalPurchases}</td>
                  <td className="px-5 py-4 text-sm text-foreground text-right font-medium">
                    R$ {client.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{client.lastPurchase}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleViewDetails(client)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Client Dialog */}
      <Dialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
            <DialogDescription>
              Cadastre um novo cliente no sistema
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome / Razão Social *</Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="Nome completo ou razão social"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Tipo *</Label>
                <Select
                  value={newClient.type}
                  onValueChange={(value: 'PF' | 'PJ') => setNewClient({ ...newClient, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PF">Pessoa Física</SelectItem>
                    <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="document">{newClient.type === 'PF' ? 'CPF' : 'CNPJ'} *</Label>
                <Input
                  id="document"
                  value={newClient.document}
                  onChange={(e) => setNewClient({ ...newClient, document: e.target.value })}
                  placeholder={newClient.type === 'PF' ? '000.000.000-00' : '00.000.000/0000-00'}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={newClient.whatsapp}
                  onChange={(e) => setNewClient({ ...newClient, whatsapp: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  placeholder="Rua, número, bairro"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={newClient.city}
                  onChange={(e) => setNewClient({ ...newClient, city: e.target.value })}
                  placeholder="Cidade - UF"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Input
                id="notes"
                value={newClient.notes}
                onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                placeholder="Informações adicionais sobre o cliente..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewClientDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveClient}>
              Cadastrar Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Client Details Dialog */}
      {selectedClient && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedClient.name}</DialogTitle>
              <DialogDescription>Informações detalhadas e histórico</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="history">Histórico</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Código</Label>
                    <p className="text-foreground mt-1">{selectedClient.code}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Tipo</Label>
                    <div className="mt-1">
                      <Badge variant={selectedClient.type === 'PJ' ? 'default' : 'secondary'}>
                        {selectedClient.type}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">{selectedClient.type === 'PF' ? 'CPF' : 'CNPJ'}</Label>
                    <p className="text-foreground mt-1">{selectedClient.document}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Telefone</Label>
                    <p className="text-foreground mt-1">{selectedClient.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">E-mail</Label>
                    <p className="text-foreground mt-1">{selectedClient.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Cidade</Label>
                    <p className="text-foreground mt-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedClient.city}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardDescription>Total de Compras</CardDescription>
                      <CardTitle className="text-2xl">{selectedClient.totalPurchases}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card className="col-span-2">
                    <CardHeader className="pb-3">
                      <CardDescription>Valor Total Gasto</CardDescription>
                      <CardTitle className="text-2xl">
                        R$ {selectedClient.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="history" className="pt-4">
                <div className="space-y-3">
                  <Label>Compras Recentes</Label>
                  <div className="space-y-2">
                    {recentPurchases.map((purchase) => (
                      <Card key={purchase.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-foreground font-medium">{purchase.date}</p>
                              <p className="text-xs text-muted-foreground">{purchase.items} itens</p>
                            </div>
                            <p className="text-foreground font-semibold">
                              R$ {purchase.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
