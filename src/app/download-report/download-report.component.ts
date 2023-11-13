import { Component } from '@angular/core';
import { DeadlineMasterService } from '../services/deadline-master.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.css']
})
export class DownloadReportComponent {
  generatingReport: boolean = false
  constructor(private _deadlineService: DeadlineMasterService) {}
  async generateReport(startDate: string, endDate: string): Promise<void> {
    if (startDate === '' || endDate === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Date cannot be empty!',
        confirmButtonColor: '#6259ca'
      })
      return
    }
    this.generatingReport = true
    let data: Blob = (await this._deadlineService.downloadReport(startDate, endDate)) as Blob
    let downloadURL = window.URL.createObjectURL(data);
    let link = document.createElement('a');
    link.href = downloadURL;
    link.download = `Report.xlsx`;
    link.click();
    this.generatingReport = false
  }
}
