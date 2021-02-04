const correctAnswers = {};
let button = document.getElementById("searchButton");
let configForm = document.getElementById('chooseConfiguration');
let questionForm =document.getElementById('questionForm');

function enableButton(){
    button.disabled = false;
}

async function jsonParser(url) {
    try{
        const api = await fetch(url);
        if(api.status === 200 ){
            const jsonApi = await api.json();
            return jsonApi;    
        }
    }catch(error){
        questionForm.innerHTML = '<h3>Sorry something went wrong on server</h3>' 
        throw error;
    }
}

function appendHTML(data) { 
   data['results'].map(questions => {

        const section = document.createElement('section');
        questionForm.appendChild(section);
        let correctanswer =  questions.correct_answer;
        let incorrect_ans = questions.incorrect_answers;
        incorrect_ans.push(correctanswer);
        incorrect_ans.sort( () => .4 - Math.random() )

        correctAnswers[questions.question] = questions.correct_answer;

        section.innerHTML = `
            <form id="${questions.question}" class="answerForm kitxvebi">
            <h3>${questions.category}</h3>
            <h2>${questions.question}</h2>
            <h4>select answer<h4>
            
            ${incorrect_ans.map(temporary => 
            `<input id="${questions.question}" type='radio' name="answer" value="${temporary}" >
            <label >${temporary}</label>
            <br>`).join("")}
            </form>`
            
        });
        
        const submit = document.createElement('div');
        submit.setAttribute('id','quizDiv')
        questionForm.appendChild(submit); 
        submit.innerHTML = `
            <hr>
            <br>
            <button id="btn" onclick="handler()">Submit</button>
            <button id="resetBtn" onclick="resetForm()">Reset Quiz</button>
        `   
}


function handler(){
    let pasuxebi = document.querySelectorAll('input[name="answer"]:checked');
    let counter = 0;

    pasuxebi.forEach(pasuxi => {
        let kitxvaID = pasuxi.getAttribute('id');
        let correctAnswerskeys = Object.keys(correctAnswers); 
        if(correctAnswerskeys.includes(kitxvaID)){
            let correctAnswersvalue = correctAnswers[kitxvaID]
            pasuxiValue = pasuxi.getAttribute('value');
            if(correctAnswersvalue == pasuxiValue){
                counter += 1;
            }
        }  
    });
    
    alert("You answered correctly " + counter + " times")
};

button.addEventListener('click',(event) => {
    let selectDiff = document.querySelector('input[name="question"]:checked').value;
    let categoryValue = document.getElementById('category').value;
    let xhr;


    if(categoryValue == 'Any category'){
        xhr = ("https://opentdb.com/api.php?amount=10&difficulty="+selectDiff);
    }else{
        xhr = ("https://opentdb.com/api.php?amount=10&category="+categoryValue+"&difficulty="+selectDiff);
    }
    
    jsonParser(xhr)
    .then(data => appendHTML(data))
    .catch(err => console.log(err))
    configForm.style.display = 'none';
    
});

function resetForm(){
    document.querySelectorAll('section').forEach(e => e.remove());
    let quizForm = document.getElementById('quizDiv')
    quizForm.remove();
    configForm.style.display = 'block';
}


function selectCategory(){
        let url = "https://opentdb.com/api_category.php";
        json = jsonParser(url)
        .then(data => generateOptions(data))    
}

function generateOptions(data){
    let categoryinput = document.getElementById('category');
    df = document.createDocumentFragment();

    data['trivia_categories'].forEach(element => {
            let option = document.createElement('option'); 
            option.value = element.id;
            option.appendChild(document.createTextNode(element.name));
            df.appendChild(option);
    });

    categoryinput.appendChild(df);
}