import type { User } from '$appTypes/user.type';

export interface RawData {
    id: string;
    user: User;
    enc_data: string;
    createdAt: string;
    updatedAt?: string;
    status: string;
}
