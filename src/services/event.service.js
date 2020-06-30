import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api-mpm.herokuapp.com/';

class EventsService {

    removeEvents(eventId) {
        return axios.delete(API_URL + 'api/Events/' + eventId, {
                headers: authHeader(),
            }
        )
            ;
    }
}

export default new EventsService();
