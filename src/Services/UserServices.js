import axios from 'axios';

const API_URL = 'https://placement-assistant-system.onrender.com/api/user';

class UserService {
    getusers() {
        return axios.get(API_URL); // Fetch all users
    }

    getStudent(id) {
        return axios.get(`${API_URL}/${id}`); // Fetch student by ID
    }

    getBatchOfStudents(email) {
        return axios.get(`${API_URL}/batchByEmail/${email}`); // Fetch all students by batch
    }
    addStudent(student) {
        return axios.post(API_URL, student); // Add a new student
    }

    updateStudent(id, student) {
        return axios.put(`${API_URL}/${id}`, student); // Update student
    }

    deleteStudent(id) {
        return axios.delete(`${API_URL}/${id}`); // Delete student by ID
    }
}

export default new UserService();
