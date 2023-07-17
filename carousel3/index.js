 // 🎯 Elements
let divInfos = document.getElementById('infos')

let container = document.getElementById('container')
let wrapperItems = document.getElementById('wrapper-items')
let arrayItems = document.getElementsByClassName('list-item')
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
   
    secondItemOffsetLeft = arrayItems[1].offsetLeft - parseInt(getComputedStyle(arrayItems[1]).marginLeft)
    
    return {
        secondItemOffsetLeft
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
}


// 🎉 Listeners
previousButton.addEventListener('click', ()=>{
    let {secondItemOffsetLeft} = updateContentSize()
    arrayItems[0].style.marginLeft = `${-secondItemOffsetLeft}px`

    setTimeout(previousUpdateArrayItems,300)

    arrayItems[0].classList.add('UI-fadeOut')
    // arrayItems[lastItem + 1].classList.remove('UI-fadeIn')
})

nextButton.addEventListener('click',()=>{
    console.log('Next Clicked')
})

// Update the layout ComputedStyle when the window is resized
window.addEventListener('resize', function(){
    updateContentSize()
})