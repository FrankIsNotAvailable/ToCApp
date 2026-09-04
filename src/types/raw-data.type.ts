import type { User } from '$types/user.type';

export interface RawData {
    id: string;
    user: User;
    enc_data: string;
    createdAt: string;
    updatedAt?: string;
    status: string;
}
