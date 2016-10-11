/**
 * Created by oana.vezentan on 6/22/2016.
 */
"use strict";

$(document).ready(function () {
    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    var pager = $(".pagination");
    var urlVars = getUrlVars();
    var currentPage = urlVars.page || 1;
    var searchTerm = urlVars.search;
    console.log("currentpage", currentPage);

    function makeTemplateString(title, content, image) {
        return "<div class='row'>" +
            "    <div class='col-xs-12 col-md-4'>" +
            "        <a class='thumbnail' href='portfolio_item.html'>" +
            "					<span class='img'>" +
            "						<img src='images/" + image + "' alt=''>" +
            "						<span class='cover'><span class='more'>See details &rarr;</span></span>" +
            "					</span>" +
            "            <span class='title'>" + title + "</span>" +
            "        </a>" +
            "    </div>" +
            "    <div class='col-xs-12 col-md-4'>" +
            "        <h3>" + title + "</h3>" +
            "        <p>" + content + "</p>" +
            "    </div>" +
            "</div>";
    }


    var emptyResultsString =
        "<div class='row'>" +
        "    <div class='col-xs-12'>" +
        "            <p class='title'>No items matched your search.</p>" +
        "    </div>" +
        "</div>";

    function generateResultsList(data) {
        console.log(JSON.stringify(data));
        var resultsList = $('#resultsList');
        if (data.length > 0) {
            for (var item in data) {
                if (data.hasOwnProperty(item)) {
                    var itemData = data[item];
                    resultsList.append($(makeTemplateString(itemData.title, itemData.description, itemData.image)));
                }
            }
        }
        else {
            resultsList.append($(emptyResultsString));
        }

    }

    function generatePager(lastPage) {
        var pagerString = '';
        var baseUrl = 'search.html?search=' + searchTerm + '&page=';
        var prevUrl = baseUrl;
        var nextUrl = baseUrl;

        if (currentPage > 1) {
            prevUrl += (parseInt(currentPage) - 1);
        } else {
            prevUrl += 1;
        }

        if (currentPage <= lastPage) {
            nextUrl += (parseInt(currentPage) + 1);
        } else {
            nextUrl += lastPage;
        }


        pagerString += "<li class='page-item'><a class='page-link' href='" + prevUrl + "' aria-label='Previous'><span aria-hidden='true'>&laquo;</span> <span class='sr-only'>Previous</span></a></li>";
        for (var p = 1; p <= lastPage + 1; p++) {
            var currentUrl = baseUrl + p;
            pagerString += '<li class="page-item ' + (p == currentPage ? "active" : "") + '"><a class="page-link" href="' + currentUrl + '">' + p + '</a></li>';
        }
        pagerString += "<li class='page-item'><a class='page-link' href='" + nextUrl + "' aria-label='Next'><span aria-hidden='true'>&raquo;</span> <span class='sr-only'>Next</span></a></li>";
        pager.html(pagerString);
    }

    function generateContent() {
        if (searchTerm !== '') {
            $.get('http://localhost:3000/search/' + searchTerm + '/' + (currentPage - 1), {
                dataType: 'json'
            }, function (data) {
                console.log(JSON.stringify(data));
                generateResultsList(data.items);
                generatePager(data.lastPage);
            });

        }
    }

    generateContent();


});

