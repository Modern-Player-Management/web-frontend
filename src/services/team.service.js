import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api-mpm.herokuapp.com/';

class TeamService {

    getTeams() {
        return axios.get(API_URL + 'api/Teams', {headers: authHeader()});
    }

    getTeam(teamID) {
        return axios.get(API_URL + 'api/Teams/'+teamID, {headers: authHeader()});
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
        return axios.delete(API_URL + 'api/Teams/' + teamID, {
                headers: authHeader(),
            }
        )
            ;
    }

    updateTeam(teamID, data) {
        console.log(teamID, data);
        return axios.put(API_URL + 'api/Teams/' + teamID, data, {
                headers: authHeader(),
            }
        )
            ;
    }

    getImageTeam(teamID) {
        return axios.get(API_URL + 'api/Files/' + teamID, {
            responseType: 'arraybuffer',
            headers: authHeader(),
        })
            .then(response => new Buffer(response.data, 'binary').toString('base64'))
            ;
    }
}

export default new TeamService();
