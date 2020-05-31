import React, { ReactElement, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { FormContextValues } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectOrderedAccounts } from './accountSelectors';

type AccountFormValues = {
  account: string;
  accountValue: string;
};

type AccountInputProps = {
  watch: FormContextValues<AccountFormValues>['watch'];
  setValue: FormContextValues<AccountFormValues>['setValue'];
  register: FormContextValues<AccountFormValues>['register'];
  error: FormContextValues<AccountFormValues>['errors']['account'];
};

const AccountInput = ({
  watch,
  setValue,
  register,
  error,
}: AccountInputProps): ReactElement => {
  const accounts = useSelector(selectOrderedAccounts);

  useEffect(() => {
    register({ name: 'account', type: 'text' }, { required: true });
    register({ name: 'accountValue', type: 'custom' });
  }, [register]);

  const inputValue = watch('accountValue');

  return (
    <Autocomplete
      inputValue={inputValue}
      freeSolo
      onChange={async (event, newValue) => {
        if (typeof newValue === 'string') {
          setValue('account', newValue);
        } else if (newValue) {
          setValue('account', newValue.id);
        } else {
          setValue('account', '');
        }
      }}
      onInputChange={(event, newInputValue) => {
        setValue('accountValue', newInputValue);
      }}
      options={accounts}
      getOptionLabel={(option) => option.name}
      renderOption={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label="Account" error={!!error} />
      )}
    />
  );
};

export default AccountInput;
