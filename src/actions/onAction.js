import { getResourceByName, updateResourceData } from "../supabase/index.js";
import { getNotFoundError } from "../utils/errors.js";
import { privateMessage, publicMessage } from "../utils/message.js";

export async function handleOnAction(externalId, resourceName, userId) {
  const resource = await getResourceByName(externalId, resourceName);

  if (!resource) {
    throw getNotFoundError(resourceName);
  }

  // Recurso está disponível
  if (!resource.user) {
    await updateResourceData(resource.id, userId);
    return publicMessage(
      "lock",
      `\`${resourceName}\` está em use por <@${userId}>.`
    );
  }

  if (resource.user === userId) {
    return privateMessage(
      "eyeglasses",
      `\`${resourceName}\` já está em uso por você.`
    );
  }

  // Adiciona à fila de espera
  await updateResourceData(resource.id, resource.user, [
    ...resource.queue,
    userId,
  ]);

  return privateMessage(
    "hourglass",
    `\`${resourceName}\` está em uso por <@${resource.user}>. Você entrou na fila de espera.`
  );
}
