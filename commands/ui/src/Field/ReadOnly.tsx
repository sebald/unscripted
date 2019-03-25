import React from 'react';
import { Box } from 'ink';

import { Label } from './Label';

export type ReadonlyProps = {
  label: string;
  value?: string;
};

export const ReadOnly: React.FC<ReadonlyProps> = ({ label, value }) => (
  <Box>
    <Label>{label}</Label>
    <Box flexGrow={1}>{value}</Box>
  </Box>
);
