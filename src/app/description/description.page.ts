import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.page.html',
  styleUrls: ['./description.page.scss'],
})
export class DescriptionPage implements OnInit {

  title: String;
  description: String;
  imageURL: String;

  constructor(
    private activatedRoute: ActivatedRoute,
    private utilService: UtilsService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap =>{
      if(!paramMap.has('key')){return;}
      const key = paramMap.get('key');
      this.utilService.getDescription(key).subscribe(data =>{
        this.title = data.payload.data()['title'];
        this.description = data.payload.data()['description'];
        this.imageURL = data.payload.data()['imageURL'];
      });

    })
  }

}
