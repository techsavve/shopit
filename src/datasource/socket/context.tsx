import SocketController from '@/datasource/socket/controller';
import { createContext, useRef } from 'react';


type IMeetingContext = {
    socket?: SocketController
}

const SocketContext = createContext<IMeetingContext>({
});

const SocketProvider = ({ children } : { children: any}) => {
    const socket = useRef<SocketController>(new SocketController());

    return (
        <SocketContext.Provider value={{ socket: socket.current }}>
            {children}
        </SocketContext.Provider>
    ) 
}

export default SocketProvider;

export const useSocket = () => {}