# app_Questionnaire
 This application allows you to create a questionnaire.

## What is needed in the first place
 To install and run the application on your computer should be installed Node.js.

## How to install
 You must download the source files from the repository: https://github.com/vParkhomenko/app_Questionnaire.<br>
 Unpack the archive and move the folder to the location of your choice on your computing system.<br>
 Using the command line or terminal, navigate to the application folder **\app_Questionnaire>** and install it:<br> 
 >$ cd app_Questionnaire<br>
 >$ npm install
 
## Running applications
 Navigate to the folder **\app_Questionnaire\bin>** which is located in the application: <br>
 >$ cd bin<br>
 
 Run the app with the following command:<br>
 >$ node www<br>
 
 Then, load http://localhost:3000/ in a browser to see the output.
 
## Application management / administration
To administer applications use **Postman**.<br>
You can download it from: https://www.getpostman.com/apps

## Formatting questions
The data sent to the server in JSON format.<br>
To format the questions use the following query format:<br>
* GET - get the question;
* POST - add a question;
* PUT - change  question;
* DELETE - remove question.
