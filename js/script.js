/**
 * Created by oana.vezentan on 6/10/2016.
 */
"use strict";

$(document).ready(function () {
    $.get('http://localhost:3000/home', function (response) {
        console.log(response);
        $('.title span').html(response.title);
    });

    $('.contactForm').on('submit', function (event) {
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/contact',
            data: formData,
            //dataType: 'jsonp',
            crossDomain: true,
            success: function (data) {
                console.log(data);
            }
        });
    });

    $('.modalForm').on('submit', function (event) {
        event.preventDefault();
        var formData = $(this).serialize();
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/contact',
            data: formData,
            //dataType: 'jsonp',
            crossDomain: true,
            success: function (data) {
                console.log(data);
            }
        });
    });


    $('.searchForm').on('submit', function (event) {
        event.preventDefault();
        var term = $('#search').val();
        $.get('http://localhost:3000/search/' + term, {
            dataType: 'json'
        }, function (data) {
            console.log('term', data);
            window.location = 'http://localhost:63342/Bucket%20List/search.html?search=' + term;
        });
    });

    //cookie
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    window.onload=checkCookie;
    function checkCookie() {
        var user = getCookie("username");
        if (user != "") {
            console.log("Welcome again " + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
                setCookie("username", user, 30);
            }
        }
    }


});