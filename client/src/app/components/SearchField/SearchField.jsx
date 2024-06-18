import React, { useRef } from 'react'
import { Wrapper, Label, Input} from './searchField.styles.js';
const SearchField = ({ action, value}) => {
    // hold a reference of which input that its label pressed to filter
    const inputRef=useRef(null);
  return (
    <Wrapper>
    <Label onClick={(e)=>{
        console.log('label clicked');
        e.stopPropagation();
        action(inputRef, value)}}>Search by { value }</Label>
    <Input ref={ inputRef } type='text' placeholder='Search...'/>
    </Wrapper>
  )
}

export default SearchField