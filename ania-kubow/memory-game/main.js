const cards = [
    {
        name: "elephant",
        img: "./images/baby-elephant-gca5c6ad3f_640.png"
    },
    {
        name: "cat",
        img: "./images/cat-g2e91f1039_640.png"
    },
    {
        name: "chicken",
        img: "./images/chicken-g336feced9_640.png"
    },
    {
        name: "dog",
        img: "./images/dog-g7d8ec9f50_640.png"
    },
    {
        name: "dolphin",
        img: "./images/dolphin-gfe73b1ce6_640.png"
    },
    {
        name: "lady-bug",
        img: "./images/ladybug-gd1846cd7b_640.png"
    },
    {
        name: "elephant",
        img: "./images/baby-elephant-gca5c6ad3f_640.png"
    },
    {
        name: "cat",
        img: "./images/cat-g2e91f1039_640.png"
    },
    {
        name: "chicken",
        img: "./images/chicken-g336feced9_640.png"
    },
    {
        name: "dog",
        img: "./images/dog-g7d8ec9f50_640.png"
    },
    {
        name: "dolphin",
        img: "./images/dolphin-gfe73b1ce6_640.png"
    },
    {
        name: "lady-bug",
        img: "./images/ladybug-gd1846cd7b_640.png"
    }
]

let chosenCardsNames = []
let chosenCardsIds = []
const foundCards = []

const gridDisplay = document.querySelector("#grid")

const randomizeArray = (arr) => arr.sort(() => 0.5 - Math.random())

const createBoard = (cards) => {
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement("img")
        card.setAttribute("src", "./images/background.png")
        card.setAttribute("data-id", i)
        card.addEventListener("click", () => flipCard(i, card))
        gridDisplay.appendChild(card)
    }
}

const isGameOver = () => foundCards.length === (cards.length / 2)

const checkForMatch = () => {
    const gridCards = document.querySelectorAll("#grid img")
    const firstId = chosenCardsIds[0]
    const secondId = chosenCardsIds[1]

    if (firstId == secondId) {
        alert("You clicked the same card")
    }

    if (chosenCardsNames[0] === chosenCardsNames[1]) {
        console.log("It's a match")

        gridCards[firstId].setAttribute("src", "images/smile.png")
        gridCards[firstId].removeEventListener("click", flipCard)

        gridCards[secondId].setAttribute("src", "images/smile.png")
        gridCards[secondId].removeEventListener("click", flipCard)

        foundCards.push(chosenCardsNames)
    } else {
        gridCards[firstId].setAttribute("src", "images/background.png")
        gridCards[secondId].setAttribute("src", "images/background.png")
        // alert("Sorry try again")
    }

    chosenCardsNames = []
    chosenCardsIds = []

    if (isGameOver()) {
        alert("Congratulations you found them all")
    }
}

const flipCard = (id, elem) => {
    const { name, img } = cards[id]

    chosenCardsNames.push(name)
    chosenCardsIds.push(id)

    console.log(chosenCardsNames)
    console.log(chosenCardsIds)

    elem.setAttribute("src", img)

    if (chosenCardsNames.length >= 2) {
        setTimeout(() => {
            checkForMatch()
        }, 1000)
    }
}

const main = () => {
    randomizeArray(cards)
    createBoard(cards)
}

main()
