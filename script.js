//Obtendo todos os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");

const option_list = document.querySelector(".option_list");

// se o botão de iniciar o questionário foi clicado
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //mostrar a caixa de informação
}

// se o botão de sair for clicado
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //não mostrar a caixa de informação
}

// se o botão continue for clicado
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //não mostrar a caixa de informação
    quiz_box.classList.add("activeQuiz"); //mostrar a caixa de informação
    showQuestions(0);
    queCounter(1);
}

let que_count = 0;
let que_numb = 1;
let counter

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
//Se o botão Next for clicado
next_btn.onclick = ()=>{
    if (que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        next_btn.style.display = "none";
    }else{
        console.log("Questions completed");
        showResultBox();
    }
}

// recebendo perguntas e opções de array
function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>'+ questions[index].numb +"." + questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                     + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

function optionSelected(answer){
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns){
        userScore += 1;
        answer.classList.add("correct");
        console.log("Answer is correct");
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
    
    //se a resposta estiver incorreta, selecione automaticamente a resposta correta
        for (let i = 0; i < allOptions; i++) {  
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
            }
        }
    }
    
    //uma vez que o usuário selecionou, desabilitou todas as opções
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}
function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
}






function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_que");
    let totalQues_countTag = '<span><p>' + index +'</p>of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQues_countTag;
}