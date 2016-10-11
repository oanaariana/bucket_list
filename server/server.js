"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    next();
});


var portfolio = [
    {
        id: 1,
        title: 'Website design 1',
        description: 'Wow',
        image: 's1.jpg'
    },
    {
        id: 2,
        title: 'Website design 2',
        description: 'Wow 2',
        image: 's2.jpg'
    },
    {
        id: 3,
        title: 'Website design 3',
        description: 'Wow 3',
        image: 's3.jpg'
    },
    {
        id: 4,
        title: 'Website design 4',
        description: 'Wow 4',
        image: 's4.jpg'
    },
    {
        id: 5,
        title: 'Website design 5',
        description: 'Wow 2',
        image: 's2.jpg'
    },
    {
        id: 6,
        title: 'Website design 6',
        description: 'Wow 3',
        image: 's3.jpg'
    },
    {
        id: 7,
        title: 'Website design 7',
        description: 'Wow 4',
        image: 's4.jpg'
    },
    {
        id: 8,
        title: 'Website design 8',
        description: 'Wow 2',
        image: 's2.jpg'
    },
    {
        id: 9,
        title: 'Website design 9',
        description: 'Wow 3',
        image: 's3.jpg'
    },
    {
        id: 10,
        title: 'Website design 10',
        description: 'Wow 4',
        image: 's4.jpg'
    },
    {
        id: 11,
        title: 'Website design 11',
        description: 'Wow 5',
        image: 's1.jpg'
    }
];


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/home', function (req, res) {
    var page = {
        title: 'About',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A cum dolor eaque eos est et ex facere impedit maxime minus, neque odio quibusdam quo recusandae repellat sint tempore vitae voluptatem. Aliquam commodi consequatur dignissimos dolor dolore dolores earum, eius error exercitationem molestiae molestias optio quam quibusdam sapiente sequi sint vero!'
    };
    res.json(page);
});

app.get('/portfolio', function (req, res) {
    var page = {
        title: 'portfolio',
        content: portfolio  //'Velit, odit, eius, libero unde impedit quaerat dolorem assumenda alias consequuntur optio quae maiores ratione tempore sit aliquid architecto eligendi pariatur ab soluta doloremque dicta aspernatur labore quibusdam dolore corrupti quod inventore. Maiores, repellat, consequuntur eius repellendus eos aliquid molestiae ea laborum ex quibusdam laudantium voluptates placeat consectetur quam aliquam!'
    };
    res.json(page);
});

//http://localhost:3000/portfolio/1
app.get('/portfolio/:id', function (req, res) {
    let id = parseInt(req.params.id);
    console.log(id, portfolio);
    let pitem = portfolio.find(function (item) {
        console.log(item);
        return item.id === id;
    });
    console.log(pitem);
    res.json(pitem);
});

function search(req, res) {
    let term = req.params.term.toLowerCase();
    let page = req.params.page || 0;
    const itemsPerPage = 3;

    let pitems = portfolio.filter(function (item) {
        return item.title.toLowerCase().includes(term);
    });

    var totalSearchItems = pitems.length;

    var results = [];
    let maxPageNumber = Math.floor(pitems.length / itemsPerPage);

    if (page > maxPageNumber) {
        page = maxPageNumber;
    }

    if (page < 0) {
        page = 0;
    }

    for (let currentItem in pitems) {
        if (pitems.hasOwnProperty(currentItem)) {
            let itemPage = Math.floor(currentItem / itemsPerPage);
            console.log('itemPage', itemPage);
            if (itemPage == page) {
                console.log('currentItem', currentItem);
                results.push(pitems[currentItem]);
            }
        }
    }
    res.json({
        items: results,
        totalItems: totalSearchItems,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        lastPage: maxPageNumber
    });
}

app.get('/search/:term/:page', function (req, res) {
    search(req, res);
});

app.get('/search/:term', function (req, res) {
    search(req, res);
});


app.get('/portfolio_item', function (req, res) {
    var page = {
        title: 'ana',
        content: 'Lorem ipsum dolor'
    };
    res.json(page);
});

app.get('/contact', function (req, res) {
    var page = {
        title: 'Office location',
        address: 'Phone: 021-07-08-09'
    };
    res.json(page);
});

app.get('/oana', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.json({name: 'oana'});
});

app.post('/oana', function (req, res) {
    console.log(req.body);
    var postData = req.body;
    postData.status = 'Form data was received';
    fs.writeFile('form.txt', JSON.stringify(postData), function (err) {
        if (err) {
            res.status(404).end('Not found');
        }
        res.json(req.body);
    });

});

app.post('/contact', function (req, res) {
    console.log(req.body);
    var postData = req.body;
    postData.status = 'Form data was received';
    fs.writeFile('form.txt', JSON.stringify(postData), function (err) {
        if (err) {
            res.status(404).end('Not found');
        }
        res.json(req.body);
    });

});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});