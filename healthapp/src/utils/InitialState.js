import { DARK_THEME } from '../utils/Themes';

export const INITIAL_STATE = {
    config: {
        exercises: [],
        workTime: 30,
        restTime: 30,
        sets: 1
    },
    isConfigValid: false,
    isExerciseInputValid: false,
    theme: DARK_THEME,
    soundOn: true,
    isRadialCounterOn: true
}