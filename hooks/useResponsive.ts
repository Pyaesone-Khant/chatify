"use client";

import { useMediaQuery } from "@mantine/hooks";

export function useResponsive() {

    const isSM = useMediaQuery("(max-width: 640px)");
    const isMD = useMediaQuery("(max-width: 768px)");
    const isLG = useMediaQuery("(max-width: 1024px)");

    return {
        isSM,
        isMD,
        isLG
    }
}
