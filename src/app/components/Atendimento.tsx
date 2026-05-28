import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, User, Clock, CheckCheck, Package } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';

const conversations = [
  {
    id: 1,
    name: 'Maria Silva',
    lastMessage: 'Obrigada! Vou passar aí amanhã então',
    time: '14:32',
    unread: 0,
    status: 'online',
    avatar: 'MS'
  },
  {
    id: 2,
    name: 'Restaurante Bella Italia',
    lastMessage: 'Preciso de 50kg de linguiça toscana',
    time: '13:15',
    unread: 2,
    status: 'offline',
    avatar: 'BI'
  },
  {
    id: 3,
    name: 'João Santos',
    lastMessage: 'Qual o valor do presunto cozido?',
    time: '11:48',
    unread: 1,
    status: 'offline',
    avatar: 'JS'
  },
  {
    id: 4,
    name: 'Churrascaria Gaúcha',
    lastMessage: 'Pedido confirmado!',
    time: '10:20',
    unread: 0,
    status: 'offline',
    avatar: 'CG'
  },
  {
    id: 5,
    name: 'Supermercado Central',
    lastMessage: 'Quando sai a entrega?',
    time: 'Ontem',
    unread: 3,
    status: 'offline',
    avatar: 'SC'
  },
];

const messages = [
  { id: 1, sender: 'customer', text: 'Bom dia! Gostaria de fazer um pedido', time: '14:25', read: true },
  { id: 2, sender: 'me', text: 'Bom dia! Claro, pode me passar o que precisa?', time: '14:26', read: true },
  { id: 3, sender: 'customer', text: 'Preciso de 5kg de linguiça toscana e 3kg de presunto', time: '14:28', read: true },
  { id: 4, sender: 'me', text: 'Perfeito! Temos tudo disponível. O total fica R$ 286,00', time: '14:29', read: true },
  { id: 5, sender: 'me', text: 'Quando você gostaria de retirar?', time: '14:29', read: true },
  { id: 6, sender: 'customer', text: 'Posso buscar amanhã de manhã?', time: '14:30', read: true },
  { id: 7, sender: 'me', text: 'Pode sim! Vou deixar separado. Até amanhã! 😊', time: '14:31', read: true },
  { id: 8, sender: 'customer', text: 'Obrigada! Vou passar aí amanhã então', time: '14:32', read: true },
];

const quickReplies = [
  'Bom dia! Como posso ajudar?',
  'Temos disponível em estoque',
  'O valor total é R$',
  'Pedido confirmado!',
  'Quando gostaria de retirar?'
];

export function Atendimento() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    alert(`Mensagem enviada: ${messageText}`);
    setMessageText('');
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-2xl">Atendimento</h2>
          <p className="text-sm text-muted-foreground mt-1">Central de mensagens e atendimento ao cliente</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="gap-1">
            <span>{totalUnread}</span>
            <span>pendentes</span>
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <Card className="col-span-4 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conversas</CardTitle>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar conversas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConversation.id === conv.id
                      ? 'bg-accent'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conv.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conv.status === 'online' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-chart-4 border-2 border-background rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {conv.name}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {conv.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">
                          {conv.lastMessage}
                        </p>
                        {conv.unread > 0 && (
                          <Badge variant="default" className="ml-2 h-5 min-w-5 rounded-full text-xs">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="col-span-5 flex flex-col">
          {/* Chat Header */}
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedConversation.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{selectedConversation.name}</CardTitle>
                  <CardDescription className="text-xs flex items-center gap-1">
                    {selectedConversation.status === 'online' ? (
                      <>
                        <div className="w-2 h-2 bg-chart-4 rounded-full" />
                        <span>Online</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        <span>Visto por último às {selectedConversation.time}</span>
                      </>
                    )}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <Separator />

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      message.sender === 'me'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs opacity-70">{message.time}</span>
                      {message.sender === 'me' && (
                        <CheckCheck className="w-3 h-3 opacity-70" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Separator />

          {/* Quick Replies */}
          <div className="p-3 border-b">
            <div className="flex gap-2 overflow-x-auto">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap text-xs"
                  onClick={() => setMessageText(reply)}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Digite sua mensagem..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Customer Info */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-base">Informações do Cliente</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-4 space-y-4">
            <div className="flex flex-col items-center gap-3 py-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {selectedConversation.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-medium text-foreground">{selectedConversation.name}</p>
                <p className="text-sm text-muted-foreground">Cliente desde Jan/2025</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground">Telefone</Label>
                <p className="text-sm text-foreground mt-1">(11) 98765-4321</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">E-mail</Label>
                <p className="text-sm text-foreground mt-1">maria.silva@email.com</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">CPF</Label>
                <p className="text-sm text-foreground mt-1">345.678.901-23</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm">Estatísticas</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Total Compras</p>
                  <p className="text-2xl font-semibold text-foreground mt-1">8</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Gasto Total</p>
                  <p className="text-2xl font-semibold text-foreground mt-1">R$ 1,8K</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-sm">Última Compra</Label>
              <Card className="bg-muted/30">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">12/05/2026</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Concluída</Badge>
                  </div>
                  <p className="text-sm text-foreground font-medium">3 itens</p>
                  <p className="text-xs text-muted-foreground mt-1">R$ 285,50</p>
                </CardContent>
              </Card>
            </div>

            <Button variant="outline" className="w-full">
              <User className="w-4 h-4 mr-2" />
              Ver Perfil Completo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
