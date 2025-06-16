import { delResource, getResourceByName } from "../supabase/index.js";
import { getNotFoundError } from "../utils/errors.js";
import { publicMessage } from "../utils/message.js";

export async function handleDelAction(externalId, resourceName, userId) {
  const resource = await getResourceByName(externalId, resourceName);

  if (!resource) {
    throw getNotFoundError(resourceName);
  }

  await delResource(resource.id);

  return publicMessage(
    "wastebasket",
    `\`${resourceName}\` foi removido por <@${userId}>.`
  );
}
