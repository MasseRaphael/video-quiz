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
    }

    var temps = 0;
    var compteur;
    var checking;
    var init = document.getElementById("initiate");
    var played = document.getElementById("player");
    var quest = document.getElementById("question1");
    var quest2 = document.getElementById("question2");

    //démarre la vidéo, initialise le compteur et met en avant le lecteur
    function start () {

        player.playVideo();

        lancerCompteur(0);

        init.style.zIndex= 0;
        quest.style.zIndex= 0;
        played.style.zIndex= 1;
        
    }

    //reprend la vidéo et reprend le compteur
    function play () {

        player.playVideo();
        lancerCompteur(temps);
        
    }

    //met en pause la vidéo et suspend le compteur
    function pause () {

        player.stopVideo();
        player.getCurrentTime();
        pauseCompteur();
    
    }
    
    //fonction qui lance le compteur
    function lancerCompteur(tempsInitial){
        temps = tempsInitial
        actualiserCompteur();
        compteur = setInterval("actualiserCompteur()",1000);
        check();
        checking = setInterval("check()",1000);
    }

    //fonction qui met en pause le compteur
    function pauseCompteur(){
        clearInterval(compteur);
        clearInterval(checking);
    }

    //fonction qui affiche le compteur
    function actualiserCompteur(){
        if (temps <= 0){
            clearInterval(compteur);
            clearInterval(checking);
        }
        var minutes = 0;
        var secondes = 0;
        minutes = parseInt((temps % 3600) / 60);
        secondes = temps % 60;
        var div = document.getElementById("timer");
        var texte = document.createTextNode(minutes + " : " +  secondes /*+ " temps : " + temps*/);

        if (div.firstChild != null){
            div.removeChild(div.firstChild);
        }div.appendChild(texte);
        temps ++; 
    }
    
    //fonction qui met en pause la vidéo et le compteur et met en avant la question
    function check() {
        if(temps === 6){
            
            player.pauseVideo();
            pauseCompteur();

            played.style.zIndex= 0;
            quest.style.zIndex= 1;
        }
        if(temps === 78){

          player.pauseVideo();
          pauseCompteur();

          played.style.zIndex= 0;
          quest.style.zIndex= 0;
          quest2.style.zIndex= 1;
        }
    }
    //fonction qui reprend la vidéo après la question
    function next() {

      player.playVideo();
      lancerCompteur(temps);

      played.style.zIndex= 1;
      quest.style.zIndex= 0;
      quest2.style.zIndex= 0;
    }