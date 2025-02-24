import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Layouts from "../layouts/Main";

export default function GeneratorIndex() {
    const [text, setText] = useState("");
    const [error, setError] = useState([]);
    const [chat, setChat] = useState([]);
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const [loading, setLoading] = useState(false);

    async function setForm() {
        try {
            setLoading(true);
            const validate = await validateForm();
            if (!validate) {
                return;
            }
            setChat([
                ...chat, { type: 0, res: text }
            ]);
            const result = await model.generateContent(text);
            setChat(prevChat => [...prevChat, { type: 1, res: result.response.text() }])
        } catch (error) {
            setChat(prevChat => [...prevChat, { type: 1, res: error }])
        } finally {
            setText("");
            setLoading(false);
        }
    }

    async function validateForm() {
        var isValidate = true;
        var errors = {}
        const isValidText = text.trim() !== "";

        if (!isValidText) {
            errors['text'] = "Text field is required."
        }

        setError(errors);
        if(Object.keys(errors).length > 0){
           isValidate = false;
        }

        return isValidate;
    }

    return (
        <>
            <Layouts loading={loading}>
                <h1>Gemini AI Image Generator</h1>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop:'20px' }}>
                    <TextField
                        id="chat-input"
                        label="CREATE PROMPT"
                        onChange={(e) => setText(e.target.value)}
                        variant="outlined"
                        multiline
                        value={text}
                        rows={4}
                        sx={{ width: '80%' }}
                        error={error.text}
                         helperText={error.text ? error.text : ''}
                    />
                        <Button onClick={() => setForm()} variant="contained" sx={{ width: '15%' }}>
                            SEND
                        </Button>
                </Box>  
                {/* Chat Response */}
                
            </Layouts>
        </>
    )
}