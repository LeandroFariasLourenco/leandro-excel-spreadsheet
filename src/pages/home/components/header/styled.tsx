import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  padding: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: fit-content;
`;

export const ActiveCellText = styled.div``;

export const SaveButton = styled.button`
  padding: 10px;
  margin-left: 30px;
  background-color: #007549;
  color: white;
`;

export const DeleteButton = styled.button`
  padding: 10px;
  margin-left: 10px;
  color: white;
  background-color: #af2c2c;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Divider = styled.div`
  height: 50px;
  width: 2px;
  background-color: gray;
  margin: 0 30px;
`;

export const TableFieldGenerationInput = styled.input`
  padding: 10px 5px;
  background-color: #f7f7f7;
`;

export const TableFieldGroup = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-left: 10px;
  }
`;

export const TableFieldPlaceholder = styled.label`
  font-size: 12px;
`;

export const GenerateTableButton = styled.button`
  padding: 10px;
  margin-left: 30px;
  color: black;
  background-color: #f7f7f7;
`;
