# Aplicativo de Gerenciamento de Recursos no Slack

Este aplicativo permite que membros de um canal Slack gerenciem a reserva e uso de recursos compartilhados através de comandos slash.

## Visão Geral

O app utiliza comandos slash do Slack para registrar reservas, devoluções, filas de espera e gerenciamento de recursos, tornando o processo transparente e colaborativo.

## Comandos Disponíveis

### Sintaxe
/dribs [acao] [nome_do_recurso]


| Ação        | Exemplo                     | Descrição                                              | Tipo de Mensagem |
|-------------|----------------------------|--------------------------------------------------------|------------------|
| list        | `/dribs list`              | Lista todos os recursos e seu status                   | Privada          |
| new         | `/dribs new vassoura`      | Cadastra um novo recurso                               | Pública          |
| del         | `/dribs del vassoura`      | Remove um recurso                                      | Pública          |
| on          | `/dribs on vassoura`       | Reserva um recurso ou entra na fila de espera          | Pública/Privada  |
| off         | `/dribs off vassoura`      | Devolve o recurso ou sai da fila                       | Pública          |
| off-force   | `/dribs off-force vassoura`| Força a liberação do recurso                           | Pública          |

## Fluxos de Uso

### 1. Reserva Normal
**Comando:** `/dribs on vassoura`
- **Resposta pública:** `A vassoura está agora com @usuario.`

### 2. Devolução
**Comando:** `/dribs off vassoura`
- **Resposta pública:** `A vassoura está liberada.`

### 3. Recurso em Uso (Fila de Espera)
**Comando:** `/dribs on vassoura` (já em uso)
- **Resposta privada:** `*vassoura* já está em uso por @usuario_A.`
- **Resposta privada:** `Você entrou na fila de espera: @usuario_B`

### 4. Consultar Recursos
**Comando:** `/dribs list`
- **Resposta privada:**
Recursos cadastrados:

vassoura (em uso por @usuario_A)
balde (disponível)

### 5. Cadastrar Recurso
**Comando:** `/dribs new escada`
- **Resposta pública:** `Recurso "escada" cadastrado com sucesso.`

### 6. Remover Recurso
**Comando:** `/dribs del escada`
- **Resposta pública:** `Recurso "escada" removido.`

### 7. Liberação Forçada
**Comando:** `/dribs off-force vassoura`
- **Resposta pública:** `*vassoura* foi liberada à força.`
- Se houver fila: `*vassoura* está agora com @proximo_da_fila.`

## Regras de Negócio

- Um usuário só pode reservar um recurso disponível
- Se o recurso estiver em uso, o usuário entra na fila de espera
- Ao devolver, o próximo da fila recebe o recurso automaticamente
- O usuário pode sair da fila usando `/dribs off [recurso]`
- Recursos podem ser cadastrados e removidos dinamicamente
- Todas as ações são registradas publicamente, exceto consultas e notificações de fila (privadas)

## Exemplos de Mensagens

- **Reserva:** `*vassoura* está agora com @joao.`
- **Em uso:** `*vassoura* já está em uso por @maria.`
- **Fila:** `Você entrou na fila de espera: @joao, @ana, @você.`
- **Devolução:** `*vassoura* está liberada.`
- **Força:** `*vassoura* foi liberada à força e está agora com @ana.`


