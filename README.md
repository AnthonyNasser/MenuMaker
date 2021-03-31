# MenuMaker
[MenuMaker](https://menuandrecipemaker.herokuapp.com/) is a web application that allows users to create, browse, and share their favorite recipes and then form homestyle menus from collections of them! This site would be perfect for meal-planning, meal-prepping, or learning new recipes to make at home.

## Technologies
- Node.js
- Express
- MongoDB
- Embedded JavaScript (EJS)
- CSS
- JavaScript and jQuery

## File Structure
- models (contains mongoose models for menus, recipes, and users)
- node_modules
- public
  - images
  - javascript (file that has sidebar logic and semantic.min.js)
  - stylesheets (main styles and semantic.min.css)
- routes (server-side routes for authentication and menu/recipe CRUD can be found here)
- views (anything the user can see)
  - pages (contains the ejs code for every page of the site)
  - partials (holds header/footer code that shows up on every page of site)
- Other:
  - app.js (runs api)
  - package.json
  - package-lock.json

## Launch
MenuMaker is live via this [link](https://menuandrecipemaker.herokuapp.com/), but it may take a minute to load because the free version of heroku is a bit slow.
