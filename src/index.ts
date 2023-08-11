import { EventEmitter } from 'node:events';
import needle from 'needle';

const url = 'https://www.boredapi.com/api/activity/';

const createStream = (ms = 3000) => {
  const emitter = new EventEmitter();
  const interval = setInterval(async () => {
    const { body } = await needle('get', url);
    emitter.emit('idea', body);
  }, ms);
  return {
    emitter,
    close: () => clearInterval(interval),
  };
};

export default createStream;
