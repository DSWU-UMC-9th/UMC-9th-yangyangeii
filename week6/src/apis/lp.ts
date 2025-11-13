// src/apis/lp.ts
import api from "../apis/Client";

/* ===== 타입 정의 ===== */

export type LpTag = {
  id: number;
  name: string;
};

export type LpLike = {
  id: number; // 실제 필드 더 있더라도 TS 구조상 이 정도로 받아도 됨
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

// Swagger에서 LP 목록 조회에 사용한 경로로 수정해줘.
// 예: GET /lp  또는 GET /lp/list
const LP_LIST_URL = "/lp";

export async function getLpList(): Promise<Lp[]> {
  const res = await api.get<LpListEnvelope>(LP_LIST_URL);

  // 응답 예시 기준: res.data.data.data 안에 실제 LP 배열이 들어있음
  return res.data.data.data;
}

// 만약 나중에 무한 스크롤용으로 cursor를 쓰고 싶으면 이런 식으로 확장 가능:
// export async function getLpListWithCursor(cursor?: number | null) { ... }
