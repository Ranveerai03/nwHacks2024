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
                renderCard(doc.data(), doc.id)
            }
        })
    })
}

function renderCard(element, elementDocId) {
    const template = document.querySelector("template")
    const cardsContainer = document.querySelector("#cards-container")
    const clone = template.content.cloneNode(true)
  
    const card = clone.querySelector('div')
    card.id = elementDocId
    console.log(card)
    const courseName = card.querySelector(".course-name")
    courseName.innerText = element.name

    const schoolName = card.querySelector(".institution-name")
    schoolName.innerText = element.school

    const rating = card.querySelector(".rating")
    rating.innerText = calculateRating(element)

    const textContents = card.querySelector(".course-contents")
    textContents.innerText = element.description

    const cardbutton = card.querySelector(".card-button")
    const imgparent = card.querySelector("img").parentElement

    cardbutton.addEventListener('click', e => addDocIdToSessionStr(elementDocId))
    cardbutton.addEventListener('click', e => window.location.href="../../app/html/course_page.html")
    imgparent.href = "../../app/html/course_page.html"
    imgparent.addEventListener('click', addDocIdToSessionStr(elementDocId))
    schoolName.parentElement.href = "../../app/html/course_page.html"
    schoolName.parentElement.addEventListener('click', e => addDocIdToSessionStr(elementDocId))

    //Rewrite this part if have time, ugly code
    const img = card.querySelector("img")
    if (element.school === "British Columbia Institute of Technology") {
        img.src = "../../public/media/bcitLogo.png"
    } else if (element.school === "University of British Columbia") {
        img.src = "../../public/media/ubcLogo.png"
    } else if (element.school === "Simon Fraser University") {
        img.src = "../../public/media/sfuLogo.png"
    } else if (element.school === "Langara College") {
        img.src = "../../public/media/langaraLogo.png"
    } else if (element.school === "Kwantlen Polytechnic University") {
        img.src = "../../public/media/kpuLogo.png"
    }

    cardsContainer.appendChild(card)
}

function addDocIdToSessionStr(id) {
    sessionStorage.setItem("course-id", id)
}

function calculateRating(element) {
    console.log(element)
    if (element.numreviews === 0 || typeof(element.numreviews) != 'number') {
        return "No Reviews"
    } else {
        

        return element.totalRating / element.numreviews
    }
}

