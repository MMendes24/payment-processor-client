# React/Stripe Payment Processor

A simple payment processor build with React.js, Stripe, and Node/Express.

The processor currently allows you select one of six items and purchase it via Stripes API and methods. While it is a test demonstration of the functionality and therefore is not "live" it possesses many of the same restrictions as a live use of Stripe, including card validation.

It currently requires a card number, a expiration date, and CVC (Card Verification Code):

## Card Number
Please use this card number: ###4242 4242 4242 4242

This runs the card as a VISA credit card for testing purposes. Random numbers will fail and this by design. 

## Card Expiration Date

This can be any date except that it ###must be a date after the current date.

For instance, if today is 12/21/2020, then only dates after that will work. 

## CVC

This can be any three digit number. 
