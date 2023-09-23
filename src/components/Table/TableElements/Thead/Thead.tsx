import TheadTr from "./TheadTr";

export default function Thead<T>({
  columns,
  tableData,
  rowStyle,
  rowClassName,
  cellClassName,
  cellStyle,
  headCellStyle,
  headCellClassName,
  rowSelection,
}: TableRow<T>) {
  return (
    <thead className="ty-thead">
      <TheadTr
        columns={columns}
        tableData={tableData}
        rowStyle={rowStyle}
        rowClassName={rowClassName}
        cellClassName={cellClassName}
        cellStyle={cellStyle}
        headCellStyle={headCellStyle}
        headCellClassName={headCellClassName}
        rowSelection={rowSelection}
      />
    </thead>
  );
}
