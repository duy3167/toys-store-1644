const indexModel = require('../model/IndexModel')
const {unlink} = require('node:fs')

class IndexController{

    //page
    indexPage(req, res){
        indexModel.getProForCust().then((result) => {
            res.render('home.ejs', {proList: result, quantity:result.length})
        })

    }

    shop(req, res){
        res.render('newShop.ejs')
    }

    NotFond404(req, res){
        res.render('404NotFound.ejs')
    }

    login(req, res){
        res.render('login.ejs')
    }

    logout(req, res){
        res.cookie('ath_token', '')
        res.redirect('/login')
    }


    //product
    proList(req, res){
        let shopId = req.shopId
        const getPro = async () => {
            const proList = await indexModel.getProList(shopId)
            const cateList = await indexModel.getCateList()
            const supList = await indexModel.getSupList()
            res.render('dashboard', {site:'product', proList, cateList, supList})
        }
        getPro()
    }

    newPro(req, res){
        if(req.imgIsExist){
            let product = {
                name: req.body.proName,
                cateId: req.body.cateId,
                supId: req.body.supId,
                image: req.file.filename,
                price: req.body.price,
                quantity: req.body.quantity,
            }
            indexModel.insertPro(req.shopId, product).then((result) => {
                if(result.rowCount !== 0){
                    res.send({status:200, mess: 'insert product success'})
                } else {
                    res.send({status:400, mess: 'insert product fail'})
                }
            })
        } else {
            res.send({status:400, mess: 'insert product fail'})
        }
    }

    deletePro(req, res){
        let proId = req.body.proId
        indexModel.removePro(proId).then((result) => {
            if(result.rowCount !== 0){
                unlink('src/public/images/'+ result[0].pro_image, (err) => {
                    res.send({status:200, mess: 'delete product success'})
                });
            } else {
                res.send({status:200, mess: 'delete product fail'})
            }
        })
    }

    searchPro(req, res){
        let proName = req.params.name
        let shopId = req.shopId
        indexModel.getPro(shopId, proName).then((result) => {
            if(result.length !== 0){
                res.send({status:200, product: result})
            } else {
                res.send({status:404, mess: 'Not found product'})
            }
        })
    }


    //category
    cateList(req, res){
        indexModel.getCateList().then((result) => {
            res.render('dashboard', {site:'category', cateList: result})
        })
    }

    newCate(req, res){
        indexModel.insertCate(req.body.cateName)
            .then((result) => {
                if(result.rowCount !== 0){
                    res.send({status:200, mess: 'insert category success'})
                } else {
                    res.send({status:400, mess: 'insert category fail'})
                }
            })
    }

    searchCate(req, res){
        let cateName = req.params.name
        indexModel.searchCateAdmin(cateName).then((result) => {
            if(result.length !== 0){
                res.send({status:200, category: result})
            } else {
                res.send({status:404, mess: 'Not found product'})
            }
        })
    }

    

    //supplier
    supList(req, res){
        indexModel.getSupList().then((result) => {
            res.render('dashboard', {site:'supplier', supList: result})
        })
    }

    newSup(req, res){
        indexModel.insertSup(req.body.supName, req.body.address)
            .then((result) => {
                if(result.rowCount !== 0){
                    res.send({status:200, mess: 'insert supplier success'})
                } else {
                    res.send({status:400, mess: 'insert supplier fail'})
                }
            })

    }

    searchSup(req, res){
        let supName = req.params.name
        indexModel.searchSupAdmin(supName).then((result) => {
            if(result.length !== 0){
                res.send({status:200, supplier: result})
            } else {
                res.send({status:404, mess: 'Not found product'})
            }
        })
    }

    custSearchPro(req, res){
        let proName = req.params.name
        indexModel.custSearchPro(proName).then((result) => {
            if(result.length !== 0){
                res.send({status: 200, proList: result})
            } else {
                res.send({status: 400, mess: 'Not found product'})
            }
        })
    }
}

module.exports = new IndexController
