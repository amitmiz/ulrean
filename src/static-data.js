export const staticCoureses = [{
        header: "Web Devekopment",
        subheader: "Master the languages of the web: HTML, CSS, JavaScript, and SQL. This path is great for budding front-end or back-end engineers!",
        tags: ["html", "css", "javascript"],
        tasks: ["html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript"]
    },
    {
        header: "Data Science",
        subheader: "Learn SQL and Python and build the skills you need to query, analyze, and visualize data.",
        tags: ["pyhton", "sql"],
        tasks: ["html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript"]

    },
    {
        header: "Data Science",
        subheader: "Learn SQL and Python and build the skills you need to query, analyze, and visualize data.",
        tags: ["pyhton", "sql"],
        tasks: ["html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript", "html", "css", "javascript"]
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