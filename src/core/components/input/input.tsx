import { memo, useCallback, useEffect, useRef, useState } from "react";

import { ChangeEvent } from "react";
import * as S from './styled';
import { IInputProps } from "./props.interface";
import { useGlobalContext } from "../../contexts/global/global";

const Input = ({
  onCircularReference,
  columnIndex,
  rowIndex,
  defaultValue,
}: IInputProps) => {
  const [bindedValue, setBindedValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue);
  const [bindedInputSelector, setBindedInputSelector] = useState<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement>();
  const { updateCellInputValue } = useGlobalContext();

  const bindCircularReference = useCallback(({ target }: Event) => {
    setBindedValue((target as HTMLInputElement).value);
    inputRef.current!.value = (target as HTMLInputElement).value;
    inputRef.current!.dispatchEvent(new Event('input'));
  }, []);

  const handleInputBind = useCallback((value: string): { isBinded: boolean; bindedInputRef: HTMLInputElement | null } => {
    if (!value.startsWith('=')) {
      return { isBinded: false, bindedInputRef: null };
    };

    const sanitizedSelector = value.replace('=', '');
    const tableCellSelector = window[sanitizedSelector as any];
    onCircularReference(!!tableCellSelector);

    if (!tableCellSelector) {
      if (bindedValue) {
        setBindedValue('');
        bindedInputSelector?.removeEventListener('input', bindCircularReference);
      }

      return { isBinded: false, bindedInputRef: null };
    };
    const inputSelector = (tableCellSelector as unknown as HTMLTableCellElement).firstChild as HTMLInputElement;
    inputSelector.addEventListener('input', bindCircularReference);
    setBindedInputSelector(inputSelector);
    setBindedValue((inputSelector).value);
    return { isBinded: true, bindedInputRef: inputSelector };

  }, [bindedValue, bindedInputSelector, bindCircularReference, onCircularReference]);

  useEffect(() => {
    const { bindedInputRef, isBinded } = handleInputBind(defaultValue);
    if (isBinded) {
      bindedInputRef!.dispatchEvent(new Event('input'));
    }
  }, []);

  useEffect(() => {
    if (!bindedValue && !value) return;

    updateCellInputValue(rowIndex - 1, columnIndex, value);
  }, [bindedValue, value]);

  const handleKeyListener = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);

    handleInputBind(target.value);
  };

  const handleBlur = () => {
    setIsFocused(false);

    const sanitizedSelector = value.replace('=', '');
    const tableCellSelector = window[sanitizedSelector as any];
    onCircularReference(!!tableCellSelector);

    if (!tableCellSelector) {
      setBindedInputSelector(null);
      setBindedValue('');
      return;
    };
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <S.Input
      ref={(ref: HTMLInputElement) => inputRef.current = ref}
      value={isFocused ? value : (bindedValue || value)}
      onChange={handleKeyListener}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  )
};

export default memo(Input);
