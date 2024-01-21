console.log("HELLLLOOOO");
const courseRef = db.collection("courses").doc(fetchCourseIdFromSessionStr());
const reviewsRef = courseRef.collection("reviews");
const reviewCardTemplate = document.getElementById("card-template");
const courseReviewCardTemplate = document.getElementById("course-template");

courseRef.get().then((doc) => {
  const degree = doc.data().degree;
  const school = doc.data().school;
  const domesticTuition = doc.data().domesticTuition;
  const internationalTuition = doc.data().internationalTuition;
  const length = doc.data().length;
  const description = doc.data().description;

  console.log(degree);
  console.log(school);
  console.log(domesticTuition);
  console.log(internationalTuition);
  console.log(length);
  console.log(description);

  let courseReviewCard = courseReviewCardTemplate.content.cloneNode(true);
  courseReviewCard.querySelector(".degree").innerHTML = degree;
  courseReviewCard.querySelector(".school").innerHTML = school;
  courseReviewCard.querySelector(".length").innerHTML = `Length: <b>${length}</b>`;
  courseReviewCard.querySelector(".domesticTuition").innerHTML = `Domestic tuition: <b>${domesticTuition}</b>`;
  courseReviewCard.querySelector(".internationalTuition").innerHTML = `International Tuition: <b>${internationalTuition}</b>`;
  courseReviewCard.querySelector(".description").innerHTML = description;

  courseCardGroup.appendChild(courseReviewCard);
});

reviewsRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const name = doc.data().user;
    const review = doc.data().review;
    const graduateYear = doc.data().gradYear;
    const stars = doc.data().stars;

    console.log(name);
    console.log(review);
    console.log(graduateYear);
    console.log(stars);

    let reviewCard = reviewCardTemplate.content.cloneNode(true);
    reviewCard.querySelector(".name").innerHTML = name;
    reviewCard.querySelector(".graduateYear").innerHTML = graduateYear;
    reviewCard.querySelector(".review").innerHTML = review;
    reviewCard.querySelector(".stars").innerHTML = stars;

    reviewCardGroup.appendChild(reviewCard);
  });
});

function fetchCourseIdFromSessionStr() {
    return sessionStorage.getItem("course-id")
}