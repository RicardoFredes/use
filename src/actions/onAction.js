import { getResourceByName, updateResourceData } from "../supabase/index.js";

export async function handleOnAction(
  externalId,
  resourceName,
  userId,
  userName
) {
  const resource = await getResourceByName(externalId, resourceName);

  if (!resource) {
    throw new Error(`\`${resourceName}\` não foi encontrado.`);
  }

  // Recurso está disponível
  if (!resource.user) {
    await updateResourceData(resource.id, userId);

    return {
      type: "in_channel",
      text: `:white_check_mark: \`${resourceName}\` está agora com <@${userId}>.`,
    };
  }

  // Recurso já está em uso por você
  if (resource.user === userId) {
    return {
      type: "ephemeral",
      text: `:warning: \`${resourceName}\` já está em uso por você.`,
    };
  }

  // Adiciona à fila de espera
  await updateResourceData(resource.id, resource.user, [
    ...resource.queue,
    userId,
  ]);

  return {
    type: "ephemeral",
    text: `:hourglass: \`${resourceName}\` já está em uso por <@${resource.user}>. Você entrou na fila de espera.`,
  };
}
