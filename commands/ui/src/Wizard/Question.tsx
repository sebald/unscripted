import React from 'react';
import * as Field from '../Field';

/**
 * Using *discriminated union* to help TypeScript to infer the correct types.
 * We use `type` to distinguish the props.
 */
export type StaticQuestionProps = {
  type: 'static';
  message: string;
  value: string;
};

export type TextQuestionProps = {
  type: 'text';
  message: string;
  initialValue?: string;
  onSubmit: (value: string) => void;
  validate?: (value: string) => Field.FieldValidation;
};

export type SelectQuestionProps = {
  type: 'select';
  message: string;
  initialValue?: string;
  items: Field.SelectProps['items'];
  onSubmit: (value: string) => void;
};

/**
 * Type guards to help TypeScript to infer the corret `props` type.
 */
const isStatic = (props: QuestionProps): props is StaticQuestionProps =>
  props.type === 'static';

const isText = (props: QuestionProps): props is TextQuestionProps =>
  props.type === 'text';

const isSelect = (props: QuestionProps): props is SelectQuestionProps =>
  props.type === 'select';

// Component
// ---------------
export type QuestionProps =
  | StaticQuestionProps
  | TextQuestionProps
  | SelectQuestionProps;

/**
 * Question component to wrap different types and make it easier to consume.
 */
export const Question: React.FC<QuestionProps> = props => {
  if (isStatic(props)) {
    return <Field.ReadOnly label={props.message} value={props.value} />;
  }

  if (isText(props)) {
    return (
      <Field.Text
        label={props.message}
        initialValue={props.initialValue}
        validate={props.validate}
        onSubmit={props.onSubmit}
      />
    );
  }

  if (isSelect(props)) {
    return (
      <Field.Select
        label={props.message}
        items={props.items}
        initialValue={props.initialValue}
        onSubmit={({ value }) => props.onSubmit(String(value))}
      />
    );
  }

  throw new Error(`Type "${(props as QuestionProps).type}" is not supported.`);
};
