class API {
    baseUrl = 'https://integrated-wealthcare.webflow.io/app/api';

    constructor() {
        this.baseUrl = `${location.origin}/app/api`;
    }

    getCollections() {
        return fetch(`${this.baseUrl}/collections`).then(res => res.json());
    }
}

export const api = new API();