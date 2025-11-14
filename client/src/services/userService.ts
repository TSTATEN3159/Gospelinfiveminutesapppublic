import { apiUrl } from '@/lib/api-config';

export interface DeleteUserResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class UserService {
  async deleteUser(userId: string): Promise<DeleteUserResponse> {
    const response = await fetch(apiUrl(`/api/users/${userId}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete user account');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Account deletion failed');
    }

    return data;
  }
}

export const userService = new UserService();
