import { delResource, getResourceByName } from "../supabase/index.js";

export async function handleDelAction(externalId, resourceName) {
  const resource = await getResourceByName(externalId, resourceName);
  if (!resource) {
    return {
      type: "ephemeral",
      text: `:warning: \`${resourceName}\` não foi encontrado.`,
    };
  }

  await delResource(resource.id);

  return {
    type: "in_channel",
    text: `:white_check_mark: \`${resourceName}\` foi removido.`,
  };
}
