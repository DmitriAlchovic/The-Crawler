# Grocery Store #
## Technical design ##

 - Create the main page that displays, info about the store, categories, new products, products with discount:
	`` getCategoriesList() -> a short list of categories``
	`` getNewProductsList() -> a short list of new products ``
	`` getDiscountProductsList() -> a short list of new products ``
 - Create navigation menu that displays, search bar, products category selection, display cart button, account button.
`` selectCategory() -> allow to select products category for search function ``
 `` findProduct() -> show products list based on search input and selected category ``
 
 - Create product page that displays, detailed info about product, add to cart button, product photo gallery.
 `` getProduct(productId) -> a detailed info about product and photos of pruduct (if they exist) ``
 `` addToCart(productId) -> add product to users cart``
 
 - Create cart that allow to change product capacity, remove product from the cart, displays products price with and without discount and sum of products price, submit button.
 `` getCart(userId) -> a list of products in cart ``
 `` deleteFromCart(prouctId,userId) -> removes product from cart ``
 `` changeCapacity(productId, userId) -> change capacity of product ``
 `` submitOrder(userId) -> submit products in cart ``
 
 - Create user profile that allows to login, create account, logout, add avatar
 ``getUser(userId) -> a info about user``
 `` createAccount(userInfo) -> takes user email, password, fullName, phoneNumber and creates account with this data ``
 `` login(userInfo) -> takes user email and password to login ``
 ``logout(userId) -> logout user form system``
 `` changeAvatar(userId, formdata) -> chages user avatar picture`` 
