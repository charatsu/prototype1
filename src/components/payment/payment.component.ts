import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/services/customer.service';
import { DocumentService } from 'src/services/document.service';
import { SaleService } from 'src/services/sale.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  id;
  quote;
  error = false;
  errors = [];
  personalDetail;
  constructor(private route: ActivatedRoute, private saleService: SaleService,private documentService: DocumentService,
              private customerService: CustomerService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.personalDetail = await this.customerService.getCustomerDetail('303dc87f-c7a8-473b-84c6-570174f3863c');
    this.personalDetail = this.personalDetail.Data;
    // let id = this.route.snapshot.paramMap.get('id');
    this.quote = await this.saleService.getQuote(this.id);
    this.errors = this.quote?.data.attributes.purchaseConstraints;
    console.log(this.errors);
    
    if(this.errors.length !== 0) {      
      this.error = true;
    }
    if (!this.error && this.quote.data.attributes.actions.GenerateDocument.isAllowed) {
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
  async Purchase() {    
    let completeQuote = await this.saleService.completeQuote({
      data: {
        attributes: {
          quoteId: this.id
        },
        type: 'completeQuoteRequests'
      }
    })
    let quote = await this.saleService.acceptanceQuote({
      data: {
        attributes: {
          quoteId: this.id,
          policyHolderId: '303dc87f-c7a8-473b-84c6-570174f3863c',
          acceptedVersion: completeQuote.data.attributes.version,
          paymentFrequency: 'Annually',
          paymentMethod: 'Invoice',
          policyHolderData: {
            id: this.personalDetail.Id,
            nin: this.personalDetail.SSN,
            reference: this.personalDetail.Reference,
            name: this.personalDetail.FullName,
            dateOfBirth: this.personalDetail.DateOfBirth,
            addrLine1: this.personalDetail.Addresses.find(i => i !== undefined)?.Address,
            addrPostCode: this.personalDetail.Addresses.find(i => i !== undefined)?.PostCode,
            city: this.personalDetail.Addresses.find(i => i !== undefined)?.City,
            phoneNumber: this.personalDetail.Phones.find(i => i !== undefined)?.Number,
            email: this.personalDetail.Emails.find(i => i !== undefined)?.Address,
            organizationContext: this.personalDetail.OrgContextId
          }
        },
        type: 'acceptanceRequests'
      }
    })
    this.router.navigate(['/summary'], {queryParams: {id: this.id}});

  }
}
