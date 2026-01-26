import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sklearn.decomposition import PCA
from ..analysis.pca import run_pca
import json

@api_view(["POST"])
def analyze(request):
    metadata_file = request.FILES.get("metadata")
    matrix_file = request.FILES.get("matrix")
    filters_raw = request.POST.get("filters")
    filters = json.loads(filters_raw) if filters_raw else {}
    min_mean_expression = 0
    min_variance = 0

    if not metadata_file:
        return Response({"error": "No metadata file uploaded"}, status=400)
    
    if not matrix_file:
        return Response({"error": "No matrix file uploaded"})
    
    matrix_df = pd.read_csv(matrix_file)
    metadata_df = pd.read_csv(metadata_file)

    if filters:
        drop_columns = filters['dropGenes']
        min_mean_expression = filters['minMeanExpression']
        min_variance = filters['minVariance']

        filtered_df = matrix_df.drop([drop_columns], axis=1)
    else:
        filtered_df = matrix_df

    pca_results = run_pca(filtered_df, min_mean_expression, min_variance)

    return Response(pca_results)

