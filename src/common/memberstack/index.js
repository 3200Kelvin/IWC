const SUBSCRIPTION_PLAN_ID = 'pln_member-subscription-9qbl0tte';

export const getUserData = () => window.$memberstackDom.getCurrentMember().then(({ data: member = null }) => member);

export const getUserSubscriptionData = (userData = null) => {
    return userData?.planConnections?.find?.(({ planId }) => planId === SUBSCRIPTION_PLAN_ID) || null;
}

export const getIsUserSubscribed = (userData = null) => {
    const planConnection = getUserSubscriptionData(userData);

    return planConnection?.active || false;
}

export const PAGES = {
    LOGIN: '/members/login',
    SIGNUP: '/members/signup',
    MEMBERS_AREA: '/members-area',
};