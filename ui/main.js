
//submit uname password
var submit=document.getElementById("submit_btn");
submit.onclick= function(){
    
    var request= new XMLHttpRequest();
    request.onreadystatechange= function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200){
                alert("login success!");
            }
            else if(request.status===403){
                alert("No such user!")
            }
            else if(request.status===500){
                alert("Database error!");
            }
        }
        
    };
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log(username);
    console.log(password);
    
    request.open('POST','http://aravind951.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username: username,password: password}));
    
}
