const backButton = document.getElementById('back');

if (document.getElementById('btnStart') != null) {
    let btnStar = document.getElementById('btnStart')
    btnStar.addEventListener('click', async ()=> {
        window.location.href = './category.html'
        await LoadCategories();
});
}

if(backButton != null){
    backButton.addEventListener('click', ()=>{
        history.back();
    })
}

async function LoadCategories(){
    const res = await fetch ('https://opentdb.com/api_category.php')
    const data = await res.json()
    await DrawCategories(data.trivia_categories);
}

async function DrawCategories(listCategories){
    if(listCategories != null && listCategories != undefined){
        for(let x=0; x<listCategories.length; x++) {
            if(document.getElementById(`category${x+1}`) != undefined){
                let spanCategoryActual = document.getElementById(`category${x+1}`)
                spanCategoryActual.innerHTML = listCategories[x].name;
                spanCategoryActual.setAttribute('data-value', listCategories[x].id)
                spanCategoryActual.addEventListener('click', async() => {
                    SetProperty('category',listCategories[x].id)
                    window.location.href = './difficultyandtype.html'
                })
            }
        };
    }
    else {
        alert('Error al intentar cargar las categorías. Vuelva a cargar la página')
    }
}

async function SetProperty(property, valueProperty){
    switch (property) {
        case 'category': localStorage.setItem('category', valueProperty)
            
            break;
        case 'difficult': localStorage.setItem('difficult', valueProperty.toLowerCase())
            
            break;
        case 'type': localStorage.setItem('type', valueProperty.toLowerCase())
            
            break;     
        case 'numbersOfQuestions': localStorage.setItem('numbersOfQuestions', valueProperty)
            
            break; 
    }
}

async function GetProperty(property){
    switch (property) {
        case 'category': return localStorage.getItem('category')
            
            break;
        case 'difficult': return localStorage.getItem('difficult')
            
            break;
        case 'type': return localStorage.getItem('type')
            
            break;     
        case 'numbersOfQuestions': return localStorage.getItem('numbersOfQuestions')
            
            break; 
    }
}

///////////////////////////////////////////////////////
if(document.getElementById('btnStarTrivia') != null) {
    let btnStarTrivia = document.getElementById('btnStarTrivia').addEventListener('click', async ()=>{
        if(document.querySelector('input[name="difficulty"]:checked').value != null && document.querySelector('input[name="type"]:checked').value != null){
            SetProperty('difficult', document.querySelector('input[name="difficulty"]:checked').value);
            SetProperty('type', document.querySelector('input[name="type"]:checked').value);
            SetProperty('numbersOfQuestions', 10);
            await LoadData();
        }
    })
}

async function DrawQuestions(data){
    if(data.length > 0)
    {
        let question = data[0].question;
        let options = [data[0].correct_answer] ;
        localStorage.setItem ('correctAnswer',data[0].correct_answer)
        localStorage.setItem ('points',0)
        localStorage.setItem('listQuestions', JSON.stringify(data))
        data[0].incorrect_answers.forEach(option => {
            options.push(option)
        });
        options.sort(function() { return Math.random() - 0.5 });
        // Codificar los datos en la URL y redirigir a la siguiente página
        const params = new URLSearchParams();
        params.append('question', question);
        options.forEach((option, index) => {
            params.append(`option${index + 1}`, option);
        });
        if(await GetProperty('type') == 'multiple'){
            window.location.href = `./multiplechoice.html?${params.toString()}`;

        }
        else if((await GetProperty('type') == 'boolean')) {

            window.location.href = `./trueorfalse.html?${params.toString()}`;

        } 
    }
    else {
        alert ('No se encontró información para la categoría, el tipo de dificultad y/o el tipo de respuestas seleccionada')
    }
    
}

async function LoadData(){
    let category = await GetProperty('category')
    let difficult = await GetProperty('difficult')
    let type = await GetProperty('type')
    let numbersOfQuestions = await GetProperty('numbersOfQuestions')

    debugger;
    const res = await fetch (`https://opentdb.com/api.php?amount=${numbersOfQuestions}&category=${category}&difficulty=${difficult}&type=${type}`)
    const data = await res.json()
    await DrawQuestions(data.results);
    
}