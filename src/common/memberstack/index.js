const SUBSCRIPTION_PLAN_ID = 'pln_member-subscription-9qbl0tte';
const CLIENT_PLAN_ID = 'pln_iwc-client-3zah0f6k';

const PLANS_WITH_ACCESS = [SUBSCRIPTION_PLAN_ID, CLIENT_PLAN_ID];

export const getUserData = () => window.$memberstackDom.getCurrentMember().then(({ data: member = null }) => member);

export const getUserSubscriptionData = (userData = null) => {
    return userData?.planConnections?.find?.(({ planId }) => PLANS_WITH_ACCESS.includes(planId)) || null;
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