import { getAllResources } from "../supabase/index.js";
import { privateMessage } from "../utils/message.js";

export async function handleListAction(externalId) {
  const resources = await getAllResources(externalId);

  if (!Object.keys(resources).length) {
    return privateMessage(
      "",
      "Nenhum recurso cadastrado.\n Execute `/d add [recurso]` para adicionar um recurso."
    );
  }

  let message = "Recursos cadastrados:\n";

  for (const resource in resources) {
    const { user, queue } = resources[resource];

    if (!user) {
      message += `- \`${resource}\` (disponível)\n`;
    } else {
      message += `- \`${resource}\` em uso por <@${user}>`;

      if (queue && queue.length > 0) {
        const queueList = queue.map(userId => `<@${userId}>`).join(", ");
        message += `\n  Fila: ${queueList}`;
      }

      message += "\n";
    }
  }

  return privateMessage("", message);
}
