## Getting up and running

##### Requirements
Node v10.16.0

##### Installation
Before building the app or tests you'll need to run the command `npm install` from the project directory to resolve it's
dependencies. 

##### Building
Before running the app you need to build the application with the command `npm run build`

##### Running the tests
From the project directory you can run the command `npm test` to run the tests, additionally you can run the command 
`npm run ci` which will run the linter, tests, and build.

##### Running the app
To run the application use the command `node build/app.js`. The application takes input through stdin so you can pipe 
input to the application. Ex. `echo "Driver Dan" | node build/app.js`


## My Approach

##### Design
I've taken a functional approach to this exercise. I find that functional techniques help limit mental complexity and 
make testing far easier. Also as a result there are no complex design patterns here. Just pure functions. The only side 
effects in the application (I/O) are neatly contained in the app module.

I've chosen to model the data for the application as simple object literals which are strongly typed by interfaces. 
The data in this application feels too complex for primitives, and class features don't provide any additional value since 
given the functional approach.

The folder structure is a little much for this project, though it is large enough I would not want to dump 
everything in the root of the src folder. The general strategy here it is to organize the modules by feature.

##### Testing
I test drove the three units of the application. Those units being: taking input (parsing), applying the business logic 
(summarizing), and generating the view (formatting the summary for display). I try to keep my tests as behavioral as
possible. 

Additionally there is an end to end test that runs the actual application and asserts on the content of stdout. I've
tried to keep the assertions here vague as not to make the test too brittle to future changes. The main goal of this 
test is to confirm the application as whole runs and produces reasonable output, but not testing the details of the 
application.

Notably missing is any form of integration tests. At this point the application is simple enough I don't see 
integration tests providing any value above that which the end to end test provides. As the app grows this would
almost certainly change.

##### Edge Cases
Though I'm not required to exhaustively handle edge cases I've decided to handle a unknown commands and inconsistent 
input whitespace to make things a little more interesting. In a real project I would be asking the relevant parties 
questions about if the MANY possible edge cases actually exist and discuss how to best handle them so as not to 
unnecessarily spend time gold plating the application.

##### Other Notes
What is this ObjectMap I'm defining in the parser and why am I not just using an ES6 map you ask? Reason being that 
ES6 maps are not immutable. Instead I'm using plain old objects since you can enforce immutability of them via the 
TypeScript compiler. JS objects are basically just maps with string/number keys and the ObjectMap definition is 
needed to strongly type that.
