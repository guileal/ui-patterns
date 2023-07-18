 // 🎯 Elements
let divInfos = document.getElementById('infos')

let container = document.getElementById('container')
let wrapperItems = document.getElementById('wrapper-items')
let arrayItems = document.getElementsByClassName('carousel-item')
let secondItemOffsetLeft 

// Nav Btns  <- ->
const previousButton = document.getElementById('previous')
const nextButton = document.getElementById('next')

// 🟢 Triggered functions
updateContentSize()

 // 🔥Functions
function updateContentSize(){
    
    divInfos.textContent = `
    container: ${container.offsetWidth}, 
    wrapper-items: ${wrapperItems.offsetWidth},
    items[0]: ${arrayItems[0].offsetWidth}`

    itemWidth = arrayItems[1].offsetLeft - arrayItems[0].offsetLeft
    
    return {
        itemWidth
    }
}

function previousUpdateArrayItems(){
    // capture the first item content inside one variable-> tempItem
    let tempItem = arrayItems[0]

    // then remove it from html node. 
    arrayItems[0].remove()

    // get the last item in array
    let lastItem = arrayItems.length - 1
    arrayItems[lastItem].after(tempItem)

    let marginLeft = parseInt(getComputedStyle(arrayItems[0]).marginLeft)
    arrayItems[lastItem + 1].style.marginLeft = `${marginLeft}px`
    arrayItems[lastItem + 1].classList.remove('UI-fadeOut')
    console.log('update')
}


// 🎉 Listeners
previousButton.addEventListener('click', ()=>{
    arrayItems[0].classList.remove('UI-fadeIn')
    let {itemWidth} = updateContentSize()
    arrayItems[0].style.marginLeft = `${-itemWidth}px`

    arrayItems[0].classList.add('UI-fadeOut')
    setTimeout(previousUpdateArrayItems,300)


    // arrayItems[lastItem + 1].classList.remove('UI-fadeIn')
})

nextButton.addEventListener('click',()=>{
    let {itemWidth} = updateContentSize()
    let lastItem = arrayItems[arrayItems.length - 1]
    
    
    arrayItems[0].before(lastItem)
    arrayItems[0].style.marginLeft = `${-itemWidth}px`
    setTimeout(()=>{
        arrayItems[0].removeAttribute('style')
        // arrayItems[0].style.marginLeft = `0px`
    },0.1)


})

// Update the layout ComputedStyle when the window is resized
window.addEventListener('resize', function(){
    updateContentSize()
})