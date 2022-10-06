
window.addEventListener("load", async () => {
    // Await data to be fetched from endpoint
    const result = await fetch(
      "http://127.0.0.1:8000"
    );
    // Result er det overordnede HTTP response
    console.log(result);
    // Her får vi data:
    const data = await result.json();
    console.log(data);

    dataMiddle = JSON.stringify(data)
    let assets = JSON.parse(dataMiddle)
    console.log(assets)

    //for (let i = 0; i < dataNew.length; i++ ){
        
    
      //  document.getElementById("formerUser").innerHTML = dataNew[i].username
        //document.getElementById("formerPost").innerHTML = dataNew[i].message
    
    
    //}
  




//husk prevent default

const form = document.querySelector("#pip")

form.addEventListener("submit", async (event) => {
    //event.preventDefault();


    const username =  document.querySelector("#username").value //hent brugernavn fra input html
    const pip = document.querySelector("#textarea").value

    const object = {
        username: username,
        message: pip
    }

    const asJason = JSON.stringify(object);

    const result = await fetch("http://127.0.0.1:8000", {
    method: "POST",
    body: asJason
    })

    console.log(result)

    const body = await result.json()
    console.log(body)

})



Object.keys(assets).forEach(key => {
    //const pipcard = document.querySelector("#pipcard")
    // get current asset data
    const assetData = assets[key];
    // create asset container
    const container = document.createElement("div");
    // create and append asset header
    const header = document.createElement('h1');
    header.appendChild(document.createTextNode(assetData.username))
    // create and append
    const p1 = document.createElement('p')
    p1.appendChild(document.createTextNode(assetData.message))
    //create dots
    const button = document.createElement('button');
    //button.setAttribute("id = mybtn")
    button.innerHTML = "...";
    //button.appendChild(pipcard)
    
    // fill out the asset container
    container.appendChild(header)
    container.appendChild(p1)
    container.appendChild(button)
    //container.appendChild(h3)
    // append the whole thing to the parent
    document.getElementById("formerPips").appendChild(container);

    button.addEventListener("click", () => {
        modal.style.display = "block";
        brugernavn.innerHTML = assetData.username;
        redigerPip.innerHTML = assetData.message;

        sletPip.addEventListener("click", async (event) => {
            event.preventDefault();

            const nPip_ID = assetData.pip_ID
            const nUsername =  assetData.username
            const nPip = assetData.message
            

            const object = {
                pip_ID: nPip_ID,
                username: nUsername,
                message: nPip
            }
        
            const asJason = JSON.stringify(object);

            const deletePip = fetch("http://127.0.0.1:8000/" + nPip_ID, {
            method: "DELETE",
            body: asJason
            })

            console.log(deletePip)
    
            console.log(assetData)
            
            modal.style.display = "none"
            
            console.log(assets)

            window.location.reload()
        
        })

        opdaterPip.addEventListener("click", async (event) => {
           // event.preventDefault();

            const nPip_ID = assetData.pip_ID
            const nUsername =  assetData.username
            //const nPip = assetData.message
            let redigerPip = document.querySelector("#redigerPip").value



            const object = {
                pip_ID: nPip_ID,
                username: nUsername,
                message: redigerPip
            }
        
            const asJason = JSON.stringify(object);

            const deletePip = fetch("http://127.0.0.1:8000/" + nPip_ID, {
            method: "PUT",
            body: asJason
            })

            console.log(deletePip)
    
            console.log(assetData)
            
            modal.style.display = "none"
            
            console.log(assets)

            window.location.reload()
        
        })
    })


    
    
})
})

let modal = document.getElementById("myModal");
let btn = document.getElementById("mybtn");
let span = document.getElementsByClassName("close")[0];

const brugernavn = document.getElementById("brugernavn")
const opdaterPip = document.getElementById("opdater")
const sletPip = document.getElementById("sletPip")





btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
    }
}










