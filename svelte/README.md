# **PROJECT TITLE: MyCart.com.**

# **Project Setup:**

- Install Visual Studio Code IDE, Node JS in your machine.
- Add the svelte, svelte 3 snippets extensions to VS Code.
- Clone the repository by using this command:
  - **-git clone repo URL.**
- Install the packages by using this command:
  - **-npm install.**
- Run the Project by using this command:
  - **-npm run dev.**

## **Package.json:**

- This file stores all kinds of information about the project, such as the dependencies and dev dependencies.
- Dependencies are the npm packages required for the application to work.

### **In this project dependencies we have used:**

#### **1.Bootstrap:**

- Command to install: **-npm i bootstrap.**
- Bootstrap classes are used for carousel component in home page.

#### **2.Sveltestrap:**

- Command to install: **-npm install svelte sveltestrap.**
- Sveltestrap Icons are used in header and navbar.
- NavbarToggler, collapse methods are imported from Sveltestrap for responsive layout.

#### **3.Svelte-routing:**

- Command to install: **-npm install svelte-routing.**
- navigate method is imported from svelte-routing.
- Router, Route methods are imported from svelte-routing for routing.

# **PROJECT DESCRIPTION:**

- This project is to view various product categories and manage user orders. Project consists of the homepage. On the homepage, user can see a header with the name of the website and a navigation bar with different links.

- After that, user can see a drop-down to choose the category of products, their user can choose the category and click the search button, then users can navigate to that selected product list page, their user can see the products of which user has been selected. Under this category selection, the homepage has a carousel part showing the images of the products and below that, user can see the description of the website.

- Next, on the product list page, user can see a header, navbar and next, a list of product names. Below, there is a sidebar with filter functions, where users can filter products by brand and price, then users will get only filtered products in the main bar in the card format.

- User can click on any Product card, then user will navigate to the product details page. User can see the default header, navbar and product image, all details about the product, the Thumbnails and also add to the cart button. User can click the button to order the specific product, then they will navigate to the cart page, and they can also choose the quantity. User can check if any offer is applicable to that product.
