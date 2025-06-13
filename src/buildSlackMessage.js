/**
 * Monta a mensagem de resposta para o Slack baseada no contrato da ação
 * @param {Object} actionResult - Resultado da execução da ação
 * @param {string} actionResult.type - Tipo da mensagem ("in_channel" ou "ephemeral")
 * @param {string} actionResult.text - Texto da mensagem
 * @returns {Object} - Mensagem formatada para o Slack
 */
export function buildSlackMessage(actionResult) {
  try {
    if (!actionResult || typeof actionResult !== 'object') {
      throw new Error("Resultado da ação inválido.");
    }

    const { type, text } = actionResult;

    if (!type || !text) {
      throw new Error("Contrato da ação incompleto (type e text são obrigatórios).");
    }

    // Valida o tipo de resposta
    const validTypes = ['in_channel', 'ephemeral'];
    if (!validTypes.includes(type)) {
      throw new Error(`Tipo de resposta inválido: ${type}. Use: ${validTypes.join(', ')}`);
    }

    // Monta a mensagem no formato esperado pelo Slack
    const slackMessage = {
      response_type: type,
      text: text
    };

    return slackMessage;
  } catch (error) {
    // Em caso de erro, retorna uma mensagem de erro privada
    return {
      response_type: "ephemeral",
      text: `:x: Erro interno: ${error.message}`
    };
  }
}

/**
 * Função auxiliar para criar mensagens de erro padronizadas
 * @param {string} errorMessage - Mensagem de erro
 * @returns {Object} - Mensagem de erro formatada para o Slack
 */
export function buildErrorMessage(errorMessage) {
  return {
    response_type: "ephemeral",
    text: `:x: ${errorMessage}`
  };
}

/**
 * Função auxiliar para criar mensagens de ajuda
 * @returns {Object} - Mensagem de ajuda formatada para o Slack
 */
export function buildHelpMessage() {
  const helpText = `
:information_source: *Como usar o /use:*

\`/use list\` - Lista todos os recursos e status
\`/use new [recurso]\` - Cadastra um novo recurso
\`/use del [recurso]\` - Remove um recurso
\`/use on [recurso]\` - Reserva um recurso ou entra na fila
\`/use off [recurso]\` - Devolve o recurso ou sai da fila
\`/use off-force [recurso]\` - Força a liberação do recurso

*Exemplos:*
\`/use on vassoura\`
\`/use off vassoura\`
\`/use new escada\`
  `.trim();

  return {
    response_type: "ephemeral",
    text: helpText
  };
}
