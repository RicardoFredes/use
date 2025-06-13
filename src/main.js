// main.js
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
 * @param {string} requestBody - Corpo da requisição HTTP do Slack
 * @returns {Object} - Resposta formatada para o Slack
 */
export async function main(requestBody) {
  try {
    // 1. Parsear o payload do Slack
    const slackData = parseSlackPayload(requestBody);

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

/**
 * Função para ser usada como handler da Vercel
 * @param {Request} request - Objeto Request da Vercel
 * @returns {Response} - Resposta HTTP
 */
export async function handler(request) {
  try {
    // Verifica se é um POST
    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // Lê o corpo da requisição
    const requestBody = await request.text();

    // Processa a requisição
    const slackResponse = await main(requestBody);

    // Retorna a resposta para o Slack
    return new Response(JSON.stringify(slackResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro no handler:", error.message);

    // Retorna erro 500 em caso de falha crítica
    const errorResponse = buildErrorMessage("Erro interno do servidor.");
    return new Response(JSON.stringify(errorResponse), {
      status: 200, // Slack espera 200 mesmo em caso de erro de aplicação
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// Para compatibilidade com diferentes ambientes
export default handler;
