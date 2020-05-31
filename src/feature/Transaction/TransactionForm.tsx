import React, { ReactElement, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import useTransactionActions from './useTransactionActions';
import firebase from 'firebase';
import PayeeInput from '../Payee/PayeeInput';
import AccountInput from '../Account/AccountInput';
import CategoryInput from '../Category/CategoryInput';

type AddProps = {
  accountId?: string;
  transactionId?: string;
};

const TransactionForm = ({ accountId }: AddProps): ReactElement => {
  const { add } = useTransactionActions();

  const { register, handleSubmit, errors, setValue, watch, reset } = useForm({
    defaultValues: {
      payeeValue: '',
      payee: '',
      value: '0.00',
      date: format(Date.now(), 'yyyy-MM-dd'),
      memo: '',
      account: accountId ?? '',
      accountValue: '',
      category: '',
      categoryValue: '',
    },
  });

  useEffect(() => {
    register({ name: 'payee' }, { required: true });
    register({ name: 'payeeValue', type: 'custom' });
    register({ name: 'account' }, { required: true });
    register({ name: 'accountValue', type: 'custom' });
  }, [register]);

  const onSubmit = handleSubmit(async (data) => {
    await add({
      value: Number(data.value),
      payee: data.payee,
      memo: data.memo,
      date: firebase.firestore.Timestamp.fromDate(new Date(data.date)),
      account: data.account,
      category: data.category,
    });

    reset();
  });

  return (
    <form id={'transaction-form'} onSubmit={onSubmit}>
      {!accountId && (
        <AccountInput
          watch={watch}
          setValue={setValue}
          register={register}
          error={errors.account}
        />
      )}
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
      <PayeeInput
        watch={watch}
        setValue={setValue}
        register={register}
        error={errors.payee}
      />
      <CategoryInput
        watch={watch}
        setValue={setValue}
        register={register}
        error={errors.category}
      />
      <TextField
        label="Amount"
        type="number"
        name="value"
        InputProps={{
          startAdornment: '£',
        }}
        inputProps={{
          step: 0.01,
          ref: register({ required: true }),
        }}
        error={!!errors.value}
      />
      <TextField
        label="Memo"
        type="string"
        name="memo"
        inputProps={{
          ref: register,
        }}
        error={!!errors.memo}
      />
    </form>
  );
};

export default TransactionForm;
