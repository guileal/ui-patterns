let hover = false
let autoplayStatus = false 

const carouselContainer = document.getElementById('c-container')
const smallPhotos = document.getElementsByClassName('c-small-photos')

let smallPhotosLength = smallPhotos.length
const largePhoto = document.getElementById('c-large-photo')
const infoContainer =  document.getElementById('info-container')

const previousButton = document.getElementById('previous-button-slider')
const nextButton = document.getElementById('next-button-slider')

let currentIndex = 0



let autoplayTimeout


// autoplay()


 // 🔥Functions
function autoplay(){
    if(!hover && autoplayStatus){
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
    largePhoto.src = smallPhotos[index].querySelector('img').src


    // to do-> read array
    let span = infoContainer.querySelector('span')
    let h3 = infoContainer.querySelector('h3')
    let p = infoContainer.querySelector('p')

    console.log(span, h3, p)

}

function setActiveItemByClickOnItem(event){
    const clickedElement = event.currentTarget
    const clickedItemIndex = Array.from(smallPhotos).indexOf(clickedElement)
    currentIndex = clickedItemIndex
    setActiveItem(clickedItemIndex)
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