import axios from 'axios';
import authHeader from './auth-header';
import authService from './auth.service';

const API_URL = 'https://api-mpm.herokuapp.com/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', {headers: authHeader()});
    }

    getTeams() {
        return axios.get(API_URL + 'api/Teams', {headers: authHeader()});
    }

    createTeams(name, description) {
        return axios.post(API_URL + 'api/Teams', {name: name, description: description}, {
                headers: authHeader(),
            }
        )
            ;
    }

    addPlayerToTeam(teamID, playerID) {
        return axios.post(API_URL + 'api/Teams/' + teamID + '/player/' + playerID, {}, {
                headers: authHeader(),
            }
        )
            ;
    }

    removePlayerToTeam(teamID, playerID) {
        return axios.delete(API_URL + 'api/Teams/' + teamID + '/player/' + playerID, {
                headers: authHeader(),
            }
        )
            ;
    }

    removeTeam(teamID) {
        return axios.delete(API_URL + 'api/Teams/' + teamID , {
                headers: authHeader(),
            }
        )
            ;
    }

    getPlayer(playerName) {
        return axios.get(API_URL + 'api/Users/' + playerName, {
                headers: authHeader(),
            }
        )
            ;
    }

    updateTeam(teamID, name, description) {
        return axios.put(API_URL + 'api/Teams/'+teamID, {name: name, description: description}, {
                headers: authHeader(),
            }
        )
            ;
    }

    getProfile() {
        return axios.get(API_URL + 'api/Users/profile/', {
                headers: authHeader(),
            }
        )
            ;
    }

    updateUser(data){
        return axios.put(API_URL + 'api/Users/'+authService.getCurrentUser().id, data, {
                headers: authHeader(),
            }
        )
            ;
    }


}

export default new UserService();
