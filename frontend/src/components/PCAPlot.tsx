import React, { useState } from "react"
import Dashboard, { PcaResponse } from './PCADataDashboard'
import Plot from "react-plotly.js"

interface PcaProps {
    pcaData: PcaResponse | null;
}

const PlotPCA = ({pcaData}: PcaProps) => {
    const [pcX, setPcX] = useState<string >("");
    const [pcY, setPcY] = useState<string>("");

    if (!pcaData) {
        return <div>No PCA data</div>;
    }
    const json_string = JSON.stringify(pcaData);

    const jsonObj = JSON.parse(json_string);

    const scores = jsonObj.pca.scores;
    const samples = jsonObj.pca.samples;
    const pcaLabels = jsonObj.pca.pca_labels;
    const explainedVariance = jsonObj.pca.explained_variance;

    return(
        <div>
            <h3>Graph</h3>
            <div className="axis-controls">
            <h3 className="axis-title">Graph Axes</h3>

            <div className="axis-row">
                <label className="axis-label">X Axis</label>
                <div className="select-wrapper">
                <select
                    value={pcX}
                    onChange={(e) => setPcX(String(e.target.value))}
                >
                    {pcaLabels.map((label: string, index: number) => (
                    <option key={label} value={index}>
                        {label}
                    </option>
                    ))}
                </select>
                </div>
            </div>

            <div className="axis-row">
                <label className="axis-label">Y Axis</label>
                <div className="select-wrapper">
                <select
                    value={pcY}
                    onChange={(e) => setPcY(String(e.target.value))}
                >
                    {pcaLabels.map((label: string, index: number) => (
                    <option key={label} value={index}>
                        {label}
                    </option>
                    ))}
                </select>
                </div>
            </div>
            </div>
            <div style={{ width: "100%", height: "500px" }}>
                <Plot
                    data={[
                        {
                            x: scores.map((r: number[]) => r[0]),
                            y: scores.map((r: number[]) => r[1]),
                            text: samples,
                            mode: "markers",
                            type: "scatter",
                            hovertemplate:
                                "%{text}<br>" +
                                "PC1: %{x:2f}<br>" +
                                "PC2: %{x:2f}<extra></extra>"
                        }
                    ]}
                    layout={{
                        autosize: true,
                        title: {text: "PCA Plot"},
                        xaxis: {
                            title: {text: `PC1 (${(explainedVariance[0] * 100 ).toFixed(1)}%)`}
                        },
                        yaxis: {
                            title: {text: `PC2 (${(explainedVariance[1] * 100).toFixed(1)}%)`}
                        },
                        margin: { l:50, r: 20, t:30, b:50} 
                    }}
                    useResizeHandler
                    style={{width: "100%", height: "100%" }}
                />
            </div>
        </div>
    )
}

export default PlotPCA;