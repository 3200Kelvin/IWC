const STORAGE_KEY = 'isSoundDisabled';

// export const FILE_URL = 'http://127.0.0.1:5500/dist/rick-astley.mp3';
// export const FILE_URL = 'https://diii4qix38ypj.cloudfront.net/rick-astley.mp3';
export const FILE_URL = 'https://diii4qix38ypj.cloudfront.net/assets/bg-sound.mp3';

export const getIsSoundDisabled = () => localStorage.getItem(STORAGE_KEY) === 'true';

export const setSoundData = (flag) => {
    localStorage.setItem(STORAGE_KEY, flag);
};

export const disableSound = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
};

export const enableSound = () => {
    localStorage.setItem(STORAGE_KEY, 'false');
};