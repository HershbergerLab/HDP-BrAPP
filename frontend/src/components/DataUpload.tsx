import Form from 'react-bootstrap/Form';
import axios from "axios";
import React, { useState } from "react";
import FileUpload from './FileUpload';

export default function Upload() {
    return(
        <div className="mx-auto mt-6 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 h-500 w-50">
        <h2>Upload Transcriptomics Data</h2>
        <h3>Upload Expression Matrix (csv)</h3>
        <FileUpload />
        <h3>Upload Gene Metadata</h3>
        <FileUpload />
        </div>
    )
}