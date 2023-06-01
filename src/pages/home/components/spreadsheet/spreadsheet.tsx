import { useCallback } from "react";
import { useGlobalContext } from "../../../../core/contexts/global/global";
import cx from 'classnames';

import * as S from './styled';
import { ITableCell, ITableRow } from "../../../../core/models";
import { Cell } from "../../../../core/components";
import { useActiveCell } from "../../../../core/hooks";

const SpreadSheet = () => {
  const { tableData: { columns, rows } } = useGlobalContext();
  const { column: activeColumnIndex, row: activeRowIndex } = useActiveCell();

  const renderColumn = useCallback((letter: string, columnIndex: number) => {
    return (
      <S.SpreadsheetHead
        key={letter}
        className={cx({
          active: activeColumnIndex === columnIndex,
        })}
      >
        {letter}
      </S.SpreadsheetHead>
    );
  }, [activeColumnIndex]);

  const renderRowCell = useCallback((cell: ITableCell, rowIndex: number, cellIndex: number) => (
    <Cell key={cell.id} defaultValue={cell.inputValue} rowIndex={rowIndex + 1} columnIndex={cellIndex} />
  ), []);

  const renderRow = useCallback((tableRow: ITableRow, rowIndex: number) => {
    return (
      <S.SpreadsheetRow key={tableRow.id}>
        <S.SpreadsheetData
          className={cx({
            active: activeRowIndex === rowIndex + 1,
          })}>
          {rowIndex + 1}
        </S.SpreadsheetData>
        {tableRow.cells.map((cell, cellIndex) => renderRowCell(cell, rowIndex, cellIndex))}
      </S.SpreadsheetRow>
    );
  }, [activeRowIndex]);

  return (
    <S.SpreadsheetTable>
      <S.SpreadsheetHeader>
        <S.SpreadsheetRow>
          <S.SpreadsheetHead />
          {columns.map(renderColumn)}
        </S.SpreadsheetRow>
      </S.SpreadsheetHeader>

      <S.SpreadsheetBody>
        {rows.map(renderRow)}
      </S.SpreadsheetBody>
    </S.SpreadsheetTable>
  );
};

export default SpreadSheet;
