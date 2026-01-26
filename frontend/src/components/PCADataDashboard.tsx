import React, { useState } from "react"
import Upload from './DataUpload'
import PlotPCA from './PCAPlot'

export interface PcaResponse{
    pcaData: any;
}

const Dashboard = () => {
    const [pcaData, setPCAData] = useState<PcaResponse | null>(null);
    
    return (
        <>
        <Upload onGetData={setPCAData} />
        <PlotPCA pcaData={pcaData} />
        <div>
            <h3></h3>
        </div>
        </>
    )
}

export default Dashboard;
