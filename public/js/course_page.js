console.log("HELLLLOOOO");
const courseRef = db.collection("courses").doc(fetchCourseIdFromSessionStr());
const reviewsRef = courseRef.collection("reviews");
const reviewCardTemplate = document.getElementById("card-template");
const courseReviewCardTemplate = document.getElementById("course-template");

courseRef.get().then((doc) => {
  const degree = doc.data().degree;
  const specialisation = doc.data().name
  const school = doc.data().school;
  const domesticTuition = doc.data().domesticTuition;
  const internationalTuition = doc.data().internationalTuition;
  const length = doc.data().length;
  const description = doc.data().description;
  const rating = calculateRating(doc.data())
  const img = document.querySelector("#school-logo")
  document.querySelector("#coursepage-rating").innerHTML = insertStars(rating)
  // document.querySelector("#coursepage-rating").innerHTML = rating

  if (doc.data().school === "British Columbia Institute of Technology") {
    img.src = "../../public/media/bcitLogo.png"
  } else if (doc.data().school === "University of British Columbia") {
    img.src = "../../public/media/ubcLogo.png"
  } else if (doc.data().school === "Simon Fraser University") {
    img.src = "../../public/media/sfuLogo.png"
  } else if (doc.data().school === "Langara College") {
    img.src = "../../public/media/langaraLogo.png"
  } else if (doc.data().school === "Kwantlen Polytechnic University") {
    img.src = "../../public/media/kpuLogo.png"
  }

  console.log(degree);
  console.log(school);
  console.log(domesticTuition);
  console.log(internationalTuition);
  console.log(length);
  console.log(description);

  let courseReviewCard = courseReviewCardTemplate.content.cloneNode(true);
  courseReviewCard.querySelector(".degree").innerHTML = degree;
  courseReviewCard.querySelector(".specialisation").innerHTML = specialisation;
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
    //reviewCard.querySelector(".stars").textContent = stars;
    reviewCard.querySelector(".stars").innerHTML = insertStars(stars);

    reviewCardGroup.appendChild(reviewCard);
  });
});

function fetchCourseIdFromSessionStr() {
    return sessionStorage.getItem("course-id")
}

function calculateRating(element) {
  console.log(element)
  if (element.numreviews === 0 || typeof (element.numreviews) != 'number') {
    return "No Reviews"
  } else {
    return element.totalRating / element.numreviews
  }
}

function insertStars(rating) {
  let starRating = "";
  // This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
  for (let i = 0; i < rating; i++) {
    starRating += '<span class="material-icons">star</span>';
  }

  return starRating
  // After the first loop, this second loop runs from i=rating to i<5.
}