export interface User {
  id: number;
  name: string;
  email: string;
}

export type Operation = 'new' | 'edit' | 'delete' | null;
