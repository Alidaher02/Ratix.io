const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  
  // If we need pagination
  pagination: {
  el: '.swiper-pagination',
  clickable: true,
  },
  
  // Navigation arrows
  
  // And if we need scrollbar
  scrollbar: {
  el: '.swiper-scrollbar',
  },
  });
  
  
  var swiper1 = new Swiper(".mySwiper", {
   slidesPerView: 'auto', // let fixed widths control the layout
   spaceBetween: 10,       // spacing between slides
   breakpoints: {
     0: { slidesPerView: 'auto' },     // phones
     640: { slidesPerView: 'auto' },   // tablets
     1024: { slidesPerView: 'auto' }, // desktop/laptop: fixed width 25%
   },
  
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });
  
  const TopMovies = document.querySelector("#TopMovies")
  const AllMovies = document.querySelector("#AllMovies")
  const movieDescription = document.querySelector("#movieDescription")
  const AnimeMovies = document.querySelector("#AnimeMovies")
  
  
  async function fetchData() {
    try {
      const response = await fetch("Movies.json");
      if (!response.ok) throw new Error("could not fetch");
  
    const data = await response.json(); // <-- this is an array
  
  
     let FindSection = data.filter(Movie => Number(Movie.rating) > 8)
     .sort((a , b) => Number(b.rating) - Number(a.rating));
     
        FindSection.forEach(Movie =>{
        const div = document.createElement("div");
        div.className = "swiper-slide w-fit cursor-pointer";
        div.innerHTML =
        `
         <a href="movieInfo.html?id=${Movie.id}">
         <div class="flex flex-col gap-2  text-gray-400  swiper-slide">
                                <img class="w-44 h-72 rounded-lg object-cover" src="${Movie.img}" alt="">
                                <p class="text-[10px]  w-44 font-montserrat text-gray-400 uppercase movieName">${Movie.name}</p>
                                <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                <i class="fa-heart fa-solid text-red-600 text-[10px]"></i>
                                <p class="text-[10px]">0</p>
                                </div>
                                <div class="flex items-center gap-2">
                                <i class="fa-star fa-solid text-yellow-600 text-[10px]"></i>
                                <p class="text-[10px]">${Movie.rating}</p>
                                </div>
                            </div>
                            </div>
        </a>
        `;
        TopMovies.appendChild(div);
        let movieName = div.querySelector(".movieName")
        div.addEventListener("mouseover", () =>{
          movieName.style.color = "white";
        })
        div.addEventListener("mouseout", () =>{
          movieName.style.color = "#9CA3AF";
        })
    
      }) 
  
     let AllMov = data.sort(m => Math.random() -0.5);
     AllMov.forEach(Movie => {
       let div = document.createElement("div")
      div.className = "swiper-slide w-fit cursor-pointer";
        div.innerHTML =
        `
        <a href="movieInfo.html?id=${Movie.id}">
         <div class="flex flex-col gap-2  text-gray-400  swiper-slide">
                                <img class="w-44 h-72 rounded-lg" src="${Movie.img}" alt="">
                                <p class="text-[10px]  w-44 font-montserrat text-gray-400 uppercase movieName">${Movie.name}</p>
                                <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                <i class="fa-heart fa-solid text-red-600 text-[10px]"></i>
                                <p class="text-[10px]">0</p>
                                </div>
                                <div class="flex items-center gap-2">
                                <i class="fa-star fa-solid text-yellow-600 text-[10px]"></i>
                                <p class="text-[10px]">${Movie.rating}</p>
                                </div>
                            </div>
                            </div>
        </a>
        `;
        AllMovies.appendChild(div);
        let movieName = div.querySelector(".movieName")
        div.addEventListener("mouseover", () =>{
          movieName.style.color = "white";
        })
        div.addEventListener("mouseout", () =>{
          movieName.style.color = "#9CA3AF";
        })
        
        
        
     }  );   
     
     let FindAnimeSection = data.filter(Movie => Movie.type === "anime")
     .sort((a,b) => Number(b.rating) - Number(a.rating));
     FindAnimeSection.forEach(Movie => {
      let div = document.createElement("div")
      div.className = "swiper-slide w-fit cursor-pointer";
      div.innerHTML =
        `
         <a href="movieInfo.html?id=${Movie.id}">
         <div class="flex flex-col gap-2 text-gray-400  swiper-slide">
                                <img class="w-44 h-72 rounded-lg object-cover" src="${Movie.img}" alt="">
                                <p class="text-[10px]  w-44 font-montserrat text-gray-400 uppercase movieName">${Movie.name}</p>
                                <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                <i class="fa-heart fa-solid text-red-600 text-[10px]"></i>
                                <p class="text-[10px]">0</p>
                                </div>
                                <div class="flex items-center gap-2">
                                <i class="fa-star fa-solid text-yellow-600 text-[10px]"></i>
                                <p class="text-[10px]">${Movie.rating}</p>
                                </div>
                            </div>
                            </div>
        </a>
        `;
        AnimeMovies.appendChild(div);
        let movieName = div.querySelector(".movieName")
        div.addEventListener("mouseover", () =>{
          movieName.style.color = "white";
        })
        div.addEventListener("mouseout", () =>{
          movieName.style.color = "#9CA3AF";
        })

     })
        
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchD() {
    try {
      const response = await fetch("Movies.json");
      if (!response.ok) throw new Error("could not fetch");
  
      const data = await response.json();
  
      // get ID from URL
      const movieId = new URL(location).searchParams.get("id");
  
      // find the movie
      const Movie = data.find(m => m.id == movieId);
  
      if (!Movie) {
        console.log("Movie not found");
        return;
      }
      movieDescription.innerHTML ="";
      // create container
      let div = document.createElement("div");
  
      div.innerHTML = `
        <p class="text-white p-5"> <a href="index.html" class="text-[#ce2a4a] hover:text-[#ce2a4a]/50">Home</a> / Movies / ${Movie.name}</p>
        <div>
            <iframe class="w-full h-72 md:h-[450px]" src="${Movie.trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <div class="bg-[#1f1f1f] w-full p-5 sm:flex sm:flex-row flex-col gap-5">
            <div class="md-96   flex flex-col items-center sm:items-start gap-5">
                <img class="md:w-72 md:h-72 lg:w-44  w-full object-cover rounded-2xl" src="${Movie.img}" alt="">
                <button class="rateButton text-blue-400 hover:bg-[#333333]/50 font-montserrat font-semibold w-full sm:w-44 md:w-full bg-[#333333] px-5 py-2 text-sm rounded-lg"><i class="fa-star fa-regular text-blue-400"></i> Rate</button>
            </div>

            <div class="flex flex-col gap-5 md:text-sm text-xs pt-5  ">
                <div class="flex items-center gap-2">
                <p class="text-white font-montserrat uppercase font-semibold text-2xl">${Movie.name}</p>
                </div>
                <p class="text-gray-400   p-2 break-all  font-montserrat  w-full text-xs md:text-sm ">${Movie.description}</p>
                <div class="grid grid-cols-2 gap-2">
                <p class="text-white">Director: <span class="">Jared Bush</span></p>
                <p class="text-white">Genre: <span>Adventure</span></p>
                <p class="text-white">Release: <span class="">2025</span></p>
                <p class="text-white"><i class="fa-star fa-solid text-yellow-600"></i> ${Movie.rating}</p>
                <p class="text-white">Country: <span class="">United States</span></p>
                <p class="text-white">Runtime: <span>1h 47m</span></p>
                </div>

            </div>
        </div>
      `;
  
      movieDescription.appendChild(div);
      let rateSectiion = document.querySelector("#rateSectiion")
      let rateButton = div.querySelector(".rateButton");
      let closeBtn = document.getElementById("closeBtn")
      rateButton.addEventListener("click" , () =>{
         rateSectiion.classList.remove("hidden");
      })
      closeBtn.addEventListener("click" , () =>{
        rateSectiion.classList.add("hidden");
     })

  
    } catch (error) {
      console.log(error);
    }
  }
  
  fetchD();
  
  
  fetchData();
  fetchD();
  

  
