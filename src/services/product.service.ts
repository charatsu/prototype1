import { Injectable } from "@angular/core";
import { ProductClient } from "../clients/product.client";

@Injectable({
    providedIn: 'root'
  })  
export class ProductService {
    constructor(private productClient: ProductClient){}
    getListProduct() {
        return new Promise(async(res) => {
            let listProduct = await this.productClient.getListProduct();
            res(listProduct);    
        })
    }

    getProductDetail(id: string): any {
        return new Promise(async(res) => {
            let productDetail = await this.productClient.getProductDetail(id);
            res(productDetail);    
        })
    }

    getProductVersionDetail(id: string): any {
        return new Promise(async(res) => {
            let productVersionDetail = await this.productClient.getProductVersionDetail(id);
            res(productVersionDetail);
        })
    }
}