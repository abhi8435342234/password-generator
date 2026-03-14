import './style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

const copybtn = document.querySelector(".copybtn");
const inputslider = document.querySelector("[data-passwordlength]");
const upper = document.querySelector(".upper");
const lower = document.querySelector(".lower");
const number = document.querySelector(".number");
const symbols = document.querySelector(".symbol");

const passwordlength = document.querySelector("[data-lengthnumber]");
const indicator = document.querySelector("[data-indicator]");
const generate = document.querySelector("[data-generatepassword]");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const passworddisplay = document.querySelector(".display-password");
const copymsg = document.querySelector("[copymsg]");

let symbol = "!@#$%^&*()_+-={}[]|:;<>,.?/~`";

let password = "";
let passwordlengthvalue = 10;
let checkcount = 0;


handleSlider();


function handleSlider(){
    inputslider.value = passwordlengthvalue;
    passwordlength.innerText = passwordlengthvalue;
}


function indicatorcolor(color){
    indicator.style.backgroundColor = color;
}


function randomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}


function renadomnumber(){
    return randomInteger(0,10);
}


function tolowercase(){
    return String.fromCharCode(randomInteger(97,123));
}


function touppercase(){
    return String.fromCharCode(randomInteger(65,91));
}


function genetateSymbol(){
    const randnum = randomInteger(0,symbol.length);
    return symbol.charAt(randnum);
}


function calcstrength(){

    let hasupper = upper.checked;
    let haslower = lower.checked;
    let hasnumber = number.checked;
    let hassymbol = symbols.checked;

    if(hasupper && haslower && (hasnumber || hassymbol) && passwordlengthvalue >= 8){
        indicatorcolor("green");
    }

    else if((hasupper || haslower) && (hasnumber || hassymbol)){
        indicatorcolor("yellow");
    }

    else{
        indicatorcolor("red");
    }

}


async function copycontent(){

    try{
        await navigator.clipboard.writeText(passworddisplay.value);
        copymsg.innerText="Copied!";
    }

    catch(e){
        copymsg.innerText="Failed!";
    }

    copymsg.classList.add("active");

    setTimeout(()=>{
        copymsg.classList.remove("active");
    },2000)

}



function handelcheckboxe(){

    checkcount=0;

    checkboxes.forEach((checkboxe)=>{
        if(checkboxe.checked){
            checkcount++;
        }
    })

    if(passwordlengthvalue<checkcount){
        passwordlengthvalue = checkcount;
        handleSlider();
    }

}



checkboxes.forEach((checkboxe)=>{
    checkboxe.addEventListener("change",handelcheckboxe);
})


inputslider.addEventListener("input",(e)=>{
    passwordlengthvalue = e.target.value;
    handleSlider();
})


copybtn.addEventListener("click",()=>{

    if(passworddisplay.value)
        copycontent();

})



function shufflepassword(arr){

    for(let i=arr.length-1;i>0;i--){

        let j = Math.floor(Math.random()*(i+1));

        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

    }

    return arr.join("");

}



generate.addEventListener("click",()=>{

    if(checkcount==0) return;

    if(passwordlengthvalue<checkcount){
        passwordlengthvalue = checkcount;
        handleSlider();
    }

    password="";

    let funcarr=[];

    if(upper.checked) funcarr.push(touppercase);
    if(lower.checked) funcarr.push(tolowercase);
    if(number.checked) funcarr.push(renadomnumber);
    if(symbols.checked) funcarr.push(genetateSymbol);


    for(let i=0;i<funcarr.length;i++){
        password += funcarr[i]();
    }


    for(let i=0;i<passwordlengthvalue-funcarr.length;i++){

        let randindex = randomInteger(0,funcarr.length);

        password += funcarr[randindex]();

    }


    password = shufflepassword(Array.from(password));


    passworddisplay.value = password;


    calcstrength();

})
