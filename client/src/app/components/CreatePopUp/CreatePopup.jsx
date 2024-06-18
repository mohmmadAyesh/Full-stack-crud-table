import React from 'react'

import { Wrapper, Field, Buttton, Input, Label } from '../Popup/popup.styles.js';
const CreatePopup = ({ handleCreate }) => {
  return (
    <Wrapper>
      <form onSubmit={(e)=> handleCreate(e)}>
        <Field>
          <Label htmlFor='coin_pair_input'>coin_pair</Label>
          <Input name='coin_pair' id='coin_pair_input'type="text"/>
        </Field>
        <Field>
          <Label htmlFor='price_input'>Price</Label>
          <Input id='price_input' name="price" type="number" step="0.01"/>
        </Field>
        <Field>
          <Label htmlFor='note_input'>note</Label>
          <Input id="note_input" name="note" type="text"/>
        </Field>
        <Field>
          <Label htmlFor='volume_input'>volume</Label>
          <Input id='volume_input' name="volume" type="number"/>
        </Field>
        <Buttton type='submit'>Create</Buttton>
      </form>
    </Wrapper>
  )
}

export default CreatePopup