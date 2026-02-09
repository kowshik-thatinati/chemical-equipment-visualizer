from django.db import models
import os

class Dataset(models.Model):
    file = models.FileField(upload_to='datasets/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def delete(self, *args, **kwargs):
        # Clean up file on delete
        if self.file:
            if os.path.isfile(self.file.path):
                os.remove(self.file.path)
        super().delete(*args, **kwargs)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Keep only 5 most recent datasets
        # We order by uploaded_at descending (newest first)
        datasets = Dataset.objects.all().order_by('-uploaded_at')
        if datasets.count() > 5:
            for dataset in datasets[5:]:
                dataset.delete()

    def __str__(self):
        return f"Dataset {self.id} uploaded at {self.uploaded_at}"
