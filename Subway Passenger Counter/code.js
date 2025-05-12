function decrease(){
    let x = document.getElementById('counter').innerHTML;
    let num = parseInt(x);
    if(num !== 0){ num--;}
    document.getElementById('counter').innerHTML = num;

}

function increase(){
    let x = document.getElementById('counter').innerHTML;
    let num = parseInt(x);
    num++;
    document.getElementById('counter').innerHTML = num;
}

function reset(){
    document.getElementById('counter').innerHTML= "0";
}