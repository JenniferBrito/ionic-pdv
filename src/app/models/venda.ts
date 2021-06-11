
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Product } from './product';
export interface Venda
{
  key: String;
  prod: Product[];
  valorTotal: number;
  produtos: Product[];
  valorSubTotal: number;
  fPagamento: String;
  data;
}
