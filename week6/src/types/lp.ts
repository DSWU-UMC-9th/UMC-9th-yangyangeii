export type LpTag = {
  id: number;
  name: string;
};

export type LpLike = {
  id: number;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: LpTag[];
  likes: LpLike[];
};
