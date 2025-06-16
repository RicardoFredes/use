import { getAllResources } from "../supabase/index.js";
import { privateMessage } from "../utils/message.js";

export async function handleListAction(externalId) {
  const resources = await getAllResources(externalId);

  if (!Object.keys(resources).length) {
    return privateMessage(
      "",
      "Nenhum recurso cadastrado.\n Execute `/use add [recurso]` para adicionar um recurso."
    );
  }

  let message = "Recursos cadastrados:\n";

  for (const resource in resources) {
    const status = resources[resource].user
      ? `em uso por <@${resources[resource].user}>`
      : "disponível";
    message += `- \`${resource}\` (${status})\n`;
  }

  return privateMessage("", message);
}
