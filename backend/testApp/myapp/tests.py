from django.test import TestCase
from django.urls import reverse
from .models import Task
import json

# Create your tests here.

class TaskModelTest(TestCase):
    def test_create_task(self):
        # Create a Task object directly using the ORM
        task = Task.objects.create(title="Test", content="Test content", status="todo")
        # Assert that the title of the created task is as expected
        self.assertEqual(task.title, "Test")

class TaskViewTest(TestCase):
    def test_add_task_view(self):
        # Prepare the data to send in the POST request as a Python dict
        data = {
            "title": "Test",
            "content": "Test content",
            "status": "todo"
        }
        # Convert the Python dict to a JSON string for the request body
        json_data = json.dumps(data)
        # Send a POST request to the add_task endpoint
        # The URL is '/tasks/' as defined in myapp/urls.py
        response = self.client.post(
            "/tasks/add/",  # URL for the add_task view
            data=json_data,  # JSON string as the request body
            content_type="application/json"  # Specify content type as JSON
        )
        # Assert that the response status code is 201 (Created)
        self.assertEqual(response.status_code, 201)
        # Assert that a Task object with the given title now exists in the database
        self.assertTrue(Task.objects.filter(title="Test").exists())

    def test_get_tasks_view(self):
        # Create a Task object in the test database
        Task.objects.create(title="Test", content="Test content", status="todo")
        # Send a GET request to the get_tasks endpoint
        # The URL is '/tasks/' as defined in myapp/urls.py
        response = self.client.get("/tasks/get/")
        # Assert that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)
        # Parse the JSON response content
        data = response.json()
        # Assert that the response contains a 'tasks' key
        self.assertIn("tasks", data)
        # Assert that the list of tasks is not empty
        self.assertGreater(len(data["tasks"]), 0)
        # Assert that the first task's title matches what we created
        self.assertEqual(data["tasks"][0]["title"], "Test")

    def test_delete_task_view(self):
        # create a task to delete
        Task.objects.create(title="Test", content="Test content", status="todo") #should have id 1
        # send DELETE req to /tasks/delete/1/
        response = self.client.delete("/tasks/delete/1/")
        self.assertEqual(response.status_code, 200)
        self.assertFalse(Task.objects.filter(title="Test").exists())