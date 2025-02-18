const request = require('supertest');
const app = require('../server'); // Import the server (Express app)

describe('Task API', () => {
    let token;

    beforeAll(async () => {
        // Register and login a user to get a valid token
        const registerResponse = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'testuser@example.com',
                password: 'password123',
            });

        const loginResponse = await request(app)
            .post('/api/users/login')
            .send({
                email: 'testuser@example.com',
                password: 'password123',
            });

        token = loginResponse.body.token; // Extract token
    });

    it('should create a new task', async () => {
        const response = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Task',
                description: 'This is a test task',
                dueDate: '2025-12-31',
            });

        expect(response.status).toBe(201); // Created
        expect(response.body.title).toBe('Test Task');
    });

    it('should fetch all tasks', async () => {
        const response = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200); // OK
        expect(Array.isArray(response.body)).toBe(true);
    });
});
