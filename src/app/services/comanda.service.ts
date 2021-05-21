import { Storage } from '@ionic/storage-angular';

import { Injectable } from '@angular/core';


const cKey = 'items';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  constructor(
    public storage: Storage,
  ){}

  addComanda(product){
    return this.getItems().then(result => {
      if(result){
        if(!this.containsObject(product, result)){
          result.push(product);
          return this.storage.set(cKey, result);
        }else{
          let index = result.findIndex(x => x.product_id == product.id);
          let qtdAnt = parseInt(result[index].count);
          product.count = (qtdAnt + product.count);
          let precoAtual = (parseInt(product.vTotal) * product.count);
          product.vTotal = precoAtual;
          result.splice(index, 1);
          result.push(product);
          return this.storage.set(cKey, result);
        }
      }else{
        return this.storage.set(cKey, result);

      }
    })
  }

  removeFromComanda(product) {
    return this.getItems().then(result => {
      if (result) {
        var productIndex = result.indexOf(product);
        result.splice(productIndex, 1);
        return this.storage.set(cKey, result);
      }
    })
  }

  containsObject(obj, list): boolean {
    if (!list.length) {
      return false;
    }

    if (obj == null) {
      return false;
    }
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i].product_id == obj.product_id) {
        return true;
      }
    }
    return false;
  }

  getItems(){
    return this.storage.get(cKey);
  }

}
