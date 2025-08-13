import { useFormFields } from '../../common/formFields';

import './style.scss';

export const useForm = () => {
    const form = document.querySelector('.contact__form');
    if (!form) {
        return;
    }

    const successMessage = form.querySelector('.form-success');
    const schedulerLinkElement = successMessage.querySelector('a');
    const schedulerLink = schedulerLinkElement.href;

    const scheduleCallCheckbox = form.querySelector('input[name="Schedule-a-session"]');
    const btnLabel = form.querySelector('.form__button__text');
    let isScheduling = false;

    const BTN_LABELS = {
        default: btnLabel.textContent,
        schedule: 'Schedule collaboration session',
    };

    const { cleanup: formFieldsCleanup } = useFormFields(form);

    const formContainerObserver = new MutationObserver(handleContainerMutation);
    formContainerObserver.observe(successMessage, { attributes: true, attributeFilter: ['style'] });

    scheduleCallCheckbox.addEventListener('change', handleScheduleCallChange);

    handleScheduleCallChange();

    return () => {
        formFieldsCleanup();
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
};