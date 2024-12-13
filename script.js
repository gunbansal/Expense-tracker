const balance=document.getElementById("balance");
const money_plus=document.getElementById("money-plus");
const money_minus=document.getElementById("money-minus");
const list= document.getElementById("list");
const form=document.getElementById("form");
const text=document.getElementById("text");
const amount= document.getElementById("amount");

// const dummy=[
//     {id:1, text:"Flower", amount:-200},
//     {id:2, text:"Salary", amount:1000},
//     {id:3, text:"Book", amount:-300},
//     {id:4, text:"Camera", amount:600},
// ]

// let transactions=dummy;

const localStorageTransaction=JSON.parse(localStorage.getItem("transactions"));
let transactions=localStorage.getItem("transactions")!==null ? localStorageTransaction :[];


//add transaction
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim()==='' || amount.value.trim()===''){
        alert('please add text and amount');
    }
    else{
        const transaction={
            id:generateID(),
            text:text.value,
            amount:+amount.value
        }

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateLocalStorage();
        updateValues();
        text.value='';
        amount.value='';
    }
}


function generateID(){
    return Math.floor(Math.random()*1000000000);
}

function addTransactionDOM(transaction){
    const sign=transaction.amount<0 ? "-":"+";
    const item=document.createElement("li");

    item.classList.add(
        transaction.amount <0 ? "minus":"plus"
    );
    item.innerHTML=`${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onClick="deleteItem(${transaction.id})">x</button>`;

    list.appendChild(item);
}

//delete item
function deleteItem(id){
    transactions=transactions.filter((transaction)=>transaction.id!==id);
    updateLocalStorage();
    init();
}


//update values
function updateValues(){
    const amounts=transactions.map((transaction)=>transaction.amount);
    const total=amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);
    const income=amounts.filter((item)=>item>0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
    const expense=(amounts.filter((item)=>item<0).reduce((acc,item)=>(acc+=item),0)*-1).toFixed(2);

    balance.innerText=`${total}`;
    money_plus.innerText = `${income}`;
    money_minus.innerText = `${expense}`;
}


//update local storage
function updateLocalStorage(){
    localStorage.setItem(
        "transactions",JSON.stringify(transactions)
    );
}


//init app
function init(){
    list.innerHTML="";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();
form.addEventListener('submit',addTransaction);
