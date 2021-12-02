import { Injectable } from "@angular/core";
import { DocumentClient } from "../clients/document.client";

@Injectable({
    providedIn: 'root'
  })  
export class DocumentService {
    constructor(private documentClient:DocumentClient){}
    downloadDocument(id: any) {
        return new Promise(async(res) => {
            let documentDetail = await this.documentClient.downloadDocument(id);
            res(documentDetail);    
        })
    }
}