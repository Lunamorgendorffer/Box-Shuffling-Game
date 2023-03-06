const box = document.createElement("div");
box.classList.add("box");

const board = document.querySelector("#board");
let nb =1

//fonction pour demander le nombre de boîtes de départ au joueur
function askNumberBoxes(){
    //On demande à l'utilisateur de saisir le nombre de boîtes qu'il souhaite utiliser pour jouer
    let numberBoxes = prompt ("Combien de boites voules vous utiliser pour jouer ?")
    while (!numberBoxes || isNaN(numberBoxes)){
        //Si l'entrée n'est pas valide, la fonction redemande à l'utilisateur de saisir un nombre valide.
        numberBoxes = prompt("Veuillez entrer un nombre valide de boites :")
    }
    return parseInt(numberBoxes)
}


function shuffleChildren(parent){
    let children = parent.children
    let i = children.length, k, temp
    while (--i > 0){ // on boucle tant que 1 oté de i est toujours positif 
        // k stocke un nombre aléatoire basé sur i
        k = Math.floor(Math.random()*(i+1))
       
        // temp pointe temporairement l'element à la position k dans board
        temp = children[k]
        //remplace l'element à la position k par l'element à la position i 
        children[k] = children[i]
        //place l'element k pointé temporairement à la fin du contenu de board
        parent.appendChild(temp)
    }
}


//Fonction pour voir la reaction des boites 
function showReaction(type,clickedBox){ // fonction prend pour argument type et clickebox
    clickedBox.classList.add(type) // ajout de la class type à clickebox
    if(type !== "sucess"){ // si type n'est pas egal à success alors 
            // la fonction settimeout defini un compte à rebours en millisecondes 
            setTimeout(function(){
            // on enleve la class type a cliked box et on défini une minutire de 800 milliseconde 
            clickedBox.classList.remove(type) 
        }, 800)
    }
}

function timer(){
    const startTime = new Date().getTime()
    let timerInterval = setInterval(() => { // fonction pour maj le timer toutes les secondes 
      const currentTime = new Date().getTime()// on prendre l'heure d'aujourd'hui 
      const elapsedTime = currentTime - startTime // diference entre l'heure de début du timer et e temps écoulé depuis que le jeux a commencé
      const seconds = Math.floor(elapsedTime / 1000) // temps converti en seconde s
      const minutes = Math.floor(seconds / 60) // temps converti en minutes
      const remainingSeconds = seconds % 60
      /*on creer une const pour afficher un timer sous forme de minutes:secondes sur la page web
      on appelle la fonction toString pour l'appliquer à la variable minute et remainingSeconds pour les convertir en chaine de caractères
      et ajouter un 0 devant si c'est inferieur à 2 caractères.
      timeString est la pour insérer les valeurs minutes et remainingSeconds dans la chaîne.
      fonction textContent est appelée sur l'élément HTML avec l'ID "timer" pour mettre à jour le contenu textuel de cet élément avec la valeur de la variable timeString. 
      Cela permet d'afficher le timer actualisé sur la page web.
      */
      const timeString = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
      document.querySelector('#timer').textContent = timeString
    }, 1000);
  
    return timerInterval
}

let timerInterval = null;


let numberBoxes = askNumberBoxes();

//On demande au joueur de spécifier le nombre de boîtes de départ qu'il souhaite,
for(let i= 1; i <= numberBoxes; i++){
    const newbox = box.cloneNode()
    newbox.innerText = i 
    board.appendChild(newbox)

    //Dès qu'on clique sur les boites, celui-ci exécutera une fonction callback
    newbox.addEventListener("click", function(){

        if (i == nb){
            newbox.classList.add ("box-valid")
            /* Si nv est egal au nbre de boite, c'est que le dernier clic était sur la derniere boite */
            if (nb == board.children.length){
                board.querySelectorAll(".box").forEach(function(box){
                    showReaction ("sucess", box)
                })
            }
            nb++
            shuffleChildren(board)
        }
        else if ( i > nb){
            /* Si le num de la boite est sup à nb, c'st que le joueur à clique une boite trop elevé*/
            showReaction ("error", newbox)
            nb = 1
            board.querySelectorAll(".box-valid").forEach (function(validBox){
                //On supprime la classe "box-valid" de toutes les boîtes valides (celles qui ont été cliquées dans le bon ordre)
                validBox.classList.remove("box-valid")
                shuffleChildren(board)
            })
        }
        else{
            /* le joueur à deja cliqué sur une boite déja grisée */
            showReaction ("notice", newbox)
            shuffleChildren(board)
        }
    })
}

shuffleChildren(board)

