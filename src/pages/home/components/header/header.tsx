import { useState } from "react";
import Headroom from 'react-headroom';
import { useGlobalContext } from "../../../../core/contexts/global/global";
import { useActiveCell } from "../../../../core/hooks";
import { TableService } from "../../../../core/services";
import * as S from './styled';

const Header = () => {
  const { tableData, generateTable } = useGlobalContext();
  const [columnsValue, setColumnsValue] = useState<number>(tableData.columns.length);
  const [rowsValue, setRowsValue] = useState<number>(tableData.rows.length);
  const { column, row } = useActiveCell();
  const [hasSavedData, setHasSavedData] = useState<boolean>(!!TableService.getTableData());

  const handleClick = () => {
    generateTable(columnsValue, rowsValue);
  };

  const handleSaveSpreadsheet = () => {
    TableService.saveTableData(tableData);
    setHasSavedData(true);
    alert("Your spreadsheet was saved!");
  };

  const handleDeleteSpreadsheet = () => {
    TableService.deleteTableData();
    setHasSavedData(false);
    alert("Your spreadsheet was deleted from storage!");
  };

  const isValidInputValue = (value: number, max: number): boolean => {
    if (value > max) {
      alert(`Please enter a value between 1 and ${max}`);
      return false;
    }

    return true;
  };

  return (
    <Headroom>
      <S.HeaderWrapper>
        <S.HeaderContainer>
          <S.ActiveCellText>
            Active cell:
            {' '}
            {column === null ? 'None' : tableData.columns[column]}
            {row}
          </S.ActiveCellText>

          <S.SaveButton onClick={handleSaveSpreadsheet}>Save spreadsheet</S.SaveButton>
          { hasSavedData && <S.DeleteButton onClick={handleDeleteSpreadsheet}>Delete saved data</S.DeleteButton> }

          <S.Divider />

          <S.TableFieldGroup>
            <S.TableFieldPlaceholder>Columns</S.TableFieldPlaceholder>
            <S.TableFieldGenerationInput
              value={columnsValue}
              type="number"
              onChange={({ target }) => {
                if (isValidInputValue(+target.value, 50)) {
                  setColumnsValue(+target.value);
                }
              }}
            />
          </S.TableFieldGroup>

          <S.TableFieldGroup>
            <S.TableFieldPlaceholder>Rows</S.TableFieldPlaceholder>
            <S.TableFieldGenerationInput
              value={rowsValue}
              type="number"
              onChange={({ target }) => {
                if (isValidInputValue(+target.value, 150)) {
                  setRowsValue(+target.value);
                }
              }}
            />
          </S.TableFieldGroup>
          <S.GenerateTableButton onClick={handleClick}>Generate</S.GenerateTableButton>
        </S.HeaderContainer>
      </S.HeaderWrapper>
    </Headroom>
  );
};

export default Header;
