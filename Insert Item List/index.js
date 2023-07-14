
    // 🎯 Elements
    let list = document.getElementById("list")
    let form = document.getElementById("form")
    let submitButton = document.getElementById("formSubmit")

    // 🔥Functions
    const createNewItem = () => {
        let input = document.getElementById("formInput")
        let inputValue = input.value

        if (inputValue === '') {
            return false
        }

        let newItem = document.createElement("li")
        newItem.innerHTML = inputValue
        list.appendChild(newItem)

        input.value = ''
        return true
    }

    // 🎉 Listeners
    submitButton.addEventListener("click", function (event) {
        event.preventDefault()
        if (createNewItem() === false) {
            window.alert("Empty value is not accepted")
        }
    });

