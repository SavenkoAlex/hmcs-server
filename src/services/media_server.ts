import NodeMediaServer from 'node-media-server'
import { config } from "../config"
 
export const nms = new NodeMediaServer(config.rtmp_server);
console.log('nms instance created', nms)
 
nms.on('prePublish', async (id, StreamPath, args) => {
    let stream_key = getStreamKeyFromStreamPath(StreamPath);
    console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
});
 
const getStreamKeyFromStreamPath = (path: string) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};

