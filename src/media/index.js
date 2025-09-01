import { useMediaPosts, useIntelligencePosts } from "./posts";
import { useEvents } from "./events";
import { usePastEvents } from "./pastEvents";
import { useExternalMedia } from "./externalMedia";
import { useMediaNumbers } from "./numbers";
import { useMediaTabs } from "./tabs";

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

export const useIntelligencePageScripts = () => {
    return getCleanup(
        useIntelligencePosts(),
        useMediaNumbers(),
        useMediaTabs(),
    );
};
