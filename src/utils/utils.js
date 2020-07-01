import Moment from "moment";

class Utils {
    IsoToString(dateISO) {

        const date = Moment(dateISO);
        return date.utc().format('YYYY-MM-DD HH:mm:ss');
    }
    DatetoIso(date){
        return Moment(date).utc().toISOString();
    }
}



export default new Utils();