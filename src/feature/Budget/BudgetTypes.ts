import { Timestamp } from 'types';

export type Budget = {
  name: string;
  payee: Record<string, unknown>;
  total: number;
};

export type Month = {
  date: Timestamp;
  budget: string;
  total: number;
  category: Record<string, number>;
};
