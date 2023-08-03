import { Component, Injector, OnInit } from '@angular/core';
import { OrderDataModel } from 'src/app/models/packages.model';
import { PackageService } from 'src/app/services/packages.service';
import { SeedsService } from 'src/app/services/seed.service';
import { BasePage } from '../../base-page/base-page';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDetailModel, UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TransferSeedDataModel } from 'src/app/models/seeds.model';

@Component({
  selector: 'app-seed-wallet',
  templateUrl: './seed-wallet.component.html',
  styleUrls: ['./seed-wallet.component.scss'],
})
export class SeedWalletComponent extends BasePage implements OnInit {
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
  ninetydayDate: string;
  param: string;
  type_param: string;
  displayPages = [];
  is_loading = true;
  public form: FormGroup;
  otp_duration = 0;
  otp_available = true;
  timerLeft = '';
  expiry_seconds_left = '';
  userDetails: UserDetailModel;
  transferSeedData: TransferSeedDataModel;
  submitted = false;

  constructor(
    private seedServ: SeedsService,
    private authService: AuthService,
    injector: Injector
  ) {
    super(injector);
  }

  async ngOnInit() {
    await this.showLoadingView();
    this.form = new FormGroup({
      recipient_username: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      otp_code: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(6),
      ]),
    });
    await this.authService.userDetails();
    this.userDetails = JSON.parse(this.authService.getUserDetails());

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
    this.ninetydayDate = new Date(
      new Date().getTime() - 90 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);
    this.type_param = '6';
    this.bonusList = await this.seedServ.userTransactionBonus(
      this.page,
      this.currentDate,
      this.currentDate,
      '6'
    );
    // console.log(this.bonusList);
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
    this.dismissLoadingView();
  }

  async adjustTableView(page: number) {
    await this.showLoadingView();
    this.is_loading = true;
    this.bonusList = await this.seedServ.userTransactionBonus(
      this.page,
      this.param,
      this.currentDate,
      this.type_param
    );
    this.is_loading = false;
    this.dismissLoadingView();
  }

  async transactionChange(type) {
    await this.showLoadingView();
    this.is_loading = true;
    this.page = 1;
    this.entry = 20;
    this.transaction_selected = type;
    if (this.transaction_selected == 1) {
      this.transaction_selected = 1;
      this.type_param = '1';
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.param,
        this.currentDate,
        this.type_param
      );
    }
    if (this.transaction_selected == 2) {
      this.transaction_selected = 2;
      this.type_param = '2';
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.param,
        this.currentDate,
        this.type_param
      );
    }
    if (this.transaction_selected == 3) {
      this.transaction_selected = 3;
      this.type_param = '3';
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.param,
        this.currentDate,
        this.type_param
      );
    }
    if (this.transaction_selected == 6) {
      this.transaction_selected = 6;
      this.type_param = '6';
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.param,
        this.currentDate,
        this.type_param
      );
    }
    if (this.transaction_selected == 7) {
      this.transaction_selected = 7;
      this.type_param = '7';
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.param,
        this.currentDate,
        this.type_param
      );
    }
    if (this.transaction_selected == 8) {
      this.transaction_selected = 8;
      this.type_param = '8';
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.param,
        this.currentDate,
        this.type_param
      );
    }
    if (this.transaction_selected == 9) {
      this.transaction_selected = 9;
      this.type_param = '9';
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.param,
        this.currentDate,
        this.type_param
      );
    }
    if (this.transaction_selected == 10) {
      this.transaction_selected = 10;
      this.type_param = '10';
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.param,
        this.currentDate,
        this.type_param
      );
    }

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
    this.displayPages = [];
    for (var i = 1; i <= this.totalPages; i++) {
      this.displayPages.push(i);
    }
    this.is_loading = false;
    this.dismissLoadingView();
  }

  async rangeChange(range) {
    await this.showLoadingView();
    this.is_loading = true;
    this.page = 1;
    this.entry = 20;
    this.range_selected = range;
    if (this.range_selected == 1) {
      this.param = this.currentDate;
      this.bonusList = await this.seedServ.userTransactionBonus(
        this.page,
        this.param,
        this.currentDate,
        this.type_param
      );
    }
    if (this.range_selected == 2) {
      this.param = this.yesterdayDate;
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.yesterdayDate,
        this.yesterdayDate,
        this.type_param
      );
    }
    if (this.range_selected == 7) {
      this.param = this.sevendayDate;
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.sevendayDate,
        this.currentDate,
        this.type_param
      );
    }
    if (this.range_selected == 30) {
      this.param = this.thirtydayDate;
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.thirtydayDate,
        this.currentDate,
        this.type_param
      );
    }
    if (this.range_selected == 60) {
      this.param = this.sixtydayDate;
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.sixtydayDate,
        this.currentDate,
        this.type_param
      );
    }
    if (this.range_selected == 90) {
      this.param = this.ninetydayDate;
      this.bonusList = await this.seedServ.userTransactionBonus(
        1,
        this.ninetydayDate,
        this.currentDate,
        this.type_param
      );
    }
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
    this.displayPages = [];
    for (var i = 1; i <= this.totalPages; i++) {
      this.displayPages.push(i);
    }
    this.is_loading = false;
    this.dismissLoadingView();
  }

  lessPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.entry -= 20;
      this.adjustTableView(this.page);
    }
    if (this.page == this.beforeLastPages) {
      this.entry = this.beforeLastEnrty;
    }
  }

  addPage() {
    if (this.page < this.totalPages) {
      if (this.page == this.beforeLastPages) {
        this.beforeLastEnrty = this.entry;
      }
      this.page += 1;
      if (this.page == this.totalPages) {
        this.entry = this.totalEntry;
      } else {
        this.entry += 20;
      }
      this.adjustTableView(this.page);
    }
  }

  async otpCode() {
    this.submitted = true;
    try {
      await this.showLoadingView();
      // console.log(this.form.value.recipient_username);
      // console.log(this.form.value.amount);
      const result: UserModel = await (
        await this.seedServ.sendOTP(
          this.form.value.recipient_username,
          this.form.value.amount
        )
      ).toPromise();
      this.otp_available = false;
      this.submitted = false;
      if (result.success) {
        //this.otp_available = false;
        this.otp_duration = Number(result.otp_code.expiry_seconds_left);
        // console.log('xxx');
        this.countdownTimer();
      } else {
        this.otp_available = true;
        this.otp_duration = Number(result.otp_code.expiry_seconds_left);
        // console.log('yyy');
        this.showToast(result.message, 3000, 'top', 'error');
      }
      this.dismissLoadingView();
    } catch (err) {
      this.showToast(
        err.error.invalid_errors
          ? err.error.invalid_errors[0]
          : err.error.message,
        3000,
        'top',
        'error'
      );
      this.dismissLoadingView();
      //console.log(err);
    }
  }

  countdownTimer() {
    setTimeout(() => {
      this.otp_available = false;
    }, this.otp_duration * 1000);

    const interval = setInterval(() => {
      if (this.otp_duration > 0) {
        this.otp_duration--;
        this.timerLeft = this.minutePipe(this.otp_duration);
        // console.log(this.timerLeft);
      } else {
        clearInterval(interval);
        this.otp_available = true;
      }
    }, 1000);
  }

  minutePipe(duration) {
    let minutes: any = Math.floor(duration / 60);
    let seconds: any = duration - minutes * 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return `${minutes} minutes ${seconds} seconds`;
  }

  async transferSeed() {
    this.submitted = true;
    try {
      await this.showLoadingView();
      if (this.form.invalid) {
        const message = await this.getTrans('INVALID_FORM');
        this.dismissLoadingView();
        return this.showToast(message, 3000, 'top', 'warning');
      }
      const result: TransferSeedDataModel = await (
        await this.seedServ.transferSeed(
          this.form.value.amount,
          this.form.value.recipient_username,
          this.form.value.otp_code
        )
      ).toPromise();
      this.submitted = false;
      // console.log(result);
      if (result.success) {
        this.showToast(
          await this.getTrans('SUCCESS_TRANSFER'),
          3000,
          'top',
          'success'
        );
        this.dismissLoadingView();
        this.onDismiss();
        this.ngOnInit();
      } else {
        // this.onDismiss();
        this.showToast(result.message, 3000, 'top', 'error');
      }
      this.dismissLoadingView();
    } catch (err) {
      this.showToast(
        err.error.invalid_errors
          ? err.error.invalid_errors[0]
          : err.error.message,
        3000,
        'top',
        'error'
      );
      this.dismissLoadingView();
      // this.onDismiss();
      console.log(err);
    }
  }
  onDismiss() {
    this.form.reset();
    this.submitted = false;
    this.otp_available = true;
    this.authService.userDetails().then(() => {
      this.authService.getSeedBalance();
      this.authService.usdtBalance();
    });
    this.modalCtrl.dismiss();
    //  this.ngOnInit();
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
    table = document.getElementById('seedsTable');
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

        let clickedTH = document.getElementById('arrows_seeds_' + n);

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
      let otherTH = document.querySelectorAll('[id^=arrows_seeds_]');
      let clickedTH = document.getElementById('arrows_seeds_' + n);

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
