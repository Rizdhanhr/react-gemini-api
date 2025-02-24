import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatResponse({ response }) {
    const parts = response.split(/(`[\w\W]*?`)/); // Pisahkan kode dan teks
    const isCode = (part) => part.startsWith("```");
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }} >
                <Paper
                    sx={{
                        padding: "10px 15px",
                        borderRadius: "20px 0 20px 20px",
                        backgroundColor: "#e1f5fe",
                        maxWidth: "70%",
                    }}>
                     {parts.map((part, index) => (
                    isCode(part) ? (
                        <SyntaxHighlighter
                            key={index}
                            language={part.includes('javascript') ? 'javascript' : part.includes('python') ? 'python' : 'text'}
                            style={dracula}
                        >
                            {part.replace(/`(javascript|python)?/, '').replace(/`/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <Typography key={index} variant="body2">{part}</Typography>
                    )
                ))}
                </Paper>
            </Box>
     </>
 ) 
}
