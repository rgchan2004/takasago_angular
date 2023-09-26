import { DeadlineMaster, DocumentTypeMaster } from "./deadline-master";
import { SimpleResponse } from "./simple-response";

export interface AddProduct {
    documentRefNo: number;
    salesPerson: string;
    salesPersonId: number;
    documentAttached: DocumentTypeMaster[];
    purpose: string;
    remarks: string;
    referenceDRNo: string;
    originalDRNo: string;
    referenceDocument: CDR_RefDocuments[];
    productDetails: ProductDetails[];

}
export interface ProductDetails {
    id: any;
    perfumeCode: string;
    corporateCode: string;
    sixACode: string;
    projectNo: string;
    labelName: string;
    countryName: string;
    customerName: string;
    endApplication: string;
    dosage: string;
    lotNumber: string;

}

export interface CreateDocumentRequest extends ApprovalRejectionFormBody {
    CDRID_RefNo: number;
    SalesPerson: string;
    CDR_SelectedDocumentTypes: string;
    CDR_SelectedDocumentTypeList: CDR_SelectedDocumentType[];
    Purpose: string;
    Remarks: string;
    ReferenceDRNumber: string;
    OriginalDRNumber: string;
    CDR_RefDocuments: string;
    CDR_RefDocumentsList: CDR_RefDocuments[];
    CDR_ProductDetails: string;
    CDR_ProductDetailsList: CDR_Products[];
    dtModified: string;
    dtCreated: string;
}

export interface CDR_SelectedDocumentType {
    CDR_DocID: number
    CDR_DocTypeID: number
    CDRID_RefNo: number;
    CDR_DocumentType: string;
    CDR_Deadline: string;
    CDR_AssignToDeptt: string;
    CDR_DocumentName: string;
    CDR_Remarks: string;
    dtModified: string;
    dtCreated: string;
    DocTypeOwner: string;
    isApproved: number;
    FinalApprovedBy: number;
    ApprovedBy: number;
    RejectedBy: number;
    AssignDepttAttachedDocument: string;
    AssignDepttComment: string;
    AssignDepttRemark: string;
    RejectReason: string;
    RejectRemark: string;
    CommentBy: number;
    CommentBeforeCompletion: string;
}

export interface CDR_RefDocuments {
    CDR_AttachedDocumentId: number;
    CDRID_RefNo: number;
    CDR_AttachedDocumentName: string;
    CDR_AttachedDocumentByte: string;
    CDR_DocType: string;
    CDR_AttachedDocumentBase64: string
    dtModified: string;
    dtCreated: string;
}

export interface CDR_Products {
    CDR_ProductID: number;
    CDRID_RefNo: number;
    CDR_PerfumeCode: string;
    CDR_CorporateCode: string;
    CDR_SixACode: string;
    CDR_ProjectNumber: string;
    CDR_LabelName: string;
    CDR_Country: string;
    CDR_Customer: string;
    CDR_EndApplication: string;
    CDR_Dosage: string;
    CDR_LotNumber: string;
    dtModifed: string;
    dtCreated: string;
}

export interface CDR_RequestListResponse extends CreateDocumentRequest {
    ProductList: CDR_Products[];
    ReferenceDocList: CDR_RefDocuments[];
    SelDocTypeList: CDR_SelectedDocumentType[];
}

export interface DocumentRequestList {
    CDRID_RefNo: number;
    SalesPerson: string;
    TypeOfDocument: string;
    AssignedToDeptt: string;
    ReferenceDrNumber: number;
    CDR_DocID: number;
    DocOwner: string;
    ProjectNumber: string;
    CustomerName: string;
    country: string;
    labelName: string;
    perfumerCode: string;
    Status: number;
    isShowLink: boolean;
    deadlineDays: string;
    createdDate: Date;
    targetDate: string;
    CommentBy: number;
    CommentBeforeCompletion: string;
    dtModified: Date | string;
}

export interface ApprovalRejectionFormBody {
    CDRID_RefNo: number;
    CDR_DocID: number;
    isApproved: number;
    FinalApprovedBy: number;
    ApprovedBy: number;
    RejectedBy: number;
    AssignDepttAttachedDocument: string;
    AssignDepttComment: string;
    AssignDepttRemark: string;
    RejectReason: string;
    RejectRemark: string;
}

export interface CommentBeforeCompletionFormBody {
    CDRID_RefNo: number;
    CDR_DocID: number;
    CommentBy: number;
    CommentBeforeCompletion: string;
}

export enum CDR_stages{
Pending = 0,
FinalApprovedBySS = 1,
FinalRejectedBySS = 2,
ApprovedByQA = 3,
RejectedByQA = 4,
FinalApprovedByQA = 5,
FinalRejectedByQA = 6,
ApprovedBySRA = 7,
RejectedBySRA = 8,
FinalApprovedBySRA = 9,
FinalRejectedBySRA = 10,
ApprovedByQC = 11,
RejectedByQC = 12,
ApprovedByRD = 13, //-- self approve
RejectedByRD = 14, //-- self approve

ApprovedBySS = 15,
RejectedBySS = 16,
}

export enum eApprove{
    Pending = 0,
    InProcess = 1,
    Approved = 2,
    Rejected = 3
    }

export interface CDRDocRequest extends SimpleResponse {
    CDRID_RefNo: number;
    SalesPerson: string;
    CDR_SelectedDocumentTypes: string;
    Purpose: string;
    Remarks: string;
    ReferenceDRNumber: string;
    OriginalDRNumber: string;
    CDR_RefDocuments: string;
    CDR_ProductDetails: string;
    dtModified: string;
    dtCreated: string;
    CDR_SelectedDocumentType: CDR_SelectedDocumentType;
    CDR_RefDocumentsList: CDR_RefDocuments[];
    CDR_ProductDetailsList: CDR_Products[];
    AttachedDocuments: Documents[];
}

export interface Documents {
    DocId: number;
    Doc_Name: string;
    Document: string;
    Doc_Length: string;
    Doc_Type: string;
    dtCreated: string;
    dtModified: string;
}

export interface MailSendObj {
    sendMailTo: string[];
    isCustom: boolean;
    message: string;
    subject: string;
    documentRequestNo: number;
    documentRequestType: string;
    originator: string;
    statusDate: string;
}

export interface dropdown {
    value: string;
    text: string;
}
