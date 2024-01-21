document.getElementById("submit").addEventListener("click", e => submitRating());

function fillCourseName() {
    db.collection("courses").doc(sessionStorage.getItem("course-id")).get()
        .then((doc) => {
            document.getElementById("course-placeholder").innerText = doc.data().name;
            document.getElementById("school-placeholder").innerText = doc.data().school;
        })
}

async function getName() { 
    await db.collection("users").doc(localStorage.getItem("currentUid")).get()
    .then(function(doc) {
        if (doc.exists) {
            return doc.data().name;
        } else {
            console.log("Document does not exist");
        }
    }).catch(function(error) {
        console.error("Error: ", error);
    })
}

/* Creates a document into the reviews collection of the course with the user values. The name will not be saved
    if the anonymous box is checked */
function submitRating() {

    // Sets the value to one in case it is null.
    if (document.getElementById("overall").value === "") {
        document.getElementById("overall").value = 1;
    }

    if (document.getElementById("difficulty").value === "") {
        document.getElementById("difficulty").value = 1;
    }

    if (document.getElementById("workload").value === "") {
        document.getElementById("workload").value = 1;
    }

    var average = calculateAverage();

    if (document.getElementById("anonymous").checked) {
        /* Does not save the name. */
        var anonData = {
            id: localStorage.getItem("currentUid"),
            review: document.getElementById("review").value,
            stars: average,
            gradYear: document.getElementById("grad").value
        }
        db.collection("courses").doc(sessionStorage.getItem("course-id")).collection("reviews").add(anonData);
    } else {
        /* Saves the name. */
        var data = {
            user: localStorage.getItem("username"),
            id: localStorage.getItem("currentUid"),
            review: document.getElementById("review").value,
            stars: average,
            gradYear: document.getElementById("grad").value
        }
        db.collection("courses").doc(sessionStorage.getItem("course-id")).collection("reviews").add(data);
    }
    db.collection("courses").doc(sessionStorage.getItem("course-id")).get()
        .then((doc) => {
            let newRating = (doc.data().totalRating + average);
            let currentReviews = doc.data().numreviews;
            currentReviews++;
            return db.collection("courses").doc(sessionStorage.getItem("course-id")).update({
                numreviews: currentReviews,
                totalRating: newRating
            })
        })
}

function calculateAverage() {
    return (parseFloat(document.getElementById("workload").value) + parseFloat(document.getElementById("overall").value) + parseFloat(document.getElementById("difficulty").value)) / 3;
}

fillCourseName();
