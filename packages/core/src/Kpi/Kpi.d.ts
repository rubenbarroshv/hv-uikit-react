import * as React from "react";
import { StandardProps } from "@material-ui/core";

export interface HvKpiLabelProps {
  title: string;
  indicator: string;
  unit: string;
  comparisonIndicatorInfo: string;
}

export interface HvKpiProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, HvKpiClassKey> {
  /**
   * An Element that will be rendered to the left of the kpi indicator text.
   */
  trendIndicator?: React.ReactNode;
  /**
   * An Element that will be rendered to the left of the kpi indicator text.
   */
  visualIndicator?: React.ReactNode;
  /**
   * An Element that will be rendered below the kpi indicator text.
   */
  visualComparison?: React.ReactNode;
  /**
   * The object that contains the different labels inside the kpi.
   *
   * - Title: The text at the top of the kpi.
   * - Indicator: The text in the middle of the kpi.
   * - Unit: The text to the right of the indicator.
   * - comparisonIndicatorInfo: the text to the right of the visual comparison.
   */
  labels?: HvKpiLabelProps;
  /**
   *  The typography variant used in the main text indicator of the KPI
   */
  indicatorTextVariant?: "5xlTitle" | "xxlTitle" | "lTitle" | "sTitle";
  /**
   *  The typography variant used in the main text indicator of the KPI
   */
  indicatorUnitTextVariant?: "sTitle" | "sText" | "infoText";
}

export type HvKpiClassKey =
  | "kpiContainer"
  | "visualIndicatorContainer"
  | "comparisons"
  | "comparisonContainer"
  | "comparisonComposition"
  | "indicatorsContainer"
  | "indicatorText"
  | "indicatorUnit"
  | "spacingToTheRight"
  | "trendLine";

export default function HvKpi(props: HvKpiProps): JSX.Element | null;
