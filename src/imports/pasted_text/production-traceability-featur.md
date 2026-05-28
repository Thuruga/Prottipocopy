Adicionar NOVA FEATURE na aba “Produção” do sistema Smart Estoque.

IMPORTANTE:

* manter o mesmo design system
* manter o mesmo padrão visual
* reutilizar componentes existentes
* manter consistência visual com o ERP já criado
* a nova feature deve parecer um módulo industrial real de rastreabilidade alimentícia

━━━━━━━━━━━━━━━━━━━
OBJETIVO DA FEATURE
━━━━━━━━━━━━━━━━━━━

Implementar rastreabilidade completa de validade dos lotes utilizados na produção.

O sistema deve:

* permitir utilizar múltiplos lotes de matérias-primas
* exibir validade dos lotes utilizados
* calcular visualmente o vencimento do produto final
* permitir rastreabilidade alimentar
* facilitar auditoria de produção

Inspirar visualmente:

* ERP industrial
* sistema frigorífico
* rastreabilidade alimentícia
* controle sanitário
* software MES industrial

━━━━━━━━━━━━━━━━━━━
ALTERAÇÃO NA TELA PRINCIPAL DE PRODUÇÃO
━━━━━━━━━━━━━━━━━━━

Adicionar nova coluna:

“Vencimento Produto”

Nova tabela:

| Código | Produto | Data | MP Usada | Produzido | Perda | Rendimento | Vencimento Produto | Operador |

Exemplo:

| PROD-001 | Linguiça Toscana | 13/05/2026 | 140kg | 125kg | 15kg | 89.3% | 11/08/2026 | João Silva |

━━━━━━━━━━━━━━━━━━━
COMPORTAMENTO DA FEATURE
━━━━━━━━━━━━━━━━━━━

Ao clicar em:

* “Nova Produção”
  ou
* “Visualizar Produção”

O sistema deve abrir interface COMPLETA de rastreabilidade.

━━━━━━━━━━━━━━━━━━━
NOVA TELA — DETALHAMENTO DA PRODUÇÃO
━━━━━━━━━━━━━━━━━━━

Título:
“Registro de Produção”

Subtítulo:
“Controle de Produção e Rastreabilidade”

━━━━━━━━━━━━━━━━━━━
SEÇÃO 1 — DADOS DA PRODUÇÃO
━━━━━━━━━━━━━━━━━━━

Campos:

* Produto Produzido
* Código Produção
* Data Produção
* Operador Responsável
* Quantidade Final Produzida
* Unidade
* Lote do Produto Final

Exemplo:

Produto:
Linguiça Toscana

Código:
PROD-001

Lote:
LOT-PROD-2026-001

━━━━━━━━━━━━━━━━━━━
SEÇÃO 2 — MATÉRIAS-PRIMAS UTILIZADAS
━━━━━━━━━━━━━━━━━━━

Criar tabela dinâmica moderna.

Colunas:

* Matéria-Prima
* Quantidade Utilizada
* Lote Utilizado
* Data Fabricação
* Data Validade
* Quantidade Disponível
* Status Validade

Exemplo:

| Matéria-Prima | Quantidade | Lote    | Validade   | Status  |
| ------------- | ---------- | ------- | ---------- | ------- |
| Carne Suína   | 45kg       | LOT-001 | 31/05/2026 | Atenção |
| Carne Suína   | 15kg       | LOT-002 | 05/06/2026 | Normal  |
| Carne Bovina  | 80kg       | LOT-003 | 10/06/2026 | Normal  |

━━━━━━━━━━━━━━━━━━━
SEÇÃO 3 — CONTROLE DE VALIDADE DO PRODUTO FINAL
━━━━━━━━━━━━━━━━━━━

Adicionar card inteligente.

Título:
“Definição de Vencimento do Produto”

Campos:

* Dias até vencimento
* Data de fabricação
* Data calculada de vencimento
* Menor validade entre MPs utilizadas
* Observações sanitárias

Fluxo:

Usuário informa:
“90 dias”

Sistema calcula automaticamente:
Data Produção + 90 dias

Exemplo:

Data Produção:
13/05/2026

Dias até vencimento:
90

Resultado:
11/08/2026

━━━━━━━━━━━━━━━━━━━
REGRA DE NEGÓCIO IMPORTANTE
━━━━━━━━━━━━━━━━━━━

O sistema deve exibir ALERTA VISUAL caso:

A validade do produto final ultrapasse:

* a validade de alguma matéria-prima utilizada

Exemplo:

MP vence:
05/06/2026

Produto final:
11/08/2026

Sistema deve mostrar:
⚠ “A validade do produto final excede a validade de uma matéria-prima utilizada.”

━━━━━━━━━━━━━━━━━━━
STATUS VISUAIS
━━━━━━━━━━━━━━━━━━━

Criar badges:

* Verde → Normal
* Amarelo → Próximo do vencimento
* Vermelho → Crítico/Vencido

Aplicar:

* nos lotes
* no produto final
* nos alertas sanitários

━━━━━━━━━━━━━━━━━━━
FUNCIONALIDADES INTERATIVAS
━━━━━━━━━━━━━━━━━━━

Adicionar:

* busca de lotes
* seleção de múltiplos lotes
* autocomplete
* cálculo automático
* validação visual
* toast de sucesso
* modal de confirmação
* loading state
* hover state
* paginação

━━━━━━━━━━━━━━━━━━━
DETALHAMENTO NO BOTÃO “VISUALIZAR”
━━━━━━━━━━━━━━━━━━━

Ao clicar em “Visualizar Produção”:

Abrir modal/drawer lateral contendo:

1. Dados da produção
2. Lotes utilizados
3. Datas de validade
4. Quantidades consumidas
5. Operador responsável
6. Histórico da produção
7. Cálculo de perdas
8. Cálculo de rendimento
9. Data validade produto final
10. Alertas sanitários

━━━━━━━━━━━━━━━━━━━
REGRAS SANITÁRIAS
━━━━━━━━━━━━━━━━━━━

Adicionar lógica visual:

* impedir utilização de lote vencido
* alertar lotes próximos do vencimento
* destacar matéria-prima crítica
* rastrear origem do lote

━━━━━━━━━━━━━━━━━━━
INDICADORES OPERACIONAIS
━━━━━━━━━━━━━━━━━━━

Adicionar cards KPI:

* Produção do dia
* Perdas totais
* Rendimento médio
* Produtos próximos do vencimento
* Lotes críticos
* Aproveitamento produtivo

━━━━━━━━━━━━━━━━━━━
DADOS FICTÍCIOS
━━━━━━━━━━━━━━━━━━━

Adicionar exemplos realistas:

Produtos:

* Linguiça Toscana
* Mortadela
* Presunto Cozido
* Peito de Peru

Matérias-primas:

* Carne Suína
* Carne Bovina
* Temperos
* Conservantes
* Sal de Cura

Criar:

* múltiplos lotes
* diferentes validades
* situações críticas
* alertas reais

━━━━━━━━━━━━━━━━━━━
REQUISITOS IMPORTANTES
━━━━━━━━━━━━━━━━━━━

A feature deve transmitir:

* rastreabilidade industrial
* controle sanitário
* controle de validade
* gestão frigorífica profissional

A interface deve parecer:

* software industrial real
* ERP alimentício profissional
* sistema de auditoria sanitária
* plataforma de controle produtivo
