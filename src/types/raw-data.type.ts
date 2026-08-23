import type { User } from '$types/user.type';
import type { CreditCard } from '$types/credit-card.type';


export interface RawData {
    id: string;
    user: User;
    creditCard: CreditCard;
    email: string;
    phoneNumber: string;
    address: string;
    dob: string;
    createdAt: string;
    updatedAt: string;
    status: string;
}
