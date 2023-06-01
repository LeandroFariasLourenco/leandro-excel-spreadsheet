import { useEffect, useState, useCallback } from 'react';
import { useGlobalContext } from '../../contexts/global/global';

const useActiveCell = (columnIndex: number | null = null, rowIndex: number | null = null) => {
  const { tableData: { columns } } = useGlobalContext();
  const [active, setActive] = useState<boolean>(false);
  const [row, setRow] = useState<number | null>(null);
  const [column, setColumn] = useState<number | null>(null);

  const clearState = () => {
    setActive(false);
    setRow(null);
    setColumn(null);
  }

  const handleFocus = useCallback(({ target }: FocusEvent) => {
    const htmlTarget = (target as HTMLElement).parentElement;
    if (htmlTarget?.tagName !== 'TD') {
      if (active) {
        clearState();
      }
      return;
    };

    const selectedRow = htmlTarget as HTMLTableCellElement;
    const rowId = selectedRow.getAttribute('id')!;
    if (rowIndex !== null && columnIndex !== null) {
      if (rowId === `${columns[columnIndex]}${rowIndex}`) {
        setActive(true);
        setRow(rowIndex);
        setColumn(columnIndex);
        return;
      }

      clearState();
      return;
    }

    requestAnimationFrame(() => {
      if (selectedRow.classList.contains('active')) {
        const [column, ...rowNumbers] = rowId.split('');
        setRow(+rowNumbers.join(''));
        setColumn(column.charCodeAt(0) - 65);
      }
    });
  }, []);

  useEffect(() => {
    document.addEventListener('focus', handleFocus, true);

    return () => {
      document.removeEventListener('focus', handleFocus, true);
    };
  }, []);

  return {
    active,
    row,
    column,
  };
};

export default useActiveCell;
