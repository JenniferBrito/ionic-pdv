
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Product } from './product';
export interface Venda
{
  key: String;
  valorTotal: number;
  produtos: any[];
  valorSubTotal: number;
  fPagamento: String;
  data;
}
