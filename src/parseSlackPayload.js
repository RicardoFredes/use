/**
 * Parseia o payload enviado pelo Slack via slash command
 * @param {Object} data - Corpo da requisição em formato JSON
 * @returns {Object} - { text, userId, userName, timestamp }
 */
export function parseSlackPayload(data) {
  try {
    // Extrai os dados necessários
    const text = data.text || "";
    const userId = data.user_id || "";
    const userName = data.user_name || "";
    const timestamp = new Date().toISOString();

    return {
      text: text.trim(),
      userId,
      userName,
      timestamp,
      // Dados extras que podem ser úteis
      channelId: data.channel_id || "",
      channelName: data.channel_name || "",
      responseUrl: data.response_url || "",
      command: data.command || "",
    };
  } catch (error) {
    throw new Error(`Erro ao parsear payload do Slack: ${error.message}`);
  }
}
