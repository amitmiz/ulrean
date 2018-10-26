import React from "react";
import { CourseCard } from "../course-card/course-card";

export function CourseStages(props) {
    const { course } = props;

    return (
        
        
                <CourseCard {...course}></CourseCard>

    )
}
