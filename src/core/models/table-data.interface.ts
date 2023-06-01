import { ITableRow } from "./table-row.interface";

export interface ITableData {
  columns: string[],
  rows: ITableRow[],
}
