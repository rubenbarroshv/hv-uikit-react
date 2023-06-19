import { mergeConfig } from "vite";
import path from "path";

import viteConfig from "../../.config/vite.config";

export default mergeConfig(viteConfig, {
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "src"),
    },
  },
});