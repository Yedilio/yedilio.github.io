import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  array: any[] = [];
  ip: string = '';

  constructor(private service: ServiceService, private toast: ToastrService) {}

  ngOnInit(): void {}

  remove(item: any) {
    let index = this.array?.findIndex((el) => el.ip == item.ip);
    if (index > -1) {
      this.array.splice(index, 1);
      this.toast.success(item.ip + ' адрес успешно удален');
    }
  }

  searchIp() {
    if (!this.ip) {
      this.toast.warning('Введите ip адрес');
      return;
    }

    const item = this.array?.find((el) => el.ip == this.ip);

    if (item) {
      this.toast.warning(this.ip + ' адрес уже добавлен!');
      return;
    }

    this.service
      .getInfoByIp(this.ip)
      .pipe(take(1))
      .subscribe((res: any) => {
        console.log('res: ', res);
        if (res?.error) {
          this.toast.error(res.error.info);
        } else if (res?.ip) {
          this.array.push(res);
          this.toast.success(this.ip + ' успешно добавлен!');
        }
      });
  }

  getIp() {
    this.service
      .getCurrentIp()
      .pipe(take(1))
      .subscribe((res: any) => {
        this.ip = res?.ip;
        this.searchIp();
      });
  }
}
