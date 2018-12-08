import { handleActions } from 'redux-actions';

const ns = "stages"

const initialState = {
    api: {},
    models: {
        "12312312333123": {
            _id: "12312312333123",
            title: "Say Hello to HTML Elements",
            learn: [
                "Welcome to freeCodeCamp's HTML coding stages. These will walk you through web development step-by-step.",
                "First, you'll start by building a simple web page using HTML. You can edit <code>code</code> in your <code>code editor</code>, which is embedded into this web page.",
                "Do you see the code in your code editor that says <code>&#60;h1&#62;Hello&#60;/h1&#62;</code>? That's an HTML <code>element</code>.",
                "Most HTML elements have an <code>opening tag</code> and a <code>closing tag</code>.",
                "Opening tags look like this:",
                "<code>&#60;h1&#62;</code>",
                "Closing tags look like this:",
                "<code>&#60;/h1&#62;</code>",
                "The only difference between opening and closing tags is the forward slash after the opening bracket of a closing tag.",
                "Each stage has tests you can run at any time by clicking the \"Run tests\" button. When you pass all tests, you'll be prompted to submit your solution and go to the next coding stage.",
                "<hr>",
                "To pass the test on this stage, change your <code>h1</code> element's text to say \"Hello World\"."
            ],
            stageType: 0,
            videoUrl: "https://scrimba.com/p/pVMPUv/cE8Gpt2",
            tests: [
                {
                    text: "Your <code>h1</code> element should have the text \"Hello World\".",
                    testString: "assert.isTrue((/hello(\\s)+world/gi).test($('h1').text()), 'Your <code>h1</code> element should have the text \"Hello World\".');"
                }
            ],
            required: [],
            files: {
                indexhtml: {
                    key: "indexhtml",
                    ext: "html",
                    name: "index",
                    contents: "<h1>Hello</h1>",
                    head: "",
                    tail: ""
                },
                indexjs: null,
                indexjsx: null
            }

        },

        "12321": {
            _id: "12321",
            title: "Headline with the h2 Element",
            learn: ["Over the next few lessons, we'll build an HTML5 cat photo web app piece-by-piece.", "The <code>h2</code> element you will be adding in this step will add a level two heading to the web page.", "This element tells the browser about the structure of your website. <code>h1</code> elements are often used for main headings, while <code>h2</code> elements are generally used for subheadings. There are also <code>h3</code>, <code>h4</code>, <code>h5</code> and <code>h6</code> elements to indicate different levels of subheadings.", "<hr>", 'Add an <code>h2</code> tag that says "CatPhotoApp" to create a second HTML <code>element</code> below your "Hello World" <code>h1</code> element.'],
            stageType: 0,
            tests: [{
                text: "Create an <code>h2</code> element.",
                testString: "assert(($(\"h2\").length > 0), 'Create an <code>h2</code> element.');"
            }, {
                text: "Make sure your <code>h2</code> element has a closing tag.",
                testString: "assert(code.match(/<\\/h2>/g) && code.match(/<\\/h2>/g).length === code.match(/<h2>/g).length, 'Make sure your <code>h2</code> element has a closing tag.');"
            }, {
                text: 'Your <code>h2</code> element should have the text "CatPhotoApp".',
                testString: 'assert.isTrue((/cat(\\s)?photo(\\s)?app/gi).test($("h2").text()), \'Your <code>h2</code> element should have the text "CatPhotoApp".\');'
            }, {
                text: 'Your <code>h1</code> element should have the text "Hello World".',
                testString: 'assert.isTrue((/hello(\\s)+world/gi).test($("h1").text()), \'Your <code>h1</code> element should have the text "Hello World".\');'
            }],
            required: [],
            files: {
                indexhtml: {
                    key: "indexhtml",
                    ext: "html",
                    name: "index",
                    contents: "<h1>Hello World</h1>",
                    head: "",
                    tail: ""
                },
                indexjs: null,
                indexjsx: null
            }
        },
        "123212": {
            _id: "123212",
            title: "URL Shortener Microservice",
            learn: ["Build a full stack JavaScript app that is functionally similar to this: <a href='https://thread-paper.glitch.me/' target='_blank'>https://thread-paper.glitch.me/</a>.", "Working on this project will involve you writing your code on Glitch on our starter project. After completing this project you can copy your public glitch url (to the homepage of your app) into this screen to test it! Optionally you may choose to write your project on another platform but it must be publicly visible for our testing.", "Start this project on Glitch using <a href='https://glitch.com/#!/import/github/freeCodeCamp/boilerplate-project-urlshortener/' target='_blank'>this link</a> or clone <a href='https://github.com/freeCodeCamp/boilerplate-project-urlshortener/'>this repository</a> on GitHub! If you use Glitch, remember to save the link to your project somewhere safe!"],
            stageType: 10,

            required: [],

        },
        "123212222": {
            _id: "123212222",
            title: "Use an Array to Store a Collection of Data",
            learn: ["The below is an example of the simplest implementation of an array data structure. This is known as a <dfn>one-dimensional array</dfn>, meaning it only has one level, or that it does not have any other arrays nested within it. Notice it contains <dfn>booleans</dfn>, <dfn>strings</dfn>, and <dfn>numbers</dfn>, among other valid JavaScript data types:", "<blockquote>let simpleArray = ['one', 2, 'three’, true, false, undefined, null];<br>console.log(simpleArray.length);<br>// logs 7</blockquote>", "All array's have a length property, which as shown above, can be very easily accessed with the syntax <code>Array.length</code>.", "A more complex implementation of an array can be seen below. This is known as a <dfn>multi-dimensional array</dfn>, or an array that contains other arrays. Notice that this array also contains JavaScript <dfn>objects</dfn>, which we will examine very closely in our next section, but for now, all you need to know is that arrays are also capable of storing complex objects.", '<blockquote>let complexArray = [<br>&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;one: 1,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;two: 2<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;three: 3,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;four: 4<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;],<br>&nbsp;&nbsp;[<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a: "a",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b: "b"<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c: "c",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d: “d”<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;]<br>];</blockquote>', "<hr>", "We have defined a variable called <code>yourArray</code>. Complete the statement by assigning an array of at least 5 elements in length to the <code>yourArray</code> variable. Your array should contain at least one <dfn>string</dfn>, one <dfn>number</dfn>, and one <dfn>boolean</dfn>."],
            stageType: 1,
            tests: [{
                text: "yourArray is an array",
                testString: "assert.strictEqual(Array.isArray(yourArray), true, 'yourArray is an array');"
            }, {
                text: "<code>yourArray</code> is at least 5 elements long",
                testString: "assert.isAtLeast(yourArray.length, 5, '<code>yourArray</code> is at least 5 elements long');"
            }, {
                text: "<code>yourArray</code> contains at least one <code>boolean</code>",
                testString: "assert(yourArray.filter( el => typeof el === 'boolean').length >= 1, '<code>yourArray</code> contains at least one <code>boolean</code>');"
            }, {
                text: "<code>yourArray</code> contains at least one <code>number</code>",
                testString: "assert(yourArray.filter( el => typeof el === 'number').length >= 1, '<code>yourArray</code> contains at least one <code>number</code>');"
            }, {
                text: "<code>yourArray</code> contains at least one <code>string</code>",
                testString: "assert(yourArray.filter( el => typeof el === 'string').length >= 1, '<code>yourArray</code> contains at least one <code>string</code>');"
            }],
            required: [],
            files: {
                indexhtml: null,
                indexjs: {
                    key: "indexjs",
                    ext: "js",
                    name: "index",
                    contents: "let yourArray; // change this line",
                    head: "",
                    tail: ""
                },
                indexjsx: null
            }

        },
        "12321222232": {
            _id: "12321222232",
            title: "Create a Simple JSX Element",
            learn: ["<strong>Intro:</strong> React is an Open Source view library created and maintained by Facebook. It's a great tool to render the User Interface (UI) of modern web applications.", "React uses a syntax extension of JavaScript called JSX that allows you to write HTML directly within JavaScript. This has several benefits. It lets you use the full programmatic power of JavaScript within HTML, and helps to keep your code readable. For the most part, JSX is similar to the HTML that you have already learned, however there are a few key differences that will be covered throughout these challenges.", "For instance, because JSX is a syntactic extension of JavaScript, you can actually write JavaScript directly within JSX. To do this, you simply include the code you want to be treated as JavaScript within curly braces: <code>{ 'this is treated as JavaScript code' }</code>. Keep this in mind, since it's used in several future challenges.", "However, because JSX is not valid JavaScript, JSX code must be compiled into JavaScript. The transpiler Babel is a popular tool for this process. For your convenience, it's already added behind the scenes for these challenges. If you happen to write syntactically invalid JSX, you will see the first test in these challenges fail.", "It's worth noting that under the hood the challenges are calling <code>ReactDOM.render(JSX, document.getElementById('root'))</code>. This function call is what places your JSX into React's own lightweight representation of the DOM. React then uses snapshots of its own DOM to optimize updating only specific parts of the actual DOM.", "<hr>", "<strong>Instructions:</strong> The current code uses JSX to assign a <code>div</code> element to the constant <code>JSX</code>. Replace the <code>div</code> with an <code>h1</code> element and add the text <code>Hello JSX!</code> inside it."],
            stageType: 6,
            tests: [{
                text: "The constant <code>JSX</code> should return an <code>h1</code> element.",
                testString: "assert(JSX.type === 'h1', 'The constant <code>JSX</code> should return an <code>h1</code> element.');"
            }, {
                text: "The <code>h1</code> tag should include the text <code>Hello JSX!</code>",
                testString: "assert(Enzyme.shallow(JSX).contains('Hello JSX!'), 'The <code>h1</code> tag should include the text <code>Hello JSX!</code>');"
            }],
            template: "<body><div id='root'></div><div id='challenge-node'></div>${ source || '' }</body>",
            required: [{
                link: null,
                raw: null,
                src: "https://unpkg.com/react@16.4.0/umd/react.production.min.js"
            }, {
                link: null,
                raw: null,
                src: "https://unpkg.com/react-dom@16.4.0/umd/react-dom.production.min.js"
            }],
            files: {
                indexhtml: null,
                indexjs: null,
                indexjsx: {
                    key: "indexjsx",
                    ext: "jsx",
                    name: "index",
                    contents: "\nconst JSX = <div></div>;\n",
                    head: "",
                    tail: "ReactDOM.render(JSX, document.getElementById('root'))"
                }
            }
        },


        "12321222232213": {
            _id: "12321222232213",
            title: "Learn How Script Tags and Document Ready Work",
            learn: ["Now we're ready to learn jQuery, the most popular JavaScript tool of all time.", "Before we can start using jQuery, we need to add some things to our HTML.", "First, add a <code>script</code> element at the top of your page. Be sure to close it on the following line.", "Your browser will run any JavaScript inside a <code>script</code> element, including jQuery.", "Inside your <code>script</code> element, add this code: <code>$(document).ready(function() {</code> to your <code>script</code>. Then close it on the following line (still inside your <code>script</code> element) with: <code>});</code>", "We'll learn more about <code>functions</code> later. The important thing to know is that code you put inside this <code>function</code> will run as soon as your browser has loaded your page.", "This is important because without your <code>document ready function</code>, your code may run before your HTML is rendered, which would cause bugs."],
            stageType: 6,
            template: null,
            tests: [{
                text: "Create a <code>script</code> element making sure it is valid and has a closing tag.",
                testString: "assert(code.match(/<\\/script\\s*>/g) && code.match(/<script(\\sasync|\\sdefer)*(\\s(charset|src|type)\\s*=\\s*[\"\\']+[^\"\\']*[\"\\']+)*(\\sasync|\\sdefer)*\\s*>/g) && code.match(/<\\/script\\s*>/g).length === code.match(/<script(\\sasync|\\sdefer)*(\\s(charset|src|type)\\s*=\\s*[\"\\']+[^\"\\']*[\"\\']+)*(\\sasync|\\sdefer)*\\s*>/g).length, 'Create a <code>script</code> element making sure it is valid and has a closing tag.');"
            }, {
                text: "You should add <code>$&#40;document&#41;.ready<wbr>&#40;function&#40;&#41; {</code> to the beginning of your <code>script</code> element.",
                testString: "assert(code.match(/\\$\\s*?\\(\\s*?document\\s*?\\)\\.ready\\s*?\\(\\s*?function\\s*?\\(\\s*?\\)\\s*?\\{/g), 'You should add <code>$&#40;document&#41;.ready<wbr>&#40;function&#40;&#41; {</code> to the beginning of your <code>script</code> element.');"
            }, {
                text: "Close your <code>$&#40;document&#41;.ready<wbr>&#40;function&#40;&#41; {</code> function with <code>}&#41;;</code>",
                testString: "assert(code.match(/\\n*?\\s*?\\}\\s*?\\);/g), 'Close your <code>$&#40;document&#41;.ready<wbr>&#40;function&#40;&#41; {</code> function with <code>}&#41;;</code>');"
            }],
            required: [{
                link: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.css",
                raw: null,
                src: null
            }],
            files: {
                indexhtml: {
                    key: "indexhtml",
                    ext: "html",
                    name: "index",
                    contents: '<!-- Only change code above this line. -->\n\n<div class="container-fluid">\n  <h3 class="text-primary text-center">jQuery Playground</h3>\n  <div class="row">\n    <div class="col-xs-6">\n      <h4>#left-well</h4>\n      <div class="well" id="left-well">\n        <button class="btn btn-default target" id="target1">#target1</button>\n        <button class="btn btn-default target" id="target2">#target2</button>\n        <button class="btn btn-default target" id="target3">#target3</button>\n      </div>\n    </div>\n    <div class="col-xs-6">\n      <h4>#right-well</h4>\n      <div class="well" id="right-well">\n        <button class="btn btn-default target" id="target4">#target4</button>\n        <button class="btn btn-default target" id="target5">#target5</button>\n        <button class="btn btn-default target" id="target6">#target6</button>\n      </div>\n    </div>\n  </div>\n</div>',
                    head: "",
                    tail: ""
                },
                indexjs: null,
                indexjsx: null
            }
        }


    }
}



export const stageSelector = (id, state) => state[ns].models[id]
export const makeStageSelector = (id) => (state) => state[ns].models[id]

const reducerMap = {}

export default handleActions(reducerMap, initialState);