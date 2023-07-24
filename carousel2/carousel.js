const carouselContainer = document.getElementById('c-container')
const smallPhotos = document.getElementsByClassName('c-small-photos')

let smallPhotosLength = smallPhotos.length
let largePhoto = document.getElementById('c-large-photo')

const previousButton = document.getElementById('previous-button-slider')
const nextButton = document.getElementById('next-button-slider')

let currentIndex = smallPhotosLength
let hover = false

let autoplayTimeout


// autoplay()


 // 🔥Functions
function autoplay(){
    console.log(`autoplay current index ${currentIndex}`)
    if(!hover){
        currentIndex = (currentIndex + 1) % smallPhotosLength
        console.log(currentIndex)
        setActiveItem(currentIndex)
        autoplayTimeout = setTimeout(autoplay,3000)
    }
}

function setActiveItem(index){
    smallPhotos[index].classList.add('c-active')
    for(let i = 0; i < smallPhotosLength; i++){
        if(i != index){
            smallPhotos[i].classList.remove('c-active')
        }
    }

    // largePhoto.src = smallPhotos[index].src
}

function setActiveItemByClickOnItem(event){
    const clickedElement = event.currentTarget
    const clickedIndex = Array.from(smallPhotos).indexOf(clickedElement);
    console.log(clickedIndex)
    if(currentIndex !== clickedIndex){
        setActiveItem(clickedIndex)
    }
}


// 🎉 Listeners
previousButton.addEventListener('click',()=>{
    currentIndex = (currentIndex - 1 + smallPhotosLength) % smallPhotosLength
    setActiveItem(currentIndex)
})

nextButton.addEventListener('click',()=>{
    currentIndex = (currentIndex + 1) % smallPhotosLength
    setActiveItem(currentIndex)
})

// to hover stops the carousel automatic changes the active item
carouselContainer.addEventListener('mouseover', ()=>{
    hover = true
    console.log('Mouse Over')
})

carouselContainer.addEventListener('mouseleave', ()=>{
    hover = false
    clearTimeout(autoplayTimeout)
    autoplay()
})


// Iteration to add listener to all smallPhotos

for(let i = 0; i < smallPhotos.length; i++){
    smallPhotos[i].addEventListener('click', setActiveItemByClickOnItem)
}