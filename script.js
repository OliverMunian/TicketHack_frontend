const myButton = document.getElementById("myButton");
const form = document.querySelector('#inscription')
let departure = document.querySelector('#departure')
let arrival = document.querySelector('#arrival')
// let dateTrip = new Date (document.querySelector('input[type="date"]').value);


form.addEventListener('submit',function(e){
    e.preventDefault()
    if(!departure.value || !arrival.value){
        let image = document.querySelector('img')
        let result = document.querySelector('#text-result')
        let dateTrip = new Date(document.querySelector('#date').value);
        let dateChose = dateTrip.toDateString()
        console.log(dateChose)
        image.src = "./src/images/notfound.png"
        result.innerHTML = 'Aucun résultat trouvé !'
    }
    else{
        let departure = document.querySelector('#departure').value
        let arrival = document.querySelector('#arrival').value
        let date = document.querySelector('#date').value
        fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`).then(response => response.json())
        .then(data =>{
            e.preventDefault()
            console.log(data.data)
            let allTrip = data.data
            let contentImage = document.querySelector('#trip-img').style = "display : none"
            if(data)
                for(let i = 0; i < allTrip.length; i++){

                    const time = allTrip[i].date
                    const date = new Date(time).toLocaleTimeString('en',
                    { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
                    let blocResult = document.querySelector("#result-trips")

                    blocResult.innerHTML += `<div id="container-element-trips">
                    <div class="trip">
                        <p>${allTrip[i].departure} > ${allTrip[i].arrival}</p> <p>${date}</p>
                        <p>${allTrip[i].price}€</p>
                        <a class="button-book" href="./src/cart.html">Book</a>
                    </div>
                    </div>`
                }
            else{
                result.innerHTML = 'Désolé la recherche n\'a pas aboutie !'
            }
        })     
    }
    return false
})


let bookButton = document.querySelector("#button-book")


bookButton.addEventListener('click', function(){
    localStorage.setItem('Voyage choisi', JSON.stringify(data))
})

