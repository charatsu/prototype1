import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/services/document.service';
import { SaleService } from 'src/services/sale.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  id;
  quote;
  document = false;
  constructor(private route: ActivatedRoute, private saleService: SaleService, private documentService: DocumentService ) { }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.queryParamMap.get('id');

    // let id = this.route.snapshot.paramMap.get('id');
    this.quote = await this.saleService.getQuote(this.id);
    this.document =this.quote.data.attributes.documentId != null;
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
  }


}
