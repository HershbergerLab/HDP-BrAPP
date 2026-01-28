import React, { useState } from "react"
import "../App.css"
import Upload from './DataUpload'
import PlotPCA from './PCAPlot'

export interface PcaResponse{
    pcaData: any;
}

const Dashboard = () => {
    const [pcaData, setPCAData] = useState<PcaResponse | null>(null);

    return (
        <div className="content">
            <div className="card upload">
                <Upload onGetData={setPCAData} />
            </div>
            <div className="card pca-graph">
                <PlotPCA pcaData={pcaData} />
            </div>
            
        </div>
    )
}

export default Dashboard;
