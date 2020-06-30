import axios from 'axios';
import authHeader from './auth-header';
import authService from './auth.service';
import teamService from './team.service';

const API_URL = 'https://api-mpm.herokuapp.com/';

class UserService {

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

    fileUpload(file,teamID) {
        const data = new FormData()
        data.append('file', file)

        console.log(file, teamID);

        return axios.post(API_URL + 'api/Files/', data, {
            headers: authHeader()
        }).then(response => teamService.updateTeam(teamID, {image:response.data.id}));
            ;
    }

    getPlayer(playerName) {
        return axios.get(API_URL + 'api/Users/' + playerName, {
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
}

export default new UserService();
