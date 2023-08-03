import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderDataModel } from 'src/app/models/packages.model';
import { PackageService } from 'src/app/services/packages.service';
import { SeedsService } from 'src/app/services/seed.service';
import { USDTService } from 'src/app/services/usdt.service';
import { BasePage } from '../../base-page/base-page';
import { PostNavbarComponent } from '../post-navbar/post-navbar.component';

@Component({
  selector: 'app-usdt-wallet',
  templateUrl: './usdt-wallet.component.html',
  styleUrls: ['./usdt-wallet.component.scss'],
})
export class UsdtWalletComponent extends BasePage implements OnInit {
  transaction_selected = 6;
  bonusList;
  range_selected = 1;
  totalEntry: any;
  page = 1;
  entry: number;
  temptotalPages: number;
  totalPages: number;
  beforeLastPages: number;
  beforeLastEnrty: number;
  date: Date;
  today: number;
  currentDate: string;
  yesterdayDate: string;
  sevendayDate: string;
  thirtydayDate: string;
  sixtydayDate: string;
  param: string;
  type_param: string;
  displayPages = [];
  is_loading = true;
  public form: FormGroup;
  usdtOTPForm: FormGroup;
  usdtWithdrawForm: FormGroup;
  paymentUrl;
  isDepositOpen = false;
  isWithdrawOpen = false;
  entry2: number;
  submitted = false;
  otpDisabled = false;
  otp_duration = 0;
  interval;
  constructor(
    private testServ: PostNavbarComponent,
    private seedServ: SeedsService,
    injector: Injector,
    public packageService: PackageService,
    private sanitizer: DomSanitizer,
    private usdtServ: USDTService
  ) {
    super(injector);
  }

  async ngOnInit() {
    this.form = new FormGroup({
      bef_name: new FormControl('', Validators.pattern('^[0-9]*$')),
    });
    this.usdtOTPForm = new FormGroup({
      wallet_address: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });
    this.usdtWithdrawForm = new FormGroup({
      request_token: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      otp_code: new FormControl('', Validators.required),
    });
    await this.showLoadingView();
    this.is_loading = true;
    this.currentDate = new Date().toISOString().slice(0, 10);
    this.param = this.currentDate;
    this.yesterdayDate = new Date(
      new Date().getTime() - 1 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);
    this.sevendayDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    this.thirtydayDate = new Date(
      new Date().getTime() - 30 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);
    this.sixtydayDate = new Date(
      new Date().getTime() - 60 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);
    this.type_param = '6';
    // this.bonusList = await this.seedServ.userTransactionBonus(this.page,this.currentDate,this.sixtydayDate,"6");
    try {
      this.bonusList = await this.seedServ.USDTTxnList();
      this.bonusList['data'].items.sort(function (a, b) {
        return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
      });
    } catch (e) {
      console.log(e);
    }

    // console.log(this.bonusList)
    this.totalEntry = this.bonusList.data.total_item_count;
    if (this.bonusList.data.total_item_count < 20) {
      this.entry = this.bonusList.data.total_item_count;
    } else {
      this.entry = 20;
    }
    this.temptotalPages = this.bonusList.data.total_item_count / 20;
    if (Number.isInteger(this.temptotalPages) == false) {
      this.temptotalPages += 1;
    }
    this.totalPages = parseInt(this.temptotalPages.toFixed(1));
    this.beforeLastPages = this.totalPages - 1;
    for (var i = 1; this.totalPages == i; i++) {
      this.displayPages.push(i);
    }
    this.is_loading = false;
    await this.dismissLoadingView();
  }

  // async adjustTableView(page: number) {
  //   await this.showLoadingView();
  //   this.is_loading = true;
  //   this.bonusList = await this.seedServ.userTransactionBonus(
  //     this.page,
  //     this.param,
  //     this.currentDate,
  //     this.type_param
  //   );
  //   this.is_loading = false;
  //   this.dismissLoadingView();
  // }

  // async transactionChange(type) {
  //   await this.showLoadingView();
  //   this.is_loading = true;
  //   this.page = 1;
  //   this.entry = 20;
  //   this.transaction_selected = type;
  //   if (this.transaction_selected == 6) {
  //     this.transaction_selected = 6;
  //     this.type_param = '6';
  //     this.bonusList = await this.seedServ.userTransactionBonus(
  //       1,
  //       this.param,
  //       this.currentDate,
  //       this.type_param
  //     );
  //   }
  //   if (this.transaction_selected == 7) {
  //     this.transaction_selected = 7;
  //     this.type_param = '7';
  //     this.bonusList = await this.seedServ.userTransactionBonus(
  //       1,
  //       this.param,
  //       this.currentDate,
  //       this.type_param
  //     );
  //   }

  //   this.totalEntry = this.bonusList.data.total_item_count;
  //   if (this.bonusList.data.total_item_count < 20) {
  //     this.entry = this.bonusList.data.total_item_count;
  //   } else {
  //     this.entry = 20;
  //   }
  //   this.temptotalPages = this.bonusList.data.total_item_count / 20;
  //   if (Number.isInteger(this.temptotalPages) == false) {
  //     this.temptotalPages += 1;
  //   }
  //   this.totalPages = parseInt(this.temptotalPages.toFixed(1));
  //   this.beforeLastPages = this.totalPages - 1;
  //   this.displayPages = [];
  //   for (var i = 1; i <= this.totalPages; i++) {
  //     this.displayPages.push(i);
  //   }
  //   this.is_loading = false;
  //   this.dismissLoadingView();
  // }

  // async rangeChange(range) {
  //   await this.showLoadingView();
  //   this.is_loading = true;
  //   this.page = 1;
  //   this.entry = 20;
  //   this.range_selected = range;
  //   if (this.range_selected == 1) {
  //     this.param = this.currentDate;
  //     this.bonusList = await this.seedServ.userTransactionBonus(
  //       this.page,
  //       this.param,
  //       this.currentDate,
  //       this.type_param
  //     );
  //   }
  //   if (this.range_selected == 2) {
  //     this.param = this.yesterdayDate;
  //     this.bonusList = await this.seedServ.userTransactionBonus(
  //       1,
  //       this.yesterdayDate,
  //       this.yesterdayDate,
  //       this.type_param
  //     );
  //   }
  //   if (this.range_selected == 7) {
  //     this.param = this.sevendayDate;
  //     this.bonusList = await this.seedServ.userTransactionBonus(
  //       1,
  //       this.sevendayDate,
  //       this.currentDate,
  //       this.type_param
  //     );
  //   }
  //   if (this.range_selected == 30) {
  //     this.param = this.thirtydayDate;
  //     this.bonusList = await this.seedServ.userTransactionBonus(
  //       1,
  //       this.thirtydayDate,
  //       this.currentDate,
  //       this.type_param
  //     );
  //   }
  //   if (this.range_selected == 60) {
  //     this.param = this.sixtydayDate;
  //     this.bonusList = await this.seedServ.userTransactionBonus(
  //       1,
  //       this.sixtydayDate,
  //       this.currentDate,
  //       this.type_param
  //     );
  //   }
  //   this.totalEntry = this.bonusList.data.total_item_count;
  //   if (this.bonusList.data.total_item_count < 20) {
  //     this.entry = this.bonusList.data.total_item_count;
  //   } else {
  //     this.entry = 20;
  //   }
  //   this.temptotalPages = this.bonusList.data.total_item_count / 20;
  //   if (Number.isInteger(this.temptotalPages) == false) {
  //     this.temptotalPages += 1;
  //   }
  //   this.totalPages = parseInt(this.temptotalPages.toFixed(1));
  //   this.beforeLastPages = this.totalPages - 1;
  //   this.displayPages = [];
  //   for (var i = 1; i <= this.totalPages; i++) {
  //     this.displayPages.push(i);
  //   }
  //   this.is_loading = false;
  //   this.dismissLoadingView();
  // }

  // lessPage() {
  //   if (this.page > 1) {
  //     this.page -= 1;
  //     this.entry -= 20;
  //     this.adjustTableView(this.page);
  //   }
  //   if (this.page == this.beforeLastPages) {
  //     this.entry = this.beforeLastEnrty;
  //   }
  // }

  // addPage() {
  //   if (this.page < this.totalPages) {
  //     if (this.page == this.beforeLastPages) {
  //       this.beforeLastEnrty = this.entry;
  //     }
  //     this.page += 1;
  //     if (this.page == this.totalPages) {
  //       this.entry = this.totalEntry;
  //     } else {
  //       this.entry += 20;
  //     }
  //     this.adjustTableView(this.page);
  //   }
  // }

  async purchasePackage() {
    // console.log(this.form.value.bef_name);
    try {
      this.entry2 = this.form.value.bef_name;
      // this.buyingPackage = true;
      this.showLoadingView();
      const result = await this.seedServ.depositUSDT(this.form.value.bef_name);
      if (result.success) {
        this.paymentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          result.payment_url
        );
        // console.log(this.paymentUrl);
        // this.showToast(
        //   "Successfully purchased, please check your purchases under 'My Package'",
        //   3000,
        //   'top',
        //   'success'
        // );
        this.dismissLoadingView();
      }
    } catch (e) {
      console.log(e);
      this.showToast(e.error.message, 3000, 'top', 'error');
      this.dismissLoadingView();
      // this.buyingPackage = false;
    }
    this.form.reset();
  }

  async withdrawUSDT() {
    this.usdtWithdrawForm
      .get('amount')
      .patchValue(this.usdtOTPForm.get('amount').value);
    if (this.usdtWithdrawForm.valid) {
      try {
        const result: any = await this.usdtServ.withdrawConfirm(
          this.usdtWithdrawForm.get('otp_code').value,
          Number(this.usdtWithdrawForm.get('amount').value),
          this.usdtWithdrawForm.get('request_token').value
        );
        this.showToast(this.translate.instant('USDT_WITHDRAW_SUCCESS'));
        setTimeout(() => {
          this.dismissModal();
        }, 1000);
      } catch (e) {
        this.showToast(e.error.message, null, null, 'error');
      }
    } else {
      this.showToast(
        this.translate.instant('PLEASE_ENTER_A_VALID'),
        null,
        null,
        'error'
      );
    }
  }

  otpValueChange(ev) {
    this.usdtWithdrawForm.get('otp_code').patchValue(ev.target.value);
  }

  async requestOTP() {
    if (this.usdtOTPForm.valid) {
      try {
        const result: any = await this.usdtServ.withdrawOTP(
          this.usdtOTPForm.get('amount').value,
          this.usdtOTPForm.get('wallet_address').value
        );
        this.otpDisabled = true;
        this.countdownTimer();
        this.otp_duration = Number(result.data.otp_code_expiry_seconds_left);
        this.usdtWithdrawForm
          .get('request_token')
          .patchValue(result.data.request_token);
      } catch (e) {
        this.showToast(e.error.message, null, null, 'error');
      }
    } else {
      this.showToast(
        this.translate.instant('USDT_WITHDRAW_ERROR'),
        null,
        null,
        'error'
      );
    }
  }

  countdownTimer() {
    this.interval = setInterval(() => {
      if (this.otp_duration > 0) {
        this.otp_duration--;
        document.getElementById('otp_btn').innerHTML = String(
          this.otp_duration
        );
      } else {
        clearInterval(this.interval);
        this.otpDisabled = false;
        document.getElementById('otp_btn').innerHTML =
          this.translate.instant('SEND_OTP');
      }
    }, 1000);
  }

  getTxnType(id) {
    switch (id) {
      case 1:
        return this.translate.instant('DEPOSIT');
      case 2:
        return this.translate.instant('WITHDRAW');
      case 3:
        return this.translate.instant('TRANSFER_FEE');
      case 4:
        return this.translate.instant('REPLANT_FEE');
      case 5:
      case 91:
        return this.translate.instant('OTHER_DEDUCTIONS');
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
    this.paymentUrl = '';
    this.isDepositOpen = false;
    this.isWithdrawOpen = false;
    this.form.reset();
    this.testServ.ngOnInit();
    this.ngOnInit();
    this.dismissLoadingView();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById('usdtTable');
    switching = true;
    // Set the sorting direction to ascending:
    dir = 'asc';
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        let xValue = x.innerHTML.toLowerCase();
        let yValue = y.innerHTML.toLowerCase();

        switch (n) {
          case 0:
            xValue = new Date(x.innerHTML);
            yValue = new Date(y.innerHTML);
            break;
          case 1:
          case 4:
          case 5:
            xValue = x.innerHTML;
            yValue = y.innerHTML;
            break;
          case 2:
          case 3:
            parseFloat(x.innerHTML.replace(/,/g, ''));
            xValue = parseFloat(x.innerHTML.replace(/,/g, ''));
            yValue = parseFloat(y.innerHTML.replace(/,/g, ''));
            break;
        }

        let clickedTH = document.getElementById('arrows_usdt_' + n);

        if (dir == 'asc') {
          clickedTH.setAttribute('name', 'caret-down-outline');
          if (xValue > yValue) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == 'desc') {
          clickedTH.setAttribute('name', 'caret-up-outline');
          if (xValue < yValue) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      let otherTH = document.querySelectorAll('[id^=arrows_usdt_]');
      let clickedTH = document.getElementById('arrows_usdt_' + n);

      Array.from(otherTH).forEach((th) => {
        // console.log(th);
        if (th !== clickedTH) {
          th.setAttribute('hidden', 'true');
        } else {
          th.removeAttribute('hidden');
        }
      });

      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }
}
