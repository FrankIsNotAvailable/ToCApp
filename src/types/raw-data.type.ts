import type { User } from '$appTypes/user.type';

export interface RawData {
    id: string;
    user: User;
    encData: string;
    createdAt: string;
    updatedAt?: string;
    status: string;
}
