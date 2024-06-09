import React from 'react'
import {Wrapper,Field,Buttton,Input,Label} from './popup.styles.js';
const Popup = ({setCurrentRecordToUpdate,currentRecordToUpdate,handleUpdate}) => {
  return (
    <Wrapper>
      <form onSubmit={(e)=>{handleUpdate(e,currentRecordToUpdate.id)}}>
      <Field>
        <Label htmlFor='coin_pair_input'>coin_pair</Label>
        <Input name='coin_pair' id='coin_pair_input'type="text" defaultValue={currentRecordToUpdate.coin_pair}
        />
      </Field>
      <Field>
        <Label 
          htmlFor='price_input'
        >Price</Label>
        <Input id='price_input'
        name="price"
        type="number" step="0.01" defaultValue={currentRecordToUpdate.price}
        />
      </Field>
      <Field>
        <Label htmlFor='note_input'>note</Label>
        <Input id="note_input" 
        name="note"
        type="text" defaultValue={currentRecordToUpdate.note}
        />
      </Field>
      <Field>
        <Label htmlFor='volume_input'

        >volume</Label>
        <Input
        id='volume_input'
        name="volume"
        type="number" defaultValue={currentRecordToUpdate.volume}
        />
      </Field>
      <Buttton type='submit'>Update</Buttton>
      </form>
    </Wrapper>
  )
}

export default Popup