import cx from 'classnames';
import { useGlobalContext } from "../../contexts/global/global";
import Input from "../input/input";
import { ICellProps } from "./props.interface";

import { memo, useCallback, useState } from "react";
import { useActiveCell } from "../../hooks";
import * as S from './styled';

const Cell = ({
  columnIndex,
  rowIndex,
  defaultValue,
}: ICellProps) => {
  const { tableData: { columns } } = useGlobalContext();
  const [isCircularReference, setIsCircularReference] = useState<boolean>(false);
  const { active } = useActiveCell(columnIndex, rowIndex);

  const onCircularReference = useCallback((isCircularReference: boolean) => {
    setIsCircularReference(isCircularReference);
  }, []);

  return (
    <S.CellWrapper
      id={`${columns[columnIndex]}${rowIndex}`} 
      className={cx({
        active,
        'circular-reference': isCircularReference
      })}
    >
      <Input
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        onCircularReference={onCircularReference}
        defaultValue={defaultValue}
      />
    </S.CellWrapper>
  );
};

export default memo(Cell);
