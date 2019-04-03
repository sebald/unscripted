import React, { useState } from 'react';
import { Box } from 'ink';
import TextInput from 'ink-text-input';

import { ErrorMessage } from './Error';
import { Label } from './Label';
import { FieldValidation } from './types';

export type TextFieldProps = {
  label: string;
  onSubmit: (value: string) => void;
  initialValue?: string;
  validate?: (value: string) => FieldValidation;
  focus?: boolean;
};

export const TextField: React.FC<TextFieldProps> = ({
  label,
  initialValue = '',
  onSubmit = () => {},
  validate = () => true,
  focus,
}) => {
  const [state, setState] = useState<{ value: string; error: FieldValidation }>(
    {
      value: initialValue,
      error: false,
    }
  );

  const handleChange = (value: string) => setState({ value, error: false });
  const handleSubmit = (value: string) => {
    const result = validate(value);

    if (result === true) {
      return onSubmit(value);
    }

    setState({
      value,
      error: result,
    });
  };

  return (
    <Box flexDirection="column">
      <Box>
        <Label>{label}</Label>
        <Box flexGrow={1}>
          <TextInput
            focus={focus}
            value={state.value}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Box>
      </Box>
      <ErrorMessage error={state.error} />
    </Box>
  );
};
