export const html = 0;
export const js = 1;
export const backend = 2;
export const zipline = 3;
export const frontEndProject = 3;
export const backEndProject = 4;
export const bonfire = 5;
export const modern = 6;
export const step = 7;
export const quiz = 8;
export const invalid = 9;

// individual exports




export const challengeTypes = {
  html,
  js,
  backend,
  zipline,
  frontEndProject,
  backEndProject,
  bonfire,
  modern,
  step,
  quiz,
  invalid
};

// turn challengeType to file ext
export const pathsMap = {
  [html]: 'html',
  [js]: 'js',
  [bonfire]: 'js'
};
// determine the component to view for each challenge
export const viewTypes = {
  [html]: 'classic',
  [js]: 'classic',
  [bonfire]: 'classic',
  [frontEndProject]: 'project',
  [backEndProject]: 'project',
  [modern]: 'modern',
  [step]: 'step',
  [quiz]: 'quiz',
  [backend]: 'backend'
};

// determine the type of submit function to use for the challenge on completion
export const submitTypes = {
  [html]: 'tests',
  [js]: 'tests',
  [bonfire]: 'tests',
  // requires just a single url
  // like codepen.com/my-project
  [frontEndProject]: 'project.frontEnd',
  // requires two urls
  // a hosted URL where the app is running live
  // project code url like GitHub
  [backEndProject]: 'project.backEnd',

  [step]: 'step',
  [quiz]: 'quiz',
  [backend]: 'backend',
  [modern]: 'tests'
};

// determine which help forum questions should be posted to
export const helpCategory = {
  [html]: 'HTML-CSS',
  [js]: 'JavaScript',
  [backend]: 'JavaScript',
  [modern]: 'JavaScript'
};
