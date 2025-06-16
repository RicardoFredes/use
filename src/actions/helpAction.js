import { privateMessage } from "../utils/message.js";

export function handleHelpAction() {
  const helpText = `
*Como usar o /use:*

\`/use ls\` - Lista todos os recursos e status
\`/use add [recurso]\` - Cadastra um novo recurso
\`/use del [recurso]\` - Remove um recurso
\`/use on [recurso]\` - Reserva um recurso ou entra na fila
\`/use off [recurso]\` - Devolve o recurso ou sai da fila
\`/use q [recurso]\` - Mostra a fila do recurso
\`/use force-off [recurso]\` - Força a liberação do recurso

*Exemplos:*
\`/use add stagging\`
\`/use on stagging\`
\`/use off stagging\`
  `.trim();

  return privateMessage("information_source", helpText);
}
