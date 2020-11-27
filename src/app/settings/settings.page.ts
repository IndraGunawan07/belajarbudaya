import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  provinceName: any;
  constructor() { }

  ngOnInit() {
  }
  
  GetProvince(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position: Position)=>{
        console.log(position);
        const pos={
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+pos.lat+"%2C"+pos.lng+"&language=en&key=AIzaSyDya-65fMBL3dLi7gjkUHxBz-Pgf7-mK4w";
        fetch(url).then(response=> response.json()).then((data)=>{
          this.provinceName = this.GetNameProvince(data.results);
          alert(this.provinceName.long_name);
        });
        

      })
    }
  }
  GetNameProvince(results: any){
    if (results[1]) {
      for (var i=0; i<results[0].address_components.length; i++) {
        for (var b=0;b<results[0].address_components[i].types.length;b++) {
            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
              return results[0].address_components[i];
              break;
            }
        }
      }
    }
  }
}