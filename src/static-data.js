

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
