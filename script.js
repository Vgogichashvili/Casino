//clock
function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('txt').innerHTML =  h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};
  return i;
}
document.body.style.overflowX = 'hidden';




const cardsList = document.getElementById('cardsList');
const searchBar = document.getElementById('searchBar');
let hpcards = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredcards = hpcards.filter((card) => {
        return (
            card.name.toLowerCase().includes(searchString) ||
            card.type.toLowerCase().includes(searchString)
        );
    });
    displaycards(filteredcards);
});

const loadcards = async () => {
    try {
        const res = await fetch('http://localhost:3000/data');
        hpcards = await res.json();
        displaycards(hpcards);
    } catch (err) {
        console.error(err);
    }
};

const displaycards = (cards) => {
    const htmlString = cards
        .map((card) => {
            return `
            <li class="card">
                <img src="${card.image}"></img>
                <h2>${card.name}</h2>
                <p>${card.type}</p>
            </li>
        `;
        })
        .join('');
    cardsList.innerHTML = htmlString;
};

loadcards();



//load more logic

fetch("db.json")
.then(response=> response.json())
.then(db =>{
    localStorage.setItem("db",JSON.stringify(db.data));
})

var loadMoreBtn = document.querySelector(".load-more-button");
var initalItems = 60;
var loadItems = 60;


function loadData(){
     let db = JSON.parse(localStorage.getItem("db"));
     let currentlyDisplayedItems = document.querySelectorAll(".db").length;

     let out = "";
     let counter = 0;
     for(let card of db){
        if(counter >=currentlyDisplayedItems && counter < loadItems + currentlyDisplayedItems){
            out += `
            <li class="card">
                <img src="${card.image}"></img>
                <h2>${card.name}</h2>
                <p>${card.type}</p>
            </li>`
        }
        counter ++
     }
    let div = document.createElement("div");
    cardsList.insertBefore(div,loadMoreBtn);
    div.classList.add('new-elements');
    div.innerHTML = out;

    if(document.querySelectorAll(".card").length == db.length){
        loadMoreBtn.style.display = "none";
    }
}

