const writeReview = document.querySelector(".submitbutton");
const uploadPicture = document.querySelector(".submitpicture");
function visi() {
  var reviewPageOpen = document.getElementById("review");
  if (reviewPageOpen.style.display === "none") {
    reviewPageOpen.style.display = "block";
  } else {
    reviewPageOpen.style.display = "none";
  }
}
writeReview.addEventListener("click", visi);

function visi2() {
  var pic = document.getElementById("picture");
  if (pic.style.display === "none") {
    pic.style.display = "block";
  } else {
    pic.style.display = "none";
  }
}
uploadPicture.addEventListener("click", visi2);
