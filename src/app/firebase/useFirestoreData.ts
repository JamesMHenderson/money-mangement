import { useFirestoreConnect } from 'react-redux-firebase';

const useFirestoreData = (): void => {
  useFirestoreConnect([
    {
      collection: 'payee',
    },
  ]);
};

export default useFirestoreData;
