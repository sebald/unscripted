import React from 'react';
import { Color } from 'ink';
import InkSpinner from 'ink-spinner';

export type SpinnerProps = {};

export const Spinner: React.FC<SpinnerProps> = ({ children }) => (
  <Color greenBright>
    <InkSpinner /> {children}
  </Color>
);
