/**
 * Recebe o texto do comando e retorna a ação e o recurso
 * @param {string} commandText - Texto do comando (ex: "on vassoura")
 * @returns {Object} - { action, resource }
 */
export function parseCommandText(commandText) {
  try {
    const [action, ...resourceParts] = commandText.trim().split(/\s+/);
    const resource = resourceParts.join(" ").trim();

    if (!action) {
      throw new Error("Ação não especificada.");
    }

    if (!resource) {
      // A ação "list" não precisa de recurso
      const skippedActions = ["list", "ls", "help"];
      if (!skippedActions.includes(action.toLowerCase())) {
        throw new Error("Recurso não especificado.");
      }
    }

    return {
      action: action.toLowerCase(), // Padroniza para minúsculo
      resource,
    };
  } catch (error) {
    // Propaga o erro para ser tratado na função principal
    throw error;
  }
}
