import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = state => ({
    exercises: state.config.exercises,
    workTime: state.config.workTime,
    restTime: state.config.restTime,
    sets: state.config.sets,
    isConfigValid: state.isConfigValid,
    isExerciseInputValid: state.isExerciseInputValid,
    theme: state.theme,
    soundOn: state.soundOn,
    isRadialCounterOn: state.isRadialCounterOn
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export const withRedux = connect(mapStateToProps, mapDispatchToProps);
