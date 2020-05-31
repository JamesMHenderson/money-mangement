import useCategoryData from './useCategoryData';
import { useSelector } from 'react-redux';
import { selectCategory } from './categorySelectors';
import { RootState } from '../../app/store';
import { isLoaded } from 'react-redux-firebase';
import { Category } from './CategoryType';

interface CategoryWithLoaded extends Category {
  isLoaded: boolean;
}

const useCategory = (id: string): CategoryWithLoaded => {
  useCategoryData();

  const category = useSelector((state: RootState) => selectCategory(state, id));

  return {
    name: category?.name,
    description: category.description,
    isLoaded: isLoaded(category),
  };
};

export default useCategory;
