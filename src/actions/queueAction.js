import { getNotFoundError } from "../utils/errors.js";
import { getResourceByName } from "../supabase/index.js";
import { privateMessage } from "../utils/message.js";

export async function handleQueueAction(externalId, resourceName) {
  const resource = await getResourceByName(externalId, resourceName);

  if (!resource) {
    throw getNotFoundError(resourceName);
  }

  if (!resource.user && !resource.queue.length) {
    return privateMessage("", `\`${resourceName}\` está disponível.`);
  }

  const allUsers = [resource.user, ...resource.queue];
  const userList = allUsers.map((userId) => `<@${userId}>`).join(", ");
  const queueMessage = allUsers.length > 1 ? `\nFila: ${userList}` : "";
  const message = `\`${resourceName}\` está em uso por <@${resource.user}>.${queueMessage}`;
  return privateMessage("hourglass", message);
}
