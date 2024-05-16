import path from "path";
if (!require.main) throw Error("Cannot determine the main module path.");
export const mainDir = path.dirname(require.main.filename);
