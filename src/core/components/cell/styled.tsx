import styled from 'styled-components';

export const CellWrapper = styled.td`
  border: 1px solid #d8d5d5;
  transition: border-color 200ms ease-in-out, outline 200ms ease-in-out;
  outline: 2px solid transparent;

  &.circular-reference {
    outline-color: #9b4702;
  }

  &.active {
    outline-color: #2979E7;
  }
  

  &:hover {
    border-color: gray;
  }
`;
