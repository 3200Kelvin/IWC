import { getCleanup } from "../../common/helpers";

import { useTeamCards } from "./cards";
import { useTeamPopup } from "./popup";
import { useTeamScrollbar } from "./scrollbar";

export const useTeam = () => {
    const team = document.querySelector('.team');
    if (!team) {
        return;
    }

    return getCleanup(
        useTeamCards(team),
        useTeamPopup(team),
        useTeamScrollbar(team),
    );
};
