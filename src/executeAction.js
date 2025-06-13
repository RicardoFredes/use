// Simulação da base de dados em memória
const resources = {
  vassoura: { user: "U123", queue: [] },
  balde: { user: null, queue: [] },
};

/**
 * Executa a ação solicitada no recurso
 * @param {string} resource - Nome do recurso
 * @param {string} action - Ação a ser executada (on, off, new, del, list)
 * @param {string} userId - ID do usuário que executou a ação
 * @param {string} userName - Nome do usuário que executou a ação
 * @returns {Object} - Contrato para montar a mensagem
 */
export async function executeAction(resource, action, userId, userName) {
  try {
    switch (action) {
      case "on":
        return handleOnAction(resource, userId, userName);
      case "off":
        return handleOffAction(resource, userId, userName);
      case "off-force":
        return handleOffForceAction(resource, userId, userName);
      case "new":
        return handleNewAction(resource);
      case "del":
        return handleDelAction(resource);
      case "list":
        return handleListAction();
      default:
        throw new Error(`Ação "${action}" inválida.`);
    }
  } catch (error) {
    // Propaga o erro para ser tratado na função principal
    throw error;
  }
}

// Funções auxiliares para cada ação
function handleOnAction(resource, userId, userName) {
  if (!resources[resource]) {
    throw new Error(`Recurso "${resource}" não encontrado.`);
  }

  if (resources[resource].user) {
    // Recurso já está em uso
    if (resources[resource].user === userId) {
      return {
        type: "ephemeral",
        text: `:warning: Você já está com o recurso *${resource}*.`,
      };
    }

    // Adiciona à fila de espera
    resources[resource].queue.push(userId);
    return {
      type: "ephemeral",
      text: `:hourglass: *${resource}* já está em uso por <@${resources[resource].user}>. Você entrou na fila de espera.`,
    };
  } else {
    // Recurso está disponível
    resources[resource].user = userId;
    return {
      type: "in_channel",
      text: `:white_check_mark: *${resource}* está agora com <@${userId}>.`,
    };
  }
}

function handleOffAction(resource, userId, userName) {
  if (!resources[resource]) {
    throw new Error(`Recurso "${resource}" não encontrado.`);
  }

  if (resources[resource].user !== userId) {
    return {
      type: "ephemeral",
      text: `:warning: Você não está com o recurso *${resource}*.`,
    };
  }

  // Libera o recurso
  resources[resource].user = null;

  // Verifica se há alguém na fila
  if (resources[resource].queue.length > 0) {
    const nextUser = resources[resource].queue.shift();
    resources[resource].user = nextUser;
    return {
      type: "in_channel",
      text: `:white_check_mark: *${resource}* foi liberado e agora está com <@${nextUser}> (próximo da fila).`,
    };
  } else {
    return {
      type: "in_channel",
      text: `:white_check_mark: *${resource}* está liberado.`,
    };
  }
}

function handleOffForceAction(resource, userId, userName) {
  if (!resources[resource]) {
    throw new Error(`Recurso "${resource}" não encontrado.`);
  }

  const previousUser = resources[resource].user;
  resources[resource].user = null;
  resources[resource].queue = []; // Limpa a fila

  if (previousUser) {
    return {
      type: "in_channel",
      text: `:exclamation: *${resource}* foi liberado à força por <@${userId}>.`,
    };
  } else {
    return {
      type: "in_channel",
      text: `:exclamation: *${resource}* já estava liberado.`,
    };
  }
}

function handleNewAction(resource) {
  if (resources[resource]) {
    return {
      type: "ephemeral",
      text: `:warning: Recurso "${resource}" já existe.`,
    };
  }

  resources[resource] = { user: null, queue: [] };
  return {
    type: "in_channel",
    text: `:white_check_mark: Recurso "${resource}" cadastrado com sucesso.`,
  };
}

function handleDelAction(resource) {
  if (!resources[resource]) {
    return {
      type: "ephemeral",
      text: `:warning: Recurso "${resource}" não encontrado.`,
    };
  }

  delete resources[resource];
  return {
    type: "in_channel",
    text: `:white_check_mark: Recurso "${resource}" removido.`,
  };
}

function handleListAction() {
  let message = "Recursos cadastrados:\n";
  for (const resource in resources) {
    const status = resources[resource].user
      ? `em uso por <@${resources[resource].user}>`
      : "disponível";
    message += `- *${resource}* (${status})\n`;
  }

  return {
    type: "ephemeral",
    text: message,
  };
}
