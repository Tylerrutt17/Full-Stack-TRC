const start = (user) => {

  console.log(user)

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

  let usernameLbl = document.querySelector('.username')
  usernameLbl.innerText = user.name
  let locationLbl = document.querySelector('.location')
  locationLbl.innerText = `Zipcode: ${user.zipcode}`

  let userwelcomeLbl = document.querySelector('.userwelcome')
  userwelcomeLbl.innerText = `Let's Eat, ${user.name}`

  
}

fetch(`/me/${localStorage.getItem('username')}`)
.then(data=>data.json())
.then(user=>start(user))

fetch(`/fetchrestaurants/${localStorage.getItem('favorite_foods')}`)
.then(data=>data.json())
.then(results=>loadRestaurants(results))

const loadRestaurants = (results) => {
  console.log('Yay Got all of', results)
}

// const getRestaurants = () => {
//   console.log("Running this func")
//   let topThree = []
//     var counter = 0
//     for (counter; counter < 3; counter++) {
//       var topRandom = calls.choices[Math.floor(Math.random() * Math.floor(calls.choices.length))]
//       topThree.push(topRandom)
//     } 
//     console.log('Get Restaurants', topThree)
// }


 //getRestaurants()






//start()


