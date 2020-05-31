import {
  isLoaded,
  useFirestore,
  useFirestoreConnect,
} from 'react-redux-firebase';
import { useCallback, useEffect, useMemo } from 'react';
import { selectOrderedTransactions } from './transactionSelectors';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { sumBy } from 'lodash';
import useAccount from '../Account/useAccount';
import useBudget from '../Budget/useBudget';

const useTransactions = (accountId: string) => {
  const firestore = useFirestore();

  const budgetId = useBudget();

  useFirestoreConnect({
    collection: 'transaction',
    where: ['budget', '==', budgetId],
  });

  const { account, update } = useAccount(accountId);

  const transactions = useSelector((state: RootState) =>
    selectOrderedTransactions(state),
  );

  const transactionTotal = useMemo(() => {
    if (isLoaded(transactions)) {
      return Number(sumBy(transactions, 'value').toFixed(2));
    }

    return undefined;
  }, [transactions]);

  useEffect(() => {
    if (
      transactionTotal !== undefined &&
      transactionTotal !== account?.balance
    ) {
      update({
        balance: transactionTotal,
      });
    }
  }, [transactionTotal, account, update]);

  const add = useCallback(
    ({ value, payee, memo, date, account }) =>
      firestore.add(`transaction`, {
        value: Number(value),
        payee: payee,
        memo: memo,
        date: new Date(date),
        account: account,
        budget: budgetId,
      }),
    [firestore, budgetId],
  );

  return {
    transactions,
    add,
  };
};

export default useTransactions;
