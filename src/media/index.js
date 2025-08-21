import { useMediaPosts } from "./posts";
import { useEvents } from "./events";
import { usePastEvents } from "./pastEvents";
import { useExternalMedia } from "./externalMedia";
import { useMediaNumbers } from "./numbers";

import { getCleanup } from "../common/helpers";

export const useMediaPageScripts = () => {
    return getCleanup(
        useMediaPosts(),
        useMediaNumbers(),
        useEvents(),
        usePastEvents(),
        useExternalMedia(),
    );
};
