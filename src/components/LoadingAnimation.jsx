import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";
export default function LoadingAnimation({open}) {
    return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
            <CircularProgress color="inherit" />
            </Backdrop>
        </>
    )
}