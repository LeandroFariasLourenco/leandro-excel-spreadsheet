import {
  createContext,
  useContext,
  useState
} from 'react';
import { generateColumns, generateTableLines } from '../../functions';
import { ITableData } from '../../models/table-data.interface';
import { IGlobalContext } from './context.interface';
import { IHomeContextProps } from './props.interface';
import { TableService } from '../../services';

const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({
  children,
}: IHomeContextProps) => {
  const [tableData, setTableData] = useState<ITableData>((() => {
    const localTableData = TableService.getTableData();
    if (!localTableData) {
      return {
        columns: generateColumns(30),
        rows: generateTableLines(30, 100),
      }
    };

    return localTableData;

  })());

  console.log(tableData);
  return (
    <GlobalContext.Provider value={{
      tableData,
      updateCellInputValue: (rowIndex, columnIndex, inputValue) => {
        setTableData((prevState) => {
          prevState.rows[rowIndex].cells[columnIndex].inputValue = inputValue;

          return prevState;
        });
      },
      generateTable: (columnsCount, rowsCount) => {
        console.log(tableData);
        setTableData({
          columns: generateColumns(columnsCount),
          rows: generateTableLines(columnsCount, rowsCount, tableData.rows),
        });
      }
    }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
