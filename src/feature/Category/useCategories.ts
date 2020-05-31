import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { Category } from './CategoryType';
import { useSelector } from 'react-redux';
import { selectAllCategories } from './categorySelectors';
import { selectBudgetId } from '../Budget/budgetSelectors';

const useCategories = () => {
  const budget = useSelector(selectBudgetId);

  useFirestoreConnect({
    collection: 'category',
    where: ['budget', '==', budget],
  });

  const firestore = useFirestore();

  const categories = useSelector(selectAllCategories);

  const add = (category: Category) =>
    firestore.add(
      {
        collection: 'category',
      },
      { ...category, budget },
    );

  return {
    add,
    categories,
  };
};

export default useCategories;
