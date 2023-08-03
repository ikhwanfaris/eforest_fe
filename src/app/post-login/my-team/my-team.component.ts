import { AuthService } from './../../services/auth.service';
import { Component, Injector, ViewChild, AfterViewInit } from '@angular/core';
import { TeamDetailModel, UserDetailModel } from 'src/app/models/user.model';
import { BasePage } from 'src/app/base-page/base-page';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfileService } from 'src/app/services/profile.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.scss'],
})
export class MyTeamComponent extends BasePage implements AfterViewInit {
  submitted = false;
  userDetails: UserDetailModel;
  teamDetails: TeamDetailModel;
  downlineOne;
  downlineTwo;
  teamInfo;
  mobile = false;
  totalDownlineTwo: number;
  showDataOne: boolean = false;
  showDataTwo: boolean = false;
  showData: boolean = false;
  displayedColumns: string[] = [
    'no',
    'fullname',
    'username',
    'email',
    'country',
    'status',
    'love_tree_count',
    'earth_tree_count',
  ];

  dataSource = new MatTableDataSource();
  dataSourceTwo = new MatTableDataSource();

  constructor(
    private authService: AuthService,
    injector: Injector,
    private profileService: ProfileService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    super(injector);
  }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  async ngOnInit() {
    // console.log(this.dataSource)
    await this.authService.userDetails();
    this.userDetails = JSON.parse(this.authService.getUserDetails());
    this.teamDetails = JSON.parse(this.authService.getUserTeamDetails());
    this.downlineOne = await this.profileService.userDownlines();
    this.downlineTwo = await this.profileService.userDownlinesTwo();
    // console.log(this.downlineOne);
    // console.log(this.teamDetails);

    // console.log(this.downlineOne);
    // console.log(this.downlineOne.data.length);

    // console.log(this.downlineTwo);
    // console.log(this.downlineTwo.data.length);

    if (this.downlineOne.data.length == 0) {
      this.showData = false;
      // console.log("no data");
    } else if (this.downlineOne.data.length == undefined) {
      // console.log("got data");
      this.showDataOne = true;
      this.showData = true;
      //  console.log(this.downlineOne.data.level_1);
      //  console.log(this.downlineOne.data.level_1[0]["user_id"]);
      this.dataSource = new MatTableDataSource<Element>(
        this.downlineOne.data.level_1
      );
      if (
        this.downlineTwo.data.length == undefined ||
        this.downlineTwo.data.length == 0
      ) {
        // console.log("this.downlineTwo.data.level_2")
        // console.log(this.downlineTwo.data.level_2);
        this.showDataTwo = true;
        if (this.downlineTwo.data.level_2 == undefined) {
          this.totalDownlineTwo = 0;
        } else {
          this.totalDownlineTwo = this.downlineTwo.data.level_2.length;
        }

        // if(this.downlineTwo.data.length == undefined &&
        //   this.downlineTwo.data.level_2.length > 1){
        //           this.dataSourceTwo = new MatTableDataSource(
        //   this.downlineTwo.data.level_2
        // );
        // }
      }
    }
    if (window.innerWidth <= 1150) {
      // 768px portrait
      this.mobile = true;
    }
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
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
    table = document.getElementById('myteamTable');
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
            xValue = Number(x.innerHTML);
            yValue = Number(y.innerHTML);
            break;
          case 1:
          case 2:
          case 3:
          case 4:
            xValue = x.innerHTML;
            yValue = y.innerHTML;
            break;
          case 5:
          case 6:
          case 7:
            xValue = parseFloat(x.innerHTML.replace(/,/g, ''));
            yValue = parseFloat(y.innerHTML.replace(/,/g, ''));
            break;
        }

        let clickedTH = document.getElementById('arrows_myteam_' + n);

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
      let otherTH = document.querySelectorAll('[id^=arrows_myteam_]');
      let clickedTH = document.getElementById('arrows_myteam_' + n);

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

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
export interface Element {
  username: string;
  user_id: number;
}
