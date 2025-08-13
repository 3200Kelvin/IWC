import './style.scss';

export const STUDENT_VALUE = 'Medical Student';
export const OTHER_STAGE_VALUE = 'Other';
export const FOUND_THROUGH_OTHER_VALUE = 'Other';

export const useFormFields = (form) => {
    const careerStageSelect = form.querySelector('select[name="career-stage"]');
    const foundThroughSelect = form.querySelector('select[name="found-us-through"]');

    const otherCareerStageInput = form.querySelector('input[name="career-stage-other"]');
    const otherCareerStage = {
        input: otherCareerStageInput,
        group: otherCareerStageInput.closest('.form__question'),
        wrapper: otherCareerStageInput.closest('.form__question-wrapper'),
    };

    const graduationDateInput = form.querySelector('input[name="graduation date"]');
    const graduationDate = {
        input: graduationDateInput,
        group: graduationDateInput.closest('.form__question'),
    };

    const foundThroughOtherInput = form.querySelector('input[name="found-us-through-other"]');
    const foundThroughOther = {
        input: foundThroughOtherInput,
        wrapper: foundThroughOtherInput.closest('.form__question-wrapper'),
    };

    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    graduationDate.input.setAttribute('min', startDate);

    graduationDate.input.addEventListener('focus', onDateSelectFocus);
    careerStageSelect.addEventListener('change', handleStageChange);
    foundThroughSelect.addEventListener('change', handleFoundThroughChange);

    handleStageChange();
    handleFoundThroughChange();

    const cleanup = () => {
        graduationDate.input.removeEventListener('focus', onDateSelectFocus);
        careerStageSelect.removeEventListener('change', handleStageChange);
        foundThroughSelect.removeEventListener('change', handleFoundThroughChange);
    };

    return {
        cleanup,
        careerStageSelect,
        foundThroughSelect,
        otherCareerStage,
        graduationDate,
        foundThroughOther,
    };

    function handleStageChange() {
        const isMedical = careerStageSelect.value === STUDENT_VALUE;
        const isOther = careerStageSelect.value === OTHER_STAGE_VALUE;
        const showGroup = isMedical || isOther;

        toggleGraduationDate(isMedical);
        toggleOtherCareerStage(isOther);

        if (showGroup) {
            otherCareerStage.wrapper.style.display = 'flex';
        } else {
            otherCareerStage.wrapper.style.display = 'none';
        }
    }

    function toggleGraduationDate(isShown = false) {
        if (isShown) {
            graduationDate.input.required = true;
            graduationDate.group.style.display = 'flex';
        } else {
            graduationDate.input.required = false;
            graduationDate.group.style.display = 'none';
        }
    }

    function toggleOtherCareerStage(isShown = false) {
        if (isShown) {
            otherCareerStage.input.required = true;
            otherCareerStage.group.style.display = 'flex';
        } else {
            otherCareerStage.input.required = false;
            otherCareerStage.group.style.display = 'none';
        }
    }

    function handleFoundThroughChange() {
        if (foundThroughSelect.value === FOUND_THROUGH_OTHER_VALUE) {
            foundThroughOther.wrapper.style.display = 'flex';
        } else {
            foundThroughOther.wrapper.style.display = 'none';
        }
    }

    function onDateSelectFocus(event) {
        try {
            event.target.showPicker();
        } catch(error) {}
    }
};
