import React from 'react';
import { Box, Color } from 'ink';
import SelectInput, {
  Item,
  IndicatorProps,
  InkSelectInputProps,
  ItemProps,
} from 'ink-select-input';
import figures from 'figures';

import { Label } from './Label';

// Customization
// ---------------
const CustomIndicator: React.FC<IndicatorProps> = ({ isSelected }) => (
  <Box marginRight={1}>
    {isSelected ? <Color blueBright>{figures.pointer}</Color> : ' '}
  </Box>
);

const CustomItem: React.FC<ItemProps> = ({ isSelected, label }) => (
  <Color blueBright={isSelected}>{label}</Color>
);

// Component
// ---------------
export type SelectFieldProps = {
  label: string;
  items: Item[];
  onSubmit: (item: Item) => void;
  initialValue?: Item['value'];
  focus?: InkSelectInputProps['focus'];
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  onSubmit,
  initialValue,
  ...props
}) => {
  const initialIndex = props.items.findIndex(
    ({ value }) => value === initialValue
  );

  return (
    <Box flexDirection="column">
      <Label>{label}</Label>
      <SelectInput
        onSelect={onSubmit}
        initialIndex={Math.max(initialIndex, 0)}
        indicatorComponent={CustomIndicator}
        itemComponent={CustomItem}
        {...props}
      />
    </Box>
  );
};
