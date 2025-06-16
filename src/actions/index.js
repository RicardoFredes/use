import { handleAddAction } from "./addAction.js";
import { handleDelAction } from "./delAction.js";
import { handleForceOffAction } from "./forceOffAction.js";
import { handleHelpAction } from "./helpAction.js";
import { handleListAction } from "./listAction.js";
import { handleOffAction } from "./offAction.js";
import { handleOnAction } from "./onAction.js";
import { handleQueueAction } from "./queueAction.js";

/**
 * Executa a ação solicitada no recurso
 * @param {string} externalId - ID externo de referência
 * @param {string} resource - Nome do recurso
 * @param {string} action - Ação a ser executada (on, off, add, del, list)
 * @param {string} userId - ID do usuário que executou a ação
 * @param {string} userName - Nome do usuário que executou a ação
 * @returns {Object} - Contrato para montar a mensagem
 */
export async function executeAction(
  externalId,
  resource,
  action,
  userId,
  userName
) {
  try {
    switch (action) {
      case "help":
        return handleHelpAction();
      case "on":
        return handleOnAction(externalId, resource, userId, userName);
      case "off":
        return handleOffAction(externalId, resource, userId, userName);
      case "force-off":
        return handleForceOffAction(externalId, resource, userId, userName);
      case "add":
        return handleAddAction(externalId, resource);
      case "del":
        return handleDelAction(externalId, resource);
      case "queue":
      case "q":
        return handleQueueAction(externalId, resource);
      case "list":
      case "ls":
        return handleListAction(externalId);
      default:
        throw new Error(`Essa ação "${action}" é inválida.`);
    }
  } catch (error) {
    // Propaga o erro para ser tratado na função principal
    throw error;
  }
}
