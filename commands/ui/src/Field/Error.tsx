import React from 'react';
import { Box, Color } from 'ink';
import figures from 'figures';

export type ErrorBoxProps = {
  error: string | boolean;
};

export const ErrorMessage: React.FC<ErrorBoxProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  const message = typeof error === 'string' ? error : 'Invalid input.';
  return (
    <Box>
      <Color redBright bold>
        {figures.cross} {message}
      </Color>
    </Box>
  );
};
