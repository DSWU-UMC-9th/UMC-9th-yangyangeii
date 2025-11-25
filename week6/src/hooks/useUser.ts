import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../apis/Client";

export type User = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

type UserEnvelope = {
  status: boolean;
  statusCode: number;
  message: string;
  data: User;
};

async function fetchMe(): Promise<User> {
  const res = await api.get<UserEnvelope>("/v1/users/me");
  return res.data.data;
}

export function useMeQuery() {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: fetchMe,
  });
}

export type UpdateUserDto = {
  name?: string;
  bio?: string;
  avatar?: string;
};

async function updateUser(body: UpdateUserDto): Promise<User> {
  const res = await api.patch<UserEnvelope>("/v1/users/me", body);
  return res.data.data;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<User, unknown, UpdateUserDto, { previousUser?: User }>({
    mutationFn: updateUser,

    async onMutate(newData) {
      await queryClient.cancelQueries({ queryKey: ["me"] });

      const previousUser = queryClient.getQueryData<User>(["me"]);

      if (previousUser) {
        queryClient.setQueryData<User>(["me"], {
          ...previousUser,
          ...newData,
        });
      }

      return { previousUser };
    },

    onError(_error, _variables, context) {
      if (context?.previousUser) {
        queryClient.setQueryData(["me"], context.previousUser);
      }
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
