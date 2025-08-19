import './style.scss';

export const useRunner = (block, wrapperSelector, entrySelector) => {
    const defaultDuration = 20;
    const wrapper = block.querySelector(wrapperSelector);
    const entry = wrapper.querySelector(entrySelector);

    const {
        durationDesk = defaultDuration,
        durationTablet = durationDesk,
        durationMobile = durationTablet,
        direction = 'left',
    } = block.dataset;
    
    block.classList.add('runner');

    if (direction === 'right') {
        block.classList.add('runner--right');
    } else if (direction === 'top') {
        block.classList.add('runner--top');
    } else if (direction === 'bottom') {
        block.classList.add('runner--bottom');
    }

    wrapper.classList.add('runner__wrapper');
    entry.classList.add('runner__entry');

    let isInitialized = false;
    let speedCoeff = 1;
    let wrapperClone;
    let currentNumber = 1;
    let entryResizeDebounce;
    let wrapperResizeDebounce;

    const entryResizeObserver = new ResizeObserver(([entry]) => {
        clearTimeout(entryResizeDebounce);
        entryResizeDebounce = setTimeout(() => onEntryResize(entry), 250);
    });
    entryResizeObserver.observe(entry);

    const wrapperResizeObserver = new ResizeObserver(([entry]) => {
        clearTimeout(wrapperResizeDebounce);
        wrapperResizeDebounce = setTimeout(() => onWrapperResize(entry), 250);
    });
    wrapperResizeObserver.observe(wrapper);

    return { toggleRunner, cleanup };

    function cleanup () {
        entryResizeObserver.disconnect();
        wrapperResizeObserver.disconnect();
    }

    function onEntryResize(entry) {
        const targetNumber = getTargetAmount(entry);
        if (currentNumber !== targetNumber || !isInitialized) {
            changeAmountOfEntries(targetNumber);
            currentNumber = targetNumber;
            isInitialized = true;
        }
    }

    function onWrapperResize(entry) {
        const newSpeedCoeff = getSpeedCoeff(entry);
        if (speedCoeff !== newSpeedCoeff) {
            setSpeed(newSpeedCoeff);
            speedCoeff = newSpeedCoeff;
        }
    }

    function isHorizontal() {
        return direction === 'left' || direction === 'right';
    }

    function getTargetAmount(entry) {
        if (isHorizontal()) {
            return Math.ceil(block.offsetWidth / entry.contentRect.width);
        }
        return Math.ceil(block.offsetHeight / entry.contentRect.height);
    }

    function getSpeedCoeff(entry) {
        if (isHorizontal()) {
            return entry.contentRect.width / block.offsetWidth;
        }
        return entry.contentRect.height / block.offsetHeight;
    }

    function setSpeed(newSpeedCoeff) {
        block.style.setProperty('--duration-desk', `${durationDesk * newSpeedCoeff}s`);
        block.style.setProperty('--duration-tablet', `${durationTablet * newSpeedCoeff}s`);
        block.style.setProperty('--duration-mobile', `${durationMobile * newSpeedCoeff}s`);
    }

    function changeAmountOfEntries(targetNumber) {
        if (targetNumber > currentNumber) {
            const toAdd = targetNumber - currentNumber;
            for (let i = 0; i < toAdd; i++) {
                const clone = entry.cloneNode(true);
                wrapper.appendChild(clone);
            }
        } else {
            const toRemove = currentNumber - targetNumber;
            for (let i = 0; i < toRemove; i++) {
                wrapper.removeChild(wrapper.lastElementChild);
            }
        }

        if (wrapperClone) {
            wrapperClone.remove();
        }

        wrapperClone = wrapper.cloneNode(true);
        wrapper.after(wrapperClone);

        block.classList.add('runner--reset');
        setTimeout(() => block.classList.remove('runner--reset'), 10);
    }

    function toggleRunner(isVisible = false) {
        if (isVisible) {
            block.classList.add('runner--visible');
        } else {
            block.classList.remove('runner--visible');
        }
    }
};
