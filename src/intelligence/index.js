import { useIntelligencePosts } from "../media/posts";
import { useMediaNumbers } from "../media/numbers";
import { useMediaTabs } from "../media/tabs";
import { getCleanup } from "../common/helpers";

export const useIntelligencePageScripts = () => {
    return getCleanup(
        useIntelligencePosts(),
        useMediaNumbers(),
        useMediaTabs(),
    );
};

export { useIntelligencePageScripts as usePageScripts };
