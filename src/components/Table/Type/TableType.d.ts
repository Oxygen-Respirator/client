interface Table<DataType> extends Omit<TableRow<DataType>, "tableDataItem"> {
  style?: React.CSSProperties;
  className?: string;
  colGroup?: number[];
}

interface TableRow<DataType> {
  columns: TableColumns<DataType>;
  tableData: DataTypeProps<DataType>[];
  tableDataItem?: DataTypeProps<DataType>;
  cellStyle?: React.CSSProperties;
  cellClassName?: string;
  rowStyle?: React.CSSProperties;
  rowClassName?: string;
  headCellStyle?: React.CSSProperties;
  headCellClassName?: string;
  dataCellStyle?: React.CSSProperties;
  dataCellClassName?: string;
  rowSelection?: SelectorProps<DataType>;
  curPage?: number;
  pagination?: boolean;
  pageItemCount?: number;
}

type TableColumns<DataType> = TableColumnsItem<DataType>[];

interface TableColumnsItem<DataType> {
  title: StringNumber;
  dataIndex: keyof DataType;
  render?: Render;
  sort?: Sorter<DataType>;
}

type Sorter<DataType> = (cur: DataType, prev: DataType) => number;

type Render = (value: T) => React.ReactNode | T;

interface SelectorProps<DataType> {
  onSelect: (value: DataType[]) => void;
  selectProps: (value: DataType) => { disabled: boolean };
  selectedRowKey: StringNumber[];
}

type StringNumber = string | number;

interface TableDataProps {
  key: StringNumber;
}

// pagination?: boolean;
//   curPage?: number;
//   pageItemCount?: number;
