import axios from 'axios'

const TASK_API_BASE_URL = 'http://localhost:8080/tasks'

const TASKSTAUS_API_BASE_URL = 'http://localhost:8080/taskStatus'

class TaskService{
    getTasks(){
        return axios.get(TASK_API_BASE_URL)
    }

    getTaskStatus(){
        return axios.get(TASKSTAUS_API_BASE_URL)
    }
}

export default new TaskService()