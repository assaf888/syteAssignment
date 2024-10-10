import styled from 'styled-components';

export const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

export const ActionButton = styled.button`
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  background-color: #f4f4f4;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

export const NameCell = styled(TableCell)`
  max-width: 200px; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const LocalesCell = styled(TableCell)`
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TableBody = styled.tbody``;

export const UpdateButton = styled(ActionButton)`
  background-color: #2575fc;

  &:hover {
    background-color: #1e5bb8;
  }
`;

export const DeleteButton = styled(ActionButton)`
  background-color: #ff4b2b;

  &:hover {
    background-color: #d94429;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PrimaryHeader = styled.th`
  width: 60px;
  padding: 1rem;
  background-color: #f0f0f0;
  font-weight: bold;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PrimaryCell = styled.td`
  width: 80px;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;