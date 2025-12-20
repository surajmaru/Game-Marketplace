import { games } from "./games.js";

const noGameDiv = document.querySelector(".no-games-div");

const parent = document.querySelector(".home-div-1");

const search = document.querySelector(".top-bar-search");

const noGames = document.querySelector(".no-game-p");

const searchBtn = document.querySelector(".top-bar-search-img");

const homeBtn = document.querySelector(".top-bar-p-home");

const catBtn = document.querySelectorAll(".categories-1");

    function getRating(ratings) {
        return ratings >= 4.8 ?  "⭐⭐⭐⭐⭐ 5 Star" : 
        ratings >= 4.7 ?  "⭐⭐⭐⭐ 4 Star" : 
        ratings >= 4.6 ?  "⭐⭐⭐ 3 Star" : 
        ratings >= 4.5 ?  "⭐⭐ 2 Star" : 
        ratings >= 4.4 ?  "⭐ 1 Star" : 
        "No ratings"
    };

const gamesLoad = function(){
    parent.innerHTML = "";

    games.forEach(game => {

    const html= `
    
        <div class="home-div-2">
                <img draggable="false" class="card-img-1"  src="${game.img}">
                <div class="card-p-a card-p-a-1-1">
                    <p class="card-p-1 card-p-1-title">${game.title}</p>
                    <div class="card-p-a-1">
                        <p class="card-p-1">Price:</p>
                        <p class="card-p-1">₹ ${game.price}</p>
                    </div>
                </div>

                <div class="card-p-a card-p-a-1">
                    <p class="card-p-1">Ratings:</p>
                    <p class="card-p-1">${getRating(game.ratings)}</p>
                </div>

                <div class="card-p-a card-p-a-1">
                    <p class="card-p-1">Available on:</p>
                    <div class="card-p-a-3">
                        ${game.platform.map(p=> `<p class="card-p-1">${p}</p>`).join("")}
                    </div>
                </div>

                <div class="card-p-a card-p-a-4">
                    <p class="card-p-1 card-p-last">view</p>
                    <p class="card-p-1 card-p-last">Wishlist ❤️</p>
                    <p class="card-p-1 card-p-last">Buy Now</p>
                </div>
            </div>
    
    `;
    parent.insertAdjacentHTML("beforeend",html);


     });
};

gamesLoad();



search.addEventListener("input",(e)=>{
    const query = e.target.value.toLowerCase();
    // console.log(query);
    
    const filteredGames = games.filter(game => game.title.toLowerCase().includes(query));
    // console.log(filteredGames);

    renderGames(filteredGames);
});



function renderGames(gamesArray){
    parent.innerHTML = "";
    noGameDiv.innerHTML = "";

    const html2 = `
    <p class="no-game-p" style="text-align: center; font-size: 20px; color: white;">No Games Found!!!!</p>

    `;

    if(gamesArray.length === 0){
           noGameDiv.insertAdjacentHTML("beforeend",html2);
        }


    gamesArray.forEach(game => {

        const html = `
        <div class="home-div-2">
                <img draggable="false" class="card-img-1"  src="${game.img}">
                <div class="card-p-a card-p-a-1-1">
                    <p class="card-p-1 card-p-1-title">${game.title}</p>
                    <div class="card-p-a-1">
                        <p class="card-p-1">Price:</p>
                        <p class="card-p-1">₹ ${game.price}</p>
                    </div>
                </div>

                <div class="card-p-a card-p-a-1">
                    <p class="card-p-1">Ratings:</p>
                    <p class="card-p-1">${getRating(game.ratings)}</p>
                </div>

                <div class="card-p-a card-p-a-1">
                    <p class="card-p-1">Available on:</p>
                    <div class="card-p-a-3">
                        ${game.platform.map(p=> `<p class="card-p-1">${p}</p>`).join("")}
                    </div>
                </div>

                <div class="card-p-a card-p-a-4">
                    <p class="card-p-1 card-p-last">view</p>
                    <p class="card-p-1 card-p-last">Wishlist ❤️</p>
                    <p class="card-p-1 card-p-last">Buy Now</p>
                </div>
            </div>
        `;

        parent.insertAdjacentHTML("beforeend",html);
    
        
    });
};


homeBtn.addEventListener("click", ()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth",
    })
});




catBtn.forEach(btn => {
    btn.addEventListener("click", ()=>{
        const type = btn.dataset.category;
        console.log(type);

        const catFilterGame = type === "all" ? games : games.filter(g => g.type.includes(type));
        console.log(catFilterGame);

        catBtn.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
        
        parent.innerHTML = "";
        catFilterGame.forEach(game => {

        const html = `
        <div class="home-div-2">
                <img draggable="false" class="card-img-1"  src="${game.img}">
                <div class="card-p-a card-p-a-1-1">
                    <p class="card-p-1 card-p-1-title">${game.title}</p>
                    <div class="card-p-a-1">
                        <p class="card-p-1">Price:</p>
                        <p class="card-p-1">₹ ${game.price}</p>
                    </div>
                </div>

                <div class="card-p-a card-p-a-1">
                    <p class="card-p-1">Ratings:</p>
                    <p class="card-p-1">${getRating(game.ratings)}</p>
                </div>

                <div class="card-p-a card-p-a-1">
                    <p class="card-p-1">Available on:</p>
                    <div class="card-p-a-3">
                        ${game.platform.map(p=> `<p class="card-p-1">${p}</p>`).join("")}
                    </div>
                </div>

                <div class="card-p-a card-p-a-4">
                    <p class="card-p-1 card-p-last">view</p>
                    <p class="card-p-1 card-p-last">Wishlist ❤️</p>
                    <p class="card-p-1 card-p-last">Buy Now</p>
                </div>
            </div>
        `;

        parent.insertAdjacentHTML("beforeend",html);
        })
    });
});