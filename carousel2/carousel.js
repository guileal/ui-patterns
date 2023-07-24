const carouselContainer = document.getElementById('c-container')
const smallPhotos = document.getElementsByClassName('c-small-photos')
let largePhoto = document.getElementById('c-large-photo')

const previousButton = document.getElementById('previous-button-slider')
const nextButton = document.getElementById('next-button-slider')

let currentIndex = smallPhotos.length
let hover = false


autoplay()
 // 🔥Functions
function autoplay(){
    if(!hover){
        currentIndex = (currentIndex + 1) % smallPhotos.length
        setActiveItem(currentIndex)
        setTimeout(autoplay,4000)
    }
}

function setActiveItem(index){
    smallPhotos[index].classList.add('c-active')
    for(let i = 0; i < smallPhotos.length; i++){
        if(i != currentIndex){
            smallPhotos[i].classList.remove('c-active')
        }
    }

    largePhoto.src = smallPhotos[index].src
}


function setActiveItemByClickOnItem(event){
    const clickedElement = event.currentTarget
    const clickedIndex = Array.from(smallPhotos).indexOf(clickedElement);
    
    if(currentIndex !== clickedIndex){
        setActiveItem(clickedIndex)
    }
}

// 🎉 Listeners
previousButton.addEventListener('click',()=>{
    currentIndex = (currentIndex - 1) % smallPhotos.length
    setActiveItem(currentIndex)
})

nextButton.addEventListener('click',()=>{
    currentIndex = (currentIndex + 1) % smallPhotos.length
    setActiveItem(currentIndex)
})

// to hover stops the carousel automatic changes the active item
carouselContainer.addEventListener('mouseover', ()=>{
    hover = true
    console.log('Mouse Over')
})

carouselContainer.addEventListener('mouseleave', ()=>{
    hover = false
    // autoplay()
    console.log('Mouse Leaves')
    console.log(hover)
})


// Iteration to add listener to all smallPhotos

for(let i = 0; i < smallPhotos.length; i++){
    smallPhotos[i].addEventListener('click', setActiveItemByClickOnItem)
}