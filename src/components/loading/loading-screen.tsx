"use-client"

import { LoadingOverlay } from "@mantine/core";
import { LoadingComponent } from "./loading";

export const LoadingScreen = () => {
    const isLoading = false;

    return (
        <>
            <LoadingOverlay visible={isLoading} loaderProps={{ children: <LoadingComponent /> }} />

        </>
    )
}