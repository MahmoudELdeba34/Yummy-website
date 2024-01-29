const searchByNameBtn = document.getElementById("searchByNameBtn");
const searchByLetterBtn = document.getElementById("searchByLetterBtn");
const imgFull = document.getElementById("imgForFull");
const searchDecFull = document.getElementById("searchDec");
let arrFull = [];
let arrLitter = [];
console.log(searchByNameBtn);
searchByNameBtn.addEventListener("keyup", function () {
  // console.log(searchByNameBtn.value);
  fetchSearchByName(searchByNameBtn.value);
});
searchByLetterBtn.addEventListener("keyup", function () {
  console.log("");
  fetchSearchByLetter(searchByLetterBtn.value);
});
//&------------------------------Start Fetch search By Full Name ---------------------------------
async function fetchSearchByName(Fullname) {
  try {
    let request = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${Fullname}`
    );
    let response = await request.json();

    // Check if meals are found
    if (response.meals) {
      arrFull.push(response);

      let data = "";

      // Loop through meals and create HTML for each
      for (let i = 0; i < arrFull[0].meals.length; i++) {
        data += `
              <div class="parent col-md-3 position-relative">
                <div class="item ms-5">
                  <img src=${arrFull[0].meals[i].strMealThumb} alt="" class="w-100" id="imgForFull">
                  <div class="child position-absolute bg-info ms-5">
                    <p class="searchDec" data-index="${i}">${arrFull[0].meals[i].strMeal}</p>
                  </div>
                </div>
              </div>
            `;
      }

      // Display the HTML on the page
      document.getElementById("searchByfullName").innerHTML = data;

      // Add click event listener to each meal
      document.querySelectorAll(".searchDec").forEach((item) => {
        item.addEventListener("click", () => {
          // Get the index from the data attribute
          const index = item.getAttribute("data-index");
          // Display details or perform other actions based on the index
          showMealDetails(index);
        });
      });
    } else {
      // Handle case when no meals are found
      console.log("No meals found for the given input.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to show details based on the selected meal index
function showMealDetails(index) {
  const mealDetails = arrFull[0].meals[index];

  // Create HTML structure for full meal details
  let cartona = "";
  cartona += `
       <div class="row mb-5">
       <div class="col-md-3">
       <div class="item text-center">
         <img src=${mealDetails.strMealThumb} alt="img" class="w-100">
         <h2>${mealDetails.strMeal}</h2>
       </div>
     </div>
     <div class="col-md-8">
       <div class="item">
         <h2>Instructions</h2>
         <p>${mealDetails.strInstructions}</p>
         <h3>Area: ${mealDetails.strArea}</h3>
         <h3>Category: ${mealDetails.strCategory}</h3>
         <h3>Recipes :</h3>
         <ul class="list-unstyled d-flex flex-wrap g-3">
           <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient1}</li>
           <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient2}</li>
           <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient3}</li>
           <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient4}</li>
           <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient5}</li>
           <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient6}</li>
           <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient7}</li>
         </ul>
         <h3>Tags :</h3>
         <a href=${mealDetails.strSource} target="_blank" class="btn btn-success">Source</a>
         <a href=${mealDetails.strYoutube} target="_blank" class="btn btn-danger">Youtube</a>
       </div>
     </div>
       </div>
      `;

  // Display the HTML for full meal details
  document.getElementById("displayFullMeal").innerHTML = cartona;

  // Hide the search results and display the full meal details
  document.getElementById("searchByfullName").style.display = "none";
  document.getElementById("displayFullMeal").style.display = "block";
}

// Function to trigger search based on user input
function searchMeal() {
  const userInput = document.getElementById("mealInput").value;
  if (userInput.trim() !== "") {
    // Clear previous search results and full meal details
    document.getElementById("searchByfullName").innerHTML = "";
    document.getElementById("displayFullMeal").innerHTML = "";
    // Fetch new search results
    fetchSearchByName(userInput);
  } else {
    alert("Please enter a meal name.");
  }
}

//&------------------------------End Fetch search By Full Name ---------------------------------
//?---------------------------------------------------------------------------------------------------
//&------------------------------Start Fetch search By litter ---------------------------------
async function fetchSearchByLetter(letter) {
  try {
    const request = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const response = await request.json();

    const arrLitter = [];

    if (response.meals) {
      arrLitter.push(response);

      let data = "";
      for (let i = 0; i < response.meals.length; i++) {
        data += `
          <div class="parent col-md-3 position-relative" data-mealid="${response.meals[i].idMeal}">
            <div class="item ms-5">
              <img src=${arrLitter[0].meals[i].strMealThumb} alt="" class="w-100" id="imgForFull">
              <div class="child position-absolute bg-info ms-5">
                <p id="searchDec">${arrLitter[0].meals[i].strMeal}</p>
              </div>
            </div>
          </div>
        `;
      }

      document.getElementById("searchByfullName").innerHTML = data;

      // Add event listener to the parent container for event delegation
      document
        .getElementById("searchByfullName")
        .addEventListener("click", handleMealItemClick);
    } else {
      document.getElementById("searchByfullName").innerHTML =
        "No meals found for the given letter.";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to fetch detailed information for a specific meal based on its ID
async function fetchMealDetails(mealId) {
  try {
    const request = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const response = await request.json();

    if (response.meals) {
      const mealDetails = response.meals[0];
      displayMealDetails(mealDetails);
    } else {
      console.error("No details found for the selected meal.");
    }
  } catch (error) {
    console.error("Error fetching meal details:", error);
  }
}

// Function to display detailed information of a meal
function displayMealDetails(mealDetails) {
  let cartona = "";
  cartona += `

<div class="container mt-5 text-white">
<div class="row mt-5" id="mealDetailsContainer">
      <div class="col-md-3">
        <div class="item text-center">
          <img src=${mealDetails.strMealThumb} alt="img" class="w-100">
          <h2>${mealDetails.strMeal}</h2>
        </div>
      </div>
      <div class="col-md-8">
        <div class="item">
          <h2>Instructions</h2>
          <p>${mealDetails.strInstructions}</p>
          <h3>Area: ${mealDetails.strArea}</h3>
          <h3>Category: ${mealDetails.strCategory}</h3>
          <h3>Recipes :</h3>
          <ul class="list-unstyled d-flex flex-wrap g-3">
            <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient1}</li>
            <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient2}</li>
            <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient3}</li>
            <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient4}</li>
            <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient5}</li>
            <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient6}</li>
            <li class="alert alert-info m-2 p-1">${mealDetails.strIngredient7}</li>
          </ul>
          <h3>Tags :</h3>
          <a href=${mealDetails.strSource} target="_blank" class="btn btn-success">Source</a>
          <a href=${mealDetails.strYoutube} target="_blank" class="btn btn-danger">Youtube</a>
        </div>
      </div>
    </div>
    </div>
  `;

  // Hide the meal list container
  document.getElementById("searchByfullName").style.display = "none";

  // Append the HTML to the body
  const mealDetailsContainer = document.createElement("div");
  mealDetailsContainer.innerHTML = cartona;
  document.body.prepend(mealDetailsContainer);
}
// Event delegation function
function handleMealItemClick(event) {
  const target = event.target.closest(".parent");
  if (target) {
    const mealId = target.getAttribute("data-mealid");
    fetchMealDetails(mealId);
  }
}
//&------------------------------End Fetch search By litter ---------------------------------
//?------------------------------------------------------------------------------------------------------
//&------------------------------Start Fetch Categories ---------------------------------
let arrCategories = [];
async function getCategories() {
  let request = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let response = await request.json();
  console.log(response);
  arrCategories.push(response);
  console.log(arrCategories[0].categories[0]);
  let data = "";
  for (let i = 0; i < response.categories.length; i++) {
    console.log(arrCategories[0].categories[i].idCategory);
    data += `
    <div class="parent col-md-3 position-relative overflow-hidden p-5">
                    <div class="item">
                        <img src=${arrCategories[0].categories[i].strCategoryThumb} alt="" class="w-100">
                    <div class="child position-absolute bg-info overflow-hidden p-5 rounded-5">
                        <h2>${arrCategories[0].categories[i].strCategory}</h2>
                        <p >${arrCategories[0].categories[i].strCategoryDescription}</p>
                    </div>
                    </div>
                </div>
    `;
  }
  document.getElementById("Category").innerHTML = data;
}

//&------------------------------End Fetch Categories ---------------------------------
//?------------------------------------------------------------------------------------------------------
//&------------------------------Start Fetch Area ---------------------------------
let arrArea = [];
async function showArea() {
  let requset = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let response = await requset.json();
  console.log(response);
  arrArea.push(response);
  let data = "";
  let city = [];
  for (let i = 0; i < response.meals.length; i++) {
    console.log(city);
    city.push(arrArea[0].meals[i].strArea);
    console.log(arrArea[0].meals[i].strArea);
    data += `
     <div class="col-md-3 mt-5">
            <div class="item text-center">
                <div><i class="fa-solid fa-house fa-4x text-white text-center"></i></div>
                <div id='mahmoud'><h5 class="text-white">${arrArea[0].meals[i].strArea}</h5></div>
            </div>
        </div>
     `;
  }
  document.getElementById("city").innerHTML = data;
  console.log(document.getElementById("mahmoud").innerHTML);
}
//city
//&------------------------------End Fetch Area ---------------------------------
//?---------------------------------------------------------------------------------------------------------
//&------------------------------Start Fetch Ingredients ---------------------------------
let arrIngredients = [];
async function getIngredients() {
  const requst = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const response = await requst.json();
  console.log(response);
  arrIngredients.push(response);
  let data = "";
  for (let i = 0; i < arrIngredients[0].meals.length; i++) {
    data += `
      <div class="col-md-3  mt-5 text-white text-center">
                    <div class="item">
                        <i class="fa-solid fa-utensils fa-4x"></i>
                        <h2 >${arrIngredients[0].meals[i].strIngredient}</h2>
                        <p class="text-start">${arrIngredients[0].meals[i].strDescription}</p>
                    </div>
                </div>
                
      `;
  }

  document.getElementById("Ingredient").innerHTML = data;
}
//&------------------------------End Fetch Ingredients ---------------------------------
//?------------------------------------------------------------------------------------------------------
//&------------------------------Start Fetch Ingredients ---------------------------------
let arrDefult = [];
async function fetchDefultMeals() {
  const requst = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const response = await requst.json();
  arrDefult.push(response);
  let data = "";
  console.log(response);
  console.log(arrDefult);
  for (let i = 0; i < arrDefult[0].categories.length; i++) {
    data += `
      <div class="parent col-md-3 position-relative">
                      <div class="item rounded-5">
                          <img src=${arrDefult[0].categories[i].strCategoryThumb} alt="" class="w-100">
                      <div class="child position-absolute rounded-5">
                          <p >${arrDefult[0].categories[i].strCategory}</p>
                      </div>
                      </div>
                  </div>
      `;
  }
  document.getElementById("defult").innerHTML = data;
}

//&------------------------------Start Fetch Ingredients ---------------------------------
//defult
fetchDefultMeals();
//~==================================================================JQuery=================================================================
//^======> start  sidebar logic
let colorBoxes = $(".color-box");
colorBoxes.eq(0).css("backgroundColor", "#09c");
colorBoxes.eq(1).css("backgroundColor", "#652");
colorBoxes.eq(2).css("backgroundColor", "#f00c");
colorBoxes.eq(3).css("backgroundColor", "#065");
colorBoxes.eq(4).css("backgroundColor", "#fff");
colorBoxes.eq(5).css("backgroundColor", "#000");
$("#sidbar .outer .mo").click(function (e) {
  let sidbarInnerWidth = $(".sidbar-inner").innerWidth();
  if ($("#sidbar").css("left") == "0px") {
    $("#sidbar").animate({ left: -sidbarInnerWidth }, 1000);
  } else {
    $("#sidbar").animate({ left: "0px" }, 1000);
  }
});
colorBoxes.click(function (e) {
  let ayh7ga = $(e.target).css("backgroundColor");
  console.log(ayh7ga);
  $("h1,h2,p,h6,h3,i").css("color", ayh7ga);
});
//^======> end  sidebar logic
//?---------------------------------------------------
//^======> start  search logic
$(".Search").click(function (e) {
  $("#defult-display").css("display", "none");
  $("#search").slideDown(1000);
  $("#Categories").slideUp(2000);
  $("#Area").css("display", "none");
  $("#Ingredients").css("display", "none");
  $("#Contact").css("display", "none");
});
// ^======> end  search logic
//?---------------------------------------------------
//!i make hover by jquery this this not any comment this this ver important for me =====>start
// $('.parent').hover(function () {
//   $('.child').css({top:0}).html('<p>mahmoud ahmed</p>');

//   }, function () {
//     // $('.child').slideUp(1000);
//     $('.child').css({top:'100%'}).empty()
//   }
// );
//!i make hover by jquery this this not any comment this this ver important for me =====>end
//?---------------------------------------------------
//^======> start Categories logic
$(".Categories").click(function (e) {
  getCategories();
  $("#defult-display").css("display", "none");
  $("#Categories").slideDown(2000);
  $("#search").slideUp(1000);
  $("#Area").css("display", "none");
  $("#Ingredients").css("display", "none");
  $("#Contact").css("display", "none");
  $("#displayFullMeal").css("display", "none");
});

//^======> end Categories logic
//?---------------------------------------------------
//^======> strat Area logic
$(".Area").click(function () {
  showArea();
  $("#defult-display").css("display", "none");
  $("#Area").slideDown(2000);
  $("#search").slideUp(1000);
  $("#Categories").css("display", "none");
  $("#Ingredients").css("display", "none");
  $("#Contact").css("display", "none");
  $("#displayFullMeal").css("display", "none");
});
//^======> end Area logic
//?---------------------------------------------------
//^======> start Ingredients logic
$(".Ingredients").click(function (e) {
  getIngredients();
  $("#defult-display").css("display", "none");
  $("#Ingredients").slideDown(2000);
  $("#Area").css("display", "none");
  $("#search").slideUp(1000);
  $("#Categories").css("display", "none");
  $("#Contact").css("display", "none");
  $("#displayFullMeal").css("display", "none");
});
//^======> end Ingredients logic
//?---------------------------------------------------
//^======> start Contact-Us logic
$(".Contact-Us").click(function (e) {
  $("#defult-display").css("display", "none");
  $("#Contact").slideDown(2000);
  $("#Area").css("display", "none");
  $("#Categories").css("display", "none");
  $("#Ingredients").css("display", "none");
  $("#search").slideUp(1000);
  $("#displayFullMeal").css("display", "none");
});
//^======> end Contact-Us logic
//?---------------------------------------------------
//^======> start Handle  Sumbet Button logic
$(document).ready(function () {
  // &Function to check if all input fields are not empty
  function checkInputs() {
    let allFilled = true;

    //& Check each input field
    $(
      'input[type="text"], input[type="email"], input[type="phone"], input[type="number"], input[type="password"]'
    ).each(function () {
      if ($(this).val() === "") {
        allFilled = false;
        return false; //& Break the loop if any field is empty
      }
    });

    //& Enable or disable the submit button based on the result
    if (allFilled) {
      $("#submitBtn").removeClass("disabled");
    } else {
      $("#submitBtn").addClass("disabled");
    }
  }

  //& Call the checkInputs function on input change
  $("input").on("input", checkInputs);
});
//^======> end Handle Sumbet Button logic
//?---------------------------------------------------
//^======> start Validation For Sumbet  logic
$(document).ready(function () {
  // & Regular expressions for validation
  let nameRegex = /^[a-zA-Z\s]+$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let phoneRegex = /^[0-9]+$/;
  let ageRegex = /^[0-9]+$/;
  let passwordRegex = /.{6,}/; //& Minimum 6 characters

  //& Function to show SweetAlert with error message
  function showError(message) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  }

  //& Function to validate input fields
  function validateInputs() {
    let name = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let age = $("#age").val();
    let password = $("#password").val();
    let rePassword = $("#rePassword").val();

    //& Validate Name
    if (!nameRegex.test(name)) {
      showError("Invalid Name. Please enter only letters and spaces.");
      return false;
    }

    //& Validate Email
    if (!emailRegex.test(email)) {
      showError("Invalid Email Address.");
      return false;
    }

    //& Validate Phone
    if (!phoneRegex.test(phone)) {
      showError("Invalid Phone Number. Please enter only numbers.");
      return false;
    }

    //& Validate Age
    if (!ageRegex.test(age)) {
      showError("Invalid Age. Please enter only numbers.");
      return false;
    }

    //& Validate Password
    if (!passwordRegex.test(password)) {
      showError("Invalid Password. Minimum 6 characters required.");
      return false;
    }

    //& Validate Re-Password
    if (password !== rePassword) {
      showError("Passwords do not match.");
      return false;
    }

    //& All inputs are valid
    return true;
  }

  //& Handle form submission
  $("#submitBtn").click(function () {
    if (validateInputs()) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Form submitted successfully!",
      });
    }
  });
});
//^======> end Validation For Sumbet  logic
//?-------------------------------------------------------------------------
//^======> start setup light theme logic
$(".light").click(function () {
  console.log("moon");
  $("body").css({
    backgroundImage: 'url("../images/cherries-5706738_1280.png")',
  });
  $(".sidbar-inner").css({ backgroundColor: "#fff", color: "#000" });
  $(".outer").css({ backgroundColor: "rgb(245,245,220)" });
});
$(".darck").click(function () {
  console.log("moon");
  $("body").css({
    backgroundImage: 'url("../images/wavey-fingerprint.png")',
    backgroundAttachment: "fixed",
  });
  $(".sidbar-inner").css({ backgroundColor: "#000", color: "#fff" });
  $(".outer").css({ backgroundColor: "#ffff" });
}); //    background-attachment: fixed;
//^======> end setup light theme logic
// ?-------------------------------------------------------------------------------------------
//^======> start setup icon in sidbar  logic
$(document).ready(function () {
  $("#myDiv i").click(function () {
    $(this).toggleClass("fa-times fa-bars ");
  });
});
//^======> end setup icon in sidbar  logic
//********************* */
$(document).ready(function () {
  // Your existing code to fade out the loading animation
  $(".sk-circle").fadeOut(1000, function () {
    $("#loading").fadeOut(1000, function () {
      $("body").css("overflow", "auto");
    });
  });

  // Add click event listener for items in the heading
  $(".heading p").click(function () {
    // Example: Log the text content of the clicked item
    var clickedItem = $(this).text();
    console.log("Clicked on: " + clickedItem);

    // You can add more logic here based on the clicked item
    // For example, show a customized SweetAlert with a timer
    showSweetAlert(clickedItem);
  });

  function showSweetAlert(item) {
    Swal.fire({
      title: "You clicked on " + item,
      html: "This is a <b>SweetAlert</b> with custom HTML!",
      icon: "success",
      confirmButtonText: "Okay",
      confirmButtonColor: "#3085d6",
      background: "#f4f4f4",
      showCloseButton: true,
      customClass: {
        closeButton: "custom-close-button",
        title: "custom-title-class",
        content: "custom-content-class",
        popup: "custom-popup-class", // Add a custom class for animation
      },
      buttonsStyling: true,
      animation: true,
      animateCss: "animate__animated animate__bounceIn", // Apply a custom animation class
      timer: 1000, // Set the timer in milliseconds (e.g., 3000ms = 3 seconds)
      timerProgressBar: true, // Show a progress bar during the timer
    }).then((result) => {
      // Handle the result (e.g., button click, timer expiration)
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("Alert was closed by the timer");
      }
    });
  }
});

// ! ------------------------------------------------------------ Thank You ------------------------------------------------------------------> */
//~---------------------------------------------------------------For reading------------------------------------------------------------------> */
