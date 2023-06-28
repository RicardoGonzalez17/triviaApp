// Obtener los parámetros de consulta de la URL
const urlParams = new URLSearchParams(window.location.search);
const btnNext = document.getElementById('btnNext');
let numberQuestion = 0;
const backButton = document.getElementById('back');

history.pushState(null, null, location.href);
window.addEventListener('popstate', function(event) {
  history.pushState(null, null, location.href);
});

if(backButton != null){
    backButton.addEventListener('click', ()=>{
        history.back();
    })
}

// Obtener los valores de los parámetros
const question = urlParams.get('question');
let options = [];
for (let i = 1; i <= 4; i++) {
    const option = urlParams.get(`option${i}`);
    options.push(option);
}

// Establecer el contenido de los elementos HTML
document.getElementById('question').innerHTML = question;
for (let i = 0; i < 4; i++) {
    document.querySelector(`label[for="option${i+1}"]`).innerHTML = options[i];
    let input = document.getElementById(`option${i+1}`)
    input.setAttribute('value', options[i])
}
if(btnNext!= null) {
    btnNext.addEventListener('click',()=>{
        const answer = document.querySelector('input[name="flexRadioDefault"]:checked').value
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
            options = [];
            const listQuestions = JSON.parse(localStorage.getItem('listQuestions'))
            localStorage.setItem ('correctAnswer',listQuestions[numberQuestion].correct_answer)
            options.push(listQuestions[numberQuestion].correct_answer)
            document.getElementById('question').innerHTML = listQuestions[numberQuestion].question;
            
            listQuestions[numberQuestion].incorrect_answers.forEach(option => {
                options.push(option)
            });

            options.sort(function() { return Math.random() - 0.5 });
            for (let i = 0; i < 4; i++) {
                document.querySelector(`label[for="option${i+1}"]`).innerHTML = options[i];
                let input = document.getElementById(`option${i+1}`)
                input.setAttribute('value', options[i])
            }
            if(btnNext!= null) {
                btnNext.addEventListener('click',()=>{
                    const answer = document.querySelector('input[name="flexRadioDefault"]:checked').value
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

