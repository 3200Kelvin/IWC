import { getIntersectionObserver } from '../../../common/helpers';

import './style.scss';

const timelineConfig = [
  { year: 1996, label: 'North Carolina', selectors: '#fill-nc' },
  { year: 1997, label: 'District of Columbia', selectors: '#fill-dc' },
  { year: 1999, label: 'Rhode Island', selectors: '#fill-ri' },
  { year: 1999, label: 'Pennsylvania', selectors: '#fill-pa' },
  { year: 2000, label: 'Virginia', selectors: '#fill-va' },
  { year: 2002, label: 'Florida', selectors: '#fill-fl' },
  { year: 2003, label: 'Louisiana', selectors: '#fill-la' },
  { year: 2003, label: 'Arkansas', selectors: '#fill-ar' },
  { year: 2004, label: 'California', selectors: '#fill-ca' },
  { year: 2004, label: 'Colorado', selectors: '#fill-co' },
  { year: 2005, label: 'Maryland', selectors: '#fill-md' },
  { year: 2005, label: 'Washington', selectors: '#fill-wa' },
  { year: 2005, label: 'Michigan', selectors: '#fill-mi' },
  { year: 2006, label: 'Ohio', selectors: '#fill-oh' },
  { year: 2006, label: 'Massachusetts', selectors: '#fill-ma' },
  { year: 2007, label: 'South Carolina', selectors: '#fill-sc' },
  { year: 2007, label: 'New Jersey', selectors: '#fill-nj' },
  { year: 2007, label: 'Arizona', selectors: '#fill-az' },
  { year: 2007, label: 'New York', selectors: '#fill-ny' },
  { year: 2008, label: 'West Virginia', selectors: '#fill-wv' },
  { year: 2008, label: 'Oregon', selectors: '#fill-or' },
  { year: 2008, label: 'Tennessee', selectors: '#fill-tn' },
  { year: 2008, label: 'Idaho', selectors: '#fill-id' },
  { year: 2008, label: 'Illinois', selectors: '#fill-il' },
  { year: 2008, label: 'Vermont', selectors: '#fill-vt' },
  { year: 2008, label: 'Georgia', selectors: '#fill-ga' },
  { year: 2008, label: 'Minnesota', selectors: '#fill-mn' },
  { year: 2008, label: 'Alabama', selectors: '#fill-al' },
  { year: 2008, label: 'Kentucky', selectors: '#fill-ky' },
  { year: 2008, label: 'Missouri', selectors: '#fill-mo' },
  { year: 2008, label: 'Wyoming', selectors: '#fill-wy' },
  { year: 2008, label: 'Connecticut', selectors: '#fill-ct' },
  { year: 2008, label: 'Texas', selectors: '#fill-tx' },
  { year: 2009, label: 'New Hampshire', selectors: '#fill-nh' },
  { year: 2009, label: 'Alaska', selectors: '#fill-ak' },
  { year: 2011, label: 'New Mexico', selectors: '#fill-nm' },
  { year: 2011, label: 'Mississippi', selectors: '#fill-ms' },
  { year: 2013, label: 'Nevada', selectors: '#fill-nv' },
  { year: 2013, label: 'Delaware', selectors: '#fill-de' },
  { year: 2013, label: 'Wisconsin', selectors: '#fill-wi' },
  { year: 2013, label: 'Kansas', selectors: '#fill-ks' },
  { year: 2014, label: 'Maine', selectors: '#fill-me' },
  { year: 2016, label: 'Iowa', selectors: '#fill-ia' },
  { year: 2017, label: 'Nebraska', selectors: '#fill-ne' },
  { year: 2017, label: 'Utah', selectors: '#fill-ut' },
  { year: 2018, label: 'North Dakota', selectors: '#fill-nd' },
  { year: 2020, label: 'Oklahoma', selectors: '#fill-ok' },
  { year: 2020, label: 'South Dakota', selectors: '#fill-sd' },
  { year: 2021, label: 'Indiana', selectors: '#fill-in' },
  { year: 2023, label: 'Hawaii', selectors: '#fill-hi' },
  { year: 2023, label: 'Montana', selectors: '#fill-mt' },
];

export const useStoryMap = (block) => {
    const container = block.querySelector('.story__map');
    const labels = {
        year: container.querySelector('.story__map__year__text'),
        label: container.querySelector('.story__map__state p'),
    };

    const DELAY = 1000;
    let current = -1;
    let timeout;
    const allElements = [];

    const timeline = timelineConfig.map((entry) => {
        const elements = container.querySelectorAll(entry.selectors);
        allElements.push(...elements);

        return {
            ...entry,
            elements,
        };
    });

    allElements.forEach((element) => {
        element.classList.add('map-entry');
    });

    const observer = getIntersectionObserver(0, onIntersecting, onNotIntersecting);
    observer.observe(container);

    return () => {
        observer.disconnect();
        if (timeout) {
            clearTimeout(timeout);
        }
    }

    function onIntersecting() {
        if (timeout) {
            clearTimeout(timeout);
        }
        step();
    }

    function onNotIntersecting() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
    }

    function step() {
        current += 1;

        if (current >= timeline.length) {
            current = -1;
            hideAllEntries();
        } else {
            showEntry();
        }

        timeout = setTimeout(step, DELAY);
    }

    function showEntry() {
        const { elements, year, label } = timeline[current];

        showElements(elements);
        changeLabel(year, label);
    }

    function changeLabel(year = null, label = null) {
        if (year === null) {
            labels.year.textContent = 'peep';
            labels.label.textContent = 'poop';
        } else {
            labels.year.textContent = year;
            labels.label.textContent = label;
        }
    }

    function hideAllEntries() {
        allElements.forEach((element) => {
            element.classList.remove('shown');
        });
    }

    function showElements(elements) {
        elements.forEach((element) => {
            element.classList.add('shown');
        });
    }
};
