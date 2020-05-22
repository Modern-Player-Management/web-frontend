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

    addPlayerToTeam(teamID, playerName) {

        console.log(getPlayerID(playerName));

        return axios.post(API_URL + 'api/Teams/' + teamID + '/player/' + getPlayerID(playerName), {}, {
                headers: authHeader(),
            }
        )
            ;
    }

    removePlayerToTeam(teamID, playerName) {
        return axios.delete(API_URL + 'api/Teams/' + teamID + '/player/' + playerName, {
                headers: authHeader(),
            }
        )
            ;
    }
}

function getPlayerID(playerName) {
    axios.get(API_URL + 'api/Users/' + playerName, {headers: authHeader()})
        .then(response => {
            this.response = response.data
            console.log(this.response.id)
            return this.response.id
        })
}

export default new UserService();
