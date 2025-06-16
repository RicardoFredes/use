import { getResourceByName } from "../supabase/index.js";

export async function handleForceOffAction(
  externalId,
  resourceName,
  userId,
  userName
) {
  const resource = await getResourceByName(externalId, resourceName);

  if (!resource) {
    throw new Error(`\`${resourceName}\` não foi encontrado.`);
  }

  if (!resource.user) {
    await updateResourceData(resource.id, null);
    return {
      type: "ephemeral",
      text: `:white_check_mark: \`${resourceName}\` já está liberado.`,
    };
  }

  if (!resource.queue.length) {
    return {
      type: "in_channel",
      text: `:exclamation: \`${resourceName}\` foi liberado com force por <@${userId}>.`,
    };
  }

  // Atribui o recurso ao próximo da fila
  const nextUser = resource.queue.shift();

  await updateResourceData(resource.id, nextUser, resource.queue);

  return {
    type: "in_channel",
    text: `:white_check_mark: \`${resourceName}\` foi liberado com force por <@${userId}> e agora está com <@${nextUser}>.`,
  };
}
