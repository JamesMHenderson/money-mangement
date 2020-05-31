import { useSelector } from 'react-redux';
import { selectBudgetId, selectPayees } from '../Budget/budgetSelectors';
import { useFirestore } from 'react-redux-firebase';
import { useCallback, useMemo } from 'react';

const usePayees = () => {
  const payees = useSelector(selectPayees);

  const payeeNames = useMemo(() => Object.keys(payees), [payees]);

  const budgetId = useSelector(selectBudgetId);

  const firestore = useFirestore();

  const add = useCallback(
    (payee: string) =>
      firestore.update(
        {
          collection: 'budget',
          doc: budgetId,
        },
        {
          [`payee.${payee}`]: {},
        },
      ),
    [firestore, budgetId],
  );

  return {
    payees,
    add,
    payeeNames,
  };
};

export default usePayees;
