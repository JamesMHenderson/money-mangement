import { useFirestore } from 'react-redux-firebase';
import { useCallback } from 'react';
import { Transaction } from './TransactionTypes';
import firebase from 'firebase';
import useUpdateBudget from '../Budget/useUpdateBudget';
import useBudget from '../Budget/useBudget';

const useTransactionActions = () => {
  const firestore = useFirestore();
  const { total } = useUpdateBudget();
  const budgetId = useBudget();

  const add = useCallback(
    async (transaction: Transaction) => {
      const { id } = await firestore.add(`transaction`, {
        ...transaction,
        budget: budgetId,
      });

      await firestore.update(
        {
          collection: 'account',
          doc: transaction.account,
        },
        {
          balance: firebase.firestore.FieldValue.increment(transaction.value),
        },
      );

      await total(transaction.value);

      return { id };
    },
    [firestore, total, budgetId],
  );

  const update = useCallback(
    (transactionId: string, changes: Partial<Transaction>) =>
      firestore.update(
        {
          collection: 'transaction',
          doc: transactionId,
        },
        changes,
      ),
    [firestore],
  );

  const remove = useCallback(
    (transactionId: string) =>
      firestore.delete({
        collection: 'transaction',
        doc: transactionId,
      }),
    [firestore],
  );

  return {
    add,
    update,
    remove,
  };
};

export default useTransactionActions;
