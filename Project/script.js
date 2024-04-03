const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies";

const dropdowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    for(currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name ==="from" && currCode==="USD"){
            newOption.selected="selected";       
        }
        else if(select.name ==="to" && currCode==="INR"){
            newOption.selected="selected";       
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);

  });
}
const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode = countryList[currCode];
    console.log(currCode);
    console.log(countryCode);
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;   
};
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector("form input");
    let amtValue = amount.value;
    if(amtValue===""||amtValue<1){
        amtValue= 1;
        amount.value="1";
    }
    const url1 = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    const url2 = `${BASE_URL}/${toCurr.value.toLowerCase()}.json`;
    let response1 = await fetch(url1);
    console.log(response1);
    let response2 = await fetch(url2);
    console.log(response2);
    let data1 = await response1.json();
    let data2 = await response2.json();
    console.log(data1);
    console.log(data2);
    let rate1 = data1[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log("rate 1",rate1);
    let rate2 = data2[toCurr.value.toLowerCase()][fromCurr.value.toLowerCase()];
    console.log("rate 2",rate2);
    console.log("Amount :",amtValue);
    let finalAmt = amtValue*rate1;
    console.log("finalAmt : ",finalAmt);
    msg.innerText=`${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    
})