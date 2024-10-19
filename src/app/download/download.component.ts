import { Component, OnInit } from '@angular/core';
import { Download } from '../Model/Download/download';
import { DownloadService } from '../Model/Download/download.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css'
})
export class DownloadComponent implements OnInit {
  
  /**
   *
   */
  constructor(private doe:DownloadService) {}
  ngOnInit(): void {
    this.get();
  }

async get(){
  await this.doe.gets();
}
download(fileName: string) {
  this.doe.downloadFile(fileName).subscribe((blob: Blob) => {
    saveAs(blob, fileName);
  }, error => {
    console.error('Download failed', error);
  });
}

}
