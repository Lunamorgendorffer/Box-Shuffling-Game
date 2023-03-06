
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

function showReaction(type,clickedBox){
    clickedBox.classList.add(type)
    if(type !== "sucess"){
        setTimeout(function(){
            clickedBox.classList.remove(type)
        }, 800)
    }
}

const box = document.createElement("div");
box.classList.add("box");

const board = document.querySelector("#board");
let nb =1

for(let i= 1; i <= 10; i++){
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
        }
        else if ( i> nb){
            /* Si le num de la boite est sup à nb, c'st que le joueur à cliqu" une boite trop elevé*/
            showReaction ("error", newbox)
            nb = 1
            board.querySelectorAll(".box-valid").forEach (function(validBox){
                validBox.classList.remove("box-valid")
            })
        }
        else{
            /* le joueur à deja cliqué sur une boite déja grisée */
            showReaction ("notice", newbox)
        }
    })
}

shuffleChildren(board)

