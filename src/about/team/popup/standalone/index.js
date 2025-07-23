import { useTeamMemberLinks } from './links/script';

export const useTeamMemberStandalone = () => {
    const block = document.querySelector('.team-member');

    useTeamMemberLinks(block);
};
