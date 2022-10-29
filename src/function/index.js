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

export const updateLocation = async (payload, id)=>{
    try{
        const colRef = projectFirestore.doc(`${Constant.COLLECTION.LOCATION}/${id}`);
        await colRef.update({...payload})
        return {status: true};
    }catch(error){
        console.warn(id)
        console.warn(error)
        return {status: false, error};
    }
}