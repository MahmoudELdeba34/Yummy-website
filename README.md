# 🍽️ Yummy Website

## 📌 Project Overview
Yummy Website is a web application designed to provide users with a comprehensive platform to **explore and search for meals** based on various criteria.  
It integrates with [TheMealDB API](https://www.themealdb.com/) to fetch real-time meal data and present it in an interactive way.

---

## 🚀 Features

### 🔍 Search Section
- Two search options:
  - Search meals by **name**.
  - Search meals by the **first letter**.

### 📂 Categories Section
- Displays a list of meal categories.
- Clicking a category fetches and displays meals in that category.

### 🌍 Area Section
- Shows a list of meal areas (countries).
- Clicking an area fetches and displays meals from that region.

### 🥗 Ingredients Section
- Displays the main ingredient for each meal.
- Clicking an ingredient fetches and displays meals containing it.

### 📩 Contact Us Section
- Sign-up form with input fields.
- Validation handled using **regular expressions (regex)**.
- Submit button remains disabled until all inputs are valid.

### 🍱 Meal Display
- Displays up to **20 meals** based on the selected category, area, or ingredient.

### 📖 Meal Details
Clicking on a specific meal shows:
- Meal image & name.  
- Preparation instructions.  
- Area & category.  
- Recipes & tags.  
- External links (source + YouTube video).  

---

## 🛠️ Implementation Details
- **Responsive Design**: Adapts to all screen sizes.  
- **Fetch API**: Used to fetch data from TheMealDB.  
- **JavaScript (ES6+)**: Handles UI interactions & dynamic rendering.  
- **CSS / Bootstrap**: Provides styling and animations for better UX.  

---

## 🌐 External Services
- [TheMealDB API](https://www.themealdb.com/) is used to fetch categories, meals, and details.  

---

## ⚡ Initial Load
When the website is first opened:
- Default meals are displayed using the API search endpoint.  

---

## 📝 Next Steps
1. **Setup Project Files**
   - Create `index.html`, `style.css`, and `script.js`.
   - Link them properly inside the HTML file.
2. **Fetch Data**
   - Use Fetch API to interact with TheMealDB.
3. **Implement UI**
   - Update the UI dynamically based on user actions.
4. **Styling**
   - Enhance layout with responsive design and CSS effects.
5. **Testing**
   - Ensure all functionalities (search, categories, details) work as expected.  

---

## 🎯 Conclusion
Yummy Website delivers an **engaging and interactive experience** for users to explore meals in multiple ways.  
The combination of **search features, categorized browsing, and detailed meal information** creates a simple yet powerful food exploration platform.  

---

## 📸 Screenshots
(Add screenshots of your UI in the `assets/screenshots/` folder)

---

## 📜 License
This project is licensed under the MIT License.  

