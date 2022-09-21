export const parseThemes = (
  themes: object,
  theme?: string,
  colorMode?: string
) => {
  const themesList = Object.keys(themes);
  const selectedTheme = theme || themesList[0];
  const colorModesList = Object.keys(themes[selectedTheme].colors.modes);
  const selectedColorMode =
    (colorMode && colorModesList[colorMode]) || colorModesList[0];

  return { themesList, selectedTheme, colorModesList, selectedColorMode };
};

export const toThemeVars = <T extends object>(
  obj: T,
  prefix: string = "-"
): T => {
  const vars = {} as T;

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      vars[key] = toThemeVars(value, `${prefix}-${key}`);
    } else {
      vars[key] = `var(${prefix}-${key})`;
    }
  }

  return vars;
};

export const toCSSVars = (obj: object, prefix = "-") => {
  const vars = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      const nestedVars = toCSSVars(value, `${prefix}-${key}`);

      for (const [nestedKey, nestedValue] of Object.entries(nestedVars)) {
        vars[nestedKey] = nestedValue;
      }
    } else {
      vars[`${prefix}-${key}`] = value;
    }
  }

  return vars;
};

export const getSpacings = (base) => {
  const spacings = {};
  for (let i = 1; i <= 10; ++i) {
    spacings[i] = `${base * i}px`;
  }
  return spacings;
};

export const setSpacingVars = (base: number, elem) => {
  for (let i = 1; i <= 10; ++i) {
    elem?.style.setProperty(`--spacing-${i}`, `${i * base}px`);
  }
};