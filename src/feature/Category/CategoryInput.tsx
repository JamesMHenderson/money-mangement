import React, { ReactElement, useEffect, useState } from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete, createFilterOptions } from '@material-ui/lab';
import { FormContextValues } from 'react-hook-form';
import useCategories from './useCategories';
import { CategoryWithId } from './CategoryType';
import { useBoolean } from '../../hooks';
import CategoryDialog from './CategoryDialog';

type FilterOption = CategoryWithId & { inputValue?: string };

const filter = createFilterOptions<FilterOption>();

type CategoryFormValues = {
  category: string;
  categoryValue: string;
};

type CategoryInputProps = {
  watch: FormContextValues<CategoryFormValues>['watch'];
  setValue: FormContextValues<CategoryFormValues>['setValue'];
  register: FormContextValues<CategoryFormValues>['register'];
  error: FormContextValues<CategoryFormValues>['errors']['category'];
};

const CategoryInput = ({
  watch,
  setValue,
  register,
  error,
}: CategoryInputProps): ReactElement => {
  const { categories } = useCategories();
  const {
    value: isFormOpen,
    setTrue: openForm,
    setFalse: closeForm,
  } = useBoolean(false);

  const [initialCategoryValue, setInitCategoryValue] = useState('');

  useEffect(() => {
    register({ name: 'category' }, { required: true });
    register({ name: 'categoryValue', type: 'custom' });
  }, [register]);

  const inputValue = watch('categoryValue');

  return (
    <>
      <Autocomplete
        inputValue={inputValue}
        freeSolo
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          // Suggest the creation of a new value
          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add new category ${params.inputValue}`,
              description: '',
              id: '',
            });
          }

          return filtered;
        }}
        onChange={async (event, newValue) => {
          if (!newValue) {
            setValue('category', '');
            return;
          }

          if (typeof newValue === 'string') {
            setValue('category', newValue);
            return;
          }

          if (newValue?.inputValue) {
            setInitCategoryValue(newValue.inputValue);
            openForm();
            return;
          }

          setValue('category', newValue.id);
        }}
        onInputChange={(event, newInputValue) => {
          setValue('categoryValue', newInputValue);
        }}
        selectOnFocus
        clearOnBlur
        options={categories as FilterOption[]}
        getOptionLabel={({ name }) => name}
        renderOption={({ name }) => name}
        renderInput={(params) => (
          <TextField {...params} label="Category" error={!!error} />
        )}
      />
      <CategoryDialog
        open={isFormOpen}
        onClose={() => {
          setValue('category', '');
          setValue('categoryValue', '');
          closeForm();
        }}
        onAdd={(id, name) => {
          setValue('category', id);
          setValue('categoryValue', name);
          closeForm();
        }}
        initialValue={initialCategoryValue}
      />
    </>
  );
};

export default CategoryInput;
