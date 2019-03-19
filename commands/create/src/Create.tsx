import React from 'react';

import { YarnWorkspace } from '@unscripted/utils';
import { Field } from '@unscripted/ui';

export type CreateProps = {
  workspaces: {
    [name: string]: YarnWorkspace;
  };
};

export const Create: React.FC<CreateProps> = ({ workspaces }) => {
  const validate = (val: string) => {
    const ws = workspaces[val];
    return ws ? 'An module with that name already exists.' : true;
  };

  const handleSubmit = (val: string) => console.log(val);

  return (
    <Field
      label="Enter name of new module"
      initialValue=""
      validate={validate}
      onSubmit={handleSubmit}
    />
  );
};
