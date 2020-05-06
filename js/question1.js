//fonction pour le quiz
(function(){

    //fonction de génération du questionnaire
    function buildQuiz(){

      var output = [];
  
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          var answers = [];
  
          for(letter in currentQuestion.answers){
  
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
          );
        }
      );
  
      quizContainer.innerHTML = output.join('');
    }
    
    //fonction qui affiche les résultats
    function showResults(){
  
      var answerContainers = quizContainer.querySelectorAll('.answers');
  
      let numCorrect = 0;
  
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        if(userAnswer === currentQuestion.correctAnswer){
          numCorrect++;
  
          answerContainers[questionNumber].style.color = 'green';
        }
        else{
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      submitButton.disabled = true
      resultsContainer.innerHTML = `<button class="next" onclick="next()">Reprendre la vidéo</button>`;
    }
  
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Vous êtes chaud ?",
        answers: {
          a: "Oui à fond !!",
          b: "oh bof ..."
        },
        correctAnswer: "a"
      }
    ];
  
    buildQuiz();
  
    submitButton.addEventListener('click', showResults);
  })();