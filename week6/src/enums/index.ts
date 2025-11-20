// HTTP 메서드 문자열 리터럴 타입
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// 필요하면 돌려 쓸 수 있는 상수 배열
export const HTTP_METHODS: HttpMethod[] = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
];

// LP 정렬 타입
export type LpSortType = "LATEST" | "POPULAR";

// 마찬가지로 상수 배열
export const LP_SORT_TYPES: LpSortType[] = ["LATEST", "POPULAR"];
