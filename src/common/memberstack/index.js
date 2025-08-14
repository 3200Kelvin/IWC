const SUBSCRIPTION_PLAN_ID = 'pln_member-subscription-9qbl0tte';

export const getUserData = () => window.$memberstackDom.getCurrentMember().then(({ data: member = null }) => member);

export const getIsUserSubscribed = (userData = null) => {
    if (!userData || !userData.planConnections?.length) {
        return false;
    }

    const planConnection = userData.planConnections.find(({ id }) => id === SUBSCRIPTION_PLAN_ID);

    return planConnection?.active || false;
}