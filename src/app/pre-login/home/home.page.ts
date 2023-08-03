import { Component, OnInit, Injector } from '@angular/core';
import { BasePage } from 'src/app/base-page/base-page';
import SwiperCore, { SwiperOptions, Navigation, Pagination } from 'swiper';
import { TranslateService } from '@ngx-translate/core';
import { TotalCountModel } from 'src/app/models/home.model';
import { HomeService } from 'src/app/services/home.service';
import numberRollup from 'number-rollup';
// import { Flip } from 'number-flip';
// import ScrollReveal from 'scrollreveal';

SwiperCore.use([Navigation, Pagination]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage implements OnInit {
  //showLovetree = false;
  showEarthtree = false;
  TotalCount;
  totalTree;
  // showLovetree: boolean;
  // showEarthtree: boolean;

  swiperConfig: SwiperOptions = {
    grabCursor: !0,
    watchSlidesProgress: !0,
    loop: !0,
    loopedSlides: 5,
    slidesPerView: 'auto',
    centeredSlides: true,
    navigation: !0,
    pagination: !0,
    autoplay: {
      delay: 3000,
    },
    on: {
      progress(e: any) {
        const t = e.slides.length;
        for (let r = 0; r < e.slides.length; r += 1) {
          const o: any = e.slides[r],
            s = e.slides[r].progress,
            i = Math.abs(s);
          let n = 1;
          i > 1 && (n = 0.3 * (i - 1) + 1);
          const l = o.querySelectorAll('.carousel-slider-animate-opacity'),
            a = s * n * 50 + '%',
            c = 1 - 0.2 * i,
            d = t - Math.abs(Math.round(s));
          (o.style.transform = `translateX(${a}) scale(${c})`),
            (o.style.zIndex = d),
            (o.style.opacity = i > 3 ? 0 : 1),
            l.forEach((e) => {
              e.style.opacity = 1 - i / 3;
            });
        }
      },

      setTransition(e, t) {
        for (let r = 0; r < e.slides.length; r += 1) {
          const o: any = e.slides[r],
            s = o.querySelectorAll('.carousel-slider-animate-opacity');
          (o.style.transitionDuration = `${t}ms`),
            s.forEach((e) => {
              e.style.transitionDuration = `${t}ms`;
            });
        }
      },
    },
  };
  descText = '';
  constructor(
    injector: Injector,
    public translate: TranslateService,
    private homeService: HomeService
  ) {
    super(injector);
  }

  async ngOnInit() {
    // numberRollup();
    this.descText = await this.getTrans('BUY_SEED_PACKAGE');
    // To display data out straight away.
    const hometotalCount: any = await this.homeService.totalCountTree();
    if (hometotalCount.success) {
      this.TotalCount = Number(hometotalCount.data);
    }
    await this.homeService.totalCountTree();
    //this.totalTree = Math.round(this.data.love);
    this.totalTree = Math.round(
      Number(hometotalCount.data.total_earth_tree_count) +
        Number(hometotalCount.data.total_love_tree_count)
    );
    //alert(Number(hometotalCount.data.total_earth_tree_count))
    if (hometotalCount) {
      numberRollup({
        id: 'totalEarthTrees',
        startNumber: 0,
        endNumber: Number(hometotalCount.data.total_earth_tree_count),
        duration: 8000, // ms
        formatNumber: (s) => this.numberWithCommas(s), // optional
        easing: 'easeIn', // optional
      });
      numberRollup({
        id: 'totalLoveTrees',
        startNumber: 0,
        endNumber: Number(hometotalCount.data.total_love_tree_count),
        duration: 8000, // ms
        formatNumber: (s) => this.numberWithCommas(s), // optional
        easing: 'easeIn', // optional
      });
      numberRollup({
        id: 'totalTrees',
        startNumber: 0,
        endNumber: Number(this.totalTree),
        duration: 3000, // ms
        formatNumber: (s) => this.numberWithCommas(s), // optional
        easing: 'easeIn', // optional
      });
    }
    // ScrollReveal().reveal('.total_count');
    // ScrollReveal().reveal('.tree_plated_container')
    // console.log(document.querySelector('.flip'));
    // },1000)
    // this.showLovetree == true;
    // this.showEarthtree == false;
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  async clickTree() {
    // this.showLovetree == false;
    this.showEarthtree = false;
  }

  async clickEarthTree() {
    // this.showLovetree == false;
    this.showEarthtree = true;
    // console.log('abc');
  }

  onSwiper(swiper) {
    // console.log(swiper);
  }
  async onSlideChange(ev) {
    console.log('changed');
    const index = ev[0].realIndex;
    switch (index) {
      case 0:
        //this.descText = '1. Buy a seed package';
        this.descText = 'BUY_SEED_PACKAGE';
        break;
      case 1:
        this.descText = 'PLANT_SEEDS_ON';
        break;
      case 2:
        this.descText = 'WATER_SEEDS_30_DAYS';
        break;
      case 3:
        this.descText = 'WAIT_30_DAYS_FOR';
        break;
      case 4:
        this.descText = 'SELL_REPLANT';
        break;
      default:
        this.descText = 'BUY_SEED_PACKAGE';
        break;
    }
    document.getElementsByClassName('carousel_desc')[0].innerHTML =
      await this.getTrans(this.descText);
    // this.descText;

    // console.log('slide change', ev);
  }

  getRoadMapLang() {
    const lang = !!window.localStorage.getItem('eforest_lang')
      ? window.localStorage.getItem('eforest_lang')
      : 'en';

    switch (lang) {
      case 'en':
        return '../../../assets/images/roadmap/road-map-transparent.png';
      case 'zh_CN':
        return '../../../assets/images/roadmap/road-map-CHS.png';
      case 'vi':
        return '../../../assets/images/roadmap/road-map-VIET.png';
      case 'ms':
        return '../../../assets/images/roadmap/road-map-BM.png';
      case 'ja':
        return '../../../assets/images/roadmap/road-map-JPN.png';
      case 'id':
        return '../../../assets/images/roadmap/road-map-IND.png';
      case 'pt':
        return '../../../assets/images/roadmap/road-map-POR.png';
      case 'zh_TW':
        return '../../../assets/images/roadmap/road-map-CHT.png';
      default:
        return '../../../assets/images/roadmap/road-map-transparent.png';
    }
  }

  getGrowTreeTitleLang() {
    const lang = !!window.localStorage.getItem('eforest_lang')
      ? window.localStorage.getItem('eforest_lang')
      : 'en';

    switch (lang) {
      case 'en':
        return '../../../assets/images/img-we-grow-trees-to-save-our-earth.png';
      case 'zh_CN':
        return '../../../assets/images/We-grow-trees-to-save-our-earth-CHS.png';
      case 'vi':
        return '../../../assets/images/We-grow-trees-to-save-our-earth-VIET.png';
      case 'ms':
        return '../../../assets/images/We-grow-trees-to-save-our-earth-BM.png';
      case 'ja':
        return '../../../assets/images/Start-Your-Journey-with-eFOREST-JPN.png';
      case 'id':
        return '../../../assets/images/Start-Your-Journey-with-eFOREST-languages-IDN.png';
      case 'pt':
        return '../../../assets/images/Start-Your-Journey-with-eFOREST-languages-POR.png';
      default:
        return '../../../assets/images/img-we-grow-trees-to-save-our-earth.png';
    }
  }
}
