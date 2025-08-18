import { useMediaPosts } from "./posts";
import { useEvents } from "./events";
import { usePastEvents } from "./pastEvents";
import { useExternalMedia } from "./externalMedia";

import { getCleanup } from "../common/helpers";

export const useMediaPageScripts = () => {
    return getCleanup(
        useMediaPosts(),
        useEvents(),
        usePastEvents(),
        useExternalMedia(),
    );
};
