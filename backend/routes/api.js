const express = require('express');
const router = express.Router();
const books = require('../models/Books');
const purchase = require('../models/Purchase');
const customers = require('../models/Customer');
const jwt = require('jsonwebtoken');

router.post('/add', function (req, res) {
    var Books = new books({
        name: req.body.name,
        author: req.body.author,
        description: req.body.description,
        PublishYear: req.body.publish_year,
        Publisher: req.body.publisher,
        Qty: req.body.qty
    });
    Books.save((err, doc) => {
        if (!err) {
            console.log("pass")
            res.json({ success: true });
        } else {
            res.json({ success: false })
        }
    })
});
router.post('/Booklist', function (req, res) {
    books.find().then(function (info) {
        res.send(info);
    });
});
router.delete('/Reject/:id', function (req, res) {
    purchase.findOneAndDelete({
        _id: req.params.id
    }).then(function(err) {
        if (!err) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    })
});
router.put('/Update/:id', function (req, res) {
    books.findOneAndUpdate({
        _id: req.params.id
    }, req.body).then(function (err) {
        if (err) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    })
});
router.get('/:id', function (req, res) {
    books.findById(req.params.id, function (err, book) {
        if (!err) {
            res.json(book);
        } else {
            res.json({ success: false })
        }
    })
});
router.get('/Customerview/:id', function (req, res) {
    books.findById(req.params.id, function (err, book) {
        if (!err) {
            res.json(book);
        } else {
            res.json({ success: false })
        }
    })
});
router.post('/log', function (req, res) {
    customers.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            res.status(401).send({ success: false, msg: 'Authentication faiil,User not found' })
        } else {
            if (req.body.password === user.password) {
                var token = jwt.sign(user.toJSON(), 'secretkey');
                res.json({ success: true, token: 'JWT' + token, name: user.name });
            } else {
                res.status(401).send({ success: false, msg: 'Authentication fail.wrong password' });
            }
        }
    });
});
router.post('/Purchase', function (req, res) {
    purchase.find().then(function (info) {
        res.send(info);
    });
});
router.post('/addPurch', function (req, res) {
    var purch = new purchase({
        Name: req.body.name,
        Items: req.body.items,
        Date: req.body.date,
        Amount: req.body.amount
    });
    purch.save((err, doc) => {
        if (err) {
            console.log(err)
            res.json({ success: false });
        } else {
            console.log("pass")
            res.json({ success: true })
        }
    })
});
router.post('/Customerlist', function (req, res) {
    customers.find().then(function (info) {
        res.send(info);
    });
});
router.post('/Customeradd', function (req, res) {
    var Customers = new customers({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        date: req.body.date,
    });
    Customers.save((err, doc) => {
        if (!err) {
            console.log("pass")
            res.json({ success: true });
        } else {
            res.json({ success: false })
        }
    })
});
router.delete('/Custdel/:id', function (req, res) {
    customers.findOneAndDelete({
        _id: req.params.id
    }).then(function (err) {
        if (!err) {
            res.json({ success: false })
        } else {
            res.json({ success: true })
        }
    });
});

module.exports = router;