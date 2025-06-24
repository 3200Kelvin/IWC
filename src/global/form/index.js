import './style.scss';

const STUDENT_VALUE = 'Medical Student';
const FOUND_THROUGH_OTHER_VALUE = 'Other';

export const useForm = () => {
    const form = document.querySelector('form');
    if (!form) {
        return;
    }

    const stageSelect = form.querySelector('select[name="career-stage"]');
    const graduationDateInput = form.querySelector('input[name="graduation date"]');
    const graduationDateGroup = graduationDateInput.closest('.form__question');
    const foundThroughSelect = form.querySelector('select[name="found-us-through"]');
    const foundThroughOtherInput = form.querySelector('input[name="found-us-through-other"]');
    const foundThroughOtherGroup = foundThroughOtherInput.closest('.form__question');

    const today = new Date();
    const startDate = today.toISOString().split('T')[0];
    graduationDateInput.setAttribute('min', startDate);

    graduationDateInput.addEventListener('focus', onFocus);
    stageSelect.addEventListener('change', handleStageChange);
    foundThroughSelect.addEventListener('change', handleFoundThroughChange);

    handleStageChange();
    handleFoundThroughChange();

    return () => {
        graduationDateInput.removeEventListener('focus', onFocus);
        stageSelect.removeEventListener('change', handleStageChange);
        foundThroughSelect.removeEventListener('change', handleFoundThroughChange);
    };

    function handleStageChange() {
        if (stageSelect.value === STUDENT_VALUE) {
            graduationDateInput.required = true;
            graduationDateGroup.style.display = 'block';
        } else {
            graduationDateInput.required = false;
            graduationDateGroup.style.display = 'none';
        }
    }

    function handleFoundThroughChange() {
        foundThroughOtherGroup.style.display = foundThroughSelect.value === FOUND_THROUGH_OTHER_VALUE ? 'block' : 'none';
    }

    function onFocus(event) {
        try {
            event.target.showPicker();
        } catch(error) {}
    }
};