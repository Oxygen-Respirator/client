import Checkbox from "../../Checkbox";
import { useEffect, useState } from "react";

export default function TheadTr<T>({
  columns,
  tableData,
  rowClassName,
  rowStyle,
  cellClassName,
  headCellClassName,
  headCellStyle,
  cellStyle,
  rowSelection,
}: TableRow<T>) {
  const [notDisableAry, setNotDisableAry] = useState<T[]>([]);

  const [isAllCheck, setIsAllCheck] = useState(false);

  useEffect(() => {
    if (rowSelection) {
      const { selectProps, selectedRowKey } = rowSelection;
      setNotDisableAry(
        tableData.filter((_data) => !selectProps(_data).disabled),
      );
      if (selectedRowKey.length) {
        setIsAllCheck(selectedRowKey.length === notDisableAry.length);
      } else {
        setIsAllCheck(false);
      }
    }
  }, [notDisableAry.length, rowSelection, tableData]);

  const onClickCheck = () => {
    if (rowSelection) {
      const { onSelect, selectedRowKey } = rowSelection;
      if (selectedRowKey.length === notDisableAry.length) {
        onSelect([]);
      } else {
        onSelect(notDisableAry);
      }
    }
  };

  return (
    <tr style={{ ...rowStyle }} className={`ty-tr${rowClassName}`}>
      {rowSelection && (
        <td onClick={onClickCheck}>
          <Checkbox isCheck={isAllCheck} />
        </td>
      )}
      {columns?.map(({ title }: TableColumnsItem<T>) => (
        <td
          key={title}
          className={`ty-td text-center ${cellClassName} ${headCellClassName}`}
          style={{ ...cellStyle, ...headCellStyle }}
        >
          {title}
        </td>
      ))}
    </tr>
  );
}
