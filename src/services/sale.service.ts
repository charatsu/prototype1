import { Injectable } from "@angular/core";
import { SaleClient } from "../clients/sale.client";

@Injectable({
    providedIn: 'root'
  })  
export class SaleService {
    constructor(private saleClient: SaleClient){}
    getQuote(id: string): any{
        return new Promise(async(res) => {
            let quoteDetail = await this.saleClient.getQuote(id);
            res(quoteDetail);    
        })
    }

    createQuote(data: any) {
        return new Promise(async(res) => {
            let quoteDetail = await this.saleClient.createQuote(data);
            res(quoteDetail);    
        })
    }

    updateQuote(data: any) {
        return new Promise(async(res) => {
            let quoteDetail = await this.saleClient.updateQuote(data);
            res(quoteDetail);    
        })
    }

    calculateQuote(data: any) {
        return new Promise(async(res) => {
            let quoteDetail = await this.saleClient.calculateQuote(data);
            res(quoteDetail);    
        })
    }

    generateDocument(data: any) {
        return new Promise(async(res) => {
            let quoteDetail = await this.saleClient.generateDocument(data);
            res(quoteDetail);    
        })
    }

    completeQuote(data: any) {
        return new Promise(async(res) => {
            let quoteDetail = await this.saleClient.completeQuote(data);
            res(quoteDetail);    
        })
    }

    acceptanceQuote(data: any) {
        return new Promise(async(res) => {
            let quoteDetail = await this.saleClient.acceptanceQuote(data);
            res(quoteDetail);    
        })
    }
}