import firebase from 'firebase';
import useBudget from './useBudget';
import { useCallback } from 'react';
import { useFirestore } from 'react-redux-firebase';

const useUpdateBudget = () => {
  const budgetId = useBudget();

  const firestore = useFirestore();

  const total = useCallback(
    async (change: number) =>
      await firestore.update(
        {
          collection: 'budget',
          doc: budgetId,
        },
        {
          total: firebase.firestore.FieldValue.increment(change),
        },
      ),
    [budgetId, firestore],
  );

  return {
    total,
  };
};

export default useUpdateBudget;
