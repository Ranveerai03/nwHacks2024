console.log("HELLLLOOOO");
const courseRef = db.collection("courses").doc("5qhsFP65dhKBaa01O42s");
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
    const name = doc.data().name;
    const review = doc.data().review;
    const graduateYear = doc.data().graduateYear;
    const stars = doc.data().stars;

    console.log(name);
    console.log(review);
    console.log(graduateYear);
    console.log(stars);

    let reviewCard = reviewCardTemplate.content.cloneNode(true);
    reviewCard.querySelector(".name").innerHTML = `Name: <b>${name}</b>`;
    reviewCard.querySelector(".graduateYear").innerHTML =
      "TEST: <b>${graduateYear}</b>";
    reviewCard.querySelector(".review").innerHTML = `Review: ${review}`;
    reviewCard.querySelector(".stars").innerHTML = `Stars: ${stars}`;

    reviewCardGroup.appendChild(reviewCard);
  });
});
