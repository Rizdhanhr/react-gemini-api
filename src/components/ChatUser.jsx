import React from "react";
import { Box,Paper, Typography } from "@mui/material";

export default function ChatUser({ response }) {
    return (
        <>
             <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginBottom: '10px',
                    }}
                >
                    <Paper
                        sx={{
                            padding: '10px 15px',
                            borderRadius: '0 20px 20px 20px',
                            backgroundColor: 'white',
                            maxWidth: '70%',
                        }}
                    >
                        <Typography variant="body2">{response}</Typography>
                    </Paper>
                </Box>
        </>
    )
}
