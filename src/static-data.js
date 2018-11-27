

export const staticCoureses = [{
    _id: 1,
    header: "Web Devekopment",
    subheader: "Master the languages of the web: HTML, CSS, JavaScript, and SQL. This path is great for budding front-end or back-end engineers!",
    tags: ["html", "css", "javascript"],
    tasks: [{
        _id: 1231,
        name: "create basic html tag"
    },
    {
        _id: 234234,
        name: "hello world"
    },
    {
        _id: 434,
        name: "add paragrpah"
    }]
},
{
    _id: 2,
    header: "Data Science",
    subheader: "Learn SQL and Python and build the skills you need to query, analyze, and visualize data.",
    tags: ["pyhton", "sql"],
    tasks: [{
        _id: 434,
        name: "basic python loop"
    }]

},
{
    _id: 3,
    header: "Data Bases",
    subheader: "Learn SQL and Python and build the skills you need to query, analyze, and visualize data.",
    tags: ["pyhton", "sql"],
    tasks: [{
        _id: 123123,
        name: "basic sql select"
    }]
}
]
export const predefinedPaths = [

    {
        _id: 12363412312,
        name: "frontend",
        path: [staticCoureses[0], staticCoureses[2]]
    },
    {
        _id: 52342363412312,
        name: "backend",
        path: [staticCoureses[1], staticCoureses[2]]
    }

]



export const stats = {
    points: 200,
    currentStage: "Web"
}

export const users = [{
    _id: 123123434,
    name: "amit",
    lastname: "mizrahi",
    phone: "052-654655",
    photo: './amit.jpg',
    type: "student",
    path: null

},
{
    _id: 12312312312,
    name: "amir",
    phone: "052-654655",
    lastname: "east",
    photo: './amit.jpg',
    type: "student",
    path: null

},
{
    _id: 12314342312312,
    name: "amin",
    phone: "052-654655",
    lastname: "west",
    photo: './amit.jpg',
    type: "teacher",

}];

export const questions = [
    {
        _id: 12313123,
        header: "Question1",
        content: "asdasdasd",
        userId: 123123434,
        tags: ["pyhton", "sql"]
    },
    {
        _id: 123131112323,
        header: "Question1",
        content: "asdasdasd",
        tags: ["pyhton", "sql"],
        userId: 123123434
    },
    {
        _id: 123131232121,
        header: "Question1",
        content: "asdasdasd",
        tags: ["pyhton", "sql"],
        userId: 123123434
    }
]





export const currentUser = users[0];


export const stages = [{
    id: 12312312333123,
    codePlaceholder: `<!DOCTYPE html>
<html>
<head>
  <title>Vacation World</title>
</head>`,

    learnHeader: "Inline Styles",
    learnSubheader: "CSS SETUP AND SELECTORS",
    learn: "Although CSS is a different language than HTML, it's possible to write CSS code directly within HTML code using inline styles.",
    instructions: ["In index.html, use inline styles to set the font-family of the first paragraph to Arial."],

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
    },
    stageMetadata: {
        introPath: "",
        template: null,
        required: [],
        nextChallengePath: "/responsive-web-design/basic-html-and-html5/headline-with-the-h2-element",
        id: "bd7123c8c441eddfaeb5bdef"
    },
    slug: "/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements"
}]



const challengeNode = {

    "title": "Say Hello to HTML Elements",
    "description": [
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
    "challengeType": 0,
    "videoUrl": "https://scrimba.com/p/pVMPUv/cE8Gpt2",
    "fields": {
        "slug": "/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements",
        "blockName": "Basic HTML and HTML5",
        "tests": [
            {
                "text": "Your <code>h1</code> element should have the text \"Hello World\".",
                "testString": "assert.isTrue((/hello(\\s)+world/gi).test($('h1').text()), 'Your <code>h1</code> element should have the text \"Hello World\".');"
            }
        ]
    },
    "required": [],
    "files": {
        "indexhtml": {
            "key": "indexhtml",
            "ext": "html",
            "name": "index",
            "contents": "<h1>Hello</h1>",
            "head": "",
            "tail": ""
        },
        "indexjs": null,
        "indexjsx": null
    }
};

const pageContext = {
    "challengeMeta": {
        "introPath": "",
        "template": null,
        "required": [],
        "nextChallengePath": "/responsive-web-design/basic-html-and-html5/headline-with-the-h2-element",
        "id": "bd7123c8c441eddfaeb5bdef"
    },
    "slug": "/responsive-web-design/basic-html-and-html5/say-hello-to-html-elements"
}
