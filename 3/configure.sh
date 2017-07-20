#!/bin/bash
# Yakup Ates <Yakup.Ates@rub.de>
# 20.07.2017

#php vendor/autoload.php update twbs/bootstrap
cp assets/css/style.css .
rm -r assets
cp -R vendor/twbs/bootstrap/dist/ assets/
mv style.css assets/css/
