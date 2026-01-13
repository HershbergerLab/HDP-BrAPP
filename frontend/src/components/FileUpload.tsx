import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
    };

    const onFileUpload = () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append("testFile", selectedFile, selectedFile.name);

        axios.post("api/uploadfile", formData);
    };

    const fileData = () => {
        if (selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {selectedFile.name}</p>
                    <p>File Type: {selectedFile.type}</p>
                </div>
            );
        }

        return (
            <div>
                <br />
                <h4></h4>
            </div>
        );
    };

    return (
        <div>
            <h3>File Upload</h3>
            <input type="file" onChange={onFileChange} />
            {fileData()}
        </div>
    );
};

export default FileUpload;