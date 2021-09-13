import { Component, OnInit, AfterViewInit} from '@angular/core';
import { Preguntas } from "./../../modelos/preguntas";
import { Puntajes } from 'src/app/modelos/puntajes';
import Swal from 'sweetalert2';
import { AuthService } from "../../services/auth.service";
import { PreguntadosService } from "./../../services/preguntados.service";

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit, AfterViewInit {
  
    //Puntajes
  contadorVitorias:number = 0;
  contadorDerrotas:number = 0;
  contadorEmpates: number = 0;
  puntajes!:Puntajes;
  puntajesVista!:Puntajes;
  listaPuntajes = new Array();
  tieneDatosCargados: boolean = false;
  id: string = "";

  shuffledQuestions : any = [] //empty array to hold shuffled selected questions out of all available questions
  preguntas : Preguntas = new Preguntas();
  questions : any = [];

   questionNumber = 1
   playerScore = 0  
   wrongAttempt = 0 
   indexNumber = 0
   start : boolean = false;

  constructor(private preguntadosService : PreguntadosService, private auth:AuthService) {
    this.puntajes = new Puntajes();
    this.inicializarPuntajes();
    this.puntajes.email = localStorage.getItem("usuario");
    console.log(localStorage.getItem("usuario"));
    this.getAll();
    this.questions = this.preguntas.questions;
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.NextQuestion(0);
    console.log("check");
    
  }

 handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (this.shuffledQuestions.length <= 9) {
        const random = this.questions[Math.floor(Math.random() * this.questions.length)]
        if (!this.shuffledQuestions.includes(random)) {
            this.shuffledQuestions.push(random)
        }
    }
}


// function for displaying next question in the array to dom
 NextQuestion(index:any) {
    this.handleQuestions();
    console.log(this.shuffledQuestions[index]);
    
    const currentQuestion = this.shuffledQuestions[index];
    document.getElementById("question-number")!.innerHTML = this.questionNumber.toString();
    document.getElementById("player-score")!.innerHTML = this.playerScore.toString();
    document.getElementById("display-question")!.innerHTML = currentQuestion.question;
    document.getElementById("option-one-label")!.innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label")!.innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label")!.innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label")!.innerHTML = currentQuestion.optionD;

}


 checkForAnswer() {
    const currentQuestion = this.shuffledQuestions[this.indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options : any = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    var correctOption : any = null;

    options.forEach((option:any) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal')!.style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option:any) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption)!.style.backgroundColor = "green"
            this.playerScore++
            this.indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                this.questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId)!.style.backgroundColor = "red"
            document.getElementById(correctOption)!.style.backgroundColor = "green"
            this.wrongAttempt++
            this.indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                this.questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
 handleNextQuestion() {
    this.checkForAnswer()
    this.unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (this.indexNumber <= 9) {
            console.log("nueva pregunta: ",this.indexNumber);
            
            this.NextQuestion(this.indexNumber)
        }
        else {
            this.handleEndGame()
        }
        this.resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
 resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option:any) => {
        document.getElementById(option.labels[0].id)!.style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
 unCheckRadioButtons() {
    const options:any = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
 handleEndGame() {
    let remark = "";
    let remarkColor = "";

    // condition check for player remark and remark color
    if (this.playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing.";
        remarkColor = "red";
        this.contadorDerrotas++;
        this.puntajes.derrotas = this.contadorDerrotas.toString();
    }
    else if (this.playerScore >= 4 && this.playerScore < 7) {
        remark = "Average Grades, You can do better.";
        remarkColor = "orange";
        this.contadorEmpates++;
        this.puntajes.empate = this.contadorEmpates.toString();
    }
    else if (this.playerScore >= 7) {
        remark = "Excellent, Keep the good work going.";
        remarkColor = "green";
        this.contadorVitorias++;
        this.puntajes.victorias = this.contadorVitorias.toString();
    }
    const playerGrade = (this.playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks')!.innerHTML = remark
    document.getElementById('remarks')!.style.color = remarkColor
    document.getElementById('grade-percentage')!.innerHTML = playerGrade.toString();
    document.getElementById('wrong-answers')!.innerHTML = this.wrongAttempt.toString();
    document.getElementById('right-answers')!.innerHTML = this.playerScore.toString();
    document.getElementById('score-modal')!.style.display = "flex"

}

//closes score modal and resets game
 closeScoreModal() {
    this.questionNumber = 1
    this.playerScore = 0
    this.wrongAttempt = 0
    this.indexNumber = 0
    this.shuffledQuestions = []
    this.NextQuestion(this.indexNumber)
    document.getElementById('score-modal')!.style.display = "none"
}

//function to close warning modal
 closeOptionModal() {
     console.log(document.getElementById('option-modal'));
     
    document.getElementById('option-modal')!.style.display = "none";
}

inicializarPuntajes(){
    this.puntajes.derrotas = "0";
    this.puntajes.victorias = "0";
    this.puntajes.empate = "0";
    //Inicializa contadores
    this.contadorDerrotas = 0;
    this.contadorEmpates = 0;
    this.contadorVitorias = 0;
  }

  getAll(){
    var lista = this.preguntadosService.preguntadosRef.valueChanges({ idField: 'propertyId' })
     lista.subscribe(lista=>{
       for (var puntaje of lista) {
         if (puntaje.email == this.puntajes.email) {
           this.puntajesVista = puntaje;
           this.tieneDatosCargados = true;
           this.id = puntaje.propertyId;
           break;
         }
       }
     });       
  }

  guardar(){
    
    if(!this.tieneDatosCargados){
      this.preguntadosService.create(this.puntajes);
      console.log("guardar");
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tus partidas están guardadas',
        showConfirmButton: false,
        timer: 1500
      });
    }else{
      
      this.puntajes.victorias = (+(+this.puntajes.victorias) +(+this.puntajesVista.victorias)).toString();
      this.puntajes.derrotas = (+(+this.puntajes.derrotas) +(+this.puntajesVista.derrotas)).toString();
      this.puntajes.empate = (+(+this.puntajes.empate) +(+this.puntajesVista.empate)).toString();
      this.preguntadosService.update(this.id,this.puntajes);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tus partidas están guardadas',
        showConfirmButton: false,
        timer: 1500
      });
    }
    
    this.inicializarPuntajes();
  }

  mostrar(){
      
    if (this.puntajesVista) {
      Swal.fire({
        title: '<strong>Partidas</strong>',
        icon: 'info',
        html:
        '<table class="table"><thead><tr><th scope="col">Jugador</th><th scope="col">Victorias</th><th scope="col">Derrotas</th><th scope="col">Empates</th></tr></thead><tbody><tr><th scope="row">'+this.puntajes.email+'</th><td>'+this.puntajesVista.victorias+'</td><td>'+this.puntajesVista.derrotas+'</td><td>'+this.puntajesVista.empate+'</td></tr>',
      });
    }else{
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'No tienes partidas guardadas',
        showConfirmButton: false,
      });
    }
      
    
  }
}
