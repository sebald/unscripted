import React, { useState } from 'react';
import { Box, Color } from 'ink';
import TextInput from 'ink-text-input';

export type FieldProps = {
  label: string;
  initialValue: string;
  onSubmit: (value: string) => void;
  validate?: (value: string) => boolean | string;
};

export const Field: React.FC<FieldProps> = ({
  label,
  initialValue,
  onSubmit,
  validate = () => true,
}) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const error = !validate(currentValue);
  const handleSubmit = (val: string) => {
    if (!error) {
      return onSubmit(val);
    }
  };

  return (
    <Box>
      <Box marginRight={1}>
        <Color green>{label}:</Color>
      </Box>
      <Box flexGrow={1}>
        <TextInput
          value={currentValue}
          onChange={setCurrentValue}
          onSubmit={handleSubmit}
        />
      </Box>
      {error && (
        <Box>
          <Color redBright bold>
            🚨 {error === true ? 'Invalid input.' : error}
          </Color>
        </Box>
      )}
    </Box>
  );
};
