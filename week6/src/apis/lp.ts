import api from "../apis/Client";

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

type LpListEnvelope = {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    data: Lp[];
    nextCursor: number;
    hasNext: boolean;
  };
};

/* ===== API 함수 ===== */
const LP_LIST_URL = "/lp";

export async function getLpList(): Promise<Lp[]> {
  const res = await api.get<LpListEnvelope>(LP_LIST_URL);

  return res.data.data.data;
}

// 만약 나중에 무한 스크롤용으로 cursor를 쓰고 싶으면 이런 식으로 확장 가능:
