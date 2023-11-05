import { Component } from '@angular/core';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.css']
})
export class DownloadReportComponent {
  generateReport(dateString: string): void {
    window.alert(dateString)
    let dateStringParts: string[] = dateString.split("/")
    let year: string = dateStringParts[2]
    let month: string = dateStringParts[0]
  }
}
