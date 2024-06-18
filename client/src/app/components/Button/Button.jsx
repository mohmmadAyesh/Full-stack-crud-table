"use client";
import React from 'react';
import { ActionButton } from './button.styles';

const Button = ({ svg, children, Action }) => {
  return (
    <ActionButton onClick={Action}>
        {children}
    </ActionButton>
  )
}

export default Button;