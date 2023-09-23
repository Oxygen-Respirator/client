import { useState } from "react";
import { Tbody, Thead } from "./TableElements";
import "./table.css";

export default function Table<T>({
  columns = [],
  tableData = [],
  style,
  className = "",
  rowStyle,
  rowClassName = "",
  cellStyle,
  cellClassName = "",
  headCellStyle,
  headCellClassName = "",
  dataCellStyle,
  dataCellClassName = "",
  colGroup,
  rowSelection,
  pagination = true,
  pageItemCount = 7,
}: Table<T>) {
  const [curPage, setCurPage] = useState<number>(0);
  const pageCount = Math.ceil(tableData.length / pageItemCount);

  const onClickPaginationBtn = (_pageKey: number | "next" | "prev") => () => {
    if (!pagination) {
      return;
    }
    if (typeof _pageKey === "number") {
      curPage !== _pageKey && setCurPage(_pageKey);
    } else if (_pageKey === "next") {
      curPage === pageCount + 1 && setCurPage(prev => prev + 1);
    } else if (_pageKey === "prev") {
      curPage !== 0 && setCurPage(prev => prev - 1);
    }
  };

  return (
    <section>
      <table style={{ ...style }} className={`ty-table ${className}`}>
        <colgroup>
          {colGroup?.map((colWidth, _idx) => (
            <col key={_idx} width={`${(colWidth / 10) * 100}%`} />
          ))}
        </colgroup>
        <Thead
          columns={columns}
          tableData={tableData}
          rowStyle={rowStyle}
          rowClassName={rowClassName}
          cellStyle={cellStyle}
          cellClassName={cellClassName}
          headCellStyle={headCellStyle}
          headCellClassName={headCellClassName}
          rowSelection={rowSelection}
        />
        <Tbody
          columns={columns}
          tableData={tableData}
          rowStyle={rowStyle}
          rowClassName={rowClassName}
          cellStyle={cellStyle}
          cellClassName={cellClassName}
          dataCellStyle={dataCellStyle}
          dataCellClassName={dataCellClassName}
          rowSelection={rowSelection}
          curPage={curPage}
          pagination={pagination}
          pageItemCount={pageItemCount}
        />
      </table>
      <div className="ty-pagination">
        {pagination && (
          <ul className="flex items-center my-30">
            <li onClick={onClickPaginationBtn("prev")} className="text-6">
              {"<"}
            </li>
            {Array(pageCount)
              .fill(pageCount)
              .map((_, idx: number) => (
                <li
                  key={idx}
                  className={className}
                  onClick={onClickPaginationBtn(idx)}
                >
                  {idx + 1}
                </li>
              ))}
            <li onClick={onClickPaginationBtn("next")} className="text-6">
              {">"}
            </li>
          </ul>
        )}
      </div>
    </section>
  );
}
