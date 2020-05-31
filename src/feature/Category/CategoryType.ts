import { TypeWithId } from 'react-redux-firebase';

export type Category = {
  name: string;
  description: string;
};

export type CategoryWithId = TypeWithId<Category>;
