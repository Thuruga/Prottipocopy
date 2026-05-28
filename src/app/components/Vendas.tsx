import { useState } from 'react';
import { Plus, Search, Filter, ShoppingCart, Trash2, DollarSign, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';

const vendasData = [
  { id: 1, code: 'VND-001', date: '13/05/2026 14:32', customer: 'Restaurante Bella Italia', items: 5, total: 1250.00, payment: 'Pix', status: 'completed' },
  { id: 2, code: 'VND-002', date: '13/05/2026 11:15', customer: 'Supermercado Central', items: 12, total: 3480.00, payment: 'Boleto', status: 'completed' },
  { id: 3, code: 'VND-003', date: '12/05/2026 16:45', customer: 'Maria Silva', items: 3, total: 285.50, payment: 'Cartão', status: 'completed' },
  { id: 4, code: 'VND-004', date: '12/05/2026 10:20', customer: 'Churrascaria Gaúcha', items: 8, total: 2150.00, payment: 'Pix', status: 'completed' },
  { id: 5, code: 'VND-005', date: '11/05/2026 15:30', customer: 'João Santos', items: 2, total: 180.00, payment: 'Dinheiro', status: 'completed' },
];

const availableProducts = [
  { id: 1, code: 'PROD-001', name: 'Linguiça Toscana', price: 32.00, stock: 125, unit: 'kg' },
  { id: 2, code: 'PROD-002', name: 'Presunto Cozido', price: 42.00, stock: 80, unit: 'kg' },
  { id: 3, code: 'PROD-003', name: 'Mortadela Bologna', price: 28.00, stock: 95, unit: 'kg' },
  { id: 4, code: 'PROD-004', name: 'Salame Italiano', price: 65.00, stock: 60, unit: 'kg' },
  { id: 5, code: 'PROD-005', name: 'Peito de Peru', price: 48.00, stock: 70, unit: 'kg' },
  { id: 6, code: 'PROD-006', name: 'Linguiça Calabresa', price: 30.00, stock: 110, unit: 'kg' },
];

type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export function Vendas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewSaleDialog, setShowNewSaleDialog] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [saleData, setSaleData] = useState({
    customer: '',
    discount: '',
    payment: '',
    notes: ''
  });

  const filteredData = vendasData.filter(item =>
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: typeof availableProducts[0]) => {
    const existing = cart.find(item => item.productId === product.id);
    if (existing) {
      updateCartQuantity(product.id, existing.quantity + 1);
    } else {
      setCart([...cart, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        subtotal: product.price
      }]);
    }
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.productId === productId
        ? { ...item, quantity, subtotal: item.price * quantity }
        : item
    ));
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const discountValue = parseFloat(saleData.discount) || 0;
  const total = subtotal - discountValue;

  const handleFinalizeSale = () => {
    if (cart.length === 0) {
      toast.error('Adicione produtos à venda');
      return;
    }
    if (!saleData.payment) {
      toast.error('Selecione a forma de pagamento');
      return;
    }

    toast.success('Venda finalizada com sucesso!', {
      description: `Total: R$ ${total.toFixed(2)} - ${cart.length} itens`
    });
    setShowNewSaleDialog(false);
    setCart([]);
    setSaleData({ customer: '', discount: '', payment: '', notes: '' });
  };

  const totalSales = vendasData.reduce((sum, v) => sum + v.total, 0);
  const totalItems = vendasData.reduce((sum, v) => sum + v.items, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-2xl">Vendas</h2>
          <p className="text-sm text-muted-foreground mt-1">Gestão de vendas e faturamento</p>
        </div>
        <Button onClick={() => setShowNewSaleDialog(true)} className="gap-2">
          <ShoppingCart className="w-4 h-4" />
          Nova Venda
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Faturamento Total</CardDescription>
            <CardTitle className="text-3xl">R$ {totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</CardTitle>
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
            <CardDescription>Total de Vendas</CardDescription>
            <CardTitle className="text-3xl">{vendasData.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-chart-4">
              <TrendingUp className="w-4 h-4" />
              <span>+15% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Itens Vendidos</CardDescription>
            <CardTitle className="text-3xl">{totalItems}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1 text-sm text-chart-4">
              <TrendingUp className="w-4 h-4" />
              <span>+18% vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por código ou cliente..."
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
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Data/Hora</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Cliente</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Itens</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Total</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Pagamento</th>
                <th className="text-center px-5 py-3 text-xs text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-5 py-4 text-sm text-muted-foreground">{item.code}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{item.date}</td>
                  <td className="px-5 py-4 text-sm text-foreground font-medium">{item.customer}</td>
                  <td className="px-5 py-4 text-sm text-foreground text-right">{item.items}</td>
                  <td className="px-5 py-4 text-sm text-foreground text-right font-medium">
                    R$ {item.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{item.payment}</td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs bg-chart-4/10 text-chart-4">
                      Concluída
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Sale Dialog */}
      <Dialog open={showNewSaleDialog} onOpenChange={setShowNewSaleDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nova Venda</DialogTitle>
            <DialogDescription>
              Adicione produtos e finalize a venda
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-6 py-4">
            {/* Products Selection */}
            <div className="col-span-2 space-y-4">
              <div>
                <Label className="text-base">Produtos Disponíveis</Label>
                <p className="text-sm text-muted-foreground">Clique para adicionar ao carrinho</p>
              </div>
              <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                {availableProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => addToCart(product)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-sm">{product.name}</CardTitle>
                          <CardDescription className="text-xs">{product.code}</CardDescription>
                        </div>
                        <Plus className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground font-semibold">
                          R$ {product.price.toFixed(2)}/{product.unit}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Estoque: {product.stock} {product.unit}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cart */}
            <div className="space-y-4">
              <div>
                <Label className="text-base">Carrinho</Label>
                <p className="text-sm text-muted-foreground">{cart.length} itens</p>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    Carrinho vazio
                  </div>
                ) : (
                  cart.map((item) => (
                    <Card key={item.productId}>
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                            <p className="text-xs text-muted-foreground">R$ {item.price.toFixed(2)}/kg</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 -mt-1"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            step="0.1"
                            value={item.quantity}
                            onChange={(e) => updateCartQuantity(item.productId, parseFloat(e.target.value))}
                            className="h-8 text-sm"
                          />
                          <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                            R$ {item.subtotal.toFixed(2)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="space-y-2">
                  <Label htmlFor="customer">Cliente (opcional)</Label>
                  <Select value={saleData.customer} onValueChange={(value) => setSaleData({ ...saleData, customer: value })}>
                    <SelectTrigger id="customer">
                      <SelectValue placeholder="Selecione ou deixe em branco" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bella-italia">Restaurante Bella Italia</SelectItem>
                      <SelectItem value="supermercado">Supermercado Central</SelectItem>
                      <SelectItem value="churrascaria">Churrascaria Gaúcha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discount">Desconto (R$)</Label>
                  <Input
                    id="discount"
                    type="number"
                    step="0.01"
                    value={saleData.discount}
                    onChange={(e) => setSaleData({ ...saleData, discount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment">Pagamento *</Label>
                  <Select value={saleData.payment} onValueChange={(value) => setSaleData({ ...saleData, payment: value })}>
                    <SelectTrigger id="payment">
                      <SelectValue placeholder="Forma de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="pix">Pix</SelectItem>
                      <SelectItem value="cartao">Cartão</SelectItem>
                      <SelectItem value="boleto">Boleto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {discountValue > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Desconto</span>
                      <span className="text-destructive">- R$ {discountValue.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-semibold pt-2 border-t">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewSaleDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleFinalizeSale} className="gap-2">
              <DollarSign className="w-4 h-4" />
              Finalizar Venda
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
