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
const deletingModal = document.getElementById("delete-modal")
const deletingBtnDiv = deletingModal.children[2]
const deletingActionButtons = deletingBtnDiv.children

let movieObjectsList = [];


const controllingAddPanel = () => {
    addModal.classList.toggle('visible')
        backdrop.classList.toggle('visible')
}
const removeSectionHandler = () => {
   if(movieObjectsList.length === 0) {lostableSection.style.display = "block"
console.dir(lostableSection);}else {
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

const deleteMovieHandler = (id) => {
    const selectedLiElement = document.getElementById(id);

    if (selectedLiElement) {
        selectedLiElement.remove();
        const selectedMovieIndex = movieObjectsList.findIndex(e => e.id === id);
        movieObjectsList.splice(selectedMovieIndex, 1);
        removeSectionHandler();
    }
}


const openDeletingModal = (id) =>  {
   deletingModal.classList.toggle('visible');

   let confirmDeletionButton = deletingActionButtons[1]
   const cancelDeletionButton = deletingActionButtons[0]

   const deletionSelectedMovie = () => {
    deleteMovieHandler(id)
   }

//    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

   confirmDeletionButton.addEventListener('click', deletionSelectedMovie)

   cancelDeletionButton.addEventListener('click', () => {
    confirmDeletionButton.removeEventListener('click', deletionSelectedMovie)
   })

}

deletingActionButtons[0].addEventListener('click', openDeletingModal );
deletingActionButtons[1].addEventListener('click', openDeletingModal );
deletingActionButtons[0].addEventListener('click', () => {
    backdrop.classList.toggle('visible');
} );
deletingActionButtons[1].addEventListener('click', () => {
    backdrop.classList.toggle('visible');
} );



addBtn.addEventListener("click", () => {
    const title = titleInput.value
    const imageUrl = imageUrlInput.value
    const rating = ratingInput.value
    const id = Math.random().toString();

    const movieObject = {
        title: title,
        imageUrl: imageUrl,
        rating: rating,
        id: id,
    }

    movieObjectsList.push(movieObject);

    if(title.trim.length === "" || imageUrl.trim.length === "" || rating < 1 || rating > 5){
        alert("Please enter valid inputs!");
        return;
    }

    const newLi = document.createElement("li")
    newLi.className = "movie-element"
    newLi.id = id
    newLi.addEventListener('click', () => {
        openDeletingModal(id);
        backdrop.classList.toggle('visible');
    });
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
