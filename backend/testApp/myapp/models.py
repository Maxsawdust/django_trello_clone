from django.db import models

# Create your models here.
class Task(models.Model):
  title = models.CharField(max_length=20)
  content = models.CharField(max_length=100)
  status = models.CharField()
  project_id = models.FloatField(null=True, blank=True)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


class Project(models.Model):
  title = models.CharField(max_length=20)
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)


