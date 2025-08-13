import { useFormFields, OTHER_STAGE_VALUE, FOUND_THROUGH_OTHER_VALUE } from "../../common/formFields";

import '../../common/formFields/style.scss';

export const useSignup = () => {
    const form = document.querySelector('.ms-form-block');

    if (!form) {
        return;
    }

    const careerStageDataInput = form.querySelector('input[name="memberstack-career-stage"]');
    const graduationDateDataInput = form.querySelector('input[name="memberstack-graduation-date"]');
    const foundThroughDataInput = form.querySelector('input[name="memberstack-found-through"]');

    const {
        cleanup,
        careerStageSelect,
        foundThroughSelect,
        otherCareerStage,
        graduationDate,
        foundThroughOther,
    } = useFormFields(form);

    careerStageSelect.addEventListener('change', onCareerStageSelectChange);
    otherCareerStage.input.addEventListener('change', onCareerStageOtherChange);
    foundThroughSelect.addEventListener('change', onFoundThroughSelectChange);
    foundThroughOther.input.addEventListener('change', onFoundThroughOtherChange);
    graduationDate.input.addEventListener('change', onGraduationDateChange);

    onGraduationDateChange({ target: graduationDate.input });
    onFoundThroughOtherChange({ target: foundThroughOther.input });
    onFoundThroughSelectChange({ target: foundThroughSelect });
    onCareerStageOtherChange({ target: otherCareerStage.input });
    onCareerStageSelectChange({ target: careerStageSelect });

    return () => {
        cleanup();
        careerStageSelect.removeEventListener('change', onCareerStageSelectChange);
        otherCareerStage.input.removeEventListener('change', onCareerStageOtherChange);
        foundThroughSelect.removeEventListener('change', onFoundThroughSelectChange);
        foundThroughOther.input.removeEventListener('change', onFoundThroughOtherChange);
        graduationDate.input.removeEventListener('change', onGraduationDateChange);
    };

    function onCareerStageSelectChange(event) {
        const stage = event.target.value;
        if (stage === OTHER_STAGE_VALUE) {
            setCareerStageData(otherCareerStage.input.value);
        } else {
            setCareerStageData(stage);
        }
    }

    function onCareerStageOtherChange(event) {
        setCareerStageData(event.target.value);
    }

    function onFoundThroughSelectChange(event) {
        const foundThrough = event.target.value;
        if (foundThrough === FOUND_THROUGH_OTHER_VALUE) {
            setFoundThroughData(foundThroughOther.input.value);
        } else {
            setFoundThroughData(foundThrough);
        }
    }

    function onFoundThroughOtherChange(event) {
        setFoundThroughData(event.target.value);
    }

    function onGraduationDateChange(event) {
        setGraduationDateData(event.target.value);
    }

    function setCareerStageData(data) {
        careerStageDataInput.value = data;
    }

    function setGraduationDateData(data) {
        graduationDateDataInput.value = data;
    }

    function setFoundThroughData(data) {
        foundThroughDataInput.value = data;
    }
};
