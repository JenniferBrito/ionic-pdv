
import { Product } from './product';
export interface Venda
{
  key: String;
  produtos;
  valorTotal: number;
  valorSubtotal: number;
  fPagamento: String;
  data: Date;
}
