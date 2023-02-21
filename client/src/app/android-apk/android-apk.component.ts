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
    this.router.navigate(['/landingpage']);
  }
  
  downloadApk() {
    const filepath = 'https://download1587.mediafire.com/6q8qz4y3lepg6JzwbY77ffxwzdncv8YqoTVRtOtbt546XQClQRLIfzKwWj7xVdqDxKYISvRDAeWiQbE5CNTfmBEt/4lo3dftwfpugn0e/client.apk';
    const req = new XMLHttpRequest();
    req.open('GET', filepath, true);
    req.responseType = 'blob';
  
    req.onload = () => {
      const blob = req.response;
      const file = new Blob([blob], { type: 'application/vnd.android.package-archive' });
      const fileUrl = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = 'client.apk';
      a.click();
    };
  
    req.send();
  }
}
