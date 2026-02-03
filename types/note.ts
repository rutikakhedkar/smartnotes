export type Note = {
  id: string;
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
};
