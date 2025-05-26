from django.db import models

# Create your models here.
class Task(models.Model):
  title = models.CharField(max_length=20)
  content = models.CharField(max_length=100)
  status = models.CharField()
  # Each Task belongs to one Project. 'on_delete=models.CASCADE' means if the project is deleted, its tasks are deleted too.
  project_id = models.FloatField(null=True, blank=True)

class Project(models.Model):
  title = models.CharField(max_length=20)
  # No need for ManyToManyField here; tasks are linked via the ForeignKey in Task.

