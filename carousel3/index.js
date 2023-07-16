 // 🎯 Elements
let divInfos = document.getElementById('infos')

let container = document.getElementById('container')
let wrapperItems = document.getElementById('wrapper-items')
let arrayItems = document.getElementsByClassName('list-item')


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
   
    // let
    let secondItemOffset = arrayItems[1].offsetLeft - (parseInt(getComputedStyle(arrayItems[1]).marginLeft) + parseInt(getComputedStyle(arrayItems[0]).marginLeft));
    
    return {
        secondItemOffset
    }
}

function previousUpdateArrayItems(){
    let tempItem = arrayItems[0]
    arrayItems[0].remove()
    let lastItem = arrayItems.length - 1

    arrayItems[lastItem].after(tempItem)

    let marginLeft = parseInt(getComputedStyle(arrayItems[0]).marginLeft)
    arrayItems[lastItem + 1].style.marginLeft = `${marginLeft}px`;
    arrayItems[lastItem + 1].classList.remove('UI-fadeOut')
    
}


// 🎉 Listeners
previousButton.addEventListener('click', ()=>{
    let {secondItemOffset} = updateContentSize()
    arrayItems[0].style.marginLeft = `${-secondItemOffset}px`;

    setTimeout(previousUpdateArrayItems,300)

    arrayItems[0].classList.add('UI-fadeOut')
    arrayItems[lastItem + 1].classList.remove('UI-fadeIn')
    // arrayItems[0].classList.add('UI-none')
})

nextButton.addEventListener('click',()=>{
    console.log('Next Clicked')
})

window.addEventListener('resize', function(){
    updateContentSize()
})