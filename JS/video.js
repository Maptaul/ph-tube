console.log("video java file added");

function getTimeString(time) {
  //get hour rest second
  const hour = parseInt(time / 3600);
  let remainingSecond = time % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${hour} hour ${minute} minute ${remainingSecond}  second ago`;
}

const removeActiveClass = () => {
  const button = document.getElementsByClassName("category-btn");
  // console.log(button);

  for (let btn of button) {
    btn.classList.remove("active");
  }
};

/* 
1. fetch, load and show category data
*/
const loadCategories = () => {
  //fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadVideos = (searchText = "") => {
  //fetch the data
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadCategoriesVideos = (id) => {
  //fetch the data
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // sby k active class remove
      removeActiveClass();

      // sby k active add kor
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoId) => {
  // console.log(videoId);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  // console.log(video);
  const detailsContainer = document.getElementById("modal-content");

  detailsContainer.innerHTML = `
  <img src="${video.thumbnail}" />
  <p>${video.description}</p>
  `;

  // way-1
  // document.getElementById("showModalData").click();
  // way - 2;
  document.getElementById("customModal").showModal();
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
        <img src="img/icon.png" alt="" />
        <h2 
        class="text-2xl font-bold text-center">
        Oops!! Sorry, There is no <br /> content here
        </h2>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    // console.log(video);

    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
        <figure class= "h-[200px] relative">
    <img
      src=${video.thumbnail}
      class = "w-full h-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `<span 
          class="absolute right-2 bottom-3 text-xs bg-gray-500 text-white rounded-md p-1">
          ${getTimeString(video.others.posted_date)}</span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
        <img class="w-10 h-10 rounded-full" 
        src="${video.authors[0].profile_picture}" 
        alt="profile_picture" />
    </div>
    <div>
        <h2 class="font-bold"> ${video.title}</h2>
    <div class="flex gap-2 items-center">
        <p class ="text-gray-400">${video.authors[0].profile_name}</p>
    ${
      video.authors[0].verified == true
        ? '<img class="w-5" src="https://img.icons8.com/?size=100&id=2sZ0sdlG9kWP&format=png&color=000000" alt="" />'
        : ""
    }
    </div>
    <p> <button onclick="loadDetails('${
      video.video_id
    }')" class=" btn btn-sm btn-error"> details</button></p>
    </div>
    </div>
  </div>
    `;
    videoContainer.append(card);
  });
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");
  // add data in html
  categories.forEach((item) => {
    // console.log(item);
    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button 
      id="btn-${item.category_id}" 
      onclick="loadCategoriesVideos(${item.category_id})"  
      class= "btn category-btn">
      ${item.category}</button>
    `;
    // add button to category

    categoryContainer.append(buttonContainer);
  });
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});
loadCategories();
loadVideos();
