

const NAME_SPACE = 'stage';


export const stageSelector = state => state[NAME_SPACE].currentStage;
export const stageIsLoadingSelector = state => state[NAME_SPACE].stageFetchState;

