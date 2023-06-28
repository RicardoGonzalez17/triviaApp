// Obtener los parámetros de consulta de la URL
const urlParams = new URLSearchParams(window.location.search);
const btnNext = document.getElementById('btnNext');
const btnTrue = document.getElementById('btnTrue');
const btnFalse = document.getElementById('btnFalse');
const backButton = document.getElementById('back');
let numberQuestion = 0;

if(backButton != null){
    backButton.addEventListener('click', ()=>{
        history.back();
    })
}

// Obtener los valores de los parámetros
debugger;
const question = urlParams.get('question');
let options = [];
for (let i = 1; i <= 2; i++) {
    const option = urlParams.get(`option${i}`);
    options.push(option);
}
// Establecer el contenido de los elementos HTML
document.getElementById('question').innerHTML = question;
let answer = null;
if(btnFalse && btnTrue != null){
    btnFalse.addEventListener('click', ()=>{
        answer = 'False';
    })
    btnTrue.addEventListener('Click', ()=>{
        answer = 'True';
    })
}
if(btnNext!= null) {
    btnNext.addEventListener('click',()=>{
        if(answer != null )
        {
            if(answer == localStorage.getItem ('correctAnswer'))
            {
                alert('Your answer is correct. You added 100 Point')
                addPoints(100);
                numberQuestion++;
                nextQuestion(numberQuestion);
            }
            else{
                alert('Your answer is incorrect')
                numberQuestion++;
                nextQuestion(numberQuestion);
            }
        }
    })
}

function addPoints(points){
    const actualPoints = localStorage.getItem('points');
    const newPoint = parseInt(actualPoints) + points
    localStorage.setItem('points', newPoint)
}

function nextQuestion(numberQuestion){
    const radioGroup = document.querySelectorAll('input[type="radio"][name="flexRadioDefault"]');

    // Desmarcar todos los elementos del grupo
    radioGroup.forEach(radio => {
    radio.checked = false;
    });
    if(numberQuestion <=9){
            document.getElementById('headnumber').innerHTML = `#${numberQuestion+1}`
            const listQuestions = JSON.parse(localStorage.getItem('listQuestions'))
            localStorage.setItem ('correctAnswer',listQuestions[numberQuestion].correct_answer)
            document.getElementById('question').innerHTML = listQuestions[numberQuestion].question;
            
            if(btnNext!= null) {
                btnNext.addEventListener('click',()=>{
                    if(answer != null )
                    {
                        if(answer == localStorage.getItem ('correctAnswer'))
                        {
                            alert('Your answer is correct. You added 100 Point')
                            addPoints();
                            numberQuestion++;
                            nextQuestion(numberQuestion);
                        }
                        else{
                            alert('Your answer is incorrect')
                        }
                    }
                })
            }
        }
        else {
            alert(`You are finish. Your Points are: ${localStorage.getItem('points')}`)
            window.location.href = './index.html'
            localStorage.clear();
        }
    }

