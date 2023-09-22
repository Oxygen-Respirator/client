import instance from "./instance"

const chatApis = {
    send:async(massge:string)=>{
        const result = instance.post('chat',{massge})
        return result
    }
}


export default chatApis