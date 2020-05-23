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

    getPlayerID(playerName) {
        return axios.get(API_URL + 'api/Users/' + playerName, {
                headers: authHeader(),
            }
        )
            ;
    }
}

export default new UserService();
