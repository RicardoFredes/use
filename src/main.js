import { parseSlackPayload } from "./parseSlackPayload.js";
import { parseCommandText } from "./parseCommandText.js";
import { executeAction } from "./executeAction.js";
import {
  buildSlackMessage,
  buildErrorMessage,
  buildHelpMessage,
} from "./buildSlackMessage.js";

/**
 * Função principal que orquestra todo o fluxo do aplicativo
 * @param {Object} requestBody - Corpo da requisição HTTP do Slack
 * @returns {Object} - Resposta formatada para o Slack
 */
export async function main(requestBody) {
  try {
    // 1. Parsear o payload do Slack
    const slackData = parseSlackPayload(requestBody);
    return slackData;

    // Verificar se é uma solicitação de ajuda
    if (!slackData.text || slackData.text.toLowerCase() === "help") {
      return buildHelpMessage();
    }

    // 2. Parsear o texto do comando
    const { action, resource } = parseCommandText(slackData.text);

    // 3. Executar a ação
    const actionResult = await executeAction(
      resource,
      action,
      slackData.userId,
      slackData.userName
    );

    // 4. Montar a mensagem de resposta
    const slackMessage = buildSlackMessage(actionResult);

    return slackMessage;
  } catch (error) {
    // Log do erro para debugging (em produção, usar um logger apropriado)
    console.error("Erro na função main:", error.message);

    // Retorna mensagem de erro para o usuário
    return buildErrorMessage(error.message);
  }
}
