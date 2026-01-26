import numpy as np
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

def run_pca(df, min_mean, min_variance):
    min_mean = float(min_mean)

    gene_cols = df.drop(["sample_name", "device_id", "comments"], axis=1)
    selected_cols = gene_cols.columns[gene_cols.mean() >= min_mean]
    df_filtered = gene_cols[selected_cols]

    X = df_filtered.select_dtypes(include="number")

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    pca = PCA()
    X_pca = pca.fit_transform(X_scaled)
    print (X_pca)
    n_pcs = X_pca.shape[1]
    pca_labels = [f"PC{i+1}" for i in range(n_pcs)]

    results = {
        "pca": {
            "pca_labels": pca_labels,
            "samples": df_filtered.columns.tolist(),
            "scores": X_pca.tolist(),
            "explained_variance": pca.explained_variance_ratio_.tolist(),
        }
    }

    print ("pca results", results)

    return results
