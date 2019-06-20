const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchInput.value
    console.log(location)

    message1.textContent='Loading...'
    message2.textContent=''

    fetch('/weather?location=' + location).then((response) => {
        
        response.json().then((data) => {
    //        console.log(data)
            if (data.error) {
                message1.textContent= data.error
            } else {
                message1.textContent= data.location
                message2.textContent= data.forecast
             }
        })
    })
})