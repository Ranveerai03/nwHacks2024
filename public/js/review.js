document.getElementById("submit").addEventListener("click", e => submitRating());

function fillCourseName() {
    db.collection("courses").doc(sessionStorage.getItem("course-id")).get()
        .then((doc) => {
            console.log(doc.data());
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
    if (document.getElementById("anonymous").checked) {
        /* Does not save the name. */
        var anonData = {
            id: localStorage.getItem("currentUid"),
            review: document.getElementById("review").value,
            difficult: document.getElementById("difficulty").value,
            workload: document.getElementById("workload").value,
            overall: document.getElementById("overall").value,
            gradYear: document.getElementById("grad").value
        }
        db.collection("courses").doc(sessionStorage.getItem("course-id")).collection("reviews").add(anonData);
    } else {
        /* Saves the name. */
        var data = {
            user: localStorage.getItem("username"),
            id: localStorage.getItem("currentUid"),
            review: document.getElementById("review").value,
            difficult: document.getElementById("difficulty").value,
            workload: document.getElementById("workload").value,
            overall: document.getElementById("overall").value,
            gradYear: document.getElementById("grad").value
        }
        db.collection("courses").doc(sessionStorage.getItem("course-id")).collection("reviews").add(data);
    }
}

fillCourseName();
