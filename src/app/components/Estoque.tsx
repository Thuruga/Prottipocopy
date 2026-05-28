import { useState } from 'react';
import { Plus, Search, Filter, Download, Edit, Trash2, Eye, PackagePlus, Calendar, AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

type Lote = {
  id: number;
  loteCode: string;
  productId: number;
  quantity: number;
  entryDate: string;
  manufactureDate: string;
  expiryDate: string;
  supplier: string;
};

const lotesData: Lote[] = [
  // Carne Suína (Pernil) - MP-001
  { id: 1, loteCode: 'LOT-2026-001', productId: 1, quantity: 45, entryDate: '01/05/2026', manufactureDate: '30/04/2026', expiryDate: '30/05/2026', supplier: 'Frigorífico São Paulo' },
  { id: 2, loteCode: 'LOT-2026-012', productId: 1, quantity: 80, entryDate: '10/05/2026', manufactureDate: '09/05/2026', expiryDate: '15/06/2026', supplier: 'Frigorífico São Paulo' },
  { id: 3, loteCode: 'LOT-2026-025', productId: 1, quantity: 120, entryDate: '20/05/2026', manufactureDate: '19/05/2026', expiryDate: '25/06/2026', supplier: 'Frigorífico São Paulo' },

  // Carne Bovina (Alcatra) - MP-002
  { id: 4, loteCode: 'LOT-2026-002', productId: 2, quantity: 60, entryDate: '05/05/2026', manufactureDate: '04/05/2026', expiryDate: '10/06/2026', supplier: 'Frigorífico Bom Boi' },
  { id: 5, loteCode: 'LOT-2026-018', productId: 2, quantity: 120, entryDate: '15/05/2026', manufactureDate: '14/05/2026', expiryDate: '20/06/2026', supplier: 'Frigorífico Bom Boi' },

  // Toucinho Defumado - MP-003
  { id: 6, loteCode: 'LOT-2026-003', productId: 3, quantity: 12, entryDate: '25/04/2026', manufactureDate: '24/04/2026', expiryDate: '29/05/2026', supplier: 'Defumados Ltda' },

  // Queijo Mussarela - MP-005
  { id: 7, loteCode: 'LOT-2026-005', productId: 5, quantity: 30, entryDate: '12/05/2026', manufactureDate: '11/05/2026', expiryDate: '11/06/2026', supplier: 'Laticínios Bela Vista' },
  { id: 8, loteCode: 'LOT-2026-020', productId: 5, quantity: 48, entryDate: '18/05/2026', manufactureDate: '17/05/2026', expiryDate: '17/06/2026', supplier: 'Laticínios Bela Vista' },

  // Linguiça Toscana - PROD-001
  { id: 9, loteCode: 'LPROD-2026-001', productId: 8, quantity: 45, entryDate: '13/05/2026', manufactureDate: '13/05/2026', expiryDate: '03/06/2026', supplier: 'Produção Própria' },
  { id: 10, loteCode: 'LPROD-2026-008', productId: 8, quantity: 80, entryDate: '20/05/2026', manufactureDate: '20/05/2026', expiryDate: '10/06/2026', supplier: 'Produção Própria' },

  // Presunto Cozido - PROD-002
  { id: 11, loteCode: 'LPROD-2026-002', productId: 9, quantity: 50, entryDate: '14/05/2026', manufactureDate: '14/05/2026', expiryDate: '04/06/2026', supplier: 'Produção Própria' },
  { id: 12, loteCode: 'LPROD-2026-010', productId: 9, quantity: 30, entryDate: '22/05/2026', manufactureDate: '22/05/2026', expiryDate: '12/06/2026', supplier: 'Produção Própria' },

  // Mortadela Bologna - PROD-003
  { id: 13, loteCode: 'LPROD-2026-003', productId: 10, quantity: 60, entryDate: '12/05/2026', manufactureDate: '12/05/2026', expiryDate: '02/06/2026', supplier: 'Produção Própria' },
  { id: 14, loteCode: 'LPROD-2026-011', productId: 10, quantity: 35, entryDate: '23/05/2026', manufactureDate: '23/05/2026', expiryDate: '13/06/2026', supplier: 'Produção Própria' },
];

const estoqueData = [
  { id: 1, code: 'MP-001', product: 'Carne Suína (Pernil)', current: 245, minimum: 200, unit: 'kg', price: 18.50, supplier: 'Frigorífico São Paulo', status: 'normal' },
  { id: 2, code: 'MP-002', product: 'Carne Bovina (Alcatra)', current: 180, minimum: 150, unit: 'kg', price: 35.00, supplier: 'Frigorífico Bom Boi', status: 'normal' },
  { id: 3, code: 'MP-003', product: 'Toucinho Defumado', current: 12, minimum: 50, unit: 'kg', price: 15.00, supplier: 'Defumados Ltda', status: 'critical' },
  { id: 4, code: 'MP-004', product: 'Tripa Natural Suína', current: 28, minimum: 100, unit: 'metros', price: 2.50, supplier: 'Triparia Central', status: 'critical' },
  { id: 5, code: 'MP-005', product: 'Queijo Mussarela', current: 78, minimum: 150, unit: 'kg', price: 28.00, supplier: 'Laticínios Bela Vista', status: 'warning' },
  { id: 6, code: 'MP-006', product: 'Sal de Cura', current: 220, minimum: 100, unit: 'kg', price: 12.00, supplier: 'Temperos Especiais', status: 'normal' },
  { id: 7, code: 'MP-007', product: 'Condimentos Mix', current: 95, minimum: 80, unit: 'kg', price: 45.00, supplier: 'Temperos Especiais', status: 'normal' },
  { id: 8, code: 'PROD-001', product: 'Linguiça Toscana', current: 125, minimum: 50, unit: 'kg', price: 32.00, supplier: 'Produção Própria', status: 'normal' },
  { id: 9, code: 'PROD-002', product: 'Presunto Cozido', current: 80, minimum: 40, unit: 'kg', price: 42.00, supplier: 'Produção Própria', status: 'normal' },
  { id: 10, code: 'PROD-003', product: 'Mortadela Bologna', current: 95, minimum: 50, unit: 'kg', price: 28.00, supplier: 'Produção Própria', status: 'normal' },
];

// Helper function to parse date in DD/MM/YYYY format
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

// Helper function to get days until expiry
const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = parseDate(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Helper function to get expiry status
const getExpiryStatus = (expiryDate: string): 'expired' | 'warning' | 'normal' => {
  const daysUntil = getDaysUntilExpiry(expiryDate);
  if (daysUntil < 0) return 'expired';
  if (daysUntil <= 7) return 'warning';
  return 'normal';
};

// Helper function to get nearest expiry for a product
const getNearestExpiry = (productId: number): string | null => {
  const productLotes = lotesData.filter(lote => lote.productId === productId);
  if (productLotes.length === 0) return null;

  const sortedLotes = productLotes.sort((a, b) => {
    return parseDate(a.expiryDate).getTime() - parseDate(b.expiryDate).getTime();
  });

  return sortedLotes[0].expiryDate;
};

export function Estoque() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewEntryDialog, setShowNewEntryDialog] = useState(false);
  const [showLotesSheet, setShowLotesSheet] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof estoqueData[0] | null>(null);
  const [lotesSearchTerm, setLotesSearchTerm] = useState('');
  const [lotesFilter, setLotesFilter] = useState<'all' | 'expired' | 'warning' | 'normal'>('all');
  const [newEntry, setNewEntry] = useState({
    product: '',
    supplier: '',
    batch: '',
    expiry: '',
    quantity: '',
    unit: 'kg',
    unitPrice: '',
    notes: ''
  });

  const filteredData = estoqueData.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveEntry = () => {
    if (!newEntry.product || !newEntry.quantity) {
      toast.error('Preencha os campos obrigatórios');
      return;
    }

    toast.success('Entrada registrada com sucesso!', {
      description: `${newEntry.quantity}${newEntry.unit} de ${newEntry.product} adicionados ao estoque.`
    });
    setShowNewEntryDialog(false);
    setNewEntry({
      product: '',
      supplier: '',
      batch: '',
      expiry: '',
      quantity: '',
      unit: 'kg',
      unitPrice: '',
      notes: ''
    });
  };

  const handleViewLotes = (product: typeof estoqueData[0]) => {
    setSelectedProduct(product);
    setShowLotesSheet(true);
  };

  const handleDeleteLote = (loteId: number) => {
    if (confirm('Tem certeza que deseja excluir este lote?')) {
      toast.success('Lote excluído com sucesso!');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      critical: 'bg-destructive/10 text-destructive',
      warning: 'bg-chart-5/10 text-chart-5',
      normal: 'bg-chart-4/10 text-chart-4'
    };
    const labels = {
      critical: 'Crítico',
      warning: 'Atenção',
      normal: 'Normal'
    };
    return (
      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getExpiryBadge = (expiryDate: string) => {
    const status = getExpiryStatus(expiryDate);
    const daysUntil = getDaysUntilExpiry(expiryDate);

    const styles = {
      expired: 'bg-destructive/10 text-destructive',
      warning: 'bg-chart-5/10 text-chart-5',
      normal: 'bg-chart-4/10 text-chart-4'
    };
    const labels = {
      expired: 'Vencido',
      warning: 'Próximo do Vencimento',
      normal: 'Normal'
    };

    return (
      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs ${styles[status]}`}>
        {labels[status]}
        {status !== 'expired' && ` (${daysUntil}d)`}
      </span>
    );
  };

  // Get filtered lotes for selected product
  const selectedProductLotes = selectedProduct
    ? lotesData
        .filter(lote => lote.productId === selectedProduct.id)
        .filter(lote => {
          const matchesSearch = lote.loteCode.toLowerCase().includes(lotesSearchTerm.toLowerCase());
          if (!matchesSearch) return false;

          if (lotesFilter === 'all') return true;
          return getExpiryStatus(lote.expiryDate) === lotesFilter;
        })
        .sort((a, b) => parseDate(a.expiryDate).getTime() - parseDate(b.expiryDate).getTime())
    : [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-2xl">Estoque</h2>
          <p className="text-sm text-muted-foreground mt-1">Gestão completa de matérias-primas e produtos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button onClick={() => setShowNewEntryDialog(true)} className="gap-2">
            <PackagePlus className="w-4 h-4" />
            Nova Entrada
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por produto ou código..."
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
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Produto</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Fornecedor</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Saldo</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Mínimo</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Preço/Un</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Vencimento Próximo
                  </div>
                </th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.map((item) => {
                const nearestExpiry = getNearestExpiry(item.id);
                const expiryStatus = nearestExpiry ? getExpiryStatus(nearestExpiry) : null;

                return (
                  <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-5 py-4 text-sm text-muted-foreground">{item.code}</td>
                    <td className="px-5 py-4 text-sm text-foreground font-medium">{item.product}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{item.supplier}</td>
                    <td className="px-5 py-4 text-sm text-foreground text-right">
                      {item.current.toLocaleString('pt-BR')} {item.unit}
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground text-right">
                      {item.minimum.toLocaleString('pt-BR')} {item.unit}
                    </td>
                    <td className="px-5 py-4 text-sm text-foreground text-right">
                      R$ {item.price.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {nearestExpiry ? (
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm text-foreground font-medium">{nearestExpiry}</span>
                          {expiryStatus === 'expired' && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Vencido
                            </Badge>
                          )}
                          {expiryStatus === 'warning' && (
                            <Badge className="text-xs bg-chart-5/10 text-chart-5 hover:bg-chart-5/20">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              {getDaysUntilExpiry(nearestExpiry)}d
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Nenhum lote</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleViewLotes(item)}
                          title="Ver lotes"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Editar">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lotes Sheet */}
      <Sheet open={showLotesSheet} onOpenChange={setShowLotesSheet}>
        <SheetContent className="w-full sm:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Lotes do Produto</SheetTitle>
            <SheetDescription>
              {selectedProduct?.product} - {selectedProduct?.code}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground">Total de Lotes</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {selectedProduct ? lotesData.filter(l => l.productId === selectedProduct.id).length : 0}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground">Quantidade Total</p>
                <p className="text-2xl font-semibold text-foreground mt-1">
                  {selectedProduct
                    ? lotesData
                        .filter(l => l.productId === selectedProduct.id)
                        .reduce((sum, l) => sum + l.quantity, 0)
                    : 0}{' '}
                  {selectedProduct?.unit}
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground">Próximo Vencimento</p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {selectedProduct && getNearestExpiry(selectedProduct.id)
                    ? getNearestExpiry(selectedProduct.id)
                    : 'N/A'}
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar lote..."
                  value={lotesSearchTerm}
                  onChange={(e) => setLotesSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={lotesFilter} onValueChange={(value: any) => setLotesFilter(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Lotes</SelectItem>
                  <SelectItem value="normal">Normais</SelectItem>
                  <SelectItem value="warning">Próximos do Vencimento</SelectItem>
                  <SelectItem value="expired">Vencidos</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
            </div>

            <Separator />

            {/* Lotes Table */}
            {selectedProductLotes.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto text-muted-foreground opacity-50 mb-3" />
                <p className="text-muted-foreground">
                  {lotesSearchTerm || lotesFilter !== 'all'
                    ? 'Nenhum lote encontrado com os filtros aplicados'
                    : 'Nenhum lote cadastrado para este produto'}
                </p>
              </div>
            ) : (
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50 border-b border-border">
                      <tr>
                        <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">
                          Código do Lote
                        </th>
                        <th className="text-right px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">
                          Quantidade
                        </th>
                        <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">
                          Data Entrada
                        </th>
                        <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">
                          Fabricação
                        </th>
                        <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">
                          Validade
                        </th>
                        <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">
                          Fornecedor
                        </th>
                        <th className="text-center px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">
                          Status Validade
                        </th>
                        <th className="text-center px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {selectedProductLotes.map((lote) => {
                        const daysUntil = getDaysUntilExpiry(lote.expiryDate);
                        const status = getExpiryStatus(lote.expiryDate);

                        return (
                          <tr key={lote.id} className="hover:bg-accent/30 transition-colors">
                            <td className="px-4 py-4 text-sm text-foreground font-medium">
                              {lote.loteCode}
                            </td>
                            <td className="px-4 py-4 text-sm text-foreground text-right">
                              {lote.quantity.toLocaleString('pt-BR')} {selectedProduct?.unit}
                            </td>
                            <td className="px-4 py-4 text-sm text-muted-foreground">{lote.entryDate}</td>
                            <td className="px-4 py-4 text-sm text-muted-foreground">{lote.manufactureDate}</td>
                            <td className="px-4 py-4 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-foreground font-medium">{lote.expiryDate}</span>
                                {status === 'expired' && (
                                  <AlertTriangle className="w-4 h-4 text-destructive" />
                                )}
                                {status === 'warning' && (
                                  <AlertTriangle className="w-4 h-4 text-chart-5" />
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-muted-foreground">{lote.supplier}</td>
                            <td className="px-4 py-4 text-center">
                              {getExpiryBadge(lote.expiryDate)}
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8" title="Editar lote">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive hover:text-destructive"
                                  onClick={() => handleDeleteLote(lote.id)}
                                  title="Excluir lote"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* New Entry Dialog */}
      <Dialog open={showNewEntryDialog} onOpenChange={setShowNewEntryDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nova Entrada de Matéria-Prima</DialogTitle>
            <DialogDescription>
              Registre a entrada de novos itens no estoque
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="product">Produto *</Label>
              <Select value={newEntry.product} onValueChange={(value) => setNewEntry({ ...newEntry, product: value })}>
                <SelectTrigger id="product">
                  <SelectValue placeholder="Selecione o produto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carne-suina">Carne Suína (Pernil)</SelectItem>
                  <SelectItem value="carne-bovina">Carne Bovina (Alcatra)</SelectItem>
                  <SelectItem value="toucinho">Toucinho Defumado</SelectItem>
                  <SelectItem value="tripa">Tripa Natural Suína</SelectItem>
                  <SelectItem value="queijo">Queijo Mussarela</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Fornecedor *</Label>
              <Select value={newEntry.supplier} onValueChange={(value) => setNewEntry({ ...newEntry, supplier: value })}>
                <SelectTrigger id="supplier">
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frigorifico-sp">Frigorífico São Paulo</SelectItem>
                  <SelectItem value="frigorifico-bb">Frigorífico Bom Boi</SelectItem>
                  <SelectItem value="defumados">Defumados Ltda</SelectItem>
                  <SelectItem value="triparia">Triparia Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="batch">Lote</Label>
              <Input
                id="batch"
                value={newEntry.batch}
                onChange={(e) => setNewEntry({ ...newEntry, batch: e.target.value })}
                placeholder="Ex: LT2026051301"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry">Validade</Label>
              <Input
                id="expiry"
                type="date"
                value={newEntry.expiry}
                onChange={(e) => setNewEntry({ ...newEntry, expiry: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade *</Label>
              <Input
                id="quantity"
                type="number"
                value={newEntry.quantity}
                onChange={(e) => setNewEntry({ ...newEntry, quantity: e.target.value })}
                placeholder="Ex: 150"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unidade</Label>
              <Select value={newEntry.unit} onValueChange={(value) => setNewEntry({ ...newEntry, unit: value })}>
                <SelectTrigger id="unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="g">Gramas</SelectItem>
                  <SelectItem value="un">Unidades</SelectItem>
                  <SelectItem value="metros">Metros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="unitPrice">Valor Unitário (R$)</Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                value={newEntry.unitPrice}
                onChange={(e) => setNewEntry({ ...newEntry, unitPrice: e.target.value })}
                placeholder="Ex: 18.50"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="notes">Observações</Label>
              <Input
                id="notes"
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                placeholder="Informações adicionais..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewEntryDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEntry}>
              Salvar Entrada
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
