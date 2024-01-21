const inputElement = document.querySelector("#search")

inputElement.addEventListener('keyup', e => {
    renderCourses(e.target.value);
})

function renderCourses(searchValue) {
    const courseCollection = db.collection("courses")
    const cardsContainer = document.querySelector("#cards-container")
    cardsContainer.replaceChildren()
    courseCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            console.log(doc.data())
            if (doc.data().name.toLowerCase().includes(searchValue.toLowerCase())) {
                renderCard(doc.data())
            }
        })
    })
}

function renderCard(element) {
    const template = document.querySelector("template")
    const cardsContainer = document.querySelector("#cards-container")

    const card = template.content.cloneNode(true)
    console.log(card)
    const courseName = card.querySelector(".course-name")
    courseName.innerText = element.name

    const schoolName = card.querySelector(".institution-name")
    schoolName.innerText = element.school

    const rating = card.querySelector(".rating")
    rating.innerText = calculateRating(element)

    const textContents = card.querySelector(".course-contents")
    textContents.innerText = element.description

    cardsContainer.appendChild(card)
}

function calculateRating(element) {
    console.log(element)
    if (element.numreviews === 0 || typeof(element.numreviews) != 'number') {
        return "No Reviews"
    } else {
        

        return element.totalRating / element.numreviews
    }
}

