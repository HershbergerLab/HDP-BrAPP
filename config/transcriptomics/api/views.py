import pandas as pd
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sklearn.decomposition import PCA

@api_view(["POST"])
def analyze(request):
    metadata_file = request.FILES.get("metadata")
    matrix_file = request.FILES.get("matrix")

    if not metadata_file:
        return Response({"error": "No metadata file uploaded"}, status=400)
    
    if not matrix_file:
        return Response({"error": "No matrix file uploaded"})
    
    matrix_df = pd.read_csv(matrix_file)
    metadata_df = pd.read_csv(metadata_file)

    results = {
        "matrix columns": list(matrix_df.columns),
        "metadata columns": list(metadata_df.columns),
    }

    print(results)
    return Response(results)
