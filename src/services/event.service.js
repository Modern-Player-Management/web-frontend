import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://api-mpm.herokuapp.com/';

class EventService {

    removeEvent(eventId) {
        return axios.delete(API_URL + 'api/Events/' + eventId, {
                headers: authHeader(),
            }
        )
            ;
    }

    createEvent(teamID, name, description, start, end, type) {
        return axios.post(API_URL + 'api/Teams/' + teamID+'/events',{
            name: name,
            description: description,
            start: start,
            end: end,
            type: type,
            }, {
                headers: authHeader(),
            }
        )
            ;
    }

    editEvent(eventID, name, description, start, end, type) {
        return axios.put(API_URL + 'api/Events/' + eventID,{
                name: name,
                description: description,
                start: start,
                end: end,
                type: type,
            }, {
                headers: authHeader(),
            }
        )
            ;
    }

    confirmPresence(eventID, confirm){
        return axios.post(API_URL + 'api/Events/' + eventID+"/confirm",{
            confirm: confirm
            }, {
                headers: authHeader(),
            }
        )
            ;
    }
}

export default new EventService();
