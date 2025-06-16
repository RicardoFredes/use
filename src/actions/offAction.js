import { getResourceByName, updateResourceData } from "../supabase/index.js";

export async function handleOffAction(
  externalId,
  resourceName,
  userId,
  userName
) {
  const resource = await getResourceByName(externalId, resourceName);

  if (!resource) {
    throw new Error(`\`${resourceName}\` não foi encontrado.`);
  }

  if (resource.user !== userId) {
    return {
      type: "ephemeral",
      text: `:warning: \`${resourceName}\` não está em uso por você.`,
    };
  }

  // Libera o recurso
  if (!resource.queue.length) {
    await updateResourceData(resource.id, null);
    return {
      type: "in_channel",
      text: `:white_check_mark: \`${resourceName}\` está liberado.`,
    };
  }

  // Atribui o recurso ao próximo da fila
  const nextUser = resource.queue.shift();

  await updateResourceData(resource.id, nextUser, resource.queue);

  return {
    type: "in_channel",
    text: `:white_check_mark: \`${resourceName}\` foi liberado e agora está com <@${nextUser}>.`,
  };
}
