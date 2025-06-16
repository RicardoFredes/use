import { addResource, getResourceByName } from "../supabase/index.js";
import { privateMessage, publicMessage } from "../utils/message.js";

export async function handleAddAction(externalId, resourceName) {
  const resource = await getResourceByName(externalId, resourceName);

  if (resource) {
    return privateMessage(
      "warning",
      `\`${resourceName}\` já existe.\n Execute \`/use on ${resourceName}\` para utilizá-lo.`
    );
  }

  const success = await addResource(externalId, resourceName);

  if (!success) {
    return privateMessage(
      "warning",
      `:warning: Não foi possível adicionar \`${resourceName}\`. Tente novamente mais tarde.`
    );
  }

  return publicMessage(
    "white_check_mark",
    `\`${resourceName}\` cadastrado com sucesso. Execute \`/use on ${resourceName}\` para utilizá-lo.`
  );
}
