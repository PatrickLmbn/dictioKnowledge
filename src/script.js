function getData() {
    const getWordVal = document.getElementById("wordVal").value
    const displayWord = document.getElementById("dispWord")
    const displayPos = document.getElementById("dispPos")
    const displayMeaning = document.getElementById("dispMeaning")
    const displayExample = document.getElementById("dispExample")
    const playbackBtn =document.getElementById("playbackBtn")
    const displayText = document.getElementById("text")
    const playbackCtrl = document.getElementById("playbackCtrl")
    const dispSynonyms = document.getElementById("synonyms")

    

    dispSynonyms.innerHTML = "";

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${getWordVal}`

    fetch(apiUrl)
    .then(response => {
        if(!response.ok) {
            throw new error()
        }
        return response.json()
    })
    .then(data => {
        console.log(data)

        displayWord.textContent = data[0].word
        displayText.textContent = data[0].phonetics[0].text
        displayMeaning.textContent =  data[0].meanings[0].definitions[0].definition
        displayPos.textContent =   data[0].meanings[0].partOfSpeech

        const getSynonymsVal = data[0].meanings[0].synonyms
        document.getElementById("wordVal").value = ""


        const synonyms = getSynonymsVal.map( synonym => {

            const synonymList = document.createElement("li")
            synonymList.textContent = synonym
            return synonymList
        } )


        synonyms.forEach(element => {
            dispSynonyms.appendChild(element)
        });

        const listOfItems = document.getElementsByTagName("li")

        Array.from(listOfItems).forEach(element => {
            element.addEventListener("click", () => {
                document.getElementById("wordVal").value = element.textContent
                getData()
            })
        })


        playbackCtrl.src = data[0].phonetics[1].audio
        playbackBtn.addEventListener('click', (e) => {
            playbackCtrl.play()
        })


    })
    .catch(error => {
        throw new error("this is error message" + error)
    })

}


// document.addEventListener("DOMContentLoaded", () => {
//     let options = {
//         strings: ["Hi everyone, this is DictioKnowledge. A website where you can expand your knowledge!"],
//         typeSpeed: 50,
//         backSpeed: 25,
//         backDelay: 1000,
//         startDelay: 500,
//         loop: true
//     };

//     const type = new Typed("#typing-text", options)
// })



