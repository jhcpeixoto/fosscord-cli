const { exec } = require('child_process');

const api = exec('npm run api', function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error code on api: '+error.code);
    console.log('Signal received from api: '+error.signal);
  }
});
const gateway = exec('npm run gateway', function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error code on gateway: '+error.code);
    console.log('Signal received from gateway: '+error.signal);
  }
});

api.on('exit', function (code) {
  console.log('Api exited with exit code '+code);
});
gateway.on('exit', function (code) {
  console.log('Gateway exited with exit code '+code);
});