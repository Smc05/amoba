//Random number generator ***********************************
function random_number_generator(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
    }
//***********************************

var winEl = new Array();
let blockol= false;
let blockol2= false;
let foglaltak = new Array;
let player_helyzete = new Array;
let robot_helyzete = new Array;
let endcount = 0;
let choice_between_OX = 0;
//0 = O, 1 = X

var victory_sound = new Audio('audio/spark.mp3');
var tie_sound = new Audio('audio/tie.mp3');
var lose_sound = new Audio('audio/lose.mp3');

const buttons = document.querySelectorAll(".game button");
const eredmeny = document.querySelector(".eredmeny");
const eredmeny_szoveg = document.querySelector(".eredmeny h2");


const valaszt = document.querySelector(".valasztas button");
const kor_valaszt = document.querySelector(".action .kor");
const iksz_valaszt = document.querySelector(".action .iksz");
const move = document.querySelector(".movedown");
valaszt.addEventListener("click", function valaszto() { 
    kor_valaszt.classList.toggle("korvalasztas");
    iksz_valaszt.classList.toggle("ikszvalasztas");
    move.classList.toggle("move");
    eredmeny.classList.toggle("move");
});
kor_valaszt.addEventListener("click", function valaszto() { 
    kor_valaszt.classList.remove("korvalasztas");
    iksz_valaszt.classList.remove("ikszvalasztas");
    move.classList.remove("move");
    eredmeny.classList.remove("move");

    iksz_valaszt.classList.remove("selected_valasztas");
    kor_valaszt.classList.add("selected_valasztas");
    choice_between_OX = 0;
    reset()
});
iksz_valaszt.addEventListener("click", function valaszto() { 
    kor_valaszt.classList.remove("korvalasztas");
    iksz_valaszt.classList.remove("ikszvalasztas");
    move.classList.remove("move");
    eredmeny.classList.remove("move");

    iksz_valaszt.classList.add("selected_valasztas");
    kor_valaszt.classList.remove("selected_valasztas");
    choice_between_OX = 1;
    reset();
});


//Nyerési lehetőségek ***********************************
const winningcombinations = [ 
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],

    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],

    ['1', '5', '9'],
    ['3', '5', '7'],


    
]
//***********************************

//PlayerTurn ***********************************
const buttonPressed = e => {
    if (!e.target.classList.contains("foglalt") && blockol == false) {
    endcount++;

    nextRoundbutton.innerHTML = 'Új kör indítása';
    nextRoundbutton.classList.add("active");

    

    mezo = e.target;
    if (choice_between_OX == 0)
    mezo.classList.add("pressedplayer");
    else {
        mezo.classList.add("pressedbot");
    }
    mezo.classList.add("foglalt");
    mezo.classList.remove("hoverablemezo");
  
    foglaltak.push(e.target.className.substring(9,10));
    player_helyzete.push(e.target.className.substring(9,10));
    for (let i = 0; i < winningcombinations.length; i++) {
    if (winningcombinations[i].every(element => {
        return player_helyzete.includes(element);
    }))
    {
        buttons.forEach(element => {
            if (winningcombinations[i].includes(element.className.substring(9,10)))
            element.classList.add("kiemeles_o");
            console.log('asd')
        });
        playerwin();
    
    }
    }
    if (endcount == 5 && blockol == false) 
    {
        draw()
    }
    randomido = random_number_generator(3, 8) * 100;
    if (!(endcount == 5) && blockol == false) {
    setTimeout(() => {blockol = false; blockol2= false}, randomido);
    setTimeout(bot, randomido);
    blockol = true;
    blockol2= true;
    }
}
//***********************************

}
for (let gomb of buttons) {
    gomb.addEventListener("click", buttonPressed);
}


const bothelyzet = [
    [['2' , '3'], ['5' , '9'], ['4' , '7']],                  //1
    [['1' , '3'], ['5' , '8']],                               //2
    [['1' , '2'], ['7' , '5'], ['6' , '9']],                  //3
    [['1' , '7'], ['5' , '6']],                               //4
    [['2' , '8'], ['6' , '4'], ['9' , '1'], ['7' , '3']],     //5
    [['3' , '9'], ['4' , '5']],                               //6
    [['1' , '4'], ['8' , '9'], ['5' , '3']],                  //7
    [['2' , '5'], ['7' , '9']],                               //8
    [['1' , '5'], ['3' , '6'], ['7' , '8']],                  //9
]







//Robot turn ***********************************
function bot() {
    if (blockol == false) {
        let rand = 0;

        //i = lista hossza, j = elem hossza 
        // gombhelyzet elemein végig megyünk, i = index
        for (let i = 0; i < bothelyzet.length; i++) {
        for (let j = 0; j < bothelyzet[i].length; j++) {
        if (bothelyzet[i][j].every(element => {
            return robot_helyzete.includes(element);}))
    {
        var helyzet = i + 1;
        helyzet = helyzet.toString();
        console.log(helyzet);

        if (!foglaltak.includes(helyzet))
        {
        console.log('nemfoglalt')
        rand = i+1;
        }
        else {console.log('foglalt')}
        break;
    }    
    }
    }
    if (rand == undefined || rand == 0) {
        
        for (let i = 0; i < bothelyzet.length; i++) {
            for (let j = 0; j < bothelyzet[i].length; j++) {
            if (bothelyzet[i][j].every(element => {
                return player_helyzete.includes(element);}))
        {
            var helyzet = i + 1;
            helyzet = helyzet.toString();
            console.log(helyzet);
    
            if (!foglaltak.includes(helyzet))
            {
            console.log('nemfoglalt')
            rand = i+1;
            }
            else {console.log('foglalt')}
            break;
        }    
        }
        }
        



    }


    console.log(rand)
    if (rand == undefined || rand == 0) {
    rand = random_number_generator(1, 9)
    }


        for (let i = 0; i <= 9; i++)
        if (rand == i){
            valasztas = buttons[i-1];
        }

        if (!foglaltak.includes(valasztas.className.substring(9,10))) {
            if (choice_between_OX == 0)
            valasztas.classList.add("pressedbot");
            else {
                valasztas.classList.add("pressedplayer");

            }
        valasztas.classList.add("foglalt");
        valasztas.classList.remove("hoverablemezo");
        foglaltak.push(valasztas.className.substring(9,10));
        robot_helyzete.push(valasztas.className.substring(9,10));
        for (let i = 0; i < winningcombinations.length; i++) {
            if (winningcombinations[i].every(element => {
                return robot_helyzete.includes(element);
            }))
            {   
                console.log("vesztettél");
                console.log(winningcombinations[i]);
                buttons.forEach(element => {
                    if (winningcombinations[i].includes(element.className.substring(9,10)))
                    element.classList.add("kiemeles_x");
                    console.log('asd')
                });

                robotwin();
            }
            }


            

        
        }
        else {
            bot();
        }
    }

}
//next round ***********************************
const nextRoundbutton = document.querySelector(".next_round_button");
nextRoundbutton.addEventListener("click", reset)
function reset() {
    if (nextRoundbutton.classList.contains("active") && blockol2 == false) {

    nextRoundbutton.classList.remove("active");

    foglaltak = new Array;
    player_helyzete = new Array;
    robot_helyzete = new Array;
    buttons.forEach(element => {
        element.classList.remove("foglalt");
        element.classList.remove("pressedplayer");
        element.classList.remove("pressedbot");
        element.classList.add("hoverablemezo");
        element.classList.remove("kiemeles_x");
        element.classList.remove("kiemeles_o");
    });
    blockol = false;
    eredmeny.classList.add("notvisible");
    endcount = 0;
}
};

let wins = 0;
let loses = 0;

function playerwin () {
    blockol = true;
    victory_sound.play();
    eredmeny.classList.remove("notvisible");
    eredmeny_szoveg.innerHTML = "GYŐZELEM";
    eredmeny_szoveg.style.color="#22e604"
    wins++;
    document.querySelector(".wins h3").innerHTML = wins;
    nextRoundbutton.innerHTML = 'Következő kör';
    wlrcount()
}

function draw() {
endcount = 0;
blockol = true;
console.log("döntetlen");
tie_sound.play();
eredmeny.classList.remove("notvisible");
eredmeny_szoveg.innerHTML = "DÖNTETLEN";
eredmeny_szoveg.style.color="#c500c5"
nextRoundbutton.innerHTML = 'Következő kör';
}


function robotwin () {
    blockol = true;
    lose_sound.play();
    eredmeny.classList.remove("notvisible");
    eredmeny_szoveg.innerHTML = "VESZTETTÉL";
    eredmeny_szoveg.style.color="#b60000";
    loses++;
    document.querySelector(".loses h3").innerHTML = loses;
    nextRoundbutton.innerHTML = 'Következő kör';
    wlrcount()
}



function wlrcount() {
    if (loses == 0 )
    wlr_ratio = wins
    else {
    wlr_ratio = wins/loses;
    wlr_ratio = wlr_ratio.toFixed(2);
    }
    
    
    document.querySelector(".wlr h2").innerHTML = `Wlr: ${wlr_ratio}`;
}