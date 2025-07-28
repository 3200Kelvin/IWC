import { getIntersectionObserver } from '../../../common/helpers';

import './style.scss';

const timelineConfig = [
  { year: 1996, label: 'North Carolina', toShow: '#fill-nc', toColor: '#state-nc' },
  { year: 1997, label: 'District of Columbia', toShow: '#fill-dc', toColor: '#state-dc' },
  { year: 1999, label: 'Rhode Island', toShow: '#fill-ri', toColor: '#state-ri, #line-ri' },
  { year: 1999, label: 'Pennsylvania', toShow: '#fill-pa', toColor: '#state-pa' },
  { year: 2000, label: 'Virginia', toShow: '#fill-va', toColor: '#state-va' },
  { year: 2002, label: 'Florida', toShow: '#fill-fl', toColor: '#state-fl' },
  { year: 2003, label: 'Louisiana', toShow: '#fill-la', toColor: '#state-la' },
  { year: 2003, label: 'Arkansas', toShow: '#fill-ar', toColor: '#state-ar' },
  { year: 2004, label: 'California', toShow: '#fill-ca', toColor: '#state-ca' },
  { year: 2004, label: 'Colorado', toShow: '#fill-co', toColor: '#state-co' },
  { year: 2005, label: 'Maryland', toShow: '#fill-md', toColor: '#state-md, #line-md' },
  { year: 2005, label: 'Washington', toShow: '#fill-wa', toColor: '#state-wa' },
  { year: 2005, label: 'Michigan', toShow: '#fill-mi', toColor: '#state-mi' },
  { year: 2006, label: 'Ohio', toShow: '#fill-oh', toColor: '#state-oh' },
  { year: 2006, label: 'IWC East', toShow: '.story__map__label-wrapper--iwc-east' },
  { year: 2006, label: 'Massachusetts', toShow: '#fill-ma', toColor: '#state-ma, #line-ma' },
  { year: 2007, label: 'South Carolina', toShow: '#fill-sc', toColor: '#state-sc' },
  { year: 2007, label: 'New Jersey', toShow: '#fill-nj', toColor: '#state-nj, #line-nj' },
  { year: 2007, label: 'Arizona', toShow: '#fill-az', toColor: '#state-az' },
  { year: 2007, label: 'New York', toShow: '#fill-ny', toColor: '#state-ny' },
  { year: 2008, label: 'West Virginia', toShow: '#fill-wv', toColor: '#state-wv' },
  { year: 2008, label: 'Oregon', toShow: '#fill-or', toColor: '#state-or' },
  { year: 2008, label: 'Tennessee', toShow: '#fill-tn', toColor: '#state-tn' },
  { year: 2008, label: 'Idaho', toShow: '#fill-id', toColor: '#state-id' },
  { year: 2008, label: 'Illinois', toShow: '#fill-il', toColor: '#state-il' },
  { year: 2008, label: 'Vermont', toShow: '#fill-vt', toColor: '#state-vt, #line-vt' },
  { year: 2008, label: 'Georgia', toShow: '#fill-ga', toColor: '#state-ga' },
  { year: 2008, label: 'Minnesota', toShow: '#fill-mn', toColor: '#state-mn' },
  { year: 2008, label: 'Alabama', toShow: '#fill-al', toColor: '#state-al' },
  { year: 2008, label: 'Kentucky', toShow: '#fill-ky', toColor: '#state-ky' },
  { year: 2008, label: 'Missouri', toShow: '#fill-mo', toColor: '#state-mo' },
  { year: 2008, label: 'Wyoming', toShow: '#fill-wy', toColor: '#state-wy' },
  { year: 2008, label: 'Connecticut', toShow: '#fill-ct', toColor: '#state-ct, #line-ct' },
  { year: 2008, label: 'Texas', toShow: '#fill-tx', toColor: '#state-tx' },
  { year: 2009, label: 'New Hampshire', toShow: '#fill-nh', toColor: '#state-nh, #line-nh' },
  { year: 2009, label: 'Alaska', toShow: '#fill-ak', toColor: '#state-ak' },
  { year: 2011, label: 'New Mexico', toShow: '#fill-nm', toColor: '#state-nm' },
  { year: 2011, label: 'Mississippi', toShow: '#fill-ms', toColor: '#state-ms' },
  { year: 2013, label: 'Nevada', toShow: '#fill-nv', toColor: '#state-nv' },
  { year: 2013, label: 'Delaware', toShow: '#fill-de', toColor: '#state-de, #line-de' },
  { year: 2013, label: 'Wisconsin', toShow: '#fill-wi', toColor: '#state-wi' },
  { year: 2013, label: 'Kansas', toShow: '#fill-ks', toColor: '#state-ks' },
  { year: 2014, label: 'Maine', toShow: '#fill-me', toColor: '#state-me' },
  { year: 2014, label: 'Newton office', toShow: '.story__map__label-wrapper--newton' },
  { year: 2016, label: 'Iowa', toShow: '#fill-ia', toColor: '#state-ia' },
  { year: 2017, label: 'Nebraska', toShow: '#fill-ne', toColor: '#state-ne' },
  { year: 2017, label: 'Utah', toShow: '#fill-ut', toColor: '#state-ut' },
  { year: 2018, label: 'North Dakota', toShow: '#fill-nd', toColor: '#state-nd' },
  { year: 2018, label: 'Atlanta office', toShow: '.story__map__label-wrapper--atlanta' },
  { year: 2020, label: 'Oklahoma', toShow: '#fill-ok', toColor: '#state-ok' },
  { year: 2020, label: 'South Dakota', toShow: '#fill-sd', toColor: '#state-sd' },
  { year: 2021, label: 'Indiana', toShow: '#fill-in', toColor: '#state-in' },
  { year: 2023, label: 'Hawaii', toShow: '#fill-hi', toColor: '#state-hi' },
  { year: 2023, label: 'IWC West', toShow: '.story__map__label-wrapper--iwc-west' },
  { year: 2023, label: 'Montana', toShow: '#fill-mt', toColor: '#state-mt' },
  { year: 2024, label: 'Gainesville office', toShow: '.story__map__label-wrapper--gainesville' },
  { year: 2024, label: 'Raleigh office', toShow: '.story__map__label-wrapper--raleigh' },
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
    const allElementsToShow = [];
    const allElementsToColor = [];

    const timeline = timelineConfig.map((entry) => {
        const elementsToShow = container.querySelectorAll(entry.toShow);
        allElementsToShow.push(...elementsToShow);
        
        const elementsToColor = container.querySelectorAll(entry.toColor);
        allElementsToColor.push(...elementsToColor);

        return {
            ...entry,
            elementsToShow,
            elementsToColor,
        };
    });

    allElementsToShow.forEach((element) => {
        element.classList.add('map-entry--to-show');
    });

    allElementsToColor.forEach((element) => {
        element.classList.add('map-entry--to-color');
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
        const { elementsToShow, elementsToColor, year, label } = timeline[current];

        activateElements([...elementsToShow, ...elementsToColor]);
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
        [...allElementsToShow, ...allElementsToColor].forEach((element) => {
            element.classList.remove('activateElements');
        });
    }

    function activateElements(elements) {
        elements.forEach((element) => {
            element.classList.add('active');
        });
    }
};
