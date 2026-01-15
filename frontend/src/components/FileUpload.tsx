import { useState } from "react";
import axios from "axios";
import Upload from './DataUpload';

interface FileUploadProps {
    label: string;
    onFileSelect: (file: File | null) => void;
}
const FileUpload: React.FC<FileUploadProps> = ({ label, onFileSelect }: FileUploadProps) => {

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        onFileSelect(file);
    };

    return (
        <div>
            <h3>{label}</h3>
            <input type="file" onChange={onFileChange} />
        </div>
    );
};

export default FileUpload;