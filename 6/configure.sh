#!/bin/bash
# Yakup Ates <Yakup.Ates@rub.de>
# 20.07.2017

composer update twbs/bootstrap
rm -r assets
cp -R vendor/twbs/bootstrap/dist/ assets/
wget -O assets/js/jquery-3.2.1.slim.min.js https://code.jquery.com/jquery-3.2.1.slim.min.js
