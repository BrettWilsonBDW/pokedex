// Brett Wilson 
// brett.david.wilson@outlook.com

// credit https://youtu.be/dVtnFH4m_fE for helping me understand fetch and basic styling.

// please note a lot of comments are just me talking to myself github pages forces a repo to be public so please be kind if anyone ever reads this stuff.  

// global variable's

var pokedex = {}; // {1 : {"name" : "bulbsaur", "img" : url, "type" : ["grass", "poison"], "desc" : "...."} }
// also note we dont pass pokedex anywhere but we can use it everywhere as it is var


// test function for the test button

// document.getElementById("test").onclick = async function(){

//     num = document.getElementById("textbox").value;

//     pokeCardMaker(num)

// }



// search logic
// document.getElementById("search").onclick = () => {} === document.getElementById("search").addEventListener('click', () => {})

document.getElementById("search").onclick = async function(){


    num = document.getElementById("textbox").value;
    // pokiNum = Number(pokiNum);


    clearALL()

    // INPUT VALIDATION
    if (num > 151) {
        document.getElementById("amtlabel").innerHTML = "There are only 151 pokemon here"
    } else if (num <= 0) {
        document.getElementById("amtlabel").innerHTML =  "Please use a number above 0 to 151"
    } else
        
        document.getElementById("amtlabel").innerHTML =  "Name or id Results:" 


    listMaker(num.toLowerCase())

}

// random button

document.getElementById("randomButton").onclick = async function(){

        document.getElementById("amtlabel").innerHTML =  "Heres a random pokemon."

        clearALL()

        let num = Math.floor(Math.random() * 152)

        listMaker(num)

}

document.getElementById("clearButton").onclick = async function(){

    clearALL()
}

document.getElementById("listButton").onclick = async function(){

    clearALL()
    listPokemon()

}

document.getElementById("clearPageButton").onclick = async function(){
    window.location.reload();
}

document.getElementById("sortButton").onclick = async function(){

    num = document.getElementById("textbox").value;
    // console.log(amt)
    
    clearALL()

    if (num > 151) {
        document.getElementById("amtlabel").innerHTML = "There are only 151 pokemon here"
    }else{

        for (var x = num; x >= 1; x--) {
            

            await getPokemon(x);
            listMaker(x)

            // console.log(x)
        }
    }
}

document.getElementById("sortalphbet").onclick = async function(){

    amt = document.getElementById("textbox").value;

    clearALL()

        
    var pokiArr = [];

    for (let ctr = 1; ctr <= amt; ctr++) {


        await getPokemon(ctr);
        

        pokiArr.push(pokedex[ctr]["name"])
        // console.log(pokiArr)

   }

    pokiArr.sort()

    console.log(pokiArr)

    for (let srtCtr = 0; srtCtr < amt; srtCtr++) {
        
        // console.log(pokiArr[srtCtr])

        await getPokemon(pokiArr[srtCtr]);

        listMaker(pokiArr[srtCtr])
        
    }
}


document.getElementById("sortalphbetReverse").onclick = async function(){

    amt = document.getElementById("textbox").value;

    clearALL()

        
    var pokiArr = [];

    for (let ctr = 1; ctr <= amt; ctr++) {


        await getPokemon(ctr);
        

        pokiArr.push(pokedex[ctr]["name"])
        // console.log(pokiArr)

   }


    pokiArr.sort()
    pokiArr.reverse()

    console.log(pokiArr)

    for (let srtCtr = 0; srtCtr < amt; srtCtr++) {
        
        console.log(pokiArr[srtCtr])

        await getPokemon(pokiArr[srtCtr]);

        listMaker(pokiArr[srtCtr])
        
    }


}

document.getElementById("searchType").onclick = async function(){

    num = document.getElementById("textbox").value;

    listMakerType(num.toLowerCase())


}


// logic for list

async function listPokemon(number) {

    let amt = number
    let loopAmt
    

    amt = document.getElementById("textbox").value; 
    // amt = Number(amt);

    if (amt > 151) {
        document.getElementById("amtlabel").innerHTML = "There are only 151 pokemon here" // adds message 
    } else if (amt >= 0) {
        clearALL(amt)
        document.getElementById("amtlabel").innerHTML =  "list by amount Results." // refreshes message if correct amt
        loopAmt = amt
        addinglist(loopAmt)

    } else if (isNaN(amt)) {
        document.getElementById("amtlabel").innerHTML =  "Please use a number above 0"
    } else if (amt <= 0) {
        document.getElementById("amtlabel").innerHTML =  "Please use a number above 0"
    } else {

        document.location.reload(true) // This is no longer needed but I will leave it here just in case
    }

    return loopAmt
}



    // cycle through an array of ids to list out pokemon

    // loop for list maker in order

    let addinglist = async function(num) {

        // for (let i = 1; i <= num; i++) { // for loop to go over our pokimone https://pokeapi.co/api/v2/pokemon/1 is balbasour and https://pokeapi.co/api/v2/pokemon/2 is the next one hints https://pokeapi.co/api/v2/pokemon/1
        //     await getPokemon(i);

        //     // listMaker(i)
            
        // }
        await pokemoneMain(num)
    }


    // makes the items on the side list 

    let listMaker = async function(num) {

        await getPokemon(num);

        if (pokedex[num]["id"] >= 152) {
            document.getElementById("amtlabel").innerHTML = "filtered Results:"
            // console.log(num)
        }else{

        
        //<div id="1" class="pokemon-name">BULBASAUR</div> // what we are creating here
        let pokemon = document.createElement("div");
        pokemon.id = num;
        pokemon.innerText = pokedex[num]["id"].toString() + ". " + pokedex[num]["name"].toUpperCase(); // pokiNum is the number of pokimone and pokedex[pokiNum]["name"] is the full name of that pokimone
        pokemon.classList.add("pokemon-name"); // changes the css 
        pokemon.addEventListener("mouseover", updatePokemon); // click is the property ex we can add mouseover
        document.getElementById("pokemon-list").append(pokemon); // add this div to the bottom of pokemon-list


        // clearALL()

        pokeCardMaker(num)
        }
    }

    let listMakerType = async function(num) {
        
        clearALL()

            typePokemon = await getPokemontype(num)

            // console.log(typePokemon)

            let pokeTypesLen = typePokemon["pokemon"]


            // console.log(pokeTypesLen)


            for (let jj = 0; jj < pokeTypesLen.length; jj++) {
                
                let typePokemonName = typePokemon["pokemon"][jj]["pokemon"]["name"]


                // console.log(typePokemonName)
    
                listMaker(typePokemonName)                

            }

    }

    

    /* ADDS ONE POKEMON OBJECT TO POKEDEX ARRAY */
    async function getPokemon(num) {
        // let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString(); // concats num to the end of https://pokeapi.co/api/v2/pokemon/ ex https://pokeapi.co/api/v2/pokemon/1
    
        // let res = await fetch(url);    // res is response   // await is because async
        // let pokemon = await res.json(); // pokemon is assigned res in json forum
        // console.log(pokemon);

        let pokemon = await getSinglePokemonObj(num)
        // console.log('pokemon!')

        // console.log(pokemon);
    
        let pokemonName = pokemon["name"];  // name, types etc is from console.log(pokemon);
        let pokemonType = pokemon["types"];
        let pokemonImg = pokemon["sprites"]["other"]["official-artwork"]["front_default"]; // where to get the url for pics
        let pokemonId = pokemon["id"]
    
        res = await fetch(pokemon["species"]["url"]); // fetching the description from species url
        let pokemonDesc = await res.json(); // making it into json
    
        // console.log(pokemonDesc);
        pokemonDesc = pokemonDesc["flavor_text_entries"][5]["flavor_text"].replace('', ' '); // if you look at console.log(pokemonDesc); there are multiple descriptions we picked number 9 // .replace gets rid of that up arrow
    
        pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc, "id" : pokemonId}; // mapping each element of the array through i aka num
    
        // console.log(num)/
    }


    // function to change and show the pokimone displayed when clicked is called

    /* UPDATES MAIN POKEMON CARD */
    function updatePokemon() { //used to change the displayed pokimone
            document.getElementById("pokemon-img").src = pokedex[this.id]["img"]; // this is the name that was clicked 

            //clear previous type
            let typesDiv = document.getElementById("pokemon-types"); // looks to see if there is something there in the Element
            while (typesDiv.firstChild) {   // while true remove the Element ^^
                typesDiv.firstChild.remove();
            }

            //update types
            let types = pokedex[this.id]["types"]; // making a variable that holds the types of the id clicked on using this // types is a array
            for (let i = 0; i < types.length; i++) { // there can be more than one type for a pokimone soo cycle through it
                let type = document.createElement("span");
                type.innerText = types[i]["type"]["name"].toUpperCase();
                type.classList.add("type-box");
                type.classList.add(types[i]["type"]["name"]); //adds background color and font color
                typesDiv.append(type); // changes the span
            }

            //update description
            document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];

            document.getElementById("pokiname").innerText = pokedex[this.id]["name"].toUpperCase();
            
    }



    async function pokeCardMaker(num) {

        // console.log(num)
        // console.log(pokedex[num]["img"])

        const markup = `
            <div class="pokicards card-name">
                <div id="pokemonCard-info" class="card-name">
                    <h2 class="nameStyle">
                    ${pokedex[num]["name"].toUpperCase()}
                    </h2>
                    <div class="card-name" ></div>
                    <img id="pokemon-img" class="card-name card-img" src="${pokedex[num]["img"]}">
                    <p class="description">${pokedex[num]["desc"]}</p>
                </div>
            </div>
        `;


        // cards = document.createElement("div");

        const cards = document.createElement('div');

        cards.classList.add("card-name");
        
        cards.innerHTML = markup;

        const card = document.getElementById('card');

        card.appendChild(cards);

        // document.getElementById("card").appendChild(markup);
    }


// function to clear the whole array of 151 pokimone

async function clearALL() {

    const list = document.getElementsByClassName("pokemon-name");

    while (list.length > 0) list[0].remove();


    const card = document.getElementsByClassName("card-name");

    while (card.length > 0) card[0].remove();

}


// promise functions

const getPokemonIndex = async (limit) => {
    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    const response = await fetch(`pokemon.json`)
    const data = await response.json()
    return data.results
}

const getDetailedPokemonArray = async (pokemonIndex) => {
    const pokemonPromiseArray = pokemonIndex.map(async (pokemon) => {
        const response = await fetch(pokemon.url)
        const data = await response.json()
        return data
    })

    const pokemonArray = await Promise.all(pokemonPromiseArray)

    return pokemonArray
}

const getSinglePokemonObj = async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()
    return data
} 

const getPokemontype = async (type) => {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
    const data = await response.json()
    return data
}


const pokemoneMain = async (num) => {

            console.log('getting pokemon!')
        let pokemonIndex = await getPokemonIndex(152)
        let pokemonArray = await getDetailedPokemonArray(pokemonIndex)

        console.log('finished getting!')
        console.log(pokemonArray)


        for (let ii = 0; ii < num; ii++) {
            
            await listMaker(pokemonArray[ii]["id"])

        }

        return pokemonArray

}


(async () => {
    
        console.log('getting pokemon!')
        let pokemonIndex = await getPokemonIndex(151)
        let pokemonArray = await getDetailedPokemonArray(pokemonIndex)

        console.log('finished getting!')
        console.log(pokemonArray)


        for (let ii = 0; ii < 151; ii++) {
            
            await listMaker(pokemonArray[ii]["id"])

        }

})()


