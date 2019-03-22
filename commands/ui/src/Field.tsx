import React, { useState } from 'react';
import { Box, Color } from 'ink';
import TextInput from 'ink-text-input';

export type FieldValidation = boolean | string;

export type FieldProps = {
  label: string;
  initialValue?: string;
  onSubmit?: (value: string) => void;
  validate?: (value: string) => FieldValidation;
  focus?: boolean;
};

export const Field: React.FC<FieldProps> = ({
  label,
  initialValue = '',
  onSubmit = () => {},
  validate = () => true,
  focus = true,
}) => {
  const [state, setState] = useState<{ value: string; error: FieldValidation }>(
    {
      value: initialValue,
      error: false,
    }
  );

  const handleChange = (value: string) => setState({ value, error: false });
  const handleSubmit = (value: string) => {
    const isValid = validate(value);
    return validate(value)
      ? onSubmit(value)
      : setState({
          value,
          error: isValid,
        });
  };

  return (
    <Box>
      <Box marginRight={1}>
        <Color green>{label}</Color>
      </Box>
      <Box flexGrow={1}>
        <TextInput
          focus={focus}
          value={state.value}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </Box>
      {state.error && (
        <Box>
          <Color redBright bold>
            🚨 {state.error === true ? 'Invalid input.' : state.error}
          </Color>
        </Box>
      )}
    </Box>
  );
};
