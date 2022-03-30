import React, { useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import {
  HvTypography,
  HvEmptyState,
  HvCheckBox,
  HvDropDownMenu,
  HvActionBar,
  HvActionsGeneric,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvGrid,
} from "@hitachivantara/uikit-react-core";
import {
  Cards,
  LeftAlign,
  Delete,
  Fail,
  Level1,
  Level2Average,
  Level3Bad,
  Level4,
  Level5,
  List,
  Ban,
  Preview,
  Upload,
} from "@hitachivantara/uikit-react-icons";

import {
  HvTable,
  HvTableContainer,
  HvTableRow,
  HvTableHead,
  HvTableHeader,
  HvTableBody,
  HvTableCell,
  useHvTable,
} from "../..";

import { makeData, getColumns, getGroupedRowsColumns, useToggleIndex } from "./utils";

export default {
  title: "Lab/Table",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTable } from '@hitachivantara/uikit-react-lab'",
  },
  component: HvTable,
  subcomponents: {
    HvTableContainer,
    HvTableRow,
    HvTableHead,
    HvTableHeader,
    HvTableBody,
    HvTableCell,
  },
};

export const Main = () => {
  const columns = getColumns();
  const data = makeData(6);

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {columns.map((el) => (
              <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el) => (
            <HvTableRow key={el.id} hover striped>
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

Main.parameters = {
  docs: {
    description: { story: "A minimal table example." },
  },
};

export const NoData = () => (
  <HvTableContainer>
    <HvTable>
      <HvTableHead>
        <HvTableRow>
          {getColumns().map((el) => (
            <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
          ))}
        </HvTableRow>
      </HvTableHead>
      <HvTableBody>
        <HvTableRow>
          <HvTableCell colSpan={100} style={{ height: 96 }}>
            <HvEmptyState message="No data to display." icon={<Ban role="presentation" />} />
          </HvTableCell>
        </HvTableRow>
      </HvTableBody>
    </HvTable>
  </HvTableContainer>
);

NoData.parameters = {
  docs: {
    description: { story: "Table with no data available." },
  },
};

export const SimpleTable = () => {
  const [checkedIdx, toggleChecked] = useToggleIndex(0);

  const columns = useMemo(() => {
    const initialColumns = getColumns();

    initialColumns.push({
      Header: "Details",
      accessor: "link",
    });

    return initialColumns;
  }, []);

  const data = useMemo(
    () =>
      makeData(6).map((row) => ({
        ...row,
        link: "/details",
      })),
    []
  );

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            <HvTableCell variant="checkbox" />
            {columns.map((el) => (
              <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
            ))}
            <HvTableCell variant="actions" />
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el, idx) => (
            <HvTableRow key={el.id} hover selected={checkedIdx === idx}>
              <HvTableCell variant="checkbox">
                <HvCheckBox checked={checkedIdx === idx} onClick={toggleChecked(idx)} />
              </HvTableCell>
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell align="center">{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
              <HvTableCell>
                <HvTypography variant="link" component="a" onClick={() => alert(el.link)}>
                  Details Page
                </HvTypography>
              </HvTableCell>
              <HvTableCell variant="actions">
                <HvDropDownMenu
                  keepOpened={false}
                  placement="left"
                  onClick={(e, item) => alert(item.label)}
                  dataList={[
                    {
                      label: "Share",
                    },
                    {
                      label: "Hide",
                    },
                    {
                      label: "Remove",
                    },
                  ]}
                />
              </HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

SimpleTable.parameters = {
  docs: {
    description: {
      story:
        "Simple table that uses HvTable features in order to style checkbox and secondary actions columns.",
    },
  },
};

export const GroupedRows = () => {
  const theme = useTheme();
  const columns = getGroupedRowsColumns();
  const data = makeData(8);

  const style = {
    borderRight: `solid 1px ${theme.palette.atmo4}`,
  };

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {columns.map((el, index) => (
              <HvTableHeader key={el.Header} {...(index === 0 && { ...style })}>
                {el.Header}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el, index) => (
            <HvTableRow key={el.id}>
              {index % 3 === 0 && (
                <HvTableCell
                  rowSpan={3}
                  style={{
                    verticalAlign: "top",
                    ...style,
                  }}
                >
                  {el.name}
                </HvTableCell>
              )}
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

GroupedRows.parameters = {
  docs: {
    description: { story: "A table example with grouped rows." },
  },
};

export const ResponsiveTable = () => {
  const useStyles = makeStyles((theme) => ({
    flexTable: {
      display: "flex",
      flexFlow: "column wrap",
    },

    flexRowGroup: {
      display: "flex",
      flexFlow: "column wrap",

      [theme.breakpoints.only("md")]: {
        "&:first-of-type": {
          position: "sticky",
          top: -1,
          zIndex: 3,
        },
      },

      [theme.breakpoints.down("sm")]: {
        "&:first-of-type": {
          display: "none",
        },
      },
    },

    flexRow: {
      display: "flex",
      flexFlow: "row wrap",

      "&>*": {
        width: "calc(100% / 7)",

        display: "flex",
        alignItems: "center",

        [theme.breakpoints.down("sm")]: {
          width: "100%",

          "&:first-of-type": {
            width: "100%",
            justifyContent: "center",
            backgroundColor: theme.palette.atmo1,
          },
        },
      },

      [theme.breakpoints.down("sm")]: {
        "& > div:not(:first-of-type)::before": {
          content: "attr(data-label) ",
          fontWeight: "bold",
          width: 150,
        },
      },
    },

    columnHeader: {
      display: "flex",
      alignItems: "start",
    },

    container: { minWidth: 200, maxHeight: 300 },
  }));

  const classes = useStyles();

  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(20), []);

  return (
    <HvTableContainer className={classes.container}>
      <HvTable component="div" className={classes.flexTable}>
        <HvTableHead className={classes.flexRowGroup}>
          <HvTableRow className={classes.flexRow}>
            {columns.map((el) => (
              <HvTableHeader key={el.Header} className={classes.columnHeader}>
                {el.Header}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody className={classes.flexRowGroup}>
          {data.map((row) => {
            return (
              <HvTableRow key={row.id} hover className={classes.flexRow}>
                {Object.keys(row)
                  .slice(1)
                  .map((key, i) => (
                    <HvTableCell
                      key={`${row[key]}_${columns[i].Header}`}
                      data-label={columns[i].Header}
                    >
                      {row[key]}
                    </HvTableCell>
                  ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

ResponsiveTable.parameters = {
  docs: {
    description: {
      story: "A table with non-table elements and responsive layout (try resizing your browser).",
    },
  },
};

export const AssetInventory = () => {
  const data = useMemo(() => makeData(6), []);

  const { prepareRow, rows } = useHvTable({
    data,
  });

  const useStyles = makeStyles((theme) => ({
    item: {
      padding: theme.hvSpacing(0, 0, "sm", 0),
    },
    kpis: {
      display: "flex",
    },
    timestamp: {
      paddingRight: theme.hv.spacing.xs,
      borderRight: `solid 1px ${theme.hv.palette.accent.acce1}`,
      marginRight: theme.hv.spacing.xs,
    },
    timestamp2: {
      padding: theme.hvSpacing(0, "xs"),
    },
    columnSplitter: {
      background: theme.hv.palette.accent.acce1,
      width: "1px",
      height: "16px",
      marginRight: theme.hv.spacing.xs,
    },
    icon: {
      margin: theme.hvSpacing(0, "xs"),
    },
  }));

  const severityKey = {
    Minor: "sema2",
    Average: "sema3",
    Major: "sema4",
    Critical: "sema5",
  };

  const myActions = [
    { id: "post", label: "Dismiss", disabled: false },
    { id: "get", label: "Preview", icon: <Preview color="atmo5" />, disabled: true },
    { id: "put", label: "Upload", icon: <Upload color="atmo5" />, disabled: true },
    { id: "delete", label: "Delete", icon: <Delete />, disabled: false },
  ];

  const getStatus = (key) => {
    switch (key) {
      case "Minor":
        return { Icon: Level1, sema: "sema2" };
      case "Average":
        return { Icon: Level2Average, sema: "sema3" };
      case "Major":
        return { Icon: Level3Bad, sema: "sema4" };
      case "Critical":
        return { Icon: Level4, sema: "sema5" };
      case 5:
        return { Icon: Level5, sema: "sema6" };
      default:
        return { Icon: null, sema: "sema1" };
    }
  };

  const classes = useStyles();

  return (
    <div style={{ padding: "30px" }}>
      <HvGrid container xs={12}>
        {rows.map((row) => {
          prepareRow(row);
          const { Icon, sema } = getStatus(row.cells[6].value);
          return (
            <HvGrid key={row.cells[0].value} item xs={12} sm={6} md={3}>
              <HvCard
                selectable
                bgcolor="atmo1"
                statusColor={severityKey[row.cells[6].value]}
                icon={<Icon semantic={sema} />}
              >
                <HvCardHeader title={row.cells[1].value} />
                <HvCardContent>
                  <HvGrid item container xs={12}>
                    <HvGrid item xs={4} sm={8} md={12} lg={12} xl={12}>
                      <div className={classes.kpis}>
                        <HvTypography className={classes.timestamp}>
                          {row.cells[2].value}
                        </HvTypography>
                        <HvTypography>{row.cells[6].value}</HvTypography>
                      </div>
                    </HvGrid>
                  </HvGrid>
                  <HvGrid item container xs={12}>
                    <HvGrid item xs={5} className={classes.bottomItem}>
                      <HvTypography variant="highlightText">Event Type</HvTypography>
                      <HvTypography variant="normalText" noWrap>
                        {row.cells[3].value}
                      </HvTypography>
                    </HvGrid>
                    <HvGrid item xs={7} className={classes.bottomItem}>
                      <HvTypography variant="highlightText">Status</HvTypography>
                      <HvTypography variant="normalText" noWrap>
                        {row.cells[4].value}
                      </HvTypography>
                    </HvGrid>
                    <HvGrid item xs={5} className={classes.bottomItem}>
                      <HvTypography variant="highlightText">Risk</HvTypography>
                      <HvTypography variant="normalText" noWrap>
                        {row.cells[5].value}
                      </HvTypography>
                    </HvGrid>
                    <HvGrid item xs={7} className={classes.bottomItem}>
                      <HvTypography variant="highlightText">Priority</HvTypography>
                      <HvTypography variant="normalText" noWrap>
                        {row.cells[7].value}
                      </HvTypography>
                    </HvGrid>
                  </HvGrid>
                </HvCardContent>
                <HvActionBar aria-label="Leaf">
                  <HvCheckBox
                    checked={data.checked}
                    value={data.id}
                    inputProps={{ "aria-label": `Select ${data.id}` }}
                  />
                  <div style={{ flex: 1 }} />
                  <HvActionsGeneric id={data.id} actions={myActions} maxVisibleActions={1} />
                </HvActionBar>
              </HvCard>
            </HvGrid>
          );
        })}
      </HvGrid>
    </div>
  );
};

AssetInventory.parameters = {
  docs: {
    description: {
      story:
        "Simple table that uses HvTable features in order to style checkbox and secondary actions columns.",
    },
  },
};
