import { Component, OnInit } from '@angular/core';
import { NgbModule, NgbCarouselConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imagenes : any[]= [
    {name: 'slider1',
     img:'./assets/slider1.png'},
    {name: 'slider2',
    img:'./assets/slider2.png'},
    {name: 'slider4',
    img:'./assets/slider4.jpg'}
  ]
  constructor(private carouselConfig : NgbCarouselConfig) { 
    carouselConfig.interval = 4000;
  }

  ngOnInit(): void {
    
  }

 
}
