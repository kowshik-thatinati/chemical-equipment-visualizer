from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import pandas as pd
from .models import Dataset
from .serializers import DatasetSerializer, DatasetHistorySerializer

class HistoryView(ListAPIView):
    serializer_class = DatasetHistorySerializer
    
    def get_queryset(self):
        # Returns the last 5 uploaded datasets in reverse chronological order
        return Dataset.objects.all().order_by('-uploaded_at')[:5]

class UploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file_serializer = DatasetSerializer(data=request.data)
        if file_serializer.is_valid():
            dataset = file_serializer.save()
            
            # Process the file
            try:
                file_path = dataset.file.path
                df = pd.read_csv(file_path)
                
                # Validation: Check columns
                required_columns = {'Equipment Name', 'Type', 'Flowrate', 'Pressure', 'Temperature'}
                if not required_columns.issubset(df.columns):
                    dataset.delete() # Invalid file, don't keep it
                    return Response(
                        {"error": f"Missing columns. Required: {required_columns}"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Handle empty dataset
                if df.empty:
                    stats = {
                        "total_equipment_count": 0,
                        "average_flowrate": 0,
                        "average_pressure": 0,
                        "average_temperature": 0,
                        "equipment_type_distribution": {}
                    }
                    return Response(stats, status=status.HTTP_201_CREATED)

                # Calculations
                distribution = df['Type'].value_counts().to_dict()
                # Ensure values are standard Python ints (not numpy types) for JSON serialization
                distribution = {k: int(v) for k, v in distribution.items()}

                stats = {
                    "total_equipment_count": int(len(df)),
                    "average_flowrate": round(float(df['Flowrate'].mean()), 2),
                    "average_pressure": round(float(df['Pressure'].mean()), 2),
                    "average_temperature": round(float(df['Temperature'].mean()), 2),
                    "equipment_type_distribution": distribution
                }
                
                return Response(stats, status=status.HTTP_201_CREATED)

            except Exception as e:
                dataset.delete() # Error processing, don't keep
                return Response({"error": f"Error processing CSV: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
