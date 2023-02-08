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
    fetch(filepath)
      .then(res => res.blob())
      .then(blob => {
        const file = new Blob([blob], { type: 'application/vnd.android.package-archive' });
        const fileUrl = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = fileUrl;
        a.download = 'client.apk';
        a.click();
      });
  }
}
