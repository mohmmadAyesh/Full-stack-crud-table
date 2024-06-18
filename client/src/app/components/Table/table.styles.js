import styled from 'styled-components';
const WrapperTable=styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    table-layout: auto;
`;
const Thead=styled.thead`
    background-color: #f1f1f1;
`;
const Th=styled.th`
    padding: 10px;
    text-align: left;
    font-weight: bold;
    white-space: nowrap;
`;
const TBody=styled.tbody``;
const TableRow=styled.tr`
`;
const Td=styled.td`
    padding: 10px;
    white-space: nowrap;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: middle;
`;
export {WrapperTable,Thead,Th,TBody,TableRow,Td}

