from django.shortcuts import render, HttpResponse
from django.http import HttpRequest, JsonResponse
from django.db import IntegrityError
from ..models import Project
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def add_project(request: HttpRequest):
  if request.method == "POST":
    try:
      # Parse data from body
      data:dict = json.loads(request.body)
    except Exception as e:
      return HttpResponse(f"Error: {str(e)}", status=400)
    
    project_data = {
      "id": data.get("id"),
      "title": data.get("title")
    }

    try:
      Project.objects.create(**project_data)
      return HttpResponse("Successfully created project", status=201)
    except IntegrityError:
      return HttpResponse("Database error: duplicate or invalid data", status=400)
    except Exception as e:
      return HttpResponse(f"Error: {str(e)}", status=500)
  else: 
    return HttpResponse("Error: Invalid request", status=401)
  
def get_projects(request:HttpRequest):
  if request.method == "GET":
    try:
      projects = Project.objects.all().values()
      return JsonResponse({"projects": list(projects)}, status=200)
    except Exception as e:
      return HttpResponse(f"Error fetching projects: {str(e)}", status=404)
  else:
    return HttpResponse("Error: Invalid request", status=401)
  
@csrf_exempt
def delete_project(request:HttpRequest, project_id:int):
  if request.method == "DELETE":
      project:Project = get_project_by_id(project_id)

      if project == None:
        return HttpResponse("Error: Project not found", status=404)
      
      try:
        project.delete()
        return HttpResponse("Project successfully deleted", status=200)
      except Exception as e:
        return HttpResponse(f"Error deleting project: {str(e)}", status=500)
  else:
    return HttpResponse("Error: Invalid request", status=401)

def get_project_by_id(project_id:int):
  try:
    return Project.objects.get(id=project_id)
  except Project.DoesNotExist:
    return None
  