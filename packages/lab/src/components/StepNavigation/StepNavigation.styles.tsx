import { CSSInterpolation } from "@emotion/serialize";

export const styles: {
  root: CSSInterpolation;
  titles: CSSInterpolation;
  ol: CSSInterpolation;
  li: CSSInterpolation;
  separator: CSSInterpolation;
} = {
  root: {
    display: "flex",
    flexDirection: "column",
  },
  titles: {
    marginTop: 8,
    display: "flex",
  },
  ol: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: 0,
    listStyle: "none",
  },
  li: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    userSelect: "none",
    "& > div": {
      display: "flex",
    },
  },
};