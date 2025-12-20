import { games } from "./games.js";

const noGameDiv = document.querySelector(".no-games-div");

const parent = document.querySelector(".home-div-1");

const search = document.querySelector(".top-bar-search");

const noGames = document.querySelector(".no-game-p");

const searchBtn = document.querySelector(".top-bar-search-img");

const homeBtn = document.querySelector(".top-bar-p-home");

const wishlistBtn = document.querySelector(".top-bar-p-wishlist");

const catDiv = document.querySelector(".categories-div");

const catDivInner = document.querySelector(".categories");

const catBtn = document.querySelectorAll(".categories-1");

const buyBtn = document.querySelector(".card-p-buy");


let wishlistArray = JSON.parse(localStorage.getItem("wishlistArray")) || [];

    function getRating(ratings) {
        return ratings >= 4.8 ?  "⭐⭐⭐⭐⭐ 5 Star" : 
        ratings >= 4.7 ?  "⭐⭐⭐⭐ 4 Star" : 
        ratings >= 4.6 ?  "⭐⭐⭐ 3 Star" : 
        ratings >= 4.5 ?  "⭐⭐ 2 Star" : 
        ratings >= 4.4 ?  "⭐ 1 Star" : 
        "No ratings"
    };

    function render(game){

        const isWishlisted = wishlistArray.includes(game.id);

        const wishlistText = isWishlisted ? "Wishlisted ✅" : "Wishlist ❤️";
            const html= `
    
        <div class="home-div-2" data-id=${game.id}>
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
                    <p class="card-p-1 card-p-last card-p-wishlist">${wishlistText}</p>
                    <p class="card-p-1 card-p-last card-p-buy">Buy Now</p>
                </div>
            </div>
    
    `;
    parent.insertAdjacentHTML("beforeend",html);
    }

const gamesLoad = function(){
    parent.innerHTML = "";
    games.forEach(game => {
        render(game);
     });
};
gamesLoad();


search.addEventListener("input",(e)=>{
    const query = e.target.value.toLowerCase();
    // console.log(query);
    
    const filteredGames = games.filter(game => game.title.toLowerCase().includes(query));
    console.log(filteredGames);
    renderGames(filteredGames);
});

function renderGames(gamesArray){
    parent.innerHTML = "";
    noGameDiv.innerHTML = "";

    const html2 = `
    <p class="no-game-p" style="text-align: center; font-size: 20px; color: white;">No Games Found!!!!</p>`;

    if(gamesArray.length === 0){
           noGameDiv.insertAdjacentHTML("beforeend",html2);
        }

        
        gamesArray.forEach(game => {
        render(game);
    });
};

homeBtn.addEventListener("click", ()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth",
    })
    catDivInner.classList.remove("hidden");
    const msg = catDiv.querySelector(".wishlist-header");
    if(msg) msg.remove();
    renderGames(games);
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
            render(game);
        })
    });
});

parent.addEventListener("click", (e)=>{

    if(!e.target.classList.contains("card-p-buy")) return;

    // const card = e.target.closest(".home-div-2");
    const btn = e.target;

    // if(card.querySelector(".buy-msg")) return;

    const originalText = btn.textContent;

    // const msg = document.createElement("p");
    // msg.className = "buy-msg";
    // msg.textContent = "Will add this option soon!!";
    // msg.style.color = "white";
    // msg.style.fontSize = "20px";

    btn.textContent = "Not Now❌";
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.7";

    // card.appendChild(msg);

        setTimeout(()=>{
            btn.textContent = originalText;
            btn.style.pointerEvents = "auto";
            btn.style.opacity = "1";
            // card.removeChild(msg);
        },1500);
    });


    parent.addEventListener("click",(e)=>{

        
        if(!e.target.classList.contains("card-p-wishlist")) return;
                
        const card = e.target.closest(".home-div-2");
        const gameId = Number(card.dataset.id);

        if(wishlistArray.includes(gameId)){
            wishlistArray = wishlistArray.filter(id => id !== gameId);
            e.target.textContent = "Wishlist ❤️"
        } else{
            wishlistArray.push(gameId);
            e.target.textContent = "Wishlisted ✅"
        }

        localStorage.setItem("wishlistArray", JSON.stringify(wishlistArray));


    });

    function renderWishlistGames(gamesArray){
    parent.innerHTML = "";
    noGameDiv.innerHTML = "";

    const html2 = `
    <p class="no-game-p" style="text-align: center; font-size: 20px; color: white;">No Wishlists!!!</p>`;

    if(gamesArray.length === 0){
           noGameDiv.insertAdjacentHTML("beforeend",html2);
        }

        
        gamesArray.forEach(game => {
        render(game);
    });
};

    function showWishlist(){

        catDivInner.classList.add("hidden");

        const oldWrapper = catDiv.querySelector(".wishlist-header");
        if(oldWrapper) oldWrapper.remove();

        const wrapper = document.createElement("div");
        wrapper.className = "wishlist-header";
        const img = document.createElement("img");
        img.src = new URL("../img/wishlist.png", import.meta.url).href;
        img.alt = "wishlist";
        img.className = "wishlist-icon";
        const msg = document.createElement("p");
        msg.className = "buy-msg";
        msg.textContent = "Wishlisted Games";
        wrapper.appendChild(msg)
        wrapper.appendChild(img)
        catDiv.appendChild(wrapper);

        const wishlistedGames = games.filter(game => wishlistArray.includes(game.id));
        renderWishlistGames(wishlistedGames);

        if(wishlistArray.length === 0){
            catDiv.removeChild(wrapper);
            setTimeout(()=>{
                renderGames(games);
                catDivInner.classList.remove("hidden");
            },3000)
        }
    };
           
    wishlistBtn.addEventListener("click", showWishlist);