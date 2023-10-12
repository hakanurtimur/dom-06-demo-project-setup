const addModal = document.getElementById("add-modal");
const toggleModalBtn = document.getElementById("toggle-modal")
const backdrop = document.getElementById("backdrop")
const cancelBtn = document.getElementById("cancel-btn")
const titleInput = document.getElementById("title")
const imageUrlInput = document.getElementById("image-url")
const ratingInput = document.getElementById("rating")
const addBtn = document.getElementById("add-btn")
const movieList = document.getElementById("movie-list")
const lostableSection = document.getElementById("entry-text")

const movieObjectsList = [];


const controllingAddPanel = () => {
    addModal.classList.toggle('visible')
        backdrop.classList.toggle('visible')
}
const removeSectionHandler = () => {
   if(movieObjectsList.length === 0) {lostableSection.style.display = "block"}else {
    lostableSection.style.display = "none"
   }
}

const cancelMovieHandler = () => {
    titleInput.value = "";
    imageUrlInput.value = "";
    ratingInput.value = "";
}
toggleModalBtn.addEventListener("click", controllingAddPanel)

cancelBtn.addEventListener("click", () => {
    controllingAddPanel();
    cancelMovieHandler()
})

backdrop.addEventListener("click", () => {
    controllingAddPanel();
    cancelMovieHandler()
})

addBtn.addEventListener("click", () => {
    const title = titleInput.value
    const imageUrl = imageUrlInput.value
    const rating = ratingInput.value

    const movieObject = {
        title: title,
        imageUrl: imageUrl,
        rating: rating,
    }

    movieObjectsList.push(movieObject);

    if(title.trim.length === "" || imageUrl.trim.length === "" || rating < 1 || rating > 5){
        alert("Please enter valid inputs!");
        return;
    }

    const newLi = document.createElement("li")
    newLi.className = "movie-element"
    movieList.appendChild(newLi);
    newLi.innerHTML = `
    <div class="movie-element__image">
        <img src=${imageUrl} alt=${title} />
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}</p>
    </div>
    `
    removeSectionHandler();
    cancelMovieHandler();
    controllingAddPanel();
})
