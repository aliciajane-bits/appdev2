const Eventemitter = require('events');
const emitter = new Eventemitter();

const data = {name: "Jane Doe", age: 21};

emitter.on('start', () => {
    console.log('Application Started!');
});

emitter.on('data', (data) => {
    console.log(`Data received: ${data.name}, ${data.age}`);
});

emitter.on('error', (error) => {
    console.log(`Error occured: ${error}` )
});

emitter.emit('start');
emitter.emit('data', data);
emitter.emit('error', 'sample error message');

console.log('Event handling completed!');