from django.urls import path
from .views import UploadView, HistoryView

urlpatterns = [
    path('upload/', UploadView.as_view(), name='file-upload'),
    path('history/', HistoryView.as_view(), name='dataset-history'),
]
