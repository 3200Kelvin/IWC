import { getUserData, getIsUserSubscribed, PAGES } from "../../common/memberstack";

export const useMembersAreaLinks = () => {
    getUserData().then((data) => {
        replaceLinks(data);
    });

    function replaceLinks(userData = null) {
        if (!!userData) {
            setMembersAreaLinks();

            if (getIsUserSubscribed(userData)) {
                setIntelligenceLinks();
            }
        } else {
            setLoginLinks();
        }
    }

    function setMembersAreaLinks() {
        const loginLinks = document.querySelectorAll(`a[href="${PAGES.LOGIN}"]`);
        setLinks(loginLinks, PAGES.MEMBERS_AREA);
    }

    function setIntelligenceLinks() {
        const intelligenceLinks = document.querySelectorAll(`a[data-link="INTELLIGENCE"]`);
        setLinks(intelligenceLinks, PAGES.INTELLIGENCE);
    }

    function setLoginLinks() {
        const membersAreaLinks = document.querySelectorAll(`a[href="${PAGES.MEMBERS_AREA}"], a[href="${PAGES.INTELLIGENCE}"]`);
        setLinks(membersAreaLinks, PAGES.LOGIN);
    }

    function setLinks(elements = [], href = '') {
        elements.forEach((element) => element.setAttribute('href', href));
    }
};
