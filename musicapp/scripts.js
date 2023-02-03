//Zenék listája 
const musiclist = [
{
    name: 'Numb',
    szerzo: 'Linking-park',
    hang: 'media/musics/Numb.mp3',
},
{
    name: 'In the End',
    szerzo: 'Linking-park',
    hang: 'media/musics/in-the-end.mp3',
},
{
    name: 'MIDDLE OF THE NIGHT',
    szerzo: 'Loveless',
    hang: 'media/musics/Loveless - MIDDLE OF THE NIGHT.mp3',
},

];
//sources
const szerzo = document.querySelector('h2');
const title = document.querySelector('h1');
const zene = document.querySelector('.zene');
const slider = document.querySelector('.slider');
const pausebutton = document.querySelector('.pause');
const pic = document.querySelector('.pic');
const currentido = document.querySelector('.currentido');

const back = document.querySelector('.back');
const forward = document.querySelector('.forward');
let el = 0
//current zene load
zene.onloadedmetadata = function () {
    slider.max = zene.duration;
    slider.value = zene.currentTime;
    durationMinutes = Math.floor(zene.duration / 60);
    durationSeconds = Math.floor(zene.duration - durationMinutes * 60);
    if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    
    document.querySelector('.maxido').innerHTML = durationMinutes + ":" + durationSeconds;
    currentido.innerHTML= `0:00`;
}




//lépkedés + maxduration

let durationMinutes = 0;
let durationSeconds = 0;

function zeneelem(){
szerzo.innerHTML = musiclist[el].szerzo;
title.innerHTML = musiclist[el].name;
zene.src = musiclist[el].hang;

if (el == musiclist.length - 1) {
forward.classList.remove('available')
}
else{
    forward.classList.add('available')
}
if (el == 0) {
    back.classList.remove('available')
    }
    else {
        back.classList.add('available')
    }
}
zeneelem()
back.addEventListener('click', () => {
if (el > 0) {
    el--;
    zeneelem()
    pause();
    resume();
    currentido.innerHTML= `${currentMinutes}:${currentSeconds}`;
}
});
forward.addEventListener('click', () => {
    if (el < musiclist.length - 1) {
        el++;
        zeneelem();
        pause();
        resume();
        currentido.innerHTML= `${currentMinutes}:${currentSeconds}`;
    }
    });



//megállitás + ido
let currentSeconds = 0;
let currentMinutes = 0;
var sor


function pause(){
    zene.pause();
    pausebutton.innerHTML = `<i class="bi bi-play-fill"></i>`;
    pic.src = 'media/music.jpg';
    if (sor >= 1) {
    clearInterval(sor);
    }
}
function resume(){
    zene.play();
    pausebutton.innerHTML = `<i class="bi bi-pause-fill"></i>`;
    pic.src = 'media/music.gif';
        sor = setInterval(() => {
        slider.value = zene.currentTime;
        //console.log(Math.floor(zene.currentTime));
        //timer
        currentMinutes = Math.floor(zene.currentTime / 60);
        currentSeconds = Math.floor(zene.currentTime - currentMinutes * 60);
        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        currentido.innerHTML= `${currentMinutes}:${currentSeconds}`;
        
        if (Math.floor(zene.currentTime) == Math.floor(zene.duration)) {
            if (el < musiclist.length - 1) {
                el++;
                zeneelem();
                pause();
                resume();
                currentido.innerHTML= `${currentMinutes}:${currentSeconds}`;
            }else {
                pause();
            }
        }
    }, 1000);
}

pausebutton.addEventListener('click', function () {
    if (!zene.paused) {
        pause()
    }
    else {
        resume();
    }
});


//slider
slider.addEventListener('change', function () {
    currentMinutes = Math.floor(slider.value / 60);
    currentSeconds = Math.floor(slider.value - currentMinutes * 60);
    if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
    currentido.innerHTML= `${currentMinutes}:${currentSeconds}`;
    zene.currentTime = slider.value;
});