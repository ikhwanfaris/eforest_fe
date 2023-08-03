import { Component, Injector, OnInit } from '@angular/core';
import { BonusDataMainModel } from 'src/app/models/bonus.model';
import { OrderDataModel } from 'src/app/models/packages.model';
import { BonusService } from 'src/app/services/bonus.services';
import { BasePage } from '../../base-page/base-page';
@Component({
  selector: 'app-my-direct-bonus',
  templateUrl: './my-direct-bonus.component.html',
  styleUrls: ['./my-direct-bonus.component.scss'],
})
export class MyDirectBonusComponent extends BasePage implements OnInit {
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
  displayPages = [];
  is_loading = true;
  ninetydayDate: string;
  constructor(private bonusService: BonusService, injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
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
    this.ninetydayDate = new Date(
      new Date().getTime() - 90 * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10);
    this.bonusList = await this.bonusService.userDirectBonus(
      this.page,
      this.param,
      this.currentDate
    );
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
    this.bonusList = await this.bonusService.userDirectBonus(
      page,
      this.param,
      this.currentDate
    );
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
      this.bonusList = await this.bonusService.userDirectBonus(
        1,
        this.currentDate,
        this.currentDate
      );
    }
    if (this.range_selected == 2) {
      this.param = this.yesterdayDate;
      this.bonusList = await this.bonusService.userDirectBonus(
        1,
        this.yesterdayDate,
        this.yesterdayDate
      );
    }
    if (this.range_selected == 7) {
      this.param = this.sevendayDate;
      this.bonusList = await this.bonusService.userDirectBonus(
        1,
        this.sevendayDate,
        this.currentDate
      );
      // console.log(this.bonusList);
    }
    if (this.range_selected == 30) {
      this.param = this.thirtydayDate;
      this.bonusList = await this.bonusService.userDirectBonus(
        1,
        this.thirtydayDate,
        this.currentDate
      );
    }
    if (this.range_selected == 60) {
      this.param = this.sixtydayDate;
      this.bonusList = await this.bonusService.userDirectBonus(
        1,
        this.sixtydayDate,
        this.currentDate
      );
    }
    if (this.range_selected == 90) {
      this.param = this.ninetydayDate;
      this.bonusList = await this.bonusService.userDirectBonus(
        1,
        this.ninetydayDate,
        this.currentDate
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

  getPackageColor(packageName) {
    switch (packageName) {
      case 'T100':
        return '#a1d3aa';
      case 'T500':
        return '#469b6a';
      case 'T1K':
        return '#328459';
      case 'T5K':
        return '#005d4f';
      case 'T10K':
        return '#00332a';
      default:
        return '#000';
    }
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
    table = document.getElementById('directTable');
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
            xValue = parseFloat(x.innerHTML.replace(/%/g, ''));
            yValue = parseFloat(y.innerHTML.replace(/%/g, ''));
            break;
          case 2:
            xValue = parseFloat(x.innerHTML.replace(/,/g, ''));
            yValue = parseFloat(y.innerHTML.replace(/,/g, ''));
            break;
          case 3:
            xValue = xValue.split('t')[1];
            yValue = yValue.split('t')[1];

            if (xValue.includes('k')) {
              xValue = xValue.split('k')[0] + '000';
            }
            if (yValue.includes('k')) {
              yValue = yValue.split('k')[0] + '000';
            }
            xValue = Number(xValue);
            yValue = Number(yValue);
            break;
        }

        let clickedTH = document.getElementById('arrows_direct_' + n);

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
      let otherTH = document.querySelectorAll('[id^=arrows_direct_]');
      let clickedTH = document.getElementById('arrows_direct_' + n);

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
