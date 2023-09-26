import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { QADocumentListComponent } from './qa-document-list/qa-document-list.component';
import { CreateDocumentRequestComponent } from './create-document-request/create-document-request.component';
import { ApproveRejectComponent } from './approve-reject/approve-reject.component';
import { AttachedDocumentComponent } from './attached-document/attached-document.component';
import { EnterDeadlineComponent } from './enter-deadline/enter-deadline.component';
import { DeadlineListComponent } from './deadline-list/deadline-list.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './add-product/add-product.component';
import { DatePipe } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ApproveRequestComponent } from './approve-request/approve-request.component';

import { NgChartsModule } from 'ng2-charts';
import { CreatePricingComponent } from './CPIS/create-pricing/create-pricing.component';
import { PricingListComponent } from './CPIS/pricing-list/pricing-list.component';
import { ApproveRejectScreenComponent } from './CPIS/approve-reject-screen/approve-reject-screen.component';
import { RenegotiateScreenComponent } from './CPIS/renegotiate-screen/renegotiate-screen.component';
import { CpisHeaderComponent } from './CPIS/cpis-header/cpis-header.component';
import { FreightRateComponent } from './CPIS/freight-rate/freight-rate.component';
import { ExchangeRateComponent } from './CPIS/exchange-rate/exchange-rate.component';
import { CreateQuotationComponent } from './CPIS/create-quotation/create-quotation.component';
import { QuotationListComponent } from './CPIS/quotation-list/quotation-list.component';
import { OutSystemQuotationComponent } from './CPIS/out-system-quotation/out-system-quotation.component';
import { CreateInvoiceComponent } from './CPIS/create-invoice/create-invoice.component';
import { RevalidatePricingComponent } from './CPIS/revalidate-pricing/revalidate-pricing.component';
import { PriceSimulationComponent } from './CPIS/price-simulation/price-simulation.component';
import { AttachDocumentComponent } from './attach-document/attach-document.component';
import { Old1DocumentListComponent } from './old1-document-list/old1-document-list.component';
import { Old2DocumentListComponent } from './old2-document-list/old2-document-list.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreateUserComponent,
    UserListComponent,
    QADocumentListComponent,
    CreateDocumentRequestComponent,
    ApproveRejectComponent,
    AttachedDocumentComponent,
    EnterDeadlineComponent,
    DeadlineListComponent,
    LoginComponent,
    AddProductComponent,
    SignupComponent,
    ApproveRequestComponent,
    CreatePricingComponent,
    PricingListComponent,
    ApproveRejectScreenComponent,
    RenegotiateScreenComponent,
    CpisHeaderComponent,
    FreightRateComponent,
    ExchangeRateComponent,
    CreateQuotationComponent,
    QuotationListComponent,
    OutSystemQuotationComponent,
    CreateInvoiceComponent,
    RevalidatePricingComponent,
    PriceSimulationComponent,
    AttachDocumentComponent,
    Old1DocumentListComponent,
    Old2DocumentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgChartsModule
  ],
  providers:[DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
