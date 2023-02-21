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
    const filepath = 'https://download1505.mediafire.com/d9ql8fz011wgEMpdJJbAAjyQqKtYD-mPLRBfRDtzFzcXRow8CdCgKVzOKtBIZi9Kyl0ImENilZ3g33PzPlcuHuoK/6pnwlewi4aus8pw/client.apk';
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
