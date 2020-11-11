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
        {image: 'https://firebasestorage.googleapis.com/v0/b/shovia-85fd5.appspot.com/o/background%2Fbg1.jpg?alt=media&token=6afff317-964b-4b80-a6be-478ecf10507e', id: '1'},
        {image: 'https://firebasestorage.googleapis.com/v0/b/shovia-85fd5.appspot.com/o/background%2Fbg2.jpg?alt=media&token=79915258-1d10-44e3-a543-24b6b8511b71', id: '2'},
        {image: 'https://firebasestorage.googleapis.com/v0/b/shovia-85fd5.appspot.com/o/background%2Fbg3.jpg?alt=media&token=acd86d70-9e4f-4a50-8e5e-511e30d05d4a', id: '3'},
        {image: 'https://firebasestorage.googleapis.com/v0/b/shovia-85fd5.appspot.com/o/background%2Fbg4.jpg?alt=media&token=b8fad3fe-74b2-41d7-95c8-d87125ac1cb0', id: '4'},
      ]
    };
  }

  ngOnInit() {
    this.categoryData = [
      {title:"Tari", image:"https://firebasestorage.googleapis.com/v0/b/shovia-85fd5.appspot.com/o/background%2Ftraditional-dance.png?alt=media&token=28f5cb99-048c-4ccc-be35-d779d68c3aab"},
      {title:"Wisata", image:"https://firebasestorage.googleapis.com/v0/b/shovia-85fd5.appspot.com/o/background%2Fpura-ulun-danu-bratan.png?alt=media&token=89a0b7aa-8583-45e6-8130-e51c601484d6"},
      {title:"Makanan", image:"https://firebasestorage.googleapis.com/v0/b/shovia-85fd5.appspot.com/o/background%2Ficons8-salad-100.png?alt=media&token=40c99a8d-2949-40e8-8b0c-d16f741e5a64"},
      {title:"Musik", image:"https://firebasestorage.googleapis.com/v0/b/shovia-85fd5.appspot.com/o/background%2Fangklung.png?alt=media&token=5beccf73-f5e1-4a3b-a3a7-ccc9da1ed638"},
      {title:"Rumah Adat", image:"https://firebasestorage.googleapis.com/v0/b/shovia-85fd5.appspot.com/o/background%2Fhouse.png?alt=media&token=576d491e-93c7-4f66-b5c9-b124f237725f"},
      {title:"Upacara Adat", image:"https://firebasestorage.googleapis.com/v0/b/shovia-85fd5.appspot.com/o/background%2FScreenshot_7-removebg-preview.png?alt=media&token=beb29b60-9bd3-4562-8c0d-6c23808a7a77"},

    ]
  }

  
}
