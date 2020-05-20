import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api-mpm.herokuapp.com/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }

    getTeamsBoard() {
        return axios.get(API_URL + 'api/Teams', {headers: authHeader()});
    }

    createTeams(data) {
        return axios.post(API_URL + 'api/Teams', {name: data}, {
                headers: authHeader(),
            }
        )
            ;
    }

    addMemberToTeam(teamID, memberName) {
        return axios.post(API_URL + 'api/Teams/'+teamID+'/player', {username: memberName}, {
                headers: authHeader(),
            }
        )
            ;
    }
}

export default new UserService();
