function getText(iconName, message) {
  return iconName ? `:${iconName}: ${message}` : message;
}

export function publicMessage(iconName, message) {
  return { type: "in_channel", text: getText(iconName, message) };
}

export function privateMessage(iconName, message) {
  return { type: "ephemeral", text: getText(iconName, message) };
}
