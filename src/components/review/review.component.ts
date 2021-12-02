import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/services/customer.service';
import { DocumentService } from 'src/services/document.service';
import { SaleService } from 'src/services/sale.service';
import { CustomerClient } from '../../clients/customer.client';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  personalDetail: any;
  quote: any;
  id: string;
  constructor(private customerService: CustomerService, private saleService: SaleService,
    private route: ActivatedRoute, private documentService: DocumentService) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.queryParamMap.get('id');
    console.log(this.route.snapshot.queryParamMap.get('id'));

    // let id = this.route.snapshot.paramMap.get('id');
    this.personalDetail = await this.customerService.getCustomerDetail('303dc87f-c7a8-473b-84c6-570174f3863c');
    this.quote = await this.saleService.getQuote(this.id);
    if (this.quote.data.attributes.actions.GenerateDocument.isAllowed) {
      await this.saleService.generateDocument({
        data: {
          attributes: {
            quoteId: this.id,
            sendEmail: false
          },
          type: 'generateQuoteDocumentRequests'
        }
      })
      await this.wait(3000);
      this.quote = await this.saleService.getQuote(this.id);
    }
  }
  wait(value) {
    return new Promise((res) => {
      setTimeout(() => res(true), value);
    })
  }
  convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
    let reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      let result = reader.result.toString();
      let commaPos = result.indexOf(',');
      resolve(result.substr(commaPos + 1));
    };
    reader.readAsDataURL(blob);
  })

  async viewDocument() {
    let documentDetail = await this.documentService.downloadDocument(this.quote.data.attributes.documentId);
    // convertBlobToBase64(documentDetail);
    const url= window.URL.createObjectURL(documentDetail);
    window.open(url);
  
    console.log(documentDetail)
  }

}
