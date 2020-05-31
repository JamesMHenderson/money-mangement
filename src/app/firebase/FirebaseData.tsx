import React, { FC, useEffect } from 'react';
import { useFirestore } from 'react-redux-firebase';

const FirebaseData: FC = ({ children }) => {
  const firestore = useFirestore();

  useEffect(() => {
    setTimeout(() => {
      firestore.enableNetwork();
    }, 5000);
  }, [firestore]);

  return <>{children}</>;
};

export default FirebaseData;
