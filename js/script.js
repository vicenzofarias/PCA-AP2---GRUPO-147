// selecionando todos os elementos
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// quando clicar no butão iniciar
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}


// quando clicar no butão continuar

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); /// esconde o info box
    quiz_box.classList.add("activeQuiz"); // mostra o quiz
    showQuetions(0); // chama função showQuestions
    queCounter(1); // passa o primeiro parametro para queCounter
    startTimer(15); // chama função stratTimer 
    startTimerLine(0); // chama função startTimerLine
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// quando clicar no butão restartQuiz
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //mostra o quiz
    result_box.classList.remove("activeResult"); //esconde o result box
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //chama  função showQuestions 
    queCounter(que_numb); //passa o valor que_numb para queCounter
    clearInterval(counter); //limpa o counter
    clearInterval(counterLine); //limpa o counterLine
    startTimer(timeValue); //chama função startTimer
    startTimerLine(widthValue); 
    timeText.textContent = "Tempo Restante"; //muda o texto do timeText para Tempo Restante
    next_btn.classList.remove("show"); //esconde o butão next
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// quando clicar no butão next
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ // se a quantidade se questões é menor que o total de questions lenght
        que_count++; //adiciona o valor que_count
        que_numb++; //adiciona o valor que_numb
        showQuetions(que_count); // chama a função showQuestion
        queCounter(que_numb);  // passo o valor que_numb para queCounter
        clearInterval(counter); // limpa o counter
        clearInterval(counterLine); // limpa o counterLine
        startTimer(timeValue); // chama a função startTimer
        startTimerLine(widthValue); // chama a função startTimeLine
        timeText.textContent = "Tempo Restante"; //muda o texto do timeText para Tempo Restante
        next_btn.classList.remove("show"); //esconde o butão next
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); // chama a função showResult
    }
}

// pega as questões e as opções do array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //cria um novo span e uma div para questões e opções e passa o valor usando o array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adiciona um novo span dentro da que_tag
    option_list.innerHTML = option_tag; //adiciona uma nova div dentro da option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

// criando uma nova div para cada icone
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//quando clicar na opção
function optionSelected(answer){
  clearInterval(counter); // limpa o counter
  clearInterval(counterLine);  // limpa o counterLine
  let userAns = answer.textContent;  //pega a resposta do usuário
  let correcAns = questions[que_count].answer; //pega a resposta certa do array
  const allOptions = option_list.children.length; // pega todas a opções
  
  if(userAns == correcAns){ // se o user selecionar a opções certa e for igual o array de resposta
      userScore += 1; // pontos +1
      answer.classList.add("correct"); //adiciona a cor verde para a resposta certa
      answer.insertAdjacentHTML("beforeend", tickIconTag); // adiciona o icone para resposta correta selecionada
      console.log("Correct Answer");
      console.log("Your correct answers = " + userScore);
  }else{
      answer.classList.add("incorrect"); // adiciona a cor vermelha 
      answer.insertAdjacentHTML("beforeend", crossIconTag); // adiciona o icone correto para oção selecionada
      console.log("Wrong Answer");

      for(i=0; i < allOptions; i++){
          if(option_list.children[i].textContent == correcAns){ //se a opção combina com o array de resposta
              option_list.children[i].setAttribute("class", "option correct"); // adiciona a cor verde para a opção selecionada 
              option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // adiciona o icone na opção
              console.log("Auto selected correct answer.");
          }
      }
  }
  for(i=0; i < allOptions; i++){
      option_list.children[i].classList.add("disabled"); //uma vez selecionada uma opção, desabilita todas
  }
  next_btn.classList.add("show"); //mostra o next button se o usuário selecionar qualquer opção
}

function showResult(){
  info_box.classList.remove("activeInfo"); //esconde a info box
  quiz_box.classList.remove("activeQuiz"); //esconde o quiz box
  result_box.classList.add("activeResult"); //mostra o resultado
  const scoreText = result_box.querySelector(".score_text");
  if(userScore > 3){// se o usuário acertar mais de 3
    //criando uma nova tag span e passando o numeros de acertos e o total de questões
    let scoreTag = '<span>Parabéns! , Você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'!</p></span>'; 
    scoreText.innerHTML = scoreTag; // adicionando uma nova span tag dentro de score_Text
  }
  else if(userScore > 1){//se o usuário acertar mais de 1
    let scoreTag = '<span>Boa! Você acertou <p>' + userScore + '</p> de <p>' + questions.length + '!</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else{//se o usuário acertar menos de 1
    let scoreTag = '<span> Você acertou <p>' + userScore + '</p> de </p>' + questions.length + '!</p></span>'
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
      timeCount.textContent = time; /// mudando o valor de timeCounter com o valor de time
      time--;
      if(time < 9){ //se o timer é menor que 9
          let addZero = timeCount.textContent; 
          timeCount.textContent = "0" + addZero; // adiciona 0 antes to valor de time
      }
      if(time < 0){ // se o time for menor que 0
          clearInterval(counter); //limpar counter
          timeText.textContent = "Time Off"; //muda o time text para time off
          const allOptions = option_list.children.length; // pega todas a opções 
          let correcAns = questions[que_count].answer; //pega a resposta certa do array
          for(i=0; i < allOptions; i++){
              if(option_list.children[i].textContent == correcAns){ // se tiver a opção que combina com o array de resposta
                  option_list.children[i].setAttribute("class", "option correct"); // adiciona a cor verde para a opção correta
                  option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adiciona o icone a resposta
                  console.log("Time Off: Auto selected correct answer.");
              }
          }
          for(i=0; i < allOptions; i++){
              option_list.children[i].classList.add("disabled"); //uma vez que o usuário seleciona uma opção desabilita as outras
          }
          next_btn.classList.add("show"); //mostra o butão next se o usuário selecionar qualquer opção
      }
  }
}

function startTimerLine(time){
  counterLine = setInterval(timer, 29);
  function timer(){
      time += 1; //atualiza o timer com o valor 1
      time_line.style.width = time + "px"; //aumenta o tamanho da time_line com px pelo time value
      if(time > 549){ // se o time value é melhor que 549
          clearInterval(counterLine); //limpa o counterLine
      }
  }
}

function queCounter(index){
  //cria um novo span e passa o numero de questão e o total de questões
  let totalQueCounTag = '<span><p>' + index + '</span> de <p>'+ questions.length + '</p> Questões</span>';
  bottom_ques_counter.innerHTML = totalQueCounTag; // 
}