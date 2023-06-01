import { ITableRow } from "../models";

const generateTableLines = (colsAmmount: number, linesAmmount: number, existingRows: ITableRow[] = []): ITableRow[] => (
  Array.from({ length: linesAmmount }, (_, lineIndex) => {
    return {
      id: lineIndex,
      cells: Array.from({ length: colsAmmount }, (_, cellIndex) => {
        return {
          id: cellIndex,
          inputValue: existingRows[lineIndex]
            ? (existingRows[lineIndex].cells[cellIndex] ?? { inputValue: '' }).inputValue
            : '',
        };
      })
    };
  })
);

export default generateTableLines;
