import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { QADocumentListComponent } from './qa-document-list/qa-document-list.component';
import { Old1DocumentListComponent } from './old1-document-list/old1-document-list.component';
import { Old2DocumentListComponent } from './old2-document-list/old2-document-list.component';
import { CreateDocumentRequestComponent } from './create-document-request/create-document-request.component';
import { ApproveRejectComponent } from './approve-reject/approve-reject.component';
import { AttachedDocumentComponent } from './attached-document/attached-document.component';
import { DeadlineListComponent } from './deadline-list/deadline-list.component';
import { EnterDeadlineComponent } from './enter-deadline/enter-deadline.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ApproveRequestComponent } from './approve-request/approve-request.component';
import { CreatePricingComponent } from './CPIS/create-pricing/create-pricing.component';
import { PricingListComponent } from './CPIS/pricing-list/pricing-list.component';
import { ApproveRejectScreenComponent } from './CPIS/approve-reject-screen/approve-reject-screen.component';
import { RenegotiateScreenComponent } from './CPIS/renegotiate-screen/renegotiate-screen.component';
import { FreightRateComponent } from './CPIS/freight-rate/freight-rate.component';
import { ExchangeRateComponent } from './CPIS/exchange-rate/exchange-rate.component';
import { CreateQuotationComponent } from './CPIS/create-quotation/create-quotation.component';
import { QuotationListComponent } from './CPIS/quotation-list/quotation-list.component';
import { OutSystemQuotationComponent } from './CPIS/out-system-quotation/out-system-quotation.component';
import { CreateInvoiceComponent } from './CPIS/create-invoice/create-invoice.component';
import { RevalidatePricingComponent } from './CPIS/revalidate-pricing/revalidate-pricing.component';
import { PriceSimulationComponent } from './CPIS/price-simulation/price-simulation.component';
import { AttachDocumentComponent } from './attach-document/attach-document.component';
import { DownloadReportComponent } from './download-report/download-report.component';

const routes: Routes = [
  { path: 'create-user/:id', component: CreateUserComponent },
  { path: 'user-list', component:  UserListComponent},
  { path: 'qa-document-list', component:  QADocumentListComponent},
  { path: 'download-report', component:  DownloadReportComponent},
  { path: 'old1-document-list', component:  Old1DocumentListComponent},
  { path: 'old2-document-list', component:  Old2DocumentListComponent},
  { path: 'create-document-request', component:  CreateDocumentRequestComponent},
  { path: 'approve-reject', component:  ApproveRejectComponent},
  // { path: 'attached-document', component:  AttachedDocumentComponent},
  { path: 'attached-document', component:  AttachDocumentComponent},
  { path: 'attached-document/:id/:id1', component:  ApproveRequestComponent},
  { path: 'deadline-list', component:  DeadlineListComponent},
  { path: 'enter-deadline/:id', component:  EnterDeadlineComponent},
  { path: 'add-product/:id', component:  AddProductComponent},
  { path: 'create-pricing', component:  CreatePricingComponent},
  { path: 'pricing-list', component:  PricingListComponent},
  { path: 'approve-reject-screen', component:  ApproveRejectScreenComponent},
  { path: 'renegotiate', component:  RenegotiateScreenComponent},
  { path: 'freight-rate', component:  FreightRateComponent},
  { path: 'exchange-rate', component:  ExchangeRateComponent},
  { path: 'create-quotation', component:  CreateQuotationComponent},
  { path: 'quotation-list', component:  QuotationListComponent},
  { path: 'out-system-quotation', component:  OutSystemQuotationComponent},
  { path: 'create-invoice', component:  CreateInvoiceComponent},
  { path: 'revalidate-pricing', component:  RevalidatePricingComponent},
  { path: 'price-simulation', component:  PriceSimulationComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
