import { useMutation } from "@tanstack/react-query";
import { userService, DeleteUserResponse } from "@/services/userService";

export function useDeleteUserMutation() {
  return useMutation<DeleteUserResponse, Error, string>({
    mutationFn: (userId: string) => userService.deleteUser(userId),
  });
}
