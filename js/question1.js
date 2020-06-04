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
            <div class="answers"> ${answers.join('')} </div><br>`
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
        question: "Combien de temps un recruteur passe-t-il de temps sur un CV ?",
        answers: {
          a: "20 secondes",
          b: "5 secondes",
          c: "40 secondes"
        },
        correctAnswer: "a"
      },
      {
        question: "Pour personnaliser votre CV en fonction de votre poste vous pouvez faire :",
        answers: {
          a: "Un CV Graphique pour un communicant / Un CV avec des mots clés pour un développeur / Un CV structure + version HTML pour un designer<br>",
          b: "Un CV Graphique pour un designer / Un CV avec des mots clés pour un communicant / Un CV structure + version HTML pour un développeur"
        },
        correctAnswer: "b"
      },
      {
        question: "Le CV doit contenir :",
        answers: {
          a: "Vos études et diplômes / Votre expérience professionnel / Vos compétences<br>",
          b: "Votre recherche / Vos études et diplômes / Votre expérience professionnel / Vos compétences / Vos centres d'intérêts"
        },
        correctAnswer: "b"
      },
    ];
  
    buildQuiz();
  
    submitButton.addEventListener('click', showResults);
  })();