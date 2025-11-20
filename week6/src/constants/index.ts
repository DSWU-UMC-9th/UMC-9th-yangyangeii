export const QUERY_KEYS = {
  lpList: "lpList",
  lpDetail: "lpDetail",
  auth: "auth",
} as const;

export const ROUTES = {
  lpList: "/lp",
  lpDetail: (id: number | string): string => `/lp/${id}`,
  login: "/login",
  signup: "/signup",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 0,
  DEFAULT_SIZE: 10,
} as const;
