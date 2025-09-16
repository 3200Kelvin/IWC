class API {
    baseUrl = `${location.origin}/app/api`;

    constructor() {
        this.baseUrl = `${location.origin}/app/api`;
    }

    async getCollections() {
        try {
            const res = await fetch(`${this.baseUrl}/collections`);
            return await res.json();
        } catch (error) {
            return console.error(error);
        }
    }

    async getVideoUrl(videoName) {
        try {
            const res = await fetch(`${this.baseUrl}/videos?video=${videoName}`);
            const { url = null } = await res.json();
            return url;
        } catch (error) {
            return console.error(error);
        }
    }
}

export const api = new API();