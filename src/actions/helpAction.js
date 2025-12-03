import { privateMessage } from "../utils/message.js";

export function handleHelpAction(commandName = "d") {
  const helpText = `
*Como usar o /${commandName}:*

\`/${commandName} ls\` - Lista todos os recursos e status
\`/${commandName} add [recurso]\` - Cadastra um novo recurso
\`/${commandName} del [recurso]\` - Remove um recurso
\`/${commandName} on [recurso]\` - Reserva um recurso ou entra na fila
\`/${commandName} off [recurso]\` - Devolve o recurso ou sai da fila
\`/${commandName} q [recurso]\` - Mostra a fila do recurso
\`/${commandName} force-off [recurso]\` - Força a liberação do recurso

*Exemplos:*
\`/${commandName} add stagging\`
\`/${commandName} on stagging\`
\`/${commandName} off stagging\`
  `.trim();

  return privateMessage("information_source", helpText);
}
