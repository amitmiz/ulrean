export const staticCoureses = [{
    _id: 1,
    header: "Web Devekopment",
    subheader: "Master the languages of the web: HTML, CSS, JavaScript, and SQL. This path is great for budding front-end or back-end engineers!",
    tags: ["html", "css", "javascript"],
    tasks: ["html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript"]
},
{
    _id: 2,
    header: "Data Science",
    subheader: "Learn SQL and Python and build the skills you need to query, analyze, and visualize data.",
    tags: ["pyhton", "sql"],
    tasks: ["html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript"]

},
{
    _id: 3,
    header: "Data Bases",
    subheader: "Learn SQL and Python and build the skills you need to query, analyze, and visualize data.",
    tags: ["pyhton", "sql"],
    tasks: ["html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript"]
}
]
export const predefinedPaths = [

    {
        name: "frontend",
        path: [staticCoureses[0], staticCoureses[2]]
    },
    {
        name: "backend",
        path: [staticCoureses[1], staticCoureses[2]]
    }

]



export const stats = {
    points: 200,
    currentStage: "Web"
}

export const currentUser = {
    name: "amit",
    lastname: "mizrahi",
    photo: './amit.jpg',
    type: "student",
    corusePath: {
        path: [...staticCoureses],

    }

}