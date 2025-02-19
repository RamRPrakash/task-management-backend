Register :

https://task-management-backend-v1.onrender.com/api/auth/register

{
"name": "root",
"email": "root@example.com",
"password": "root"
}

Login
POST https://task-management-backend-v1.onrender.com/api/auth/login
{
"email": "root@example.com",
"password": "root"
}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I0NTQxYTJhZDA4NDEzYzA2ODMyMjkiLCJpYXQiOjE3Mzk4NzEzNTksImV4cCI6MTczOTg3NDk1OX0.iVKaU-h8qNNyOQ_4BdUnUMv_6Jxy6JTD5OZP_I35dYg

Add task:

POST https://task-management-backend-v1.onrender.com/api/tasks

{
"title": "Complete Backend Deployment",
"description": "Deploy backend on Render and test APIs",
"dueDate": "2025-02-20"
}

get Task:
GET https://task-management-backend-v1.onrender.com/api/tasks

update task
PUT https://task-management-backend-v1.onrender.com/api/tasks/{taskId}

{
"title": "Deploy Backend on Render",
"description": "Successfully deployed and tested APIs",
"status": "completed"
}

delete task
DELETE https://task-management-backend-v1.onrender.com/api/tasks/{taskId}
