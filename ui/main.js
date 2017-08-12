console.log('Loaded!');

var element=document.getElementById("main-text");
element.innerHTML="New value";

var log=document.getElementById("im");
log.onclick= function(){
    log.style.marginLeft='100px';
    
};