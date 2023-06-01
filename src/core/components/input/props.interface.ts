export interface IInputProps {
  onCircularReference: (isCircularReference: boolean) => void
  columnIndex: number;
  rowIndex: number;
  defaultValue: string;
}
