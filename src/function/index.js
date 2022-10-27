import Constant from "../const/defination"
import { projectFirestore, timestamp } from "../firebase/config"

export const createLocation = async(payload)=>{
    try{
        const colRef = projectFirestore.collection(Constant.COLLECTION.LOCATION);
        await colRef.add({...payload})
        return {status: true};
    }catch(error){
        return {status: false, error};
    }
}