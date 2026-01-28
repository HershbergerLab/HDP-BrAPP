import React, { useState } from "react"
import { Filters } from "./DataUpload"

interface FilterProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const Filter: React.FC<FilterProps> = ({filters, setFilters}: FilterProps) => {
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value === "" ? undefined : String(value),
        }));
    };

    return (
        <div className = "filter-container">
            <h3 className="filter-title">Gene Filtering</h3>
            <p className="filter-subtitle">
                Choose which genes to keep or remove from analysis.
            </p>

            <div className="filter-group">
                <label className="filter-label">
                Keep Gene IDs
                <span className="filter-hint">One per line</span>
                </label>
                <textarea
                name="keepGenes"
                value={filters.keepGenes ?? ""}
                onChange={handleFormChange}
                placeholder="TP53\nBRCA1\nMYC"
                rows={3}
                />
            </div>

            <div className="filter-group">
                <label className="filter-label">
                Drop Gene IDs
                <span className="filter-hint">One per line</span>
                </label>
                <textarea
                name="dropGenes"
                value={filters.dropGenes ?? ""}
                onChange={handleFormChange}
                placeholder="GAPDH\nACTB"
                rows={3}
                />
            </div>

            <div className="filter-grid">
                <div className="filter-group">
                <label className="filter-label">Minimum Mean Expression</label>
                <input
                    type="number"
                    name="minMeanExpression"
                    value={filters.minMeanExpression ?? 0}
                    onChange={handleFormChange}
                    min={0}
                    step={0.01}
                />
                </div>

                <div className="filter-group">
                <label className="filter-label">Minimum Variance</label>
                <input
                    type="number"
                    name="minVariance"
                    value={filters.minVariance ?? 0}
                    onChange={handleFormChange}
                    min={0}
                    step={0.01}
                />
                </div>
            </div>
        </div>
    )
}

export default Filter;