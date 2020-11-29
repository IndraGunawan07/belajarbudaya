import { Injectable } from "@angular/core";
import { Howl } from "howler";

@Injectable({
  providedIn: "root",
})
export class UtilsService {
  showDescription: boolean = true;
  sound = new Howl({
    src: ["./assets/mp3/sample.mp3"],
    loop: true,
  });
  provinceName: any;
  musicVolume: number = 100;

  constructor() {}

  getShowDescriptionStatus() {
    return this.showDescription;
  }

  switchShowDescriptionStatus() {
    this.showDescription = !this.showDescription;
  }

  playBackgroundMusic() {
    this.sound.play();
  }

  stopBackgroundMusic() {
    this.sound.stop();
  }

  getMusicVolume() {
    return this.musicVolume;
  }

  setMusicVolume(musicVolume: number) {
    this.musicVolume = musicVolume;
  }

  getProvince() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const url =
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          pos.lat +
          "%2C" +
          pos.lng +
          "&language=en&key=AIzaSyDya-65fMBL3dLi7gjkUHxBz-Pgf7-mK4w";
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            this.provinceName = this.getProvinceName(data.results);
            alert(this.provinceName.long_name);
          });
      });
    }
  }

  getProvinceName(results: any) {
    if (results[1]) {
      for (var i = 0; i < results[0].address_components.length; i++) {
        for (
          var b = 0;
          b < results[0].address_components[i].types.length;
          b++
        ) {
          if (
            results[0].address_components[i].types[b] ==
            "administrative_area_level_1"
          ) {
            return results[0].address_components[i];
          }
        }
      }
    }
  }
}
