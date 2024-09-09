const swup = new Swup();

let scrollPos = 0;
let state = 'down';
const colorP1 = ['#a3ad84','#c7c8a1','#abb880'];
const colorP2 = ['#788456','#aaac69','#7f943a'];
const colorP3 = ['#4b5b1b','#717346','#556327'];

const btnTop = document.querySelector('#GoUp');
const header = document.querySelector('header');
const showcase = document.querySelector('.showcase');
const homePage = document.querySelectorAll('.linkHome');
const videoPage = document.querySelectorAll('.linkVideos');
const aboutPage = document.querySelectorAll('.linkAbout');
const linkHeader = document.querySelectorAll('.initialH');
const linkFooter = document.querySelectorAll('.initialF');
let selectLeft = '';
let selectRight = '';
let P1Elem = '';
let P2Elem = '';
let P3Elem = '';
let colorPuntos = '';
let highVidSec = '';
let spaceVidSec = '';

/* Activate the Go Up Button */
btnTop.addEventListener('click',goTop);

/* Ables the scroll reading */
window.addEventListener('scroll',direction);
window.onscroll = function() {scrollHeader(), heightVidSec()};
window.onresize = function() {heightVidSec()};

window.addEventListener('load',addEvent);
swup.hooks.on('page:view',addEvent);

/* Initialize variables each change of page */
function addEvent(e){
    console.log('Se cargaron las variables y eventos');
    anchorTagColor();
    selectLeft = document.querySelectorAll('.pos-selec-l');
    selectRight = document.querySelectorAll('.pos-selec-r');
    P1Elem = document.querySelectorAll('.P1');
    P2Elem = document.querySelectorAll('.P2');
    P3Elem = document.querySelectorAll('.P3');
    colorPuntos = document.querySelectorAll('.Puntos');
    highVidSec = document.querySelector('#vid-sec');
    spaceVidSec = document.querySelector('#space');
    selectLeft.forEach(left => left.addEventListener('click', selectionLeft));
    selectRight.forEach(right => right.addEventListener('click', selectionRight));
    heightVidSec();
}

/* Video Selector Functions */
/*  Action when clicking the left arrow */
function selectionLeft(e){
    console.log('Recibo algo');
    if(this.id === "p1-left"){
        let posicionNueva = posiNewL(actPoint(P1Elem));
        removeDisplay(P1Elem);
        activateNew(P1Elem, posicionNueva, 0, colorP1);
    }else if(this.id === "p2-left"){
        let posicionNueva = posiNewL(actPoint(P2Elem));
        removeDisplay(P2Elem);
        activateNew(P2Elem, posicionNueva, 1, colorP2);
    }else if(this.id === "p3-left"){
        let posicionNueva = posiNewL(actPoint(P3Elem));
        removeDisplay(P3Elem);
        activateNew(P3Elem, posicionNueva, 2, colorP3);
    }
}
/*  Action when clicking the right arrow */
function selectionRight(e){
    console.log('Recibo algo');
    if(this.id === "p1-right"){
        let posicionNueva = posiNewR(actPoint(P1Elem));
        removeDisplay(P1Elem);
        activateNew(P1Elem, posicionNueva, 0, colorP1);
    }else if(this.id === "p2-right"){
        let posicionNueva = posiNewR(actPoint(P2Elem));
        removeDisplay(P2Elem);
        activateNew(P2Elem, posicionNueva, 1, colorP2);
    }else if(this.id === "p3-right"){
        let posicionNueva = posiNewR(actPoint(P3Elem));
        removeDisplay(P3Elem);
        activateNew(P3Elem, posicionNueva, 2, colorP3);
    }
}
/* Get the actual position */
function actPoint(point){
    const arrayDisplay = [];
    let posi = 0;
    point.forEach(function(act){
       arrayDisplay.push({disp: getComputedStyle(act).display, pos: posi}); 
       posi ++;
    })
    const actual = arrayDisplay.filter(function(act){
        return act.disp != "none";
    });
    return actual[0].pos;
}
/* Modify the position to the left */
function posiNewL(posAct){
    let posNew = 0;
    if((posAct-1) < 0){
        posNew = 2
    }else{
        posNew = posAct - 1;
    }
    return posNew;
}
/* Modify the position to the right */
function posiNewR(posAct){
    let posNew = 0;
    if((posAct+1) > 2){
        posNew = 0
    }else{
        posNew = posAct + 1;
    }
    return posNew;
}
/* Remove all of the elements */
function removeDisplay(point){
    point.forEach(function(act){
        act.classList.remove('show');
    });
}
/* Deploy the new element */
function activateNew(point, posNew, numPos, color){
    for(let i =0; i<point.length;i++){
        if(i == posNew){
            point[i].classList.add('show');
            colorPuntos[numPos].style.background = color[i];
        }
    }
}

/* Scrolling Header Functions */
/* Get the direction of the scroll bar */
function direction(e){
    if((document.body.getBoundingClientRect()).top > scrollPos){
        state = 'up';
    }else{
        state = 'down'
    }
    scrollPos = (document.body.getBoundingClientRect()).top;
}
/* When the header needs to apear */
function scrollHeader(){
    if(document.body.scrollTop < 180 && document.documentElement.scrollTop < 180 || state==='up'){
        header.style.opacity = 1;
    }else{
        header.style.opacity = 0;
    }
}

/* Footer and Header State */
function anchorTagColor(){
    linkHeader.forEach((e) => e.style.color = '#1a1a1a')
    linkFooter.forEach((e) => e.style.color = '#FAFAF9')
    if(document.title == 'Home Page'){
        homePage.forEach((e) => e.style.color = '#95ad84')
    }else if(document.title == 'Videos Page'){
        videoPage.forEach((e) => e.style.color = '#95ad84')
    }else{
        aboutPage.forEach((e) => e.style.color = '#95ad84')
    }
}

/* Videos Section Position */

function heightVidSec(){
    const valor = document.documentElement.clientHeight;
    spaceVidSec.style.height = `${highVidSec.offsetHeight-(valor*0.121)}px`;
}

/*Button Go Up Function */
function goTop(){
    window.scrollTo({top: 0, behavior: 'smooth'});
}

