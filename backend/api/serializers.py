from rest_framework import serializers
from .models import Dataset
import os

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ['id', 'file', 'uploaded_at']

class DatasetHistorySerializer(serializers.ModelSerializer):
    dataset_name = serializers.SerializerMethodField()

    class Meta:
        model = Dataset
        fields = ['id', 'dataset_name', 'uploaded_at']

    def get_dataset_name(self, obj):
        return os.path.basename(obj.file.name)
