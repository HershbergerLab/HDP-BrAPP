import Form from 'react-bootstrap/Form';
import axios from "axios";
import React, { useState } from "react";
import FileUpload from './FileUpload';
import Filter from './TranscriptomicsFiltering'

export interface Filters {
    keepGenes?: string;
    dropGenes?: string;
    minMeanExpression?: number;
    minVariance?: number;
}

const Upload = () => {
    const [matrixFile, setMatrixFile] = useState<File | null>(null);
    const [metadataFile, setMetaDataFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<Filters>({
        keepGenes: undefined,
        dropGenes: undefined,
        minMeanExpression: undefined,
        minVariance: undefined,
    });

    const onFileUpload = async () => {
        if (!matrixFile || !metadataFile) {
            setError("Both files are required");
            return;
        }

        setError(null);
        setLoading(true);

        const formData = new FormData();
        formData.append("matrix", matrixFile);
        formData.append("metadata", metadataFile);
        formData.append("filters", JSON.stringify(filters));

        try {
            await axios.post("http://localhost:8000/api/transcriptomics/analyze/", formData, { 
                headers: { "Content-Type": "multipart/form-data" } } );
        } catch (err) {
            setError("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="mx-auto mt-6 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 h-500 w-50">
        <h2>Upload Transcriptomics Data</h2>
        <h3>Upload Expression Matrix (csv)</h3>
        <FileUpload label={'Expression Matrix File'} onFileSelect={setMatrixFile}/>
        <h3>Upload Gene Metadata</h3>
        <FileUpload label={'Gene Metadata File'} onFileSelect={setMetaDataFile} />
        <Filter filters={filters} setFilters={setFilters}/>
        <button onClick={onFileUpload} disabled={!matrixFile || !metadataFile || loading}>{loading ? "Uploading..." : "Upload"}</button>
        </div>
    );
};

export default Upload;