import { ProductI } from './product';

export interface WishlistResponse {
  status: string;
  count: number;
  data: ProductI[];
}
