import { useSelector } from 'react-redux';
import { selectBudgetId } from '../Budget/budgetSelectors';
import { useFirestoreConnect } from 'react-redux-firebase';

const useCategoryData = (): void => {
  const budget = useSelector(selectBudgetId);

  useFirestoreConnect({
    collection: 'category',
    where: ['budget', '==', budget],
  });
};

export default useCategoryData;
