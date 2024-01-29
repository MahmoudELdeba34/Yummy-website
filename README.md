# Yummy-website
Project Structure:
HTML Structure:
Main HTML file (index.html) containing the structure of the web page.
Sections for the side navigation menu, search, categories, area, ingredients, contact us, and meal display.
/***********************************************************************************************************************************
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Meta tags, title, and CSS links -->
</head>
<body>
  <div id="sideNav">
    <!-- Side navigation menu items -->
  </div>
  <div id="mainContent">
    <!-- Content for search, categories, area, ingredients, contact us, and meal display -->
  </div>
  <script src="script.js"></script>
</body>
</html>
CSS Styling:
Separate CSS file (styles.css) for styling the HTML elements.
Consider using flexbox or grid for layout and responsive design.

/*************************************************************************************************************************************
/* Styles for side navigation menu, search, categories, area, ingredients, contact us, and meal display */
JavaScript Logic:
Separate JavaScript file (script.js) for handling the dynamic behavior and interactions.
Functionality Implementation:
1. Search Functionality:
Two input fields for meal name and first letter search.
Use the Fetch API to make requests to the Meal DB API based on the entered criteria.
2. Categories Functionality:
Fetch and display meal categories.
On category click, fetch and display meals in that category.
3. Area Functionality:
Fetch and display meal areas.
On area click, fetch and display meals from that area.
4. Ingredients Functionality:
Fetch and display main ingredients for each meal.
On ingredient click, fetch and display meals with that ingredient.
5. Contact Us Functionality:
Display a form with input fields for sign-up.
Use regular expressions for input validation.
Enable the submit button when all inputs pass validation.
6. Meal Display Functionality:
Display a default set of meals when the website is opened.
Update meal display based on user interactions with search, categories, area, and ingredients.
7. Meal Details Functionality:
Fetch and display detailed information about a selected meal.
Display meal image, name, instructions, area, category, recipes, tags, meal source, and a link to the meal on YouTube.
8. Initial Load Functionality:
On the initial load of the website, use the search API to display some default meals.
APIs and External Services:
Utilize The Meal DB API for fetching meal data.
Use regex for input validation in the contact us section.
Next Steps:
Setup Your Project:

Create HTML, CSS, and JavaScript files.
Link them together in your HTML file.
Fetch Data:

Use the Fetch API to interact with The Meal DB API and retrieve meal data.
Implement User Interface:

Update the UI based on user interactions using JavaScript.
Styling:

Style your elements using CSS for a visually appealing and user-friendly design.
Testing:

Test your web application thoroughly to ensure all functionalities work as expected.
This should provide you with a detailed roadmap to start building your web application. Feel free to ask if you have specific questions or need further assistance!
