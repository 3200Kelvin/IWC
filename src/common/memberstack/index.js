const SUBSCRIPTION_PLAN_ID = 'pln_member-subscription-9qbl0tte';

export const getUserData = () => window.$memberstackDom.getCurrentMember().then(({ data: member = null }) => member);

export const getIsUserSubscribed = (userData = null) => {
    console.log(userData);
    if (!userData || !userData.planConnections?.length) {
        return false;
    }

    const planConnection = userData.planConnections.find(({ planId }) => planId === SUBSCRIPTION_PLAN_ID);

    console.log(planConnection?.active);
    return planConnection?.active || false;
}