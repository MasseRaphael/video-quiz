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
  
    const quizContainer = document.getElementById('quiz3');
    const resultsContainer = document.getElementById('results3');
    const submitButton = document.getElementById('submit3');
    const myQuestions = [
      {
        question: "Information nécessaire sur le CV :",
        answers: {
          a: "Nom Prénom bien lisible / date de naissance plutôt que age mais non obligatoire / adresse E-mail professionnel",
          b: "Nom Prénom bien lisible / Pseudo / adresse E-mail"
        },
        correctAnswer: "a"
      },
      {
        question: "Format de fichier recommander :",
        answers: {
          a: "MonCV.pdf et un poids de 1 Mo",
          b: "JeanConstantStagiaireResponsableMarketing.pdf et le poids du fichier importe peu",
          c: "JeanConstantStagiaireResponsableMarketing.pdf et moins de 2 Mo"
        },
        correctAnswer: "c"
      },
      {
        question: "quels sont les 3 points à retenir ?",
        answers: {
          a: "Mise en avant des compétences / Clarté de la mise en page / Pertinence des mots clés de l'offre",
          b: "Mise en avant des expériences / Belle mise en page / Des mots clés"
        },
        correctAnswer: "a"
      }
    ];
  
    buildQuiz();
  
    submitButton.addEventListener('click', showResults);
  })();