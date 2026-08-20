import { dirname } from "path";
import { fileURLToPath } from "url";
export default function () {
  return dirname(fileURLToPath(import.meta.url).replace("/dist",""));
}
