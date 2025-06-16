import { addResource, getResourceByName } from "../supabase/index.js";

export async function handleAddAction(externalId, resourceName) {
  const resource = await getResourceByName(externalId, resourceName);

  if (resource) {
    return {
      type: "ephemeral",
      text: `:warning: \`${resourceName}\` já existe.`,
    };
  }

  const success = await addResource(externalId, resourceName);

  if (!success) {
    return {
      type: "ephemeral",
      text: `:warning: Não foi possível adicionar devido à um erro interno`,
    };
  }

  return {
    type: "in_channel",
    text: `:white_check_mark: \`${resourceName}\` cadastrado com sucesso.`,
  };
}
