console.log('Loaded!');

var element=document.getElementById("main-text");
element.innerHTML="New value";

var log=document.getElementById("im");
var marginleft=0;
function moveright() {
    marginleft=marginleft+10;
    log.style.marginleft=marginleft+'px';
}
log.onclick= function(){
    var interval=setInterval(moveright,100);
};