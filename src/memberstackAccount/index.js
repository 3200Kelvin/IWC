import { getUserData, getUserSubscriptionData } from "../common/memberstack";

export const useMembersAreaScripts = () => {
    const nextWithdrawalElement = document.querySelector('[data-info="next-withdrawal"]');

    if (!nextWithdrawalElement) {
        return;
    }

    getUserData().then((data) => {
        const subscription = getUserSubscriptionData(data);

        if (subscription && subscription.type !== 'FREE') {
            const nextBillingDate = new Date(subscription.payment.nextBillingDate * 1000);

            nextWithdrawalElement.textContent = nextBillingDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
            });
        }
    });
};

export { useMembersAreaScripts as usePageScripts };
