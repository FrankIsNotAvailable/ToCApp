import type { User } from '$appTypes/user.type';
import type { Meta } from '$appTypes/meta-data.type';

export interface MaskingData {
  id: string;
  user: User;
  maskedData: string;
  createdAt: string;
  updatedAt?: string;
  status: string;
}

export interface MaskingDataQueryParams {
  page: number;
  pageSize: number;
  orderBy?: 'ASC' | 'DESC';
}

export interface UpdateMaskingDataPayload {
  data: string;
}

export interface MaskingDataResponse {
  data: MaskingData[];
  meta: Meta;
}