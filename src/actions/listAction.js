import { getAllResources } from "../supabase/index.js";

export async function handleListAction(externalId) {
  const resources = await getAllResources(externalId);

  if (!Object.keys(resources).length) {
    return {
      type: "ephemeral",
      text: "Nada cadastrado ainda",
    };
  }

  let message = "Recursos cadastrados:\n";
  for (const resource in resources) {
    const status = resources[resource].user
      ? `em uso por <@${resources[resource].user}>`
      : "disponível";
    message += `- \`${resource}\` (${status})\n`;
  }

  return {
    type: "ephemeral",
    text: message,
  };
}
