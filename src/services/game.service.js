import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api-mpm.herokuapp.com/';

class GameService {

    removeGame(gameId) {
        return axios.delete(API_URL + 'api/Games/' + gameId, {
                headers: authHeader(),
            }
        )
            ;
    }

    addGame(teamID, replay) {


        const data = new FormData();
        data.append('file', replay.file);

        console.log(data);

        return axios.post(API_URL + 'api/Teams/'+teamID+'/games', data, {
            headers: authHeader()
        });
    }
}

export default new GameService();
