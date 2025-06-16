const DEFAULT_ICON = "robot_face";
const DISABLE_SHOW_ICON = false;

function getText(iconName, message) {
  if (DISABLE_SHOW_ICON) return message;
  return iconName ? `:${iconName}: ${message}` : message;
}

export function publicMessage(iconName, message) {
  return { type: "in_channel", text: getText(iconName, message) };
}

export function privateMessage(iconName, message) {
  return { type: "ephemeral", text: getText(iconName, message) };
}
