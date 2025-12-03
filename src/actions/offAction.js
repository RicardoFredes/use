import { getResourceByName, updateResourceData } from "../supabase/index.js";
import { getNotFoundError } from "../utils/errors.js";
import { privateMessage, publicMessage } from "../utils/message.js";

export async function handleOffAction(externalId, resourceName, userId) {
  const resource = await getResourceByName(externalId, resourceName);

  if (!resource) {
    throw getNotFoundError(resourceName);
  }

  if (resource.user !== userId) {
    // Verifica se o usuário está na fila
    const userIndexInQueue = resource.queue.indexOf(userId);

    if (userIndexInQueue !== -1) {
      // Remove o usuário da fila
      const updatedQueue = resource.queue.filter(id => id !== userId);
      await updateResourceData(resource.id, resource.user, updatedQueue);

      return privateMessage(
        "wave",
        `Você saiu da fila do recurso \`${resourceName}\`.`
      );
    }

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
    `\`${resourceName}\` agora está com <@${nextUser}>.`
  );
}
