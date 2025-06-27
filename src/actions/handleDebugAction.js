import { privateMessage } from "../utils/message";

export function handleDebugAction(data) {
  return privateMessage("debug", JSON.stringify(data, null, 2));
}
