/**
 * Parseia o payload enviado pelo Slack via slash command
 * @param {string} body - Corpo da requisição em formato x-www-form-urlencoded
 * @returns {Object} - { text, userId, userName, timestamp }
 */
export function parseSlackPayload(body) {
  try {
    // Parse do corpo URL-encoded
    const params = new URLSearchParams(body);

    // Extrai os dados necessários
    const text = params.get("text") || "";
    const userId = params.get("user_id") || "";
    const userName = params.get("user_name") || "";
    const timestamp = new Date().toISOString();

    return {
      text: text.trim(),
      userId,
      userName,
      timestamp,
      // Dados extras que podem ser úteis
      channelId: params.get("channel_id") || "",
      channelName: params.get("channel_name") || "",
      responseUrl: params.get("response_url") || "",
      command: params.get("command") || "",
    };
  } catch (error) {
    throw new Error(`Erro ao parsear payload do Slack: ${error.message}`);
  }
}
