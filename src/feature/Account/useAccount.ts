import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectAccountById, selectAccountIds } from './accountSelectors';
import { RootState } from 'app/store';
import { Account } from './AccountTypes';
import useBudget from '../Budget/useBudget';
import useUpdateBudget from '../Budget/useUpdateBudget';
import firebase from 'firebase';

interface NewAccount extends Account {
  date: firebase.firestore.Timestamp;
}

type UseAccounts = () => {
  allIds: string[];
};

export const useAccounts: UseAccounts = () => {
  const budget = useBudget();

  useFirestoreConnect([
    {
      collection: 'account',
      where: ['budget', '==', budget],
    },
  ]);

  const accountIds = useSelector(selectAccountIds);

  return {
    allIds: accountIds,
  };
};

const useAccount = (accountId: string) => {
  const firestore = useFirestore();

  const { total } = useUpdateBudget();

  const budget = useBudget();

  useFirestoreConnect([
    {
      collection: 'account',
      where: ['budget', '==', budget],
    },
  ]);

  const account = useSelector((state: RootState) =>
    selectAccountById(state, accountId),
  );

  const add = useCallback(
    async (account: NewAccount) => {
      const { id } = await firestore.add('account', {
        ...account,
        budget,
      });

      await total(account.balance);
      await firestore.add('transaction', {
        account: id,
        payee: 'Starting Balance',
        date: account.date,
        value: account.balance,
        budget,
      });
    },

    [budget, firestore, total],
  );

  const update = useCallback(
    (changes: Partial<Account>) =>
      firestore.update(
        {
          collection: 'account',
          doc: accountId,
        },
        changes,
      ),
    [firestore, accountId],
  );

  return {
    account,
    update,
    add,
  };
};

export default useAccount;
