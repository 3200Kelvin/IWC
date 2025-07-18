import { getCleanup } from "../common/helpers";

import { useStory } from "./story";
import { useTeam } from "./team";

// import './cta/style.scss';

export const useAboutPageScripts = () => {
    return getCleanup(
        useStory(),
        useTeam()
    );
};