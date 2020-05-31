import React, { ReactElement, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import usePayees from './usePayees';
import { FormContextValues } from 'react-hook-form';

const filter = createFilterOptions<string>();

type PayeeFormValues = {
  payee: string;
  payeeValue: string;
};

type PayeeInputProps = {
  watch: FormContextValues<PayeeFormValues>['watch'];
  setValue: FormContextValues<PayeeFormValues>['setValue'];
  register: FormContextValues<PayeeFormValues>['register'];
  error: FormContextValues<PayeeFormValues>['errors']['payee'];
};

const PayeeInput = ({
  watch,
  setValue,
  register,
  error,
}: PayeeInputProps): ReactElement => {
  const { payees, payeeNames, add: addPayee } = usePayees();

  useEffect(() => {
    register({ name: 'payee' }, { required: true });
    register({ name: 'payeeValue', type: 'custom' });
  }, [register]);

  const inputValue = watch('payeeValue');

  return (
    <Autocomplete
      inputValue={inputValue}
      freeSolo
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== '' && !payees[params.inputValue]) {
          filtered.push(params.inputValue);
        }

        return filtered;
      }}
      onChange={async (event, newValue) => {
        if (!newValue) {
          setValue('payee', '');
          return;
        }

        if (!payees[newValue]) {
          await addPayee(newValue);
        }

        setValue('payee', newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setValue('payeeValue', newInputValue);
      }}
      options={payeeNames}
      renderOption={(option) => (payees[option] ? option : `Add ${option}`)}
      renderInput={(params) => (
        <TextField {...params} label="Payee" error={!!error} />
      )}
    />
  );
};

export default PayeeInput;
