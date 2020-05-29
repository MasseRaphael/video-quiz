//création du script appelant l'API Youtube Player
var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//fonction qui gère l'iframe
var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '720',
            width: '1280',
            videoId: '13odR-0PM1o',
            /*playerVars: {
                controls: 0,
            },*/
            events: {
                'onReady': onPlayerReady,
            }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
        event.target.stopVideo();
    }

    var temps = 0;
    var compteur;
    var checking;
    var tempo = 0;
    var timerSec;
    var init = document.getElementById("initiate");
    var played = document.getElementById("player");
    var quest = document.getElementById("question1");
    var quest2 = document.getElementById("question2");
    var quest3 = document.getElementById("question3");

    //démarre la vidéo, initialise le compteur et met en avant le lecteur
    function start () {

        player.playVideo();
        
        lancerCompteur(temps);

        init.style.zIndex= 0;
        quest.style.zIndex= 0;
        played.style.zIndex= 1;
        
    }
   
    //fonction qui lance le compteur
    function lancerCompteur(tempsInitial){
        temps = tempsInitial
        actualiserCompteur();
        compteur = setInterval("actualiserCompteur()", 1);
        check();
        checking = setInterval("check()", 1000);
    }

    //fonction qui met en pause le compteur
    function pauseCompteur(){
        clearInterval(compteur);
        clearInterval(checking);
    }

    //fonction qui affiche le compteur
    function actualiserCompteur(){
        temps = Math.trunc(player.getCurrentTime()); 
       
        var minutes = 0;
        var secondes = 0;
        minutes = parseInt((temps % 3600) / 60);
        secondes = temps % 60;
        var div = document.getElementById("timer");
        var texte = document.createTextNode(minutes + " : " +  secondes + " temps : " + temps);

        if (div.firstChild != null){
            div.removeChild(div.firstChild);
        }div.appendChild(texte);
        return temps;
    }
    
    //fonction qui met en pause la vidéo et le compteur et met en avant la question
    function check() {
        
        if(temps === 198){
            
            player.pauseVideo();
            pauseCompteur();

            played.style.zIndex= 0;
            quest.style.zIndex= 1;
        }
        if(temps === 520){

          player.pauseVideo();
          pauseCompteur();

          played.style.zIndex= 0;
          quest2.style.zIndex= 1;
        }
        if(temps === 725){

            player.pauseVideo();
            pauseCompteur();
  
            played.style.zIndex= 0;
            quest3.style.zIndex= 1;
          }
          if(temps === 730){

            player.stopVideo();
            pauseCompteur();
            
          }
    }
    //fonction qui reprend la vidéo après la question
    function next() {
        
        player.playVideo();
        intQuitQuest(0);

        played.style.zIndex= 1;
        quest.style.zIndex= 0;
        quest2.style.zIndex= 0;
        quest3.style.zIndex= 0;
    }
    
    //fonction timer pour quitter la question
    function intQuitQuest(tempoInitial){
        tempo = tempoInitial;
        quitQuest();
        timerSec = setInterval('quitQuest()', 1000);
    }
    
    //fonction pour quitter la question
    function quitQuest() {
        if (tempo === 1){

            lancerCompteur(temps);
            clearInterval(timerSec);
        }
        tempo++;
    }

    //fonctions de chapitrage
    var chapterTime = 0;
    var chapterInterval;

    //fonction d'initialisation du timer de fin de chapitre
    function endChapter(chapterTimeInitial) {
        chapterTime = chapterTimeInitial;
        timerChapter();
        chapterInterval = setInterval('timerChapter()', 1);
    }

    //timer de fin de chapitre
    function timerChapter() {
        chapterTime = Math.trunc(player.getCurrentTime());
        
    }

    //fonction arrêtant le chapitre
