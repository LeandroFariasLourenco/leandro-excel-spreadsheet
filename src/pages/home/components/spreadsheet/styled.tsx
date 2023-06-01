import styled from 'styled-components';

export const SpreadsheetTable = styled.table`
  border-spacing: 0;
  table-layout: fixed;
  padding: 5px;
  background-color: #F8F9FA;
`;

export const SpreadsheetHeader = styled.thead``;

export const SpreadsheetRow = styled.tr``;

export const SpreadsheetHead = styled.th`
  background-color: #F8F9FA;
  &:not(&:first-of-type) {
    border: 1px solid #d8d5d5;
  }

  &.active {
    background-color: #E7EAED;
  }
`;

export const SpreadsheetBody = styled.tbody``;

export const SpreadsheetData = styled.td`
  border: 1px solid #d8d5d5;
  text-align: center;
  padding: 0 15px;

  &.active {
    background-color: #E7EAED;
  }
`;
