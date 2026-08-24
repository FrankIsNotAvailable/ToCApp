import ApiService from './api.service';
import type { User } from '$types/user.type';

export class UserService {
    static async getMyData(): Promise<User> {
        const response = await ApiService.get<User>('/me', { withCredentials: true });
        return response.data;
    }
}

export default UserService;
