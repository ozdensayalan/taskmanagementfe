import axios from 'axios'

const TEAM_API_BASE_URL = 'http://localhost:8080/employees'

const TITLE_API_BASE_URL = 'http://localhost:8080/titles'

class TeamService{
    getEmployees(){
        return axios.get(TEAM_API_BASE_URL)
    }

    getTitles(){
        return axios.get(TITLE_API_BASE_URL)
    }
}

export default new TeamService()