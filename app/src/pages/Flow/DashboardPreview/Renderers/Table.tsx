import { useMemo, useState, useEffect } from "react";
import { css } from "@emotion/css";
import {
  HvSection,
  HvTypography,
  useHvData,
  HvTableColumnConfig,
  useHvSortBy,
  useHvPagination,
  HvTableContainer,
  HvTable,
  HvTableHead,
  HvTableRow,
  HvTableHeader,
  HvTableBody,
  HvTableCell,
  HvPagination,
  useHvFilters,
} from "@hitachivantara/uikit-react-core";
import { table } from "arquero";
import type ColumnTable from "arquero/dist/types/table/column-table";

interface TableProps {
  loading: boolean;
  title: string;
  measure: string;
  data?: ColumnTable;
}
export const getColumns = (): HvTableColumnConfig<any, string>[] => [
  {
    Header: "Territory",
    accessor: "Territory",
  },
  { Header: "Country", accessor: "Country" },
  { Header: "State Province", accessor: "State Province" },
  { Header: "City", accessor: "City" },
  { Header: "Years", accessor: "Years" },
  { Header: "Quarters", accessor: "Quarters" },
  { Header: "Months", accessor: "Months" },
  { Header: "Quantity", accessor: "Quantity" },
  { Header: "Sales", accessor: "Sales" },
];

export const Table = ({
  loading,
  title,
  measure,
  data: dataProp,
}: TableProps) => {
  const columns = useMemo(() => getColumns(), []);
  const [data, setData] = useState<object[]>([]);

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    getHvPaginationProps,
    setFilter,
  } = useHvData(
    {
      data,
      columns,
      initialState: {
        filters: [{ id: "Territory", value: measure }],
        hiddenColumns: ["Territory"],
      },
    },
    useHvFilters,
    useHvSortBy,
    useHvPagination
  );

  useEffect(() => {
    if (dataProp) {
      const tableData = table(dataProp);
      const arr = tableData.objects();
      setData(arr);
    }
  }, [dataProp]);

  useEffect(() => {
    setFilter?.("Territory", measure);
  }, [measure, setFilter]);

  return (
    <HvSection
      title={
        !loading && (
          <HvTypography variant="title4">
            {title}: {measure}
          </HvTypography>
        )
      }
      className={
        loading
          ? css({
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            })
          : undefined
      }
      classes={{
        content: css({
          height: "100%",
          overflow: "scroll",
        }),
      }}
    >
      <HvTableContainer>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            {headerGroups.map((headerGroup) => (
              <HvTableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((col) => (
                  <HvTableHeader {...col.getHeaderProps()}>
                    {col.render("Header")}
                  </HvTableHeader>
                ))}
              </HvTableRow>
            ))}
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {page?.length ? (
              page.map((row) => {
                prepareRow(row);

                return (
                  <HvTableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <HvTableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </HvTableCell>
                    ))}
                  </HvTableRow>
                );
              })
            ) : (
              <span>Nothing to show</span>
            )}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
      {page?.length ? (
        <HvPagination {...getHvPaginationProps?.()} />
      ) : undefined}
    </HvSection>
  );
};
