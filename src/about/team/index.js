import { getCleanup } from "../../common/helpers";

import { useTeamPopup } from "./popup";
import { useTeamScrollbar } from "./scrollbar";

export const useTeam = () => {
    const team = document.querySelector('.team');
    if (!team) {
        return;
    }

    return getCleanup(
        useTeamPopup(team),
        useTeamScrollbar(team),
    );
};
