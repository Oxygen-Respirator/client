import chatApis from "@/apis/chatApis";
import { useMutation } from "@tanstack/react-query";


export function useSendChatMutation(){return useMutation((msg:string)=>chatApis.send(msg))}