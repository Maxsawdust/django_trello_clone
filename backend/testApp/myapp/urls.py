from django.urls import path
from .views import task_views, project_views

urlpatterns = [
    path("tasks/add/", task_views.add_task, name="add_task"),
    path("tasks/get/", task_views.get_tasks, name="get_tasks"),
    path("tasks/delete/<int:task_id>/", task_views.delete_task, name="delete_task"),
    path("projects/add/", project_views.add_project, name="add_project"),
    path("projects/get/", project_views.get_projects, name="get_projects"),
    path("projects/delete/<int:project_id>/", project_views.delete_project, name="delete_project")
]
