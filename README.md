# Documento de Visão: Sistema de Agendamento de Barbearia

## Tabela de conteúdos
1. [Introdução](#introducao)
2. [Descrição do Problema](#descricao-do-problema)
3. [Descrição dos Usuários](#descricao-dos-usuarios)
4. [Alternativas Concorrentes](#alternativas-concorrentes)
5. [Escopo](#escopo)
6. [Requisitos Funcionais](#requisitos-funcionais)
7. [Requisitos Não Funcionais](#requisitos-nao-funcionais)
8. [Regras de Negócio](#regras-de-negocio)
9. [Diagrama de Casos de Uso](#diagrama-de-casos-de-uso)
10. [Requisitos Funcionais x Casos de Uso](#requisitos-funcionais-x-casos-de-uso)

## <a id="introducao"></a>Introdução

O Sistema de Agendamento de Barbearia é uma plataforma web desenvolvida para facilitar o agendamento de serviços em barbearias, proporcionando uma experiência conveniente e eficiente para os clientes e otimizando a gestão da agenda para os proprietários de barbearias.

## <a id="descricao-do-problema"></a>Descrição do Problema

O alto volume de clientes e a complexidade na gestão da agenda são desafios enfrentados pelas barbearias. Os clientes muitas vezes encontram dificuldades para agendar serviços, enquanto os proprietários enfrentam problemas para gerenciar a disponibilidade dos profissionais e garantir uma distribuição equitativa das marcações.

## <a id="descricao-dos-usuarios"></a>Descrição dos Usuários

- **Clientes**: São os usuários finais que desejam agendar serviços de barbearia.
- **Proprietários de Barbearias**: São os administradores da plataforma, responsáveis pela gestão da agenda e dos serviços oferecidos.

## <a id="alternativas-concorrentes"></a>Alternativas Concorrentes

- **Agendamento por Telefone**: Muitas barbearias ainda utilizam o agendamento por telefone, o que pode ser demorado e propenso a erros.
- **Agendamento Presencial**: Alguns estabelecimentos permitem o agendamento presencial, porém, isso pode resultar em filas e espera excessiva.

## <a id="escopo"></a>Escopo

O sistema permitirá que os clientes agendem serviços de barbearia de forma online, escolhendo horários disponíveis e profissionais específicos. Os proprietários de barbearias poderão gerenciar a agenda, visualizar os agendamentos e realizar o acompanhamento das atividades do estabelecimento.

## <a id="requisitos-funcionais"></a>Requisitos Funcionais

- **RF01**: Cadastro de Clientes
- **RF02**: Cadastro de Proprietários de Barbearias
- **RF03**: Agendamento de Serviços pelos Clientes
- **RF04**: Gestão da Agenda pelos Proprietários de Barbearias
- **RF05**: Notificações de Agendamento para Clientes e Proprietários
- **RF06**: Cancelamento de Agendamento por Clientes e Proprietários
- **RF07**: Agendamento Dinâmico Alinhado com a Agenda de Disponibilidade do Serviço
- **RF08**: Pagamento Automático Via Cartão Online
- **RF09**: Renovação de Assinatura Automática
- **RF10**: Alinhamento Automatizado da Ferramenta com o WhatsApp
- **RF11**: Personalização do App de Acordo com o Branding da Empresa
- **RF12**: Ferramentas de Upselling e Cross-selling Atreladas
- **RF13**: Recuperação de Venda Automática
- **RF14**: Automação de Público de Recorrência
- **RF15**: Funil de Vendas
- **RF16**: Redirecionamento de Públicos de Várias Redes para o Aplicativo Automaticamente
- **RF17**: CRM de Controle de Vendas e Análise de Dados
- **RF18**: Disparo de Mensagens em Massa para Atender Novas Promoções
- **RF19**: ChatBot de Resposta Rápida com API de Inteligência Artificial
- **RF20**: Gateway de Pagamento de Taxa Baixa com Pagamento Instantâneo
- **RF21**: Captura de Dados do Cliente
- **RF22**: Estudo com Inteligência Artificial e Análise de Dados para Entender os Hábitos do Cliente
- **RF23**: Integração de Atendimento Automatizado com Sistema de Agendamento do App

## <a id="requisitos-nao-funcionais"></a>Requisitos Não Funcionais

- **RNF01**: Interface Intuitiva e Amigável
- **RNF02**: Segurança dos Dados dos Clientes e Proprietários
- **RNF03**: Desempenho e Escalabilidade da Plataforma
- **RNF04**: Disponibilidade do Sistema 24/7
- **RNF05**: Suporte a Diferentes Dispositivos e Navegadores

## <a id="regras-de-negocio"></a>Regras de Negócio

- **RN01**: Os clientes só podem agendar serviços disponíveis nos horários definidos pelos proprietários de barbearias.
- **RN02**: Os proprietários de barbearias devem receber notificações instantâneas sobre novos agendamentos e cancelamentos.
- **RN03**: Os clientes devem receber lembretes automáticos sobre seus agendamentos próximos.

## <a id="diagrama-de-casos-de-uso"></a>Diagrama de Casos de Uso

Inserir o diagrama de casos de uso aqui.

## <a id="requisitos-funcionais-x-casos-de-uso"></a>Requisitos Funcionais x Casos de Uso

| Casos de Uso       | RF01 | RF02 | RF03 | RF04 | RF05 | RF06 | RF07 | RF08 | RF09 | RF10 | RF11 | RF12 | RF13 | RF14 | RF15 | RF16 | RF17 | RF18 | RF19 | RF20 | RF21 | RF22 | RF23 |
|--------------------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|------|
| Cadastro de Clientes |  x   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| Cadastro de Proprietários de Barbearias |      |  x   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| Agendamento de Serviços pelos Clientes |      |      |  x   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| Gestão da Agenda pelos Proprietários de Barbearias |      |      |      |  x   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| Notificações de Agendamento para Clientes e Proprietários |      |      |      |      |  x   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| Cancelamento de Agendamento por Clientes e Proprietários |      |      |      |      |      |  x   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| Agendamento Dinâmico Alinhado com a Agenda de Disponibilidade do Serviço |      |      |      |      |      |      |  x   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| Pagamento Automático Via Cartão Online |      |      |      |      |      |      |      |  x   |      |      |      |      |      |      |      |      |      |      |      |      |      |      |
| Renovação de Assinatura Automática |      |      |      |      |      |      |      |      |  x   |      |      |      |      |      |      |      |      |      |      |      |      |      |
| Alinhamento Automatizado da Ferramenta com o WhatsApp |      |      |      |      |      |      |      |      |      |  x   |      |      |      |      |      |      |      |      |      |      |      |      |
| Personalização do App de Acordo com o Branding da Empresa |      |      |      |      |      |      |      |      |      |      |  x   |      |      |      |      |      |      |      |      |      |      |      |
| Ferramentas de Upselling e Cross-selling Atreladas |      |      |      |      |      |      |      |      |      |      |      |  x   |      |      |      |      |      |      |      |      |      |      |
| Recuperação de Venda Automática |      |      |      |      |      |      |      |      |      |      |      |      |  x   |      |      |      |      |      |      |      |      |      |
| Automação de Público de Recorrência |      |      |      |      |      |      |      |      |      |      |      |      |  x   |      |      |      |      |      |      |      |      |      |
| Funil de Vendas |      |      |      |      |      |      |      |      |      |      |      |      |  x   |      |      |      |      |      |      |      |      |      |
| Redirecionamento de Públicos de Várias Redes para o Aplicativo Automaticamente |      |      |      |      |      |      |      |      |      |      |      |      |      |  x   |      |      |      |      |      |      |      |      |
| CRM de Controle de Vendas e Análise de Dados |      |      |      |      |      |      |      |      |      |      |      |      |      |      |  x   |      |      |      |      |      |      |      |
| Disparo de Mensagens em Massa para Atender Novas Promoções |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |  x   |      |      |      |      |      |      |
| ChatBot de Resposta Rápida com API de Inteligência Artificial |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |  x   |      |      |      |      |      |
| Gateway de Pagamento de Taxa Baixa com Pagamento Instantâneo |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |  x   |      |      |      |      |
| Captura de Dados do Cliente |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |  x   |      |      |      |
| Estudo com Inteligência Artificial e Análise de Dados para Entender os Hábitos do Cliente |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |  x   |      |      |
| Integração de Atendimento Automatizado com Sistema de Agendamento do App |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |      |  x   |

