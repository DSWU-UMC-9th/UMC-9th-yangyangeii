export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  };
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
  bio?: string | null;
  avatar?: string | null;
};

export type SignUpResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
};
