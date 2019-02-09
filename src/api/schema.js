import { schema } from 'normalizr';


export const stage = new schema.Entity('stages', {}, { idAttribute: "slug" });

export const courses = new schema.Entity(
    'courses',
    {
        stages: [stage]
    },
    { idAttribute: "slug" }
);

export const coursesList = [courses]


export const progress = new schema.Entity("coursesProgress", {}, { idAttribute: "course" })

export const predefiendPath = new schema.Entity("predefiendPaths", {
    courses: [courses],
}, { idAttribute: "slug" })

export const predefiendPaths = [predefiendPath]

export const user = new schema.Entity('users', { path: predefiendPath, progress : [progress] }, { idAttribute: "_id" });

export const usersList = [user];

export const question = new schema.Entity("questions", {
    author: user
}, { idAttribute: "slug" })

export const questions = [question]

// export const label = new schema.Entity('labels');

// export const milestone = new schema.Entity('milestones', {
//   creator: user
// });

// export const issue = new schema.Entity('issues', {
//   assignee: user,
//   assignees: [user],
//   labels: [label],
//   milestone,
//   user
// });

// export const pullRequest = new schema.Entity('pullRequests', {
//   assignee: user,
//   assignees: [user],
//   labels: [label],
//   milestone,
//   user
// });

// export const issueOrPullRequest = new schema.Array(
//   {
//     issues: issue,
//     pullRequests: pullRequest
//   },
//   (entity) => (entity.pull_request ? 'pullRequests' : 'issues')
// );