console.log('Loaded!');

var element=document.getElementById("main-text");
element.innerHTML="New value";

var log=document.getElementById("im");
var marginLeft=0;
function moveRight() {
    marginLeft=marginLeft+10;
    log.style.marginLeft=marginLeft+'px';
}
log.onclick= function(){
    var interval=setInterval(moveRight,100);
};