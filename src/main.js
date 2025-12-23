import { games } from "./games.js";

const homeImg = document.querySelector(".home-img");

const noGameDiv = document.querySelector(".no-games-div");

const parent = document.querySelector(".home-div-1");

const search = document.querySelector(".top-bar-search");

const homeBtn = document.querySelector(".top-bar-p-home");

const recommendationsBtn = document.querySelector(".top-bar-p-recommendations");

const recommendModal = document.querySelector(".recommendations-modal");

const wishlistBtn = document.querySelector(".top-bar-p-wishlist");

const catDiv = document.querySelector(".categories-div");

const catDivInner = document.querySelector(".categories");

const allBtn = document.querySelector(".active-a");
const catBtn = document.querySelectorAll(".categories-1");

let wishlistArray = JSON.parse(localStorage.getItem("wishlistArray")) || [];

    function getRating(ratings) {
        return ratings >= 4.8 ?  "⭐⭐⭐⭐⭐ 5 Star" : 
        ratings >= 4.7 ?  "⭐⭐⭐⭐ 4 Star" : 
        ratings >= 4.6 ?  "⭐⭐⭐ 3 Star" : 
        ratings >= 4.5 ?  "⭐⭐ 2 Star" : 
        ratings >= 4.4 ?  "⭐ 1 Star" : 
        "No ratings"
    };

    function render(game, delay = 0){

        const isWishlisted = wishlistArray.includes(game.id);

        const wishlistText = isWishlisted ? "Wishlisted ✅" : "Wishlist ❤️";
            const html= `
    
            <div class="game-card" style="animation-delay:${delay}ms">
        <div class="home-div-2" data-id=${game.id}>
                <img draggable="false" class="card-img-1"  src="${game.img}">
                <div class="card-p-1 cp1">
                <div class="card-p-a card-p-a-1-1">
                    <p class="card-p-1 card-p-1-title">${game.title}</p>
                </div>
                <div class="card-p-a-1">
                    <p class="card-p-1">Price:</p>
                    <p class="card-p-1">₹ ${game.price}</p>
                </div>

                <div class="card-p-a card-p-a-1">
                    <p class="card-p-1">Ratings:</p>
                    <p class="card-p-1">${getRating(game.ratings)}</p>
                </div>

                <div class="card-p-a card-p-a-1">
                    <p class="card-p-1">Genre:</p>
                    <div class="card-p-a-3">
                        ${game.type.filter(pp => pp !== "fav").map(p=> `<p class="card-p-1">${p}</p>`).join("")}
                    </div>
                </div>
                
                <div class="card-p-a card-p-a-1">
                    <p class="card-p-1 ao">Available on:</p>
                    <div class="card-p-a-3">
                        ${game.platform.map(p=> `<p class="card-p-1 ao">${p}</p>`).join("")}
                    </div>
                </div>

                
                
                <div class="game-details hidden">
                <video class="modal-video" controls>${game.video}</video>
                <div class="game-details-2">
                <p class="details-title">${game.title}</p>
                <p class="details-desc">${game.description}</p>
                <p class="details-copiessold">${game.copiessold}</p>
                <p class="details-close">Close ✖</p>
                </div>
                </div>
                
                </div>

                <div class="card-p-a card-p-a-4">
                    <p class="card-p-1 card-p-last card-p-view">view</p>
                    <p class="card-p-1 card-p-last card-p-wishlist">${wishlistText}</p>
                    <p class="card-p-1 card-p-last card-p-buy">Buy Now</p>
                    <a href="${game.store}" target="_blank"><p class="card-p-buy">Visit the game!</p></a>
                </div>
            </div>
        </div>
                
    `;
    parent.insertAdjacentHTML("beforeend",html);
    }

const gamesLoad = function(){
    parent.innerHTML = "";
    games.forEach((game, index) => {
        render(game, index * 120);
     });
};
gamesLoad();


search.addEventListener("input",(e)=>{
    const query = e.target.value.toLowerCase();
    // console.log(query);

    catDivInner.classList.remove("hidden");
    const msg = catDiv.querySelector(".wishlist-header");
    if(msg) msg.remove();

    wishlistBtn.classList.remove("active-2");
    recommendationsBtn.classList.remove("active-2");
    recommendModal.classList.add("hidden");
    homeBtn.classList.remove("active-2");
    catBtn.forEach(btn => btn.classList.remove("active"));
    
    if(query === "") {
        
        const msg = catDiv.querySelector(".wishlist-header");
        if(msg) msg.remove();

        wishlistBtn.classList.remove("active-2");
        recommendationsBtn.classList.remove("active-2");
        recommendModal.classList.add("hidden");
        homeBtn.classList.add("active-2");
        allBtn.classList.add("active");
        // renderGames(games);
    };


    const filteredGames = games.filter(game => game.title.toLowerCase().includes(query));
    // console.log(filteredGames);
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

        
    //     gamesArray.forEach(game => {
    //     render(game);
    // });
    gamesArray.forEach((game, index) => {
        render(game, index * 120);
    });
};

homeBtn.addEventListener("click", (e)=>{
    search.value = "";
    
    window.scrollTo({
        top:0,
        behavior:"smooth",
    });
    
    if(homeBtn.classList.contains("active-2")) return;
    
    catDiv.classList.remove("hidden");

    catDivInner.classList.remove("hidden");
    const msg = catDiv.querySelector(".wishlist-header");
    if(msg) msg.remove();
    
    recommendModal.classList.add("hidden");
    recommendationsBtn.classList.remove("active-2");
    wishlistBtn.classList.remove("active-2");
    homeBtn.classList.add("active-2");
    
    catBtn.forEach(btn => {
        btn.classList.remove("active");
    })
    catBtn[0]?.classList.add("active");
    
    renderGames(games);
});

catBtn.forEach(btn => {
    btn.addEventListener("click", ()=>{
        search.value = "";
        noGameDiv.innerHTML = "";

        const type = btn.dataset.category;
        console.log(type);

        const catFilterGame = type === "all" ? games : games.filter(g => g.type.includes(type));
        console.log(catFilterGame);

        if(btn.classList.contains("active")) return;

        catBtn.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
        

        parent.innerHTML = "";
        catFilterGame.forEach((game, index) => {
            render(game, index * 120);
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

    btn.textContent = "Soon.....";
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

        
        gamesArray.forEach((game, index) => {
        render(game, index * 120);
    });
};

    function showWishlist(){
        search.value = "";
        
        if(wishlistBtn.classList.contains("active-2")) return;
        
        recommendModal.classList.add("hidden");
        homeBtn.classList.remove("active-2");
        recommendationsBtn.classList.remove("active-2");
        wishlistBtn.classList.add("active-2");
        
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
        wrapper.appendChild(msg);
        wrapper.appendChild(img);
        
        catDiv.appendChild(wrapper);
        
        const wishlistedGames = games.filter(game => wishlistArray.includes(game.id));
        renderWishlistGames(wishlistedGames);
        // search.value = "";

        if(wishlistArray.length === 0){
            catDiv.removeChild(wrapper);
            setTimeout(()=>{
                
                wishlistBtn.classList.remove("active-2");
                homeBtn.classList.add("active-2");

                catBtn.forEach(btn => {
                    btn.classList.remove("active");
                })
                catBtn[0]?.classList.add("active");
                
                renderGames(games);
                
                catDivInner.classList.remove("hidden");
            
            },3000)
        }
    };
           
    wishlistBtn.addEventListener("click", showWishlist);


    //

    recommendationsBtn.addEventListener("click", (e) => {
        // search.value = "";

        if (recommendationsBtn.classList.contains("active-2")) {
        recommendationsBtn.classList.remove("active-2");
        recommendModal.classList.add("hidden");
        // homeBtn.classList.add("active-2");
        // renderGames(games);
        return;
        }

        homeBtn.classList.remove("active-2");
        wishlistBtn.classList.remove("active-2");
        recommendationsBtn.classList.add("active-2")

        // if(e.target.classList.contains){

        // }

        const recomGames = games.filter(g => g.type.includes("fav")).slice(0,4);

        
        recommendModal.innerHTML = "";
        
        recomGames.forEach(game => {
            const card = document.createElement("div");
            card.className = "mini-game-card";
            // card.style.padding = "10px";
            card.innerHTML = `
            <img src="${game.img}" alt="${game.title}" style=" height:140px; object-fit:cover; border-radius:5px;">
            <p style="color:white; font-size:18px; text-align:center;">${game.title}</p>
            `;
            recommendModal.appendChild(card);
        })
        recommendModal.classList.remove("hidden");

    });

    //////////////////////////////////////////////////
    
    /////////////////////////////////////////////////
    // game view details logic + video play.
    parent.addEventListener("click", (e)=>{
                
        if(e.target.classList.contains("card-p-view")) {
        const card = e.target.closest(".home-div-2");
        const details1 = card.querySelector(".game-details");
        const video = details1.querySelector(".modal-video");
        
        document.querySelectorAll(".game-details.show").forEach(d => {
            if(d !== details1) {
                const v = d.querySelector(".modal-video");
                v.pause();
                v.src = "";
                d.classList.remove("show")
                d.classList.add("hidden");
            };
        });
        
        details1.classList.remove("hidden");
        requestAnimationFrame(()=> details1.classList.add("show"));
        
        const id = Number(card.dataset.id);
        const game = games.find(g => g.id === id);
        video.src = game.video;
        video.currentTime = 0;
        video.play();
    }


        if(e.target.classList.contains("details-close")) {
            const details2 = e.target.closest(".game-details");
            const video = details2.querySelector(".modal-video");

            details2.classList.remove("show");
            
            video.pause();
            video.src = "";

            setTimeout(()=>{
                details2.classList.add("hidden");
            }, 400);
        }
        

    })
    ////////////////////////////////////////////////////

    /////////////////////////////////////////////////////
//     parent.addEventListener("click", (e) => {
//     if (!e.target.classList.contains("card-p-view")) return;

//     const card = e.target.closest(".home-div-2");
//     const id = Number(card.dataset.id);
//     const game = games.find(g => g.id === id);

//     openGameModal(game);
//     });

//     //
//     const modal = document.querySelector(".game-modal");
//     const video = modal.querySelector(".modal-video");

//     function openGameModal(game) {
//     modal.classList.remove("hidden");

//     video.src = game.video;
//     video.currentTime = 0;
//     video.play();

//     modal.querySelector(".modal-title").textContent = game.title;
//     // modal.querySelector(".modal-price").textContent = `₹ ${game.price}`;
//     // modal.querySelector(".modal-rating").textContent = getRating(game.ratings);
//     }
//     //
//     modal.addEventListener("click", (e) => {
//     if (
//         e.target.classList.contains("game-modal") ||
//         e.target.classList.contains("modal-close")
//     ) {
//         closeModal();
//     }
//     });

//     function closeModal() {
//     video.pause();
//     video.src = "";
//     modal.classList.add("hidden");
// }

    /////////////////////////////////////////////////////

    ////////////////////////////////////////////////////

//     parent.addEventListener("click", (e) => {
//     if (!e.target.classList.contains("card-p-view")) return;

//     const card = e.target.closest(".home-div-2");
//     const id = Number(card.dataset.id);
//     const game = games.find(g => g.id === id);

//     openGameModal(game);
//     });

//     //
//     const modal = document.querySelector(".game-modal");
//     const video = modal.querySelector(".modal-video");

//     function openGameModal(game) {
//     modal.classList.remove("hidden");

//     video.src = game.video;
//     video.currentTime = 0;
//     video.play();

//     // modal.querySelector(".modal-title").textContent = game.title;
//     // modal.querySelector(".modal-price").textContent = `₹ ${game.price}`;
//     // modal.querySelector(".modal-rating").textContent = getRating(game.ratings);
//     }
//     //
//     modal.addEventListener("click", (e) => {
//     if (
//         e.target.classList.contains("game-modal") ||
//         e.target.classList.contains("modal-close")
//     ) {
//         closeModal();
//     }
//     });

//     function closeModal() {
//     video.pause();
//     video.src = "";
//     modal.classList.add("hidden");
// }

///////////////////////////////////////////////////////////////

const footerYear = document.querySelector(".footer-year");
footerYear.textContent = new Date().getFullYear();

///////////////////////////////////////////////////////////////