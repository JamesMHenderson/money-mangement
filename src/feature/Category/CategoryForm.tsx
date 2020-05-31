import React, { ReactElement } from 'react';
import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import useCategories from './useCategories';

type CategoryFormProps = {
  initialValue: string;
  onAdd?: (id: string, name: string) => void;
};

const CategoryForm = ({
  onAdd,
  initialValue,
}: CategoryFormProps): ReactElement => {
  const { add } = useCategories();

  const { register, handleSubmit, errors, reset, watch } = useForm({
    defaultValues: {
      name: initialValue,
      description: '',
    },
  });

  const name = watch('name');

  console.log(name, initialValue);

  const onSubmit = handleSubmit(async (data) => {
    const { id } = await add({
      name: data.name,
      description: data.description,
    });

    onAdd?.(id, data.name);
    reset();
  });

  return (
    <form id="category-form" onSubmit={onSubmit}>
      <TextField
        label="Category"
        type="text"
        name="name"
        value={name}
        inputProps={{
          ref: register({ required: true }),
        }}
        error={!!errors.name}
      />
      <TextField
        label="Description"
        type="text"
        name="description"
        inputProps={{
          ref: register({ required: true }),
        }}
        error={!!errors.description}
      />
    </form>
  );
};

export default CategoryForm;
