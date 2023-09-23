import TbodyTr from "./TbodyTr";

export default function Tbody<T>({
  tableData,
  rowClassName,
  rowStyle,
  columns,
  cellClassName,
  cellStyle,
  dataCellClassName,
  dataCellStyle,
  rowSelection,
  curPage,
  pagination,
  pageItemCount,
}: TableRow<T>) {
  const isShow = (_idxNum: number): boolean => {
    if (pagination && typeof curPage === "number" && pageItemCount) {
      const _minCount = curPage * pageItemCount;
      const _maxCount = (curPage + 1) * pageItemCount - 1;

      const _isContentsShow = _idxNum >= _minCount && _idxNum <= _maxCount;
      return _isContentsShow;
    }
    return true;
  };
  return (
    <tbody className="ty-tbody">
      {tableData?.map(
        (tableDataItem, _idx: number) =>
          isShow(_idx) && (
            <TbodyTr
              key={_idx}
              columns={columns}
              tableData={tableData}
              tableDataItem={tableDataItem}
              rowSelection={rowSelection}
              rowStyle={rowStyle}
              rowClassName={rowClassName}
              cellStyle={cellStyle}
              cellClassName={cellClassName}
              dataCellStyle={dataCellStyle}
              dataCellClassName={dataCellClassName}
            />
          ),
      )}
    </tbody>
  );
}
