import React from "react";
import Layouts from "../layouts/Main";
import { Box, Input, Button, Stack, Typography } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import AlertDialog from "../../components/AlertDialog";

export default function ImagesIndex() {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false); // Mengontrol state dialog di dalam komponen ini

    async function uploadImage(e) {
        try {
            setLoading(true);
            const file = e.target.files[0];
            const validate = await validateForm(file);
            if (!validate) {
                return alert('Invalid Image Format');
            }
            const imageUrl = URL.createObjectURL(file);
            
            setImage(imageUrl);
            const base64Image = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
            const base64Data = base64Image.split(",")[1];
            const parts = [
            { text: "Deskripsikan gambar ini." },
                {
                    inlineData: {
                    mimeType: file.type,
                    data: base64Data,
                    },
                },
            ];
            const response = await model.generateContent(parts);
            setResult(response.response.text());
            setDialogOpen(true);
           
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }


    async function validateForm(images) {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        return allowedTypes.includes(images.type);
    }
     
    const handleCloseDialog = () => {
        setDialogOpen(false); // Menutup dialog
    };

    return (
        <>
            <Layouts loading={loading}>
                <h1>Gemini AI Image Detector</h1>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '20px' }}>
                     <Stack direction="row" spacing={2} alignItems="center">
                        <Button variant="contained" component="label">
                            UPLOAD IMAGE
                            <Input onChange={(e) => uploadImage(e)} type="file" sx={{ display: 'none' }} />
                        </Button>
                    </Stack>
                </Box>
                {image && (
                    <Box mt={2}>
                        <Typography variant="subtitle1">Preview:</Typography>
                        <img 
                            src={image} 
                            alt="Uploaded" 
                            style={{ width: "300px", borderRadius: "8px", marginTop: "10px" }}
                        />
                    </Box>
                )}
                <AlertDialog result={result} open={dialogOpen} onClose={handleCloseDialog}  />
            </Layouts>
        </>
    )
}