import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api-mpm.herokuapp.com/';

class StatsService {

    getStats(teamID) {
        return axios.get(API_URL + 'api/Teams/'+teamID+'/stats', {headers: authHeader()});
    }
}

export default new StatsService();
