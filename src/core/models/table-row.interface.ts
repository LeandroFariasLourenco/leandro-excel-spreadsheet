import { ITableCell } from "./table-cell.interface";

export interface ITableRow {
  id: number;
  cells: ITableCell[];
}
