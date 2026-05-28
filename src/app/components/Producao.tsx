import { useState } from 'react';
import { Plus, Search, Filter, TrendingDown, TrendingUp, Factory, Eye, AlertTriangle, Calendar, Package, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner';

// Helper functions for date handling
const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const addDays = (dateStr: string, days: number): string => {
  const date = parseDate(dateStr);
  date.setDate(date.getDate() + days);
  return formatDate(date);
};

const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = parseDate(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getExpiryStatus = (expiryDate: string): 'expired' | 'warning' | 'normal' => {
  const daysUntil = getDaysUntilExpiry(expiryDate);
  if (daysUntil < 0) return 'expired';
  if (daysUntil <= 7) return 'warning';
  return 'normal';
};

// Types
type MaterialLote = {
  id: number;
  materialName: string;
  loteCode: string;
  quantity: number;
  manufactureDate: string;
  expiryDate: string;
  available: number;
};

type ProductionRecord = {
  id: number;
  code: string;
  product: string;
  date: string;
  quantity: number;
  raw: number;
  waste: number;
  yield: number;
  operator: string;
  batch: string;
  productExpiry: string;
  shelfLifeDays: number;
  materialsUsed: Array<{
    material: string;
    quantity: number;
    lote: string;
    expiryDate: string;
  }>;
};

// Available lotes for materials
const availableLotes: MaterialLote[] = [
  // Carne Suína
  { id: 1, materialName: 'Carne Suína (Pernil)', loteCode: 'LOT-2026-001', quantity: 45, manufactureDate: '30/04/2026', expiryDate: '30/05/2026', available: 45 },
  { id: 2, materialName: 'Carne Suína (Pernil)', loteCode: 'LOT-2026-012', quantity: 80, manufactureDate: '09/05/2026', expiryDate: '15/06/2026', available: 80 },
  { id: 3, materialName: 'Carne Suína (Pernil)', loteCode: 'LOT-2026-025', quantity: 120, manufactureDate: '19/05/2026', expiryDate: '25/06/2026', available: 120 },

  // Carne Bovina
  { id: 4, materialName: 'Carne Bovina (Alcatra)', loteCode: 'LOT-2026-002', quantity: 60, manufactureDate: '04/05/2026', expiryDate: '10/06/2026', available: 60 },
  { id: 5, materialName: 'Carne Bovina (Alcatra)', loteCode: 'LOT-2026-018', quantity: 120, manufactureDate: '14/05/2026', expiryDate: '20/06/2026', available: 120 },

  // Temperos
  { id: 6, materialName: 'Condimentos Mix', loteCode: 'LOT-2026-030', quantity: 30, manufactureDate: '01/05/2026', expiryDate: '01/11/2026', available: 30 },
  { id: 7, materialName: 'Condimentos Mix', loteCode: 'LOT-2026-031', quantity: 65, manufactureDate: '10/05/2026', expiryDate: '10/11/2026', available: 65 },

  // Sal de Cura
  { id: 8, materialName: 'Sal de Cura', loteCode: 'LOT-2026-040', quantity: 100, manufactureDate: '15/04/2026', expiryDate: '15/04/2027', available: 100 },
  { id: 9, materialName: 'Sal de Cura', loteCode: 'LOT-2026-041', quantity: 120, manufactureDate: '05/05/2026', expiryDate: '05/05/2027', available: 120 },
];

const producaoData: ProductionRecord[] = [
  {
    id: 1,
    code: 'PROD-001',
    product: 'Linguiça Toscana',
    date: '13/05/2026',
    quantity: 125,
    raw: 140,
    waste: 15,
    yield: 89.3,
    operator: 'Douglas Silva',
    batch: 'LPROD-2026-001',
    productExpiry: '11/08/2026',
    shelfLifeDays: 90,
    materialsUsed: [
      { material: 'Carne Suína (Pernil)', quantity: 45, lote: 'LOT-2026-001', expiryDate: '30/05/2026' },
      { material: 'Carne Suína (Pernil)', quantity: 80, lote: 'LOT-2026-012', expiryDate: '15/06/2026' },
      { material: 'Condimentos Mix', quantity: 15, lote: 'LOT-2026-030', expiryDate: '01/11/2026' },
    ]
  },
  {
    id: 2,
    code: 'PROD-002',
    product: 'Presunto Cozido',
    date: '13/05/2026',
    quantity: 80,
    raw: 95,
    waste: 15,
    yield: 84.2,
    operator: 'Maria Santos',
    batch: 'LPROD-2026-002',
    productExpiry: '11/08/2026',
    shelfLifeDays: 90,
    materialsUsed: [
      { material: 'Carne Suína (Pernil)', quantity: 80, lote: 'LOT-2026-012', expiryDate: '15/06/2026' },
      { material: 'Sal de Cura', quantity: 15, lote: 'LOT-2026-040', expiryDate: '15/04/2027' },
    ]
  },
  {
    id: 3,
    code: 'PROD-003',
    product: 'Mortadela Bologna',
    date: '12/05/2026',
    quantity: 95,
    raw: 105,
    waste: 10,
    yield: 90.5,
    operator: 'Pedro Costa',
    batch: 'LPROD-2026-003',
    productExpiry: '10/08/2026',
    shelfLifeDays: 90,
    materialsUsed: [
      { material: 'Carne Bovina (Alcatra)', quantity: 60, lote: 'LOT-2026-002', expiryDate: '10/06/2026' },
      { material: 'Carne Suína (Pernil)', quantity: 40, lote: 'LOT-2026-001', expiryDate: '30/05/2026' },
      { material: 'Condimentos Mix', quantity: 5, lote: 'LOT-2026-030', expiryDate: '01/11/2026' },
    ]
  },
  {
    id: 4,
    code: 'PROD-004',
    product: 'Salame Italiano',
    date: '12/05/2026',
    quantity: 60,
    raw: 72,
    waste: 12,
    yield: 83.3,
    operator: 'Ana Oliveira',
    batch: 'LPROD-2026-004',
    productExpiry: '10/11/2026',
    shelfLifeDays: 180,
    materialsUsed: [
      { material: 'Carne Suína (Pernil)', quantity: 60, lote: 'LOT-2026-012', expiryDate: '15/06/2026' },
      { material: 'Sal de Cura', quantity: 10, lote: 'LOT-2026-040', expiryDate: '15/04/2027' },
      { material: 'Condimentos Mix', quantity: 2, lote: 'LOT-2026-030', expiryDate: '01/11/2026' },
    ]
  },
];

type SelectedMaterialLote = {
  materialName: string;
  loteId: number;
  loteCode: string;
  quantity: string;
  expiryDate: string;
};

export function Producao() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewProdDialog, setShowNewProdDialog] = useState(false);
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);
  const [selectedProduction, setSelectedProduction] = useState<ProductionRecord | null>(null);
  const [selectedMaterialLotes, setSelectedMaterialLotes] = useState<SelectedMaterialLote[]>([]);
  const [newProduction, setNewProduction] = useState({
    product: '',
    date: new Date().toISOString().split('T')[0],
    operator: '',
    finalQuantity: '',
    batch: '',
    shelfLifeDays: '',
    notes: ''
  });

  const filteredData = producaoData.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRaw = selectedMaterialLotes.reduce((sum, mat) => sum + (parseFloat(mat.quantity) || 0), 0);
  const finalQty = parseFloat(newProduction.finalQuantity) || 0;
  const calculatedWaste = totalRaw - finalQty;
  const calculatedYield = totalRaw > 0 ? (finalQty / totalRaw) * 100 : 0;

  // Calculate product expiry based on production date and shelf life
  const calculateProductExpiry = (): string | null => {
    if (!newProduction.date || !newProduction.shelfLifeDays) return null;
    const productionDate = newProduction.date.split('-').reverse().join('/');
    return addDays(productionDate, parseInt(newProduction.shelfLifeDays));
  };

  // Check if product expiry exceeds any material expiry
  const checkExpiryConflict = (): { hasConflict: boolean; conflictingMaterials: string[] } => {
    const productExpiry = calculateProductExpiry();
    if (!productExpiry) return { hasConflict: false, conflictingMaterials: [] };

    const productExpiryDate = parseDate(productExpiry);
    const conflicting: string[] = [];

    selectedMaterialLotes.forEach(mat => {
      if (mat.expiryDate) {
        const matExpiryDate = parseDate(mat.expiryDate);
        if (productExpiryDate > matExpiryDate) {
          conflicting.push(`${mat.materialName} (${mat.loteCode})`);
        }
      }
    });

    return { hasConflict: conflicting.length > 0, conflictingMaterials: conflicting };
  };

  const handleAddMaterialLote = () => {
    setSelectedMaterialLotes([...selectedMaterialLotes, {
      materialName: '',
      loteId: 0,
      loteCode: '',
      quantity: '',
      expiryDate: ''
    }]);
  };

  const handleMaterialLoteChange = (index: number, loteId: number) => {
    const lote = availableLotes.find(l => l.id === loteId);
    if (lote) {
      const updated = [...selectedMaterialLotes];
      updated[index] = {
        ...updated[index],
        materialName: lote.materialName,
        loteId: lote.id,
        loteCode: lote.loteCode,
        expiryDate: lote.expiryDate
      };
      setSelectedMaterialLotes(updated);
    }
  };

  const handleQuantityChange = (index: number, quantity: string) => {
    const updated = [...selectedMaterialLotes];
    updated[index] = { ...updated[index], quantity };
    setSelectedMaterialLotes(updated);
  };

  const handleSaveProduction = () => {
    if (!newProduction.product || !newProduction.finalQuantity || selectedMaterialLotes.length === 0) {
      toast.error('Preencha os campos obrigatórios e adicione matérias-primas');
      return;
    }

    const { hasConflict } = checkExpiryConflict();
    if (hasConflict) {
      const confirmSave = confirm('⚠ ALERTA SANITÁRIO: A validade do produto final excede a validade de matérias-primas utilizadas. Deseja continuar?');
      if (!confirmSave) return;
    }

    toast.success('Produção registrada com sucesso!', {
      description: `${newProduction.finalQuantity}kg de ${newProduction.product} com ${calculatedYield.toFixed(1)}% de rendimento.`
    });
    setShowNewProdDialog(false);
    setNewProduction({
      product: '',
      date: new Date().toISOString().split('T')[0],
      operator: '',
      finalQuantity: '',
      batch: '',
      shelfLifeDays: '',
      notes: ''
    });
    setSelectedMaterialLotes([]);
  };

  const handleViewDetails = (production: ProductionRecord) => {
    setSelectedProduction(production);
    setShowDetailsSheet(true);
  };

  const totalProduction = producaoData.reduce((sum, p) => sum + p.quantity, 0);
  const totalWaste = producaoData.reduce((sum, p) => sum + p.waste, 0);
  const avgYield = producaoData.reduce((sum, p) => sum + p.yield, 0) / producaoData.length;

  const productExpiry = calculateProductExpiry();
  const expiryConflict = checkExpiryConflict();

  // Get unique material names for the dropdown
  const uniqueMaterials = Array.from(new Set(availableLotes.map(l => l.materialName)));

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-2xl">Produção</h2>
          <p className="text-sm text-muted-foreground mt-1">Registro e rastreabilidade de produção</p>
        </div>
        <Button onClick={() => setShowNewProdDialog(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Produção
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Produção Total</CardDescription>
            <CardTitle className="text-3xl">{totalProduction.toLocaleString('pt-BR')} kg</CardTitle>
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
            <CardDescription>Perdas Totais</CardDescription>
            <CardTitle className="text-3xl">{totalWaste.toLocaleString('pt-BR')} kg</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-chart-2">
              <TrendingDown className="w-4 h-4" />
              <span>-8% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Rendimento Médio</CardDescription>
            <CardTitle className="text-3xl">{avgYield.toFixed(1)}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-chart-4">
              <TrendingUp className="w-4 h-4" />
              <span>+2.3% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
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
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Data</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">MP Usada</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Produzido</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Perda</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Rendimento</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Vencimento Produto
                  </div>
                </th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Operador</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.map((item) => {
                const expiryStatus = getExpiryStatus(item.productExpiry);
                const daysUntil = getDaysUntilExpiry(item.productExpiry);

                return (
                  <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                    <td className="px-5 py-4 text-sm text-muted-foreground">{item.code}</td>
                    <td className="px-5 py-4 text-sm text-foreground font-medium">{item.product}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{item.date}</td>
                    <td className="px-5 py-4 text-sm text-foreground text-right">{item.raw} kg</td>
                    <td className="px-5 py-4 text-sm text-foreground text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-chart-4/10 text-chart-4">
                        {item.quantity} kg
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-destructive/10 text-destructive">
                        {item.waste} kg
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-right">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md ${
                        item.yield >= 90 ? 'bg-chart-4/10 text-chart-4' :
                        item.yield >= 85 ? 'bg-chart-5/10 text-chart-5' :
                        'bg-destructive/10 text-destructive'
                      }`}>
                        {item.yield.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm text-foreground font-medium">{item.productExpiry}</span>
                        {expiryStatus === 'warning' && (
                          <Badge className="text-xs bg-chart-5/10 text-chart-5 hover:bg-chart-5/20">
                            {daysUntil}d restantes
                          </Badge>
                        )}
                        {expiryStatus === 'expired' && (
                          <Badge variant="destructive" className="text-xs">
                            Vencido
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{item.operator}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleViewDetails(item)}
                          title="Ver detalhes de rastreabilidade"
                        >
                          <Eye className="w-4 h-4" />
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

      {/* Details Sheet */}
      <Sheet open={showDetailsSheet} onOpenChange={setShowDetailsSheet}>
        <SheetContent className="w-full sm:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Rastreabilidade de Produção</SheetTitle>
            <SheetDescription>
              Controle completo de produção e validade
            </SheetDescription>
          </SheetHeader>

          {selectedProduction && (
            <div className="mt-6 space-y-6">
              {/* Production Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Dados da Produção</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Produto Produzido</Label>
                    <p className="text-sm text-foreground font-medium mt-1">{selectedProduction.product}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Código Produção</Label>
                    <p className="text-sm text-foreground font-medium mt-1">{selectedProduction.code}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Lote Produto Final</Label>
                    <p className="text-sm text-foreground font-medium mt-1">{selectedProduction.batch}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Data Produção</Label>
                    <p className="text-sm text-foreground font-medium mt-1">{selectedProduction.date}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Operador Responsável</Label>
                    <p className="text-sm text-foreground font-medium mt-1">{selectedProduction.operator}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Quantidade Final</Label>
                    <p className="text-sm text-foreground font-medium mt-1">{selectedProduction.quantity} kg</p>
                  </div>
                </CardContent>
              </Card>

              {/* Materials Used */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Matérias-Primas Utilizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50 border-b">
                        <tr>
                          <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase">Matéria-Prima</th>
                          <th className="text-right px-4 py-3 text-xs text-muted-foreground uppercase">Quantidade</th>
                          <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase">Lote</th>
                          <th className="text-left px-4 py-3 text-xs text-muted-foreground uppercase">Validade</th>
                          <th className="text-center px-4 py-3 text-xs text-muted-foreground uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {selectedProduction.materialsUsed.map((mat, idx) => {
                          const status = getExpiryStatus(mat.expiryDate);
                          return (
                            <tr key={idx} className="hover:bg-accent/30">
                              <td className="px-4 py-3 text-sm text-foreground">{mat.material}</td>
                              <td className="px-4 py-3 text-sm text-foreground text-right">{mat.quantity} kg</td>
                              <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{mat.lote}</td>
                              <td className="px-4 py-3 text-sm text-foreground">{mat.expiryDate}</td>
                              <td className="px-4 py-3 text-center">
                                <Badge className={
                                  status === 'normal' ? 'bg-chart-4/10 text-chart-4' :
                                  status === 'warning' ? 'bg-chart-5/10 text-chart-5' :
                                  'bg-destructive/10 text-destructive'
                                }>
                                  {status === 'normal' ? 'Normal' : status === 'warning' ? 'Atenção' : 'Vencido'}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Product Expiry */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Controle de Validade do Produto Final
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Data Fabricação</Label>
                      <p className="text-sm text-foreground font-medium mt-1">{selectedProduction.date}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Prazo de Validade</Label>
                      <p className="text-sm text-foreground font-medium mt-1">{selectedProduction.shelfLifeDays} dias</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Data Vencimento</Label>
                      <p className="text-sm text-foreground font-medium mt-1">{selectedProduction.productExpiry}</p>
                    </div>
                  </div>

                  {/* Check if product expiry exceeds material expiry */}
                  {(() => {
                    const productExpDate = parseDate(selectedProduction.productExpiry);
                    const conflictingMats = selectedProduction.materialsUsed.filter(mat => {
                      const matExpDate = parseDate(mat.expiryDate);
                      return productExpDate > matExpDate;
                    });

                    if (conflictingMats.length > 0) {
                      return (
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-destructive mb-2">
                                ⚠ ALERTA SANITÁRIO
                              </p>
                              <p className="text-sm text-muted-foreground">
                                A validade do produto final ({selectedProduction.productExpiry}) excede a validade das seguintes matérias-primas:
                              </p>
                              <ul className="mt-2 space-y-1">
                                {conflictingMats.map((mat, idx) => (
                                  <li key={idx} className="text-sm text-foreground">
                                    • {mat.material} - Lote {mat.lote} (vence em {mat.expiryDate})
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </CardContent>
              </Card>

              {/* Production Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>MP Utilizada</CardDescription>
                    <CardTitle className="text-2xl">{selectedProduction.raw} kg</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Perda</CardDescription>
                    <CardTitle className="text-2xl text-destructive">{selectedProduction.waste} kg</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Rendimento</CardDescription>
                    <CardTitle className="text-2xl text-chart-4">{selectedProduction.yield.toFixed(1)}%</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* New Production Dialog */}
      <Dialog open={showNewProdDialog} onOpenChange={setShowNewProdDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registrar Nova Produção</DialogTitle>
            <DialogDescription>
              Controle de Produção e Rastreabilidade
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Dados da Produção</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product">Produto Produzido *</Label>
                    <Select value={newProduction.product} onValueChange={(value) => setNewProduction({ ...newProduction, product: value })}>
                      <SelectTrigger id="product">
                        <SelectValue placeholder="Selecione o produto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linguica-toscana">Linguiça Toscana</SelectItem>
                        <SelectItem value="linguica-calabresa">Linguiça Calabresa</SelectItem>
                        <SelectItem value="presunto-cozido">Presunto Cozido</SelectItem>
                        <SelectItem value="mortadela">Mortadela Bologna</SelectItem>
                        <SelectItem value="salame">Salame Italiano</SelectItem>
                        <SelectItem value="peito-peru">Peito de Peru</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="operator">Operador Responsável *</Label>
                    <Select value={newProduction.operator} onValueChange={(value) => setNewProduction({ ...newProduction, operator: value })}>
                      <SelectTrigger id="operator">
                        <SelectValue placeholder="Selecione o operador" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="douglas-silva">Douglas Silva</SelectItem>
                        <SelectItem value="maria-santos">Maria Santos</SelectItem>
                        <SelectItem value="pedro-costa">Pedro Costa</SelectItem>
                        <SelectItem value="ana-oliveira">Ana Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Data da Produção</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newProduction.date}
                      onChange={(e) => setNewProduction({ ...newProduction, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batch">Lote do Produto Final</Label>
                    <Input
                      id="batch"
                      value={newProduction.batch}
                      onChange={(e) => setNewProduction({ ...newProduction, batch: e.target.value })}
                      placeholder="Ex: LPROD-2026-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="finalQuantity">Quantidade Final Produzida (kg) *</Label>
                    <Input
                      id="finalQuantity"
                      type="number"
                      value={newProduction.finalQuantity}
                      onChange={(e) => setNewProduction({ ...newProduction, finalQuantity: e.target.value })}
                      placeholder="Ex: 125"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shelfLife">Prazo de Validade (dias) *</Label>
                    <Input
                      id="shelfLife"
                      type="number"
                      value={newProduction.shelfLifeDays}
                      onChange={(e) => setNewProduction({ ...newProduction, shelfLifeDays: e.target.value })}
                      placeholder="Ex: 90"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Materials with Lotes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Matérias-Primas Utilizadas (com Rastreabilidade)</CardTitle>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddMaterialLote}>
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar Lote
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedMaterialLotes.map((mat, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3 p-3 border rounded-lg">
                      <Select
                        value={mat.loteId.toString()}
                        onValueChange={(value) => handleMaterialLoteChange(index, parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o lote" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableLotes.map(lote => (
                            <SelectItem key={lote.id} value={lote.id.toString()}>
                              {lote.materialName} - {lote.loteCode} (Disponível: {lote.available}kg | Validade: {lote.expiryDate})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="Quantidade (kg)"
                        value={mat.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                      />
                      {mat.expiryDate && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Validade: {mat.expiryDate}</span>
                          <Badge className={
                            getExpiryStatus(mat.expiryDate) === 'normal' ? 'bg-chart-4/10 text-chart-4' :
                            getExpiryStatus(mat.expiryDate) === 'warning' ? 'bg-chart-5/10 text-chart-5' :
                            'bg-destructive/10 text-destructive'
                          }>
                            {getExpiryStatus(mat.expiryDate) === 'normal' ? 'Normal' :
                             getExpiryStatus(mat.expiryDate) === 'warning' ? 'Atenção' : 'Vencido'}
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                  {selectedMaterialLotes.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Nenhum lote adicionado. Clique em "Adicionar Lote" para começar.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Calculations */}
            {totalRaw > 0 && (
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-base">Cálculos Automáticos</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Matéria-Prima Total</p>
                    <p className="text-2xl text-foreground mt-1">{totalRaw.toFixed(1)} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Perda Calculada</p>
                    <p className="text-2xl text-destructive mt-1">{calculatedWaste.toFixed(1)} kg</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {totalRaw > 0 ? ((calculatedWaste / totalRaw) * 100).toFixed(1) : 0}% de perda
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rendimento</p>
                    <p className={`text-2xl mt-1 ${
                      calculatedYield >= 90 ? 'text-chart-4' :
                      calculatedYield >= 85 ? 'text-chart-5' :
                      'text-destructive'
                    }`}>
                      {calculatedYield.toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Product Expiry Calculation */}
            {productExpiry && (
              <Card className={expiryConflict.hasConflict ? 'border-destructive/50 bg-destructive/5' : 'border-primary/20 bg-primary/5'}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Definição de Vencimento do Produto
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Data Fabricação</Label>
                      <p className="text-sm text-foreground font-medium mt-1">
                        {newProduction.date.split('-').reverse().join('/')}
                      </p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Prazo de Validade</Label>
                      <p className="text-sm text-foreground font-medium mt-1">{newProduction.shelfLifeDays} dias</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Data Vencimento Calculada</Label>
                      <p className="text-sm text-foreground font-semibold mt-1">{productExpiry}</p>
                    </div>
                  </div>

                  {expiryConflict.hasConflict && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-destructive mb-2">
                            ⚠ ALERTA SANITÁRIO
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            A validade do produto final ({productExpiry}) excede a validade das seguintes matérias-primas:
                          </p>
                          <ul className="space-y-1">
                            {expiryConflict.conflictingMaterials.map((mat, idx) => (
                              <li key={idx} className="text-sm text-foreground">• {mat}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewProdDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveProduction}>
              Salvar Produção
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
