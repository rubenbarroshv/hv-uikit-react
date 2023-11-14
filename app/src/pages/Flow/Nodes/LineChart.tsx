import { useMemo } from "react";
import { NodeProps, useEdges, useNodes } from "reactflow";
import {
  HvFlowNode,
  HvFlowNodeTypeMeta,
  HvFlowNodeProps,
} from "@hitachivantara/uikit-react-lab";

import { NodeGroup } from "../types";

export const LineChart = (props: NodeProps) => {
  const { id } = props;

  const nodes = useNodes<any>();
  const edges = useEdges();

  const params: HvFlowNodeProps["params"] = useMemo(() => {
    const datasetNodeId = edges.find((e) => e.target === id)?.source;
    const datasetNode = nodes.find((n) => n.id === datasetNodeId);
    const columns = datasetNode?.data.columns;

    return columns
      ? [
          { label: "Title", id: "title", type: "text" },
          {
            label: "Measure",
            id: "measure",
            type: "select",
            options: columns,
            multiple: true,
          },
          {
            label: "Group by",
            id: "groupBy",
            type: "select",
            options: columns,
            multiple: true,
          },
          {
            label: "Split by",
            id: "splitBy",
            type: "select",
            options: columns,
            multiple: true,
          },
        ]
      : undefined;
  }, [edges, id, nodes]);

  return (
    <HvFlowNode params={params} description="Line Chart" expanded {...props} />
  );
};

LineChart.meta = {
  label: "Line Chart",
  groupId: "visualization",
  inputs: [
    {
      label: "Dataset",
      isMandatory: true,
      accepts: ["dataset"],
      maxConnections: 1,
    },
  ],
  outputs: [
    {
      label: "Visualization",
      isMandatory: true,
      provides: "visualizations",
    },
  ],
  data: {
    title: "",
    measure: undefined,
    groupBy: undefined,
    splitBy: undefined,
  },
} satisfies HvFlowNodeTypeMeta<NodeGroup>;
