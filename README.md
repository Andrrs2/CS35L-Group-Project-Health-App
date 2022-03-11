# HLTH
### CS35L-Group-Project-Health-App

[![N|Solid](https://icon-library.com/images/heartbeat-icon-png/heartbeat-icon-png-4.jpg)](https://nodesource.com/products/nsolid)

HLTH is a web-based fitness and health app that is designed
to help users keep track and meet their fitness goals.

## Main Features/Pages:
 - Exercise Timer
 - Calorie Counter
 - Weight Tracker
 - User Profile (Sign up and Login)

## Exercise Timer

This page lets users create and save timers.
Timers can be created as a sequential list, and
the user can start the next timer immediately upon
finishing the previous one

## Calorie Counter

This page allows the user to input gender, weight, height, and age. 
Once entered the user can press buttons to calculate BMI and BMR 
for recommended calorie intake. Users can then input their calculated
BMI to get a message about their recommended intake and activity level.

## Weight Tracker

This page allows users to input their weight multiple times,
creating a scatterplot of their weight over time. This plot gets saved
on local storage for when the user signs out or changed pages

## Sign In / Sign up / Account

The sign up page allows users to easily create an account by entering an 
email address, a password, as well as a sentence or two describing their 
goals. This account information gets saved to a server so the user can
sign in using the sign in page. The Account page lets users view their
fitness goals that were entered during sign up.

## Installation

This app uses npm modules outside of the default ones created by npm install.
These are listed below:

#### Materials-UI
```
npm install @mui/material @emotion/react @emotion/styled
```
#### Firebase
```
npm install firebase
```
#### React-Router-DOM
```
npm install react-router-dom
```
#### React Native
```
npm install react-native
```
#### React Native Web
```
npm install react-native-web
```
#### React Compound Timer
```
npm install  react-compound-timer --force
```
#### React Countdown Timer
```
npm install react-countdown-circle-timer
```