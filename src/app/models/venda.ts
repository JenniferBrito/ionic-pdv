import { IonDatetime } from '@ionic/angular';
import { Product } from './product';
export interface Venda
{
  key: String;
  produtos: Product[];
  valorTotal: number;
  valorSubtotal: number;
  fPagamento: String;
  data: Date;
}
