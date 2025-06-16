import { getResourceByName, updateResourceData } from "../supabase/index.js";
import { getNotFoundError } from "../utils/errors.js";
import { privateMessage, publicMessage } from "../utils/message.js";

export async function handleOffAction(externalId, resourceName, userId) {
  const resource = await getResourceByName(externalId, resourceName);

  if (!resource) {
    throw getNotFoundError(resourceName);
  }

  if (resource.user !== userId) {
    return privateMessage(
      "warning",
      `\`${resourceName}\` não está em uso por você.`
    );
  }

  // Libera o recurso
  if (!resource.queue.length) {
    await updateResourceData(resource.id, null);

    return publicMessage(
      "sparkles",
      `\`${resourceName}\` foi liberado por <@${userId}>.`
    );
  }

  // Atribui o recurso ao próximo da fila
  const nextUser = resource.queue.shift();

  await updateResourceData(resource.id, nextUser, resource.queue);

  return publicMessage(
    "lock",
    `\`${resourceName}\` foi liberado por <@${userId}> e agora está com <@${nextUser}>.`
  );
}
