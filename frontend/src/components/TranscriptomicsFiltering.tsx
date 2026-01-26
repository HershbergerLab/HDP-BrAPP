import React, { useState } from "react"
import { Filters } from "./DataUpload"

interface FilterProps {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const Filter: React.FC<FilterProps> = ({filters, setFilters}: FilterProps) => {
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value === "" ? undefined : String(value),
        }));
    };

    return (
        <div className="mx-auto mt-6 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-6 h-500 w-50">
            <form>
                <label>Keep Gene IDs (one per line)</label>
                <input type="text" name="keepGenes" value={filters.keepGenes ?? ""} onChange={handleFormChange} />
                <label>Drop Gene IDs (one per line)</label>
                <input type="text" name="dropGenes" value={filters.dropGenes ?? ""} onChange={handleFormChange} />
                <label>Minimum Mean Expression</label>
                <input type="number" name="minMeanExpression" value={filters.minMeanExpression ?? "0"} onChange={handleFormChange} />
                <label>Minimum Variance</label>
                <input type="number" name="minVariance" value={filters.minVariance ?? "0"} onChange={handleFormChange} />
            </form>
        </div>
    )
}

export default Filter;