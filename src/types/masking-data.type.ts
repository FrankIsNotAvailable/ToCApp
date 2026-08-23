import type { User } from '$types/user.type';
import type { CreditCard } from '$types/credit-card.type';
import type { Meta } from '$types/meta-data.type';

export interface MaskingData {
  id: string;
  user: User;
  creditCard: CreditCard;
  maskedEmail: string;
  maskedPhoneNumber: string;
  maskedAddress: string;
  maskedDOB: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

export interface MaskingDataQueryParams {
  page: number;
  pageSize: number;
  orderBy?: 'ASC' | 'DESC';
}

export interface UpdateMaskingDataPayload {
  email?: string;
  phoneNumber?: string;
  address?: string;
  dob?: string;
}

export interface MaskingDataResponse {
  data: MaskingData[];
  meta: Meta;
}