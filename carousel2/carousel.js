let carouselContainer = document.getElementById('c-container')
let smallPhotos = document.getElementsByClassName('c-small-photos')
let largePhoto = document.getElementById('c-large-photo')

let previousButton = document.getElementById('previous-button-slider')
let nextButton = document.getElementById('next-button-slider')

let currentIndex = 0
let hover = false


autoUpdateActiveItem()
 // 🔥Functions
 function autoUpdateActiveItem(){
    if(!hover){
        console.log('autoUpdate Online')
        console.log(currentIndex)
        currentIndex = (currentIndex + 1) % smallPhotos.length
        setTimeout(autoUpdateActiveItem,1000)
        return
    }
}


// 🎉 Listeners
previousButton.addEventListener('click',()=>{
    console.log('previous')
})

nextButton.addEventListener('click',()=>{
    console.log('next')
})




// to hover stops the carousel automatic changes the active item
carouselContainer.addEventListener('mouseover', ()=>{
    hover = true
    console.log('Mouse Over')
})

carouselContainer.addEventListener('mouseleave', ()=>{
    hover = false
    autoUpdateActiveItem()
    console.log('Mouse Leaves')
    console.log(hover)
})