const authentication = require('../middleware/auth')
const indexController = require('../app/controller/IndexController')
const upload = require('../middleware/storeFIle')

function route(app)
{
    //customer
    app.get('/', indexController.indexPage)
    app.get('/customer-search-pro/:name', indexController.custSearchPro)

    //login
    app.get('/login', indexController.login)
    app.post('/login-process', authentication.checkLogin)
    app.get('/logout', indexController.logout)

    //shop
    app.post('/shop-add', authentication.handleCreateShop)

    //product
    app.get('/product', authentication.checkCookieAdmin, indexController.proList)
    app.post('/product-new', authentication.checkCookieAdmin,  upload.single('proImage'), indexController.newPro)
    app.delete('/product-remove', authentication.checkCookieAdmin,indexController.deletePro)
    app.get('/product-search/:name', authentication.checkCookieAdmin, indexController.searchPro)

    // //category
    app.get('/category', authentication.checkCookieAdmin, indexController.cateList)
    app.post('/category-new', authentication.checkCookieAdmin,indexController.newCate)
    app.get('/category-search/:name', authentication.checkCookieAdmin, indexController.searchCate)

    // //supplier
    app.get('/supplier', authentication.checkCookieAdmin, indexController.supList)
    app.post('/supplier-new', authentication.checkCookieAdmin, indexController.newSup)
    app.get('/supplier-search/:name', authentication.checkCookieAdmin, indexController.searchSup)

    //404
    app.get('*', indexController.NotFond404)
}

module.exports = route