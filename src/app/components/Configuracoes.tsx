import { useState } from 'react';
import { Users, Bell, Database, Key, Plug, Shield, Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

const users = [
  { id: 1, name: 'Douglas Mantovani', email: 'douglas@mantovani.com.br', role: 'admin', status: 'active' },
  { id: 2, name: 'Maria Santos', email: 'maria@mantovani.com.br', role: 'operator', status: 'active' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@mantovani.com.br', role: 'operator', status: 'active' },
  { id: 4, name: 'Ana Oliveira', email: 'ana@mantovani.com.br', role: 'viewer', status: 'inactive' },
];

export function Configuracoes() {
  const [notifyStock, setNotifyStock] = useState(true);
  const [notifyProduction, setNotifyProduction] = useState(true);
  const [notifySales, setNotifySales] = useState(false);
  const [notifyExpiry, setNotifyExpiry] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  const handleSaveSettings = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-foreground text-2xl">Configurações</h2>
        <p className="text-sm text-muted-foreground mt-1">Gerencie as configurações do sistema</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="gap-2">
            <SettingsIcon className="w-4 h-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="w-4 h-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="backup" className="gap-2">
            <Database className="w-4 h-4" />
            Backup
          </TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2">
            <Plug className="w-4 h-4" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>Dados cadastrais da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input id="company-name" defaultValue="Charcutaria Mantovani" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input id="cnpj" defaultValue="12.345.678/0001-90" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="(11) 3456-7890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue="contato@mantovani.com.br" />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" defaultValue="Rua das Indústrias, 123 - São Paulo, SP" />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select defaultValue="america-sao-paulo">
                  <SelectTrigger id="timezone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-sao-paulo">América/São Paulo (GMT-3)</SelectItem>
                    <SelectItem value="america-manaus">América/Manaus (GMT-4)</SelectItem>
                    <SelectItem value="america-rio-branco">América/Rio Branco (GMT-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Select defaultValue="pt-br">
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveSettings}>Salvar Alterações</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Gerenciar Usuários</CardTitle>
                  <CardDescription>Controle de acesso e permissões</CardDescription>
                </div>
                <Button>Adicionar Usuário</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role === 'admin' ? 'Administrador' : user.role === 'operator' ? 'Operador' : 'Visualizador'}
                      </Badge>
                      <Badge variant={user.status === 'active' ? 'outline' : 'secondary'}>
                        {user.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Níveis de Permissão</CardTitle>
              <CardDescription>Defina o que cada tipo de usuário pode fazer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Administrador</p>
                      <p className="text-xs text-muted-foreground">Acesso total ao sistema</p>
                    </div>
                    <Badge>Todas as permissões</Badge>
                  </div>
                  <Separator />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Operador</p>
                      <p className="text-xs text-muted-foreground">Registrar vendas, produção e estoque</p>
                    </div>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>
                  <Separator />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Visualizador</p>
                      <p className="text-xs text-muted-foreground">Apenas visualizar relatórios</p>
                    </div>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferências de Notificação</CardTitle>
              <CardDescription>Configure quando e como deseja ser notificado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-stock">Estoque Baixo</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando produtos atingirem o nível mínimo
                    </p>
                  </div>
                  <Switch id="notify-stock" checked={notifyStock} onCheckedChange={setNotifyStock} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-production">Produção Concluída</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando uma produção for finalizada
                    </p>
                  </div>
                  <Switch id="notify-production" checked={notifyProduction} onCheckedChange={setNotifyProduction} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-sales">Novas Vendas</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar a cada nova venda realizada
                    </p>
                  </div>
                  <Switch id="notify-sales" checked={notifySales} onCheckedChange={setNotifySales} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-expiry">Produtos Vencendo</Label>
                    <p className="text-sm text-muted-foreground">
                      Alertar sobre produtos próximos do vencimento
                    </p>
                  </div>
                  <Switch id="notify-expiry" checked={notifyExpiry} onCheckedChange={setNotifyExpiry} />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <Label>Canais de Notificação</Label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="email-notif" defaultChecked className="rounded" />
                    <Label htmlFor="email-notif" className="text-sm font-normal">E-mail</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="whatsapp-notif" defaultChecked className="rounded" />
                    <Label htmlFor="whatsapp-notif" className="text-sm font-normal">WhatsApp</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="sms-notif" className="rounded" />
                    <Label htmlFor="sms-notif" className="text-sm font-normal">SMS</Label>
                  </div>
                </div>
              </div>
              <Button onClick={handleSaveSettings}>Salvar Preferências</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup Automático</CardTitle>
              <CardDescription>Configurações de backup e recuperação de dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Backup Automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Realizar backup diário dos dados do sistema
                  </p>
                </div>
                <Switch id="auto-backup" checked={autoBackup} onCheckedChange={setAutoBackup} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="backup-time">Horário do Backup</Label>
                <Select defaultValue="02:00">
                  <SelectTrigger id="backup-time">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="00:00">00:00</SelectItem>
                    <SelectItem value="02:00">02:00</SelectItem>
                    <SelectItem value="04:00">04:00</SelectItem>
                    <SelectItem value="06:00">06:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="retention">Período de Retenção</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="retention">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 dias</SelectItem>
                    <SelectItem value="15">15 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-3">
                <Label>Último Backup</Label>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">13/05/2026 às 02:00</p>
                    <p className="text-xs text-muted-foreground">Tamanho: 45.2 MB</p>
                  </div>
                  <Badge variant="outline" className="text-chart-4">Sucesso</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveSettings}>Salvar Configurações</Button>
                <Button variant="outline">Fazer Backup Agora</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integrações Disponíveis</CardTitle>
              <CardDescription>Conecte o sistema com outras ferramentas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center">
                    <Plug className="w-6 h-6 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">WhatsApp Business API</p>
                    <p className="text-xs text-muted-foreground">Integração com atendimento</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-chart-4">Conectado</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <Database className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">ERP Fiscal</p>
                    <p className="text-xs text-muted-foreground">Emissão de notas fiscais</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Conectar</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Gateway de Pagamento</p>
                    <p className="text-xs text-muted-foreground">Processar pagamentos online</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Conectar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>Configurações de segurança e privacidade</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Alterar Senha</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Recomendamos alterar sua senha periodicamente
                  </p>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Senha atual" />
                    <Input type="password" placeholder="Nova senha" />
                    <Input type="password" placeholder="Confirmar nova senha" />
                  </div>
                  <Button className="mt-3">Alterar Senha</Button>
                </div>
                <Separator />
                <div>
                  <Label>Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Adicione uma camada extra de segurança à sua conta
                  </p>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-foreground">2FA via WhatsApp</p>
                      <p className="text-xs text-muted-foreground">Código enviado para (11) 98765-4321</p>
                    </div>
                    <Button variant="outline" size="sm">Ativar</Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label>Sessões Ativas</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Gerencie os dispositivos conectados à sua conta
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-foreground">Chrome - Windows</p>
                        <p className="text-xs text-muted-foreground">São Paulo, Brasil • Ativo agora</p>
                      </div>
                      <Badge variant="outline" className="text-chart-4">Atual</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-foreground">Safari - iPhone</p>
                        <p className="text-xs text-muted-foreground">São Paulo, Brasil • 2 horas atrás</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive">Encerrar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DollarSign(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  );
}
