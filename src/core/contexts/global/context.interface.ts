import { ITableData } from "../../models/table-data.interface";

export interface IGlobalContext {
  tableData: ITableData,
  generateTable: (columnsCount: number, rowsCount: number) => void;
  updateCellInputValue: (rowIndex: number, columnIndex: number, inputValue: string) => void;
}
