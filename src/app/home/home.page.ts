import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  sliderOne: any;
  categoryData: any;
  slideOptions = {
    loop: true,
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true,
  };
  carousel_data: any;
  constructor() {
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        { image: 'https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageBanner%2Ftana-toraja.jpg?alt=media&token=723c747d-16d8-4070-8334-a8fac9408d8d', id: '1' },
        { image: 'https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageBanner%2Fraja-ampat.jpg?alt=media&token=b382495f-ac05-415f-b39b-3487572d4ccd', id: '2' },
        { image: 'https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageBanner%2Fpulau-komodo.jpg?alt=media&token=dd9773c8-6522-4d81-aaed-6382a1e61adb', id: '3' },
      ]
    };
  }

  ngOnInit() {
    this.categoryData = [
      { title: "Tari", image: "https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageCategory%2Ftraditional-dance.png?alt=media&token=bfa3c65f-c495-4637-b9a6-7478d609a5ad" },
      { title: "Wisata", image: "https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageCategory%2Fpura-ulun-danu-bratan.png?alt=media&token=4f73733e-2cae-4566-9def-4dfcedb3d189" },
      { title: "Makanan", image: "https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageCategory%2Ficons8-salad-100.png?alt=media&token=93e82b13-16b4-4b97-9f38-4010caff653c" },
      { title: "Musik", image: "https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageCategory%2Fangklung.png?alt=media&token=95a725a5-cab2-4946-b11b-43e7637a9a82" },
      { title: "Rumah Adat", image: "https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageCategory%2Fhouse.png?alt=media&token=d15ad5e2-33de-4295-887c-ac0b3519f00c" },
      { title: "Upacara Adat", image: "https://firebasestorage.googleapis.com/v0/b/uasionic2020.appspot.com/o/imageCategory%2FScreenshot_7-removebg-preview.png?alt=media&token=00492f50-f6ee-4eae-b80e-a4458a21b492" },

    ]
  }


}
