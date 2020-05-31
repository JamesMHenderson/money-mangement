import React, { ReactElement } from 'react';
import { Button, TextField } from '@material-ui/core';
import { OnSubmit, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import useAccount from './useAccount';
import firebase from 'firebase';

type FormData = Record<string, string>;

const Add = (): ReactElement => {
  const { add } = useAccount('');

  const { register, errors, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      date: format(Date.now(), 'yyyy-MM-dd'),
      balance: '0.00',
      description: '',
    },
  });

  const onSubmit: OnSubmit<FormData> = async (values) => {
    add({
      name: values.name,
      date: firebase.firestore.Timestamp.fromDate(new Date(values.date)),
      balance: Number(values.balance),
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        name="name"
        inputProps={{
          ref: register({ required: true }),
        }}
        error={!!errors.name}
      />
      <TextField
        label="Date"
        type="date"
        name="date"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          ref: register({ required: true }),
        }}
        error={!!errors.date}
      />
      <TextField
        label="Initial Balance"
        type="number"
        name="balance"
        InputProps={{
          startAdornment: '£',
        }}
        inputProps={{
          step: 0.01,
          ref: register({ required: true }),
        }}
        error={!!errors.balance}
      />
      <TextField
        label="Description"
        name="description"
        inputProps={{
          ref: register({ required: false }),
        }}
        error={!!errors.description}
      />
      <Button type="submit">Add</Button>
    </form>
  );
};

export default Add;
