import React from 'react';
import { Box, Color } from 'ink';

export const Label: React.FC = ({ children }) => (
  <Box marginRight={1}>
    <Color cyan>{children}</Color>
  </Box>
);
