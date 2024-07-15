
function response_received(response) {          
    return response.json()          
}

function parse_data(content) {
       
    const container = document.getElementById("adoptionRequests")
    for(let index = 0; index < content.length; index++){
        const item = document.createElement("div")
        item.setAttribbute("class", "item")
        const card = document.createElement("article")


        const card_head =  document.createElement("h3")
        card_head.setAttribute("class", "cardHead")
        card_head.innerHTML = `Animal a adoptar : ${content[index].Animal} ` 

        const card_body = document.createElement("div")
        card_body.setAttribute("class", "card-body")




        card_body.append(content[index].Nombre)
        card.append(image)
        card.append(card_body)
        item.append(card)


        container.append(item)
    }                  
}


function request_error(error) {
    console.log("ERROR")
    console.log(error)              
}

fetch("http://localhost:5000/adopciones")
    .then(response_received)
    .then(parse_data)
    .catch(request_error)
