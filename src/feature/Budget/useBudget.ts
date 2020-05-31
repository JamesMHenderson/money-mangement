import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useEffect } from 'react';
import {
  selectAreBudgetsEmpty,
  selectAreBudgetsLoaded,
  selectBudgetId,
} from './budgetSelectors';
import { selectAuthUid } from '../../app/firebase/firebaseSelectors';

const useBudget = (): string | undefined => {
  const uid = useSelector(selectAuthUid);
  const isEmpty = useSelector(selectAreBudgetsEmpty);
  const isLoaded = useSelector(selectAreBudgetsLoaded);
  const budgetId = useSelector(selectBudgetId);

  const firestore = useFirestore();

  useFirestoreConnect({
    collection: 'budget',
    where: ['user', '==', uid ?? ''],
    limit: 1,
  });

  useEffect(() => {
    if (isLoaded && isEmpty) {
      firestore.add('budget', {
        user: uid,
        total: 0,
        payee: {},
      });
    }
  }, [isLoaded, isEmpty, uid, firestore]);

  return budgetId ?? '';
};

export default useBudget;
