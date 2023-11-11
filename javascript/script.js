const droplist = document.querySelectorAll(".box select")
fromcurrency = document.querySelector(".from select")
tocurrency = document.querySelector(".to select")
const getbutton = document.querySelector(".btn button")

for (let i = 0; i < droplist.length; i++) {
    for(currency_code in country_list)
    {
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "INR" ? "selected" : "";
        // console.log(currency_code);
        // creating option tag with passing currency code as text and value 
        let optiontag = `<option value="${currency_code}" ${selected} >${currency_code}</option>`;

        // Inserting option tag inside select tag
        droplist[i].insertAdjacentHTML("beforeend",optiontag);
    }

    droplist[i].addEventListener("change", e =>{
        loadFlag(e.target);
        getExchangeRate();
    });
    
}

function loadFlag(element){
    for(code in country_list)
    {
        if(code == element.value)
        {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`    
        }
    }
}

window.addEventListener("load",()=>{    
    getExchangeRate();
});

getbutton.addEventListener("click",e=>{
    e.preventDefault();  // preventing form from submitting 
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".box .icon i")
exchangeIcon.addEventListener("click",()=>{
    const temp = fromcurrency.value
    fromcurrency.value = tocurrency.value
    tocurrency.value = temp;

    loadFlag(fromcurrency);
    loadFlag(tocurrency);
    getExchangeRate();
})


function getExchangeRate(){
    const amount = document.querySelector(".from input");
    const exchangeRateTxt = document.querySelector(".to input");
    let amountval = amount.value;
    if(amountval=="" || amountval=="0"){
        amount.val="1";
        amountval=1;
    }

    let url = `https://v6.exchangerate-api.com/v6/ebafaa0af8f7d63d97a5403e/latest/${fromcurrency.value}`;
    // fetch(url).then(response => console.log(response.json()));
    fetch(url).then(response => response.json()).then(result => {
        let exchangerate = result.conversion_rates[tocurrency.value]
        // console.log(exchangerate);
        let totalExchangeValue = (amountval*exchangerate).toFixed(2);
        // console.log(totalExchangeValue);
        
        exchangeRateTxt.value= totalExchangeValue;
    }).catch(()=>{
        const box = document.querySelector(".box")
        box.style.display = "none";
        const h1 = document.querySelector(".box1 h1")
        h1.textContent = "Something went wrong";
        const box1 = document.querySelector(".box1")
        box1.style.display = "block";
    });
}