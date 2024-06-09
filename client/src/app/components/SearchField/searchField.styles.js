import styled from "styled-components";
const Wrapper=styled.div`
    flex: 1 1 25%;
    min-width: 200px;
    margin: 10px;
    @media(max-width: 768px){
        width:100%;
        max-width:300px;
    }
`;
const Label=styled.label`
display: inline-block;
    font-size: 0.75rem;
    margin-right: 10px;
    color: white;
    background-color: rgb(20, 139, 139);
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    @media(max-width: 480px){
        font-size: 0.625rem;
        padding: 8px;
    }
&:hover{
    background: rgb(3, 72, 72);
}
`;
const Input=styled.input`
    width: 100%;
    max-width: 150px;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    @media(max-width:480px){
        font-size: 0.875rem;
    }
`;
export {Wrapper,Label,Input};