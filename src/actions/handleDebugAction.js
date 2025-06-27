import { privateMessage } from "../utils/message.js";

export function handleDebugAction(data) {
  return privateMessage("debug", JSON.stringify(data, null, 2));
}
