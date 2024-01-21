
function displayCourseInfo() {
    const courseId = fetchCourseId()

    db.collection("courses")
        .doc(courseId)
        .get()
        .then(doc => {console.log(doc)

        })
}

function fetchCourseId() {
    return sessionStorage.getItem("course-id")
}

