import { toThemeVars, getSpacings } from "./utils";
import * as Themes from "./themes";

export { variant as themeVariant } from "@styled-system/variant";
export const themes = { ...Themes };

const defaultTheme = Object.values(themes)[0];
const defaultColorMode = Object.values(defaultTheme.colors.modes)[0];

export const themeVars = toThemeVars({
  ...defaultTheme,
  colors: { ...defaultColorMode },
  spacing: { ...getSpacings(defaultTheme.spacing.base) },
});

export * from "./utils";
export * from "./cssReset";