import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-android-apk',
  templateUrl: './android-apk.component.html',
  styleUrls: ['./android-apk.component.scss'],
})
export class AndroidApkComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.downloadApk();
  }
  downloadApk() {
    const filepath = '../../../android/app/build/outputs/apk/release/client.apk';
    const req = new XMLHttpRequest();
    req.open('GET', filepath, true);
    req.responseType = 'blob';
  
    req.onload = () => {
      const blob = req.response;
      const file = new Blob([blob], { type: 'application/vnd.android.package-archive' });
      const fileUrl = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = 'client.txt';
      a.click();
    };
  
    req.send();
  }
}
