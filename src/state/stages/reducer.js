import { handleActions } from 'redux-actions';

const ns = "stages"

const initialState = {
    api: {},
    models: {
        "12312312333123": {
            _id: "12312312333123",
            title: "Say Hello to HTML Elements",
            learn: [
                "Welcome to freeCodeCamp's HTML coding challenges. These will walk you through web development step-by-step.",
                "First, you'll start by building a simple web page using HTML. You can edit <code>code</code> in your <code>code editor</code>, which is embedded into this web page.",
                "Do you see the code in your code editor that says <code>&#60;h1&#62;Hello&#60;/h1&#62;</code>? That's an HTML <code>element</code>.",
                "Most HTML elements have an <code>opening tag</code> and a <code>closing tag</code>.",
                "Opening tags look like this:",
                "<code>&#60;h1&#62;</code>",
                "Closing tags look like this:",
                "<code>&#60;/h1&#62;</code>",
                "The only difference between opening and closing tags is the forward slash after the opening bracket of a closing tag.",
                "Each challenge has tests you can run at any time by clicking the \"Run tests\" button. When you pass all tests, you'll be prompted to submit your solution and go to the next coding challenge.",
                "<hr>",
                "To pass the test on this challenge, change your <code>h1</code> element's text to say \"Hello World\"."
            ],
            challengeType: 0,
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
            challengeType: 0,
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
        }
    }
}




export const stageSelector = (id, state) => state[ns].models[id]
export const makeStageSelector = (id) =>  (state) => state[ns].models[id]

const reducerMap = {}

export default handleActions(reducerMap, initialState);