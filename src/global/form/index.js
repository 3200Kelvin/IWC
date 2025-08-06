import './style.scss';

const STUDENT_VALUE = 'Medical Student';
const OTHER_STAGE_VALUE = 'Other';
const FOUND_THROUGH_OTHER_VALUE = 'Other';

export const useForm = () => {
    const form = document.querySelector('form');
    if (!form) {
        return;
    }

    const formContainer = form.closest('div');
    const successMessage = formContainer.querySelector('.form-success');
    const schedulerLinkElement = successMessage.querySelector('a');
    const schedulerLink = schedulerLinkElement.href;

    const stageSelect = form.querySelector('select[name="career-stage"]');
    const otherCareerStageInput = form.querySelector('input[name="career-stage-other"]');
    const otherCareerStageGroup = otherCareerStageInput.closest('.form__question');
    const graduationDateInput = form.querySelector('input[name="graduation date"]');
    const graduationDateGroup = graduationDateInput.closest('.form__question');
    const stageAdditionalField = otherCareerStageInput.closest('.form__question-wrapper');

    const foundThroughSelect = form.querySelector('select[name="found-us-through"]');
    const foundThroughOtherInput = form.querySelector('input[name="found-us-through-other"]');
    const foundThroughOtherGroup = foundThroughOtherInput.closest('.form__question');
    const foundThroughAdditionalField = foundThroughOtherInput.closest('.form__question-wrapper');

    const scheduleCallCheckbox = form.querySelector('input[name="Schedule-a-session"]');
    const btnLabel = form.querySelector('.form__button__text');
    let isScheduling = false;

    const BTN_LABELS = {
        default: btnLabel.textContent,
        schedule: 'Schedule collaboration session',
    };

    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    graduationDateInput.setAttribute('min', startDate);

    const formContainerObserver = new MutationObserver(handleContainerMutation);
    formContainerObserver.observe(successMessage, { attributes: true, attributeFilter: ['style'] });

    graduationDateInput.addEventListener('focus', onFocus);
    stageSelect.addEventListener('change', handleStageChange);
    foundThroughSelect.addEventListener('change', handleFoundThroughChange);
    scheduleCallCheckbox.addEventListener('change', handleScheduleCallChange);

    handleStageChange();
    handleFoundThroughChange();
    handleScheduleCallChange();

    return () => {
        graduationDateInput.removeEventListener('focus', onFocus);
        stageSelect.removeEventListener('change', handleStageChange);
        foundThroughSelect.removeEventListener('change', handleFoundThroughChange);
        scheduleCallCheckbox.removeEventListener('change', handleScheduleCallChange);
        formContainerObserver.disconnect();
    };

    function handleScheduleCallChange() {
        isScheduling = scheduleCallCheckbox.checked;

        if (isScheduling) {
            btnLabel.textContent = BTN_LABELS.schedule;
            successMessage.classList.add('form-success--schedule');
        } else {
            btnLabel.textContent = BTN_LABELS.default;
            successMessage.classList.remove('form-success--schedule');
        }
    }

    function handleContainerMutation() {
        if (isScheduling && successMessage.checkVisibility()) {
            window.open(schedulerLink);
        }
    }

    function handleStageChange() {
        const isMedical = stageSelect.value === STUDENT_VALUE;
        const isOther = stageSelect.value === OTHER_STAGE_VALUE;
        const showGroup = isMedical || isOther;
        toggleGraduationDate(isMedical);
        toggleOtherCareerStage(isOther);

        if (showGroup) {
            stageAdditionalField.style.display = 'flex';
        } else {
            stageAdditionalField.style.display = 'none';
        }
    }

    function toggleOtherCareerStage(isShown = false) {
        if (isShown) {
            otherCareerStageInput.required = true;
            otherCareerStageGroup.style.display = 'flex';
        } else {
            otherCareerStageInput.required = false;
            otherCareerStageGroup.style.display = 'none';
        }
    }

    function toggleGraduationDate(isShown = false) {
        if (isShown) {
            graduationDateInput.required = true;
            graduationDateGroup.style.display = 'flex';
        } else {
            graduationDateInput.required = false;
            graduationDateGroup.style.display = 'none';
        }
    }

    function handleFoundThroughChange() {
        if (foundThroughSelect.value === FOUND_THROUGH_OTHER_VALUE) {
            foundThroughAdditionalField.style.display = 'flex';
        } else {
            foundThroughAdditionalField.style.display = 'none';
        }
    }

    function onFocus(event) {
        try {
            event.target.showPicker();
        } catch(error) {}
    }
};