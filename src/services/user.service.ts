import ApiService from './api.service';
import type { User } from '$appTypes/user.type';
import { userStore } from '$stores/user.store';

export class UserService {
    static async getMyData(): Promise<User> {
        const response = await ApiService.get<User>('/auth/me/', { withCredentials: true });
        userStore.setUser(response.data);
        return response.data;
    }
}

export default UserService;
