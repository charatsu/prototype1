import { Injectable } from "@angular/core";
import { GatewayClient } from "./gateway.client";

@Injectable({
    providedIn: 'root',
  })  
export class DocumentClient extends GatewayClient {
    // api = 'https://api.staging.contemisaasdev.com/documents/api/v1/';
    override api = 'https://api.seamless.insure/documents/downloads/';
    // api = 'http://localhost:6006/';

    // downloadDocument(id) {
    //     return this.getBlob('documents/' + id + '/content', {responseType: 'blob'});
    // }
    downloadDocument(id: any) {
        return this.getBlob(id, {responseType: 'blob'});
    }
}