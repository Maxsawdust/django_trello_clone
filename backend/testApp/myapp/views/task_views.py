from django.shortcuts import render, HttpResponse
from django.http import HttpRequest, JsonResponse
from django.db import IntegrityError
from ..models import Task
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
# Views are controllers from express

# function to post data
@csrf_exempt
def add_task(request: HttpRequest):
  if request.method == "POST": # check request method
    try:
      # parse the data to json from body
      data: dict = json.loads(request.body)
    except Exception as e:
      return HttpResponse(f"Invalid JSON: {str(e)}", status=400)
    
    task_data = {
      "id": data.get("id"),
      "title": data.get("title"),
      "content": data.get("content"),
      "status": data.get("status"),
      "project_id": data.get("project_id")
    }

    try:
      Task.objects.create(**task_data)
      # send a successful response
      return HttpResponse("Task created", status=201)
    except IntegrityError:
      return HttpResponse("Database error: duplicate or invalid data", status=400)
    except Exception as e:
      return HttpResponse(f"Error: {str(e)}", status=500)

  else: # return err if method isn't POST
    return HttpResponse("Error, invalid request", status=401)
  

# function to get data
def get_tasks(request:HttpRequest):
  if request.method == "GET":
    tasks = Task.objects.all().values()
    return JsonResponse({"tasks": list(tasks)}, status=200)
  else:
    return HttpResponse("Error, invalid request", status=401)
  
# function to delete data
@csrf_exempt
def delete_task(request:HttpRequest, task_id: int): # task_id is accessed from the params in URL
  if request.method == "DELETE":
    task: Task = get_task_by_id(task_id)

    if task == None: 
      return HttpResponse("Error, task not found", status=404)

    try:
      task.delete()
      return HttpResponse("Task successfully deleted", status=200)
    except Exception as e:
      return HttpResponse(f"Error: {str(e)}", status=500)
    
  else:
    return HttpResponse("Error, invalid request", status=401)
  

# helper function to get task object by id
def get_task_by_id(task_id):
  try:
    return Task.objects.get(id=task_id)
  except Task.DoesNotExist:
    return None
  


