#!/bin/bash
# Yakup Ates <Yakup.Ates@rub.de>
# 20.07.2017

composer update twbs/bootstrap
rm -r assets
cp -R vendor/twbs/bootstrap/dist/ assets/
