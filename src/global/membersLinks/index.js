import { getUserData, PAGES } from "../../common/memberstack";

export const useMembersAreaLinks = () => {
    getUserData().then((data) => {
        replaceLinks(!!data);
    });

    function replaceLinks(isLoggedIn = false) {
        if (isLoggedIn) {
            setMembersAreaLinks();
        } else {
            setLoginLinks();
        }
    }

    function setMembersAreaLinks() {
        const loginLinks = document.querySelectorAll(`a[href="${PAGES.LOGIN}"]`);
        setLinks(loginLinks, PAGES.MEMBERS_AREA);
    }

    function setLoginLinks() {
        const membersAreaLinks = document.querySelectorAll(`a[href="${PAGES.MEMBERS_AREA}"]`);
        setLinks(membersAreaLinks, PAGES.LOGIN);
    }

    function setLinks(elements = [], href = '') {
        elements.forEach((element) => element.setAttribute('href', href));
    }
};
