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
        return axios.post(API_URL + 'api/Events/' + eventID+"/presence",{
            present: confirm
            }, {
                headers: authHeader(),
            }
        )
            ;
    }

    addDiscrepancy(eventID, type, reason, delayLength){
        return axios.post(API_URL + 'api/Events/' + eventID+"/discrepancies",{
            type: type,
            reason: reason,
            delayLength: delayLength
            }, {
                headers: authHeader(),
            }
        )
            ;
    }

    updateDiscrepancy(discrepancyId, type, reason, delayLength, ){
        return axios.put(API_URL + 'api/Discrepancies/' + discrepancyId,{
                type: type,
                reason: reason,
                delayLength: delayLength
            }, {
                headers: authHeader(),
            }
        )
            ;
    }


    TypeEvents(i){
        if(i === 0){
            return "Scrim"
        }
        else if (i === 1){
            return "Meeting"
        }else if (i === 2){
            return "Tournament"
        }else{
            return "Coaching"
        }
    }

    TypeDiscrepancy(i){
        if(i === 0){
            return "Absence"
        }else{
            return "Delay"
        }
    }
}

export default new EventService();
