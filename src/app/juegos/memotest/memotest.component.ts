import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../services/http.service";
@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {
  mostrar:string = ""; 
  gameState : string = "";
   startGame = false;
   countDown = 0;
   totalTime = 0;
   shownTime = "";
   countTime = 0;
   interTime : number | null = 0;
   interCount:number = 0;
   cardsTotal = 12;	// Total cards to match (divided by 2)
   cardsArray:any= [];	// Store all card pairs
   listaPises: any= new Array();
   userLife = 4;		// Total amount of tries user gets
  //  imageDir = '../assets/img/fruits/';
  //  images = ['apple', 'strawberry', 'apple-green', 'cherry',
  // 				   'grape-green', 'grape-purple', 'peach', 'pear'];
  images:any = new Array();
   selectCard1pos = -1;	// Selected card #1 position
   selectCard1val = -1;	// Selected card #1 value
   selectCard2pos = -1;	// Selected card #2 position
   selectCard2val = -1;	// Selected card #2 value
   selectOldPosix = -1  //stored old position

   debugText = "Debug text goes here! :)";

  constructor(private servicioHttp:HttpService) { 
    this.servicioHttp.obtenerImagenes().subscribe((paises:any)=>{
        this.listaPises = paises;      
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.restartGame();   
      for (let index = 0; index < 8; index++) {
     
        this.images.push(this.listaPises[index].flag);
         
       }
       console.log(this.images);
    }, 2000);
  
   
  }
  // Function to populate cards array with
  // position and value pairs from 0 to 6
  populateCards() {
  	this.cardsArray = [];
  	var x = 0;
  	var y = 0;
  	for (var i = 0; i < this.cardsTotal; i++) {
  		// Push card to array and assign value
  		this.cardsArray.push({pos:i,val:y});
  		// Flip x to assign next card same value
  		if (x == 0) x = 1;
  		else { x = 0; y++ }
  	}
    
  }

  // Function to select a card
  selectCard(pos:any, val:any,i:any) {
    var actOne = false;
    
    // Code to select the second card
    if (this.selectCard1pos > -1 && this.selectCard2pos == -1) {
      this.selectCard2pos = pos;
      this.selectCard2val = val;
      actOne = true;
    }
  	// Code to select the first card
    if (this.selectCard1pos == -1 && !actOne) {
      this.selectCard1pos = pos;
      this.selectCard1val = val;  
      this.selectOldPosix = i;
    }
    // If we have both cards selected, check for macht or fail
    if (actOne && this.selectCard1pos > -1 && this.selectCard2pos > -1) {
      setTimeout(() => {
        // if the cards match, do this...
        if (this.selectCard1val == this.selectCard2val) {
          this.debugText = "Crads match!";
          this.cardsArray.splice(this.selectOldPosix,1,{pos:this.selectOldPosix, val:-1});
          this.cardsArray.splice(i,1,{pos:i,val:-1});
          this.resetSelects();
          this.winCon();
        }else{
          //otherwise, take a life and reset
          this.debugText = "cards no match!";
          this.userLife--;
          this.resetSelects();
          if (this.userLife <= 0 ) {
            this.restartGame();
          }
        }
        
      }, 1000);
    }
  }

    // Function to shuffle an array
    shuffle(a:any) {
      // console.log(a);
      
	    var j, x, i;
	    for (i = a.length; i; i--) {
        
        
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
      // console.log("shuffle",a);
	}
  // Function to restart game
  restartGame(){
    this.mostrar = '';
    this.gameState = 'load';
    this.startGame = false;
    this.countDown = 3;
    this.totalTime = 60;
    this.shownTime = "";
    this.countTime = 0;
    this.interCount = 0;

    this.userLife = 10;
    this.resetSelects();
    this.populateCards();
  	this.shuffle(this.cardsArray);
  	this.shuffle(this.images);

    setTimeout(() => {
      this.startGame = true;      //Actually stat the game
      this.gameState = 'init';    //Game has been initialized
    }, this.countDown*1000);

    //this will subtract 1 from countdown start time
    this.interCount = +setInterval(()=>{
      if (this.countDown<0) {
        clearInterval(this.interCount);
        this.interCount = 0;
      }else{
        this.countDown--;
      }
    },1000);
    //This timer will keep track of time once the game starts
    setTimeout(() => {
      this.interTime = +setInterval(()=>{

        if (this.countTime >= this.totalTime) {
          this.loseCon();
        }

        if (this.gameState == 'init') {
          this.countTime++;
          var minutes = Math.floor((this.totalTime-this.countTime)/60);
          var second = (this.totalTime - this.countTime)- minutes * 60;
          this.shownTime = minutes.toString()+ ":" + second.toString();
        }else{

          if (this.interTime != null) {
            clearInterval(this.interTime);
            this.interTime = null;
          }
          
        }
      },1000)
    }, this.countDown*1000+200);
  }
	// Function to reset selected cards
	resetSelects() {
		this.selectCard1pos = -1;	// Selected card #1 position
  		this.selectCard1val = -1;	// Selected card #1 value
  		this.selectCard2pos = -1;	// Selected card #2 position
  		this.selectCard2val = -1;	// Selected card #2 value
	}
  winCon(){
    var winCheck = false;
    for (let index = 0; index < this.cardsArray.length; index++) {
      
      if (this.cardsArray[index].val != -1) {
        winCheck = true;
      }
      if (winCheck == false) {
        this.gameState = 'win';
        this.mostrar = "gana";
      }
    }
    
  }
  loseCon(){
    this.gameState = 'lose';
    this.mostrar = "pierde";
  }
}
