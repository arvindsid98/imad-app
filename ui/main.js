var button=document.getElementById("counter");

button.onclick=function(){
    
    var request= new XMLHttpRequest();
    
    request.onreadystatechange= function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200){
                var counter=request.responseText;
                var span=document.getElementById("count");
                span.innerHTML= count.toString();
            }
        }
        
    };
    request.open("GET","http://aravind951.imad.hasura-app.io/counter");
};

