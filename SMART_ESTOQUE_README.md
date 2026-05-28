# Smart Estoque - Sistema de Gestão para Charcutaria Mantovani

Sistema ERP completo e interativo desenvolvido para gestão operacional da Charcutaria Mantovani.

## 📋 Visão Geral

Sistema moderno tipo SaaS/ERP para controle de:
- ✅ Estoque (matérias-primas e produtos finais)
- ✅ Produção (com cálculo automático de perdas e rendimento)
- ✅ Vendas (sistema de carrinho e checkout)
- ✅ Clientes (cadastro PF/PJ com histórico)
- ✅ Relatórios (gráficos e exportação)
- ✅ Atendimento (interface tipo WhatsApp/CRM)
- ✅ Configurações (usuários, notificações, backup, integrações)

## 🎨 Design

- **Estilo**: SaaS moderno inspirado em Notion + Stripe Dashboard + ERP industrial
- **Layout**: Sidebar fixa à esquerda + Header superior
- **UI**: Minimalista, clean, alta legibilidade, foco operacional
- **Componentes**: Design system completo com shadcn/ui

## 🗂️ Estrutura de Páginas

### 1. Dashboard (`/dashboard`)
- KPIs principais: Estoque Total, Produções, Faturamento, Perdas
- Tabela de estoque baixo com alertas
- Produções recentes
- Botão "Nova Entrada" para acesso rápido

### 2. Estoque (`/estoque`)
- Listagem completa de matérias-primas e produtos
- Status visual (Normal, Atenção, Crítico)
- Busca e filtros
- Modal "Nova Entrada" com formulário completo:
  - Produto, Fornecedor, Lote, Validade
  - Quantidade, Unidade, Valor Unitário
  - Feedback com toast de sucesso

### 3. Produção (`/producao`)
- KPIs: Produção Total, Perdas Totais, Rendimento Médio
- Tabela com histórico de produções
- Modal "Nova Produção" com:
  - Seleção de produto
  - Múltiplas matérias-primas
  - **Cálculo automático** de perdas e rendimento
  - Visualização em tempo real dos indicadores

### 4. Vendas (`/vendas`)
- KPIs: Faturamento, Total de Vendas, Itens Vendidos
- Histórico de vendas com detalhes
- Modal "Nova Venda" estilo carrinho:
  - Grid de produtos disponíveis
  - Carrinho interativo
  - Cliente opcional
  - Desconto
  - Cálculo automático de total

### 5. Clientes (`/clientes`)
- Cadastro PF/PJ completo
- Estatísticas por cliente
- Modal de detalhes com:
  - Informações cadastrais
  - Histórico de compras
  - Estatísticas (total compras, gasto total)

### 6. Relatórios (`/relatorios`)
- Filtros: Tipo de relatório, Período, Formato (PDF/Excel/CSV)
- 4 KPIs principais
- Gráficos interativos (Recharts):
  - Linha: Evolução de vendas
  - Pizza: Vendas por produto
  - Barra: Produção mensal
  - Comparativos de perdas
- Tabs organizadas por categoria

### 7. Atendimento (`/atendimento`)
- Interface tipo WhatsApp/CRM
- 3 colunas:
  - Lista de conversas (com contadores de não lidas)
  - Chat principal com mensagens
  - Informações do cliente
- Respostas rápidas
- Histórico de compras integrado

### 8. Configurações (`/configuracoes`)
6 abas organizadas:
- **Geral**: Dados da empresa, timezone, idioma
- **Usuários**: Gerenciamento de usuários e permissões
- **Notificações**: Preferências de alertas (estoque, produção, vendas)
- **Backup**: Configuração de backup automático
- **Integrações**: WhatsApp API, ERP Fiscal, Gateway de Pagamento
- **Segurança**: Alteração de senha, 2FA, sessões ativas

## 🔄 Fluxos Implementados

### Fluxo 1: Entrada de Matéria-Prima
Dashboard → Estoque → Nova Entrada → Formulário → Salvar → Toast de sucesso

### Fluxo 2: Registro de Produção
Dashboard → Produção → Nova Produção → Selecionar Produto → Adicionar MPs → 
Informar Quantidade Final → Sistema calcula perdas e rendimento → Salvar

### Fluxo 3: Registro de Venda
Dashboard → Vendas → Nova Venda → Adicionar Produtos ao Carrinho → 
Calcular Total → Finalizar Venda → Toast de sucesso

### Fluxo 4: Relatórios
Dashboard → Relatórios → Filtrar Período → Visualizar KPIs e Gráficos → Exportar

### Fluxo 5: Atendimento
Dashboard → Atendimento → Conversas → Visualizar Cliente → Histórico → Respostas rápidas

## 📊 Dados Realistas

Produtos da charcutaria:
- Linguiça Toscana / Calabresa
- Presunto Cozido
- Mortadela Bologna
- Salame Italiano
- Peito de Peru Defumado
- Queijo Mussarela

Fornecedores:
- Frigorífico São Paulo
- Frigorífico Bom Boi
- Defumados Ltda
- Triparia Central
- Laticínios Bela Vista
- Temperos Especiais

## 🛠️ Tecnologias

- **React** 18.3.1
- **React Router DOM** 7.15.0
- **Tailwind CSS** v4
- **shadcn/ui** (componentes)
- **Recharts** (gráficos)
- **Lucide React** (ícones)
- **Sonner** (toast notifications)

## 🎯 Características Principais

1. **Navegação Completa**: Sidebar com react-router-dom
2. **Formulários Interativos**: Modais com validação e feedback
3. **Cálculos Automáticos**: Perdas e rendimento em tempo real
4. **Dados Fictícios Realistas**: Simulando operação real
5. **Design System Completo**: Reutilização de componentes
6. **Responsivo**: Desktop-first mas adaptável
7. **Estados Visuais**: Hover, loading, feedback
8. **Toasts de Feedback**: Confirmações de ações

## 🚀 Como Usar

O sistema já está rodando. Use a sidebar para navegar entre as páginas.

Experimente os principais fluxos:
1. Adicionar uma entrada de estoque
2. Registrar uma produção (veja o cálculo automático)
3. Fazer uma venda usando o carrinho
4. Visualizar relatórios com gráficos
5. Simular atendimento a clientes
6. Explorar as configurações

## 📝 Requisitos Funcionais Implementados

✅ RF001 – Cadastro de matéria-prima
✅ RF002 – Registro de produção
✅ RF003 – Cálculo de rendimento
✅ RF004 – Registro de perdas
✅ RF005 – Atualização automática de estoque (simulado)
✅ RF006 – Registro de vendas
✅ RF007 – Cadastro de pedidos
✅ RF009 – Histórico de vendas
✅ RF010 – Cadastro de clientes
✅ RF012 – Relatórios de vendas
✅ RF013 – Relatórios de produção
✅ RF014 – Relatórios de perdas
✅ RF015 – Exportação de relatórios (botões implementados)
✅ RF016 – Registro de atendimento
✅ RF017 – Mensagens pendentes
✅ RF018 – Catálogo de produtos

## 🎨 Componentes Reutilizáveis

- Button, Input, Select, Label
- Card, Badge, Separator
- Dialog, Tabs, ScrollArea
- Table (customizado)
- Switch, Avatar
- Toast (Sonner)
- Charts (Recharts)

---

**Sistema desenvolvido conforme especificações do brief Smart Estoque**
