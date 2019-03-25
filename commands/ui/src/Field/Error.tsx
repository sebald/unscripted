import React from 'react';
import { Box, Color } from 'ink';

export type ErrorBoxProps = {
  error: string | boolean;
};

export const ErrorBox: React.FC<ErrorBoxProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  const message = typeof error === 'string' ? error : 'Invalid input.';
  return (
    <Box>
      <Color redBright bold>
        ✖ {message}
      </Color>
    </Box>
  );
};
