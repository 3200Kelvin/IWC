import { api } from "../../common/api";
import { SessionStorage } from "../../common/storage";

export const useMediaNumbers = () => {
    const STORAGE_KEY = 'collections';

    const cachedData = SessionStorage.get(STORAGE_KEY);
    if (cachedData) {
        setCollectionData(cachedData);
        return;
    }

    const setTextPromise = api.getCollections();
    let cancelPromise = null;
    new Promise((res, rej) => {
        cancelPromise = rej;
    });

    Promise.all([setTextPromise, cancelPromise]).then(([data]) => setCollectionData(data));

    return cancelPromise;

    function setCollectionData(data) {
        SessionStorage.set(STORAGE_KEY, data);
        data.forEach(({ id, name, count }) => {
            const titleElements = document.querySelectorAll(`[data-collection-title="${id}"]`);
            const countElements = document.querySelectorAll(`[data-collection-number="${id}"]`);

            titleElements.forEach((el) => setElementText(el, name));
            countElements.forEach((el) => {
                const decrement = el.dataset.collectionNumberDecrement ? parseInt(el.dataset.collectionNumberDecrement) : 0;
                setElementText(el, count - decrement);
            });
        });
    }

    function setElementText(el, text) {
        el.textContent = text;
    }
};

