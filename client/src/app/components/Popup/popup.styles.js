import styled from 'styled-components';
const Wrapper=styled.div`
    z-index: 999;
    width: 80%;
    max-width: 600px;
    height: 80%;
    max-height: 600px;
    border-radius: 20px;
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.2);
    border: none;
    background: #ddd;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media(max-width: 768px){
        width: 90%;
        height: auto;
        padding: 20px;
    }
`;
const Field=styled.div`
    max-width: 120px;
`;
const Buttton=styled.button`
    border:none;
    background: none;
    cursor:pointer;
    font-size:16px;
    margin-left:10px;
    &:hover{
        color:#007bff;
    }
`;
const Input=styled.input`
    max-width:150px;
    padding:10px;
    margin-bottom:20px;
    border:1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
`;
const Label=styled.label`
    font-size:12px;
    margin-right:10px;
    color:white;
    background-color: rgb(20, 139, 139);
    padding:10px;
    border-radius: 10px;
    cursor:pointer;
    &:hover{
        background: rgb(3, 72, 72);
    }
`;
export {Wrapper,Field,Buttton,Input,Label}
