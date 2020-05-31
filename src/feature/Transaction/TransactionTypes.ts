import firebase from 'firebase';
import { TypeWithId } from 'react-redux-firebase';

export type Transaction = {
  date: firebase.firestore.Timestamp;
  payee: string;
  memo: string;
  value: number;
  account: string;
  category: string;
};

export type TransactionWithId = TypeWithId<Transaction>;
