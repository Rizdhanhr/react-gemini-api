import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button } from "@mui/material";
import { useState } from "react";

export default function AlertDialog({ open = false, onClose, result }) {
 

    return (
        <>
            <Dialog maxWidth="lg"  // Pilih ukuran yang sesuai
                fullWidth open={open} onClose={onClose}>
                <DialogTitle>Generative AI Result</DialogTitle>
                <DialogContent>
                    <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', maxHeight: '60vh', overflowY: 'auto' }}>
                        {result}
                    </pre>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}