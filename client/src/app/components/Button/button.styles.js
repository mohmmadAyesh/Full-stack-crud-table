import styled from 'styled-components';
const ActionButton=styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  margin-left:5px;
  display: flex;
  align-items: center;

  &:hover {
    color: #007bff;
  }

  svg {
    width: 16px; 
    height: 16px; 
  }
`;
export { ActionButton }