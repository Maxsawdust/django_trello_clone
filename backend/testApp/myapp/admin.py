from django.contrib import admin
from .models import Task, Project

# Register your models here.
admin.site.register(Task) # registering the Task as a model - will be viewable on admin panel and recognized by DB
admin.site.register(Project)