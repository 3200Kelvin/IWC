import { getUserData, getUserSubscriptionData } from "../../common/memberstack";

export const useMembersAreaScripts = () => {
    const block = document.querySelector('.members-area');

    if (!block) {
        return;
    }

    const nextWithdrawalElement = document.querySelector('[data-info="next-withdrawal"]');

    getUserData().then((data) => {
        const subscription = getUserSubscriptionData(data);

        if (subscription) {
            const nextBillingDate = new Date(subscription.payment.nextBillingDate * 1000);

            nextWithdrawalElement.textContent = nextBillingDate.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
            });
        }
    });
};
