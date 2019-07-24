Added folders to show how I might organize the project as it gets larger.

Taking functional approach. I have some the linter to ensure objects are not mutated.

Added some tests and logic to make the parsing hardy to formatting inconsitencies. In a real life situation 
I would be asking questions about what is generating this input. If it is a computer, 
and guaranteed to be properly formatting these additional checks add no value. 


What is this ObjectMap I'm defining in the parser and why am I not just using an ES6 map? Reason being that ES6 maps
 are not immutable, so instead I'm using simple objects since objects in JS are basically just maps.
