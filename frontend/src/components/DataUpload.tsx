import Form from 'react-bootstrap/Form';
import axios from "axios";
import React, { useState } from "react";
import FileUpload from './FileUpload';
import Filter from './TranscriptomicsFiltering'
import Dashboard, { PcaResponse } from './PCADataDashboard'

export interface Filters {
    keepGenes?: string;
    dropGenes?: string;
    minMeanExpression?: number;
    minVariance?: number;
}

interface PcaProps {
    onGetData: (data: PcaResponse) => void;
}

const Upload = ({onGetData}: PcaProps) => {
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
            const res = await axios.post("http://localhost:8000/api/transcriptomics/analyze/", formData, { headers: { "Content-Type": "multipart/form-data" } } );
            const data = await res.data;
            console.log("response", data);
            onGetData(data);            
        } catch (err) {
            setError("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="upload-container">
            <h2 className="upload-title">Upload Transcriptomics Data</h2>
            <p className="upload-subtitle">
                Upload your expression matrix and gene metadata to run PCA analysis.
            </p>
            <div className="upload-section">
                <label className="upload-label">Expression Matrix (CSV)</label>
                <FileUpload label={'Expression Matrix File'} onFileSelect={setMatrixFile}/>
            </div>

            <div className="upload-section">
                <label className="upload-label">Gene Metadata</label>
                <FileUpload label={'Gene Metadata File'} onFileSelect={setMetaDataFile}/>
            </div>

        <div className="divider" />

        <Filter filters={filters} setFilters={setFilters} />

        <button className="upload-button" onClick={onFileUpload} disabled={!matrixFile || !metadataFile || loading} >
            {loading ? "Loading...": "Run PCA Analysis"}
        </button>
    
        
        </div>
    );
};

export default Upload;