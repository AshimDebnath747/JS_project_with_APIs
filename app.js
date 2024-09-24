import {countryList}from "./codes.js";

let baseUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json`;


let dropdowns = document.querySelectorAll(".dropdown");
let btn = document.querySelector("button");
let input = document.querySelector("input");
let fromCurr = document.querySelector("#from");
let toCurr = document.querySelector("#to");
let result = document.querySelector("h3");


let valTo ;

dropdowns.forEach((dropdown)=>{
  for (let country in countryList){
      let option = document.createElement("option");
      option.innerText = country;
      option.value = country;
      if( dropdown.id == "from" && option.innerText == "INR"){
        option.selected = "selected";
      }else if( dropdown.id == "to" && option.innerText == "USD"){
        option.selected = "selected";
      }
      dropdown.append(option);
  }
  dropdown.addEventListener("change",(e)=>{
    changFlag(e.target);
  })
})

const changFlag = (element) =>{
 let currcode= element.value;
 let countryCode = countryList[currcode];
 let URL = `https://flagsapi.com/${countryCode}/flat/64.png`;
 let div = element.parentElement;
 let img = div.querySelector("img");
  img.src = URL;
}

btn.addEventListener("click",async (e)=>{
   e.preventDefault();
   let valFrom = input.value;
   if( valFrom == null || valFrom < 1){
    input.value = 100;
    valFrom = input.value;
   }
   let converter = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value}.json`);
   let data = await converter.json();
   let rate = data[toCurr.value.toLowerCase()];
   valTo = valFrom * rate;
   result.innerText = `${valFrom} ${fromCurr.value} = ${valTo} ${toCurr.value}`;
})
