import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { QuizappService } from '../quizapp.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

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
  constructor(
    private quizService: QuizappService
  ) {
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
    this.quizService.getAllCategory().subscribe(data => {
      this.categoryData = data.map(e => {
        return {
          title: e.payload.doc.data()['category'],
          image: e.payload.doc.data()['imageUrl'],
        };
      });
    });
  }

  sendCategory(clickedCategory: string) {
    console.log(clickedCategory);
    // this.quizService.setCategory(clickedCategory);
  }
}
