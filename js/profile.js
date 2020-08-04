// When a business is selected, the object is appended into here
console.log("I am Alive")

const start = (user) => {
  console.log(user);

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

let localPizza = 'Pizza'

fetch(`/me/${localStorage.getItem('username')}`)
.then(data=>data.json())
.then(user=>start(user));


let localStorageFood = "Pizza";
fetch(`/fetchrestaurants/${localPizza}`)
.then(data=>data.json())
.then(results=>setupView(results))

//var selectedBusiness = [];

const setupView = (results) => {

  
  // Do this automatically in the future
  console.log("SEtup View")
  let business1 = results.businesses[0]
  console.log(business1)
  
  var title1 = GetElementInsideContainer("rest1", "rest1title");
  var img1 = GetElementInsideContainer("rest1", "rest1img");
  var price1 = GetElementInsideContainer("rest1", "rest1price");
  title1.innerText = business1.name
  price1.innerText = `Price Range: ${business1.price}`
  img1.setAttribute('src', `${business1.image_url}`);

  let business2 = results.businesses[1]
  var title2 = GetElementInsideContainer("rest2", "rest2title");
  var img2 = GetElementInsideContainer("rest2", "rest2img");
  var price2 = GetElementInsideContainer("rest2", "rest2price");
  title2.innerText = business2.name
  price2.innerText = `Price Range: ${business2.price}`
  img2.setAttribute('src', `${business2.image_url}`);

  let business3 = results.businesses[2]
  var title3 = GetElementInsideContainer("rest3", "rest3title");
  var img3 = GetElementInsideContainer("rest3", "rest3img");
  var price3 = GetElementInsideContainer("rest3", "rest3price");

  title3.innerText = business3.name
  price3.innerText = `Price Range: ${business3.price}`
  img3.setAttribute('src', `${business3.image_url}`);

  // Set the on click for each restaurant.
  var div1 = document.getElementById("rest1"); //grab the element
  div1.onclick = function() {clickedOnRestaurant(0, results)}
  var div2 = document.getElementById("rest2"); //grab the element
  div2.onclick = function() {clickedOnRestaurant(1, results)}
  var div3 = document.getElementById("rest3"); //grab the element
  div3.onclick = function() {clickedOnRestaurant(2, results)}

}

var bookmarkbtn = document.querySelector('#bookmarkbtn')
bookmarkbtn.onclick = function() {
  //selectedBusiness[0]
  console.log("pressed")
  bookmarkbtn.setAttribute('method', 'post');
  bookmarkbtn.setAttribute('action', `/savepreference/${selectedBusiness.categories[0].alias}/${selectedBusiness.id}`);
  bookmarkbtn.style.display = 'hidden';
  bookmarkbtn.submit()
}

function clickedOnRestaurant(id, results) {

  let business = results.businesses[id]
  //selectedBusiness[0] = business

  var viewOnYelpBtn = document.querySelector('#yelpviewbtn')
  viewOnYelpBtn.href = `${business.url}`

  var title = document.querySelector('#restaurantname')
  var type = document.querySelector('#restauranttype')
  var price = document.querySelector('#restaurantprice')
  var location = document.querySelector('#restauranthours')

  title.innerText = business.name
  type.innerText = `Restaurant type: ${business.categories[0].alias}`
  location.innerText = `${business.location.display_address}`
  price.innerText = `price: ${business.price}`

  title.scrollIntoView()
}


function GetElementInsideContainer(containerID, childID) {
  var elm = {};
  var elms = document.getElementById(containerID).getElementsByTagName("*");
  for (var i = 0; i < elms.length; i++) {
      if (elms[i].id === childID) {
          elm = elms[i];
          break;
      }
  }
  return elm;
}

//start()


