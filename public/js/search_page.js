

function renderCourses(coursesArray) {
    const template = document.querySelector("template")
    const cardsContainer = document.querySelector("#cards-container")

    coursesArray.forEach(element => {
        const card = template.content.cloneNode(true)
        console.log(card)
        const courseName = card.querySelector(".course-name")
        courseName.innerText = element.name
        
        
        const schoolName = card.querySelector(".institution-name")
        schoolName.innerText = element.school

        const difficultyRating = card.querySelector(".difficulty-rating")
        difficultyRating.innerText = calculateRating(element.totalDifficulty, element.numreviews).toString()

        const workloadRating = card.querySelector(".workload-rating")
        workloadRating.innerText = calculateRating(element.totalWorkload, element.numreviews).toString()

        const programRating = card.querySelector(".program-rating")
        programRating.innerText = calculateRating(element.totalProgramRating, element.numreviews).toString()
        
        cardsContainer.appendChild(card)
    });
}

function calculateRating(total, reviews) {
    if (reviews == 0) {
        return "No Reviews"
    } else {
        return total / reviews
    }
}