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
Formatting question by means of a routing path in conjunction with a query format:<br>
* get the question - GET request + routing path http://localhost:3000/api/questions/ (you can use it to view information about the questions that are in the database, such as the questions id);
  As it looks, you can see a screenshot http://prntscr.com/bpu6y1;
* add a question - POST request + routing path http://localhost:3000/api/question/;
  As it looks, you can see a screenshot http://prntscr.com/bpu3pp;
* change  question - PUT request + routing path http://localhost:3000/api/question/id (number of the question in the database);
  As it looks, you can see a screenshot http://prntscr.com/bpue45;
* remove question - DELETE request + routing path http://localhost:3000/api/question/id (number of the question in the database);
As it looks, you can see a screenshot http://prntscr.com/bpugzo.

## Types of questions
**"text"** - it creates an question with a field for entering text(input);

* question: "What is your full name?" - question;
* src: "images/user.png" - icon above the input field;
* type: "text" - type of question;
* inputType: "text" - input field type(such as text, email);
* alertMessage: "Please fill this in" - alert message;

Screenshot http://prntscr.com/bput9l.

**"image"** - it offers a choice of several options;

* question:"Where were they injured?" - question;
* type:"image" - type of question;
* answers: - answers
            [{
            "src":"images/img1.png", - image;
            "text":"Head" - the text under the picture;
            },
            {
            "src":"images/img2.png",
            "text":"Torso - Front"
            }],
* alertMessage:"Ooops! You must make a selection" - alert message;

Screenshot http://prntscr.com/bpux2h.

**"evaluation"** - it offers a number selected from 1 to 8;

* question:"How badly does this injury affect them?" - question;
* type:"evaluation" - type of question;
* alertMessage:"Ooops! You must make a selection" - alert message;

Screenshot http://prntscr.com/bpuz6y.

**"quantity"** - it prompts you to select the number of (estimated);

* question:"How many people witnessed the incident?" - question;
* type:"quantity" - type of question;
* alertMessage:"Ooops! You must make a selection" - alert message;

Screenshot http://prntscr.com/bpv15h.

**"textarea"** - it proposes to introduce the text(textarea);

* question:"How many people witnessed the incident?" - question;
* type:"textarea" - type of question;
* alertMessage:"Please fill this in" - alert message;

Screenshot http://prntscr.com/bpv2ts.

**"chooseYesNo"** - it offers the option to choose one of the two;

* question:"Have steps been taken to reduce the chances of this happening again?" - question;
* type:"chooseYesNo" - type of question;
* alertMessage:"Ooops! You must make a selection" - alert message;

Screenshot http://prntscr.com/bpv4ih.



