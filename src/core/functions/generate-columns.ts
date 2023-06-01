import { TABLE } from "../constants";

const generateColumns = (colsAmmount: number): string[] => (
  Array.from({ length: colsAmmount }, (_, colIndex) => {
    let columnLabel: string;

    const isAfterLastLetter = colIndex > TABLE.ALPHABET_COUNT;
    if (isAfterLastLetter) {
      columnLabel = String.fromCharCode(
        TABLE.FIRST_LETTER_CODE,
        TABLE.FIRST_LETTER_CODE + colIndex - TABLE.ALPHABET_COUNT
      );
    } else {
      columnLabel = String.fromCharCode(TABLE.FIRST_LETTER_CODE + colIndex);
    }

    return columnLabel;
  })
);

export default generateColumns;
