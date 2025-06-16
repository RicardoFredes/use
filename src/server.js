import path from "path";
import { fileURLToPath } from "url";

import app from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
