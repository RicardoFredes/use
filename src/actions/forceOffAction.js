import { getResourceByName, updateResourceData } from "../supabase/index.js";
import { getNotFoundError } from "../utils/errors.js";
import { privateMessage, publicMessage } from "../utils/message.js";

export async function handleForceOffAction(externalId, resourceName, userId) {
  const resource = await getResourceByName(externalId, resourceName);

  if (!resource) {
    throw getNotFoundError(resourceName);
  }

  if (!resource.user) {
    await updateResourceData(resource.id, null);
    return privateMessage(
      "eyeglasses",
      `\`${resourceName}\` já está liberado. Não há ninguém usando.`
    );
  }

  if (!resource.queue.length) {
    return publicMessage(
      "exclamation",
      `\`${resourceName}\` foi liberado à força por <@${userId}>.`
    );
  }

  // Atribui o recurso ao próximo da fila
  const nextUser = resource.queue.shift();

  await updateResourceData(resource.id, nextUser, resource.queue);

  return publicMessage(
    "lock",
    `\`${resourceName}\` foi liberado à força por <@${userId}> e agora está com <@${nextUser}>.`
  );
}
