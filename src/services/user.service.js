import axios from 'axios';
import authHeader from './auth-header';
import authService from './auth.service';

const API_URL = 'https://api-mpm.herokuapp.com/';

class UserService {
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
        return axios.delete(API_URL + 'api/Teams/' + teamID, {
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

    updateTeam(teamID, data) {
        console.log(teamID, data);
        return axios.put(API_URL + 'api/Teams/' + teamID, data, {
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


    updateUser(data) {
        return axios.put(API_URL + 'api/Users/' + authService.getCurrentUser().id, data, {
                headers: authHeader(),
            }
        )
            ;
    }

    updateIcal(icalSecret) {
        return axios.get(API_URL + 'api/Events/ical/' + icalSecret, {
            responseType: 'blob',
            headers: authHeader(),

        }).then(response => {
            console.log(response.data);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'calendar.ics');
            document.body.appendChild(link);
            link.click()
            ;
        });
    }

    getImageTeam(teamID) {
        return axios.get(API_URL + 'api/Files/' + teamID, {
            responseType: 'arraybuffer',
            headers: authHeader(),
        })
            .then(response => new Buffer(response.data, 'binary').toString('base64'))
            ;
    }

    fileUpload(file,teamID) {
        const data = new FormData()
        data.append('file', file)

        return axios.post(API_URL + 'api/Files/', data, {
            headers: authHeader()
        }).then(response => this.updateTeam(teamID, {image:response.data.id}));
            ;
    }
}

export default new UserService();
