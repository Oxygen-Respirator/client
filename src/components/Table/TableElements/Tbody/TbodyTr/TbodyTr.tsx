import Checkbox from "../../Checkbox";

export default function TbodyTr<T>({
  columns,
  rowStyle,
  rowClassName,
  cellStyle,
  cellClassName,
  dataCellStyle,
  dataCellClassName,
  rowSelection,
  tableData,
  tableDataItem,
}: TableRow<T>) {
  const isDisable = rowSelection?.selectProps(tableDataItem).disabled;
  const isCheck =
    !!rowSelection?.selectedRowKey.includes(tableDataItem.key) || false;
  const { key: dataItemKey } = tableDataItem;
  const onClickTr = () => {
    if (rowSelection) {
      const { onSelect, selectedRowKey } = rowSelection;
      const resultSelectedRowKey = [...selectedRowKey];

      if (!selectedRowKey.includes(dataItemKey)) {
        resultSelectedRowKey.push(dataItemKey);
      } else {
        const selectedKeyIndex = resultSelectedRowKey.indexOf(dataItemKey);
        resultSelectedRowKey.splice(selectedKeyIndex, 1);
      }

      const filteredData = tableData.filter(({ key }) =>
        resultSelectedRowKey.includes(key),
      );

      onSelect(filteredData);
    } else {
      return;
    }
  };

  return (
    <tr
      style={{ ...rowStyle }}
      className={`ty-tr ${rowClassName} ${isDisable ? "ty-disable" : ""}`}
      onClick={onClickTr}
    >
      {rowSelection && (
        <td>
          <Checkbox isCheck={isCheck} />
        </td>
      )}

      {columns?.map(({ dataIndex, render }, _idx: number) => (
        <td
          key={_idx}
          className={`ty-td ${cellClassName} ${dataCellClassName} `}
          style={{ ...cellStyle, ...dataCellStyle }}
        >
          {render ? render(tableDataItem[dataIndex]) : tableDataItem[dataIndex]}
        </td>
      ))}
    </tr>
  );
}
