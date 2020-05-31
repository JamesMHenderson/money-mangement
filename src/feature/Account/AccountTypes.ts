export type Account = {
  name: string;
  description: string;
  balance: number;
};

export interface OrderedAccount extends Account {
  id: string;
}
