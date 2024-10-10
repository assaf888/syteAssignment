import styled from 'styled-components';

export const PageWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.div`
  margin-bottom: 2rem;
`;

export const Title = styled.h2`
  font-size: 1.8rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

export const BulkDeleteButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #fff;
  background-color: #ff4b2b;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: block;
  margin: 0 auto;
  margin-top: 1rem;

  &:hover {
    background-color: #d94429;
  }
`;

export const Error = styled.p`
  color: red;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const PageButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  margin: 0 0.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#2575fc' : '#ddd')};
  color: ${({ active }) => (active ? '#fff' : '#333')};

  &:hover {
    background-color: #2575fc;
    color: #fff;
  }
`;
