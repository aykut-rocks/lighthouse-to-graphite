const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
var net = require('net');

const graphitePort = '{your port}'; // e.g. '2003' or 2003
const graphiteHost = '{your host}'; // e.g. 'carbon.hostedgraphite.com'
const graphitePath = '{your path}'; // e.g. 'lighthouse.performance' or 'your-api-key'
const url = '{your url}'; // e.g. 'https://github.com/'
const opts = {
  chromeFlags: ['--headless'],
  output: 'json'
};
const config = require('lighthouse/lighthouse-core/config/perf.json');

const isBoolean = (value) => 'boolean' === typeof value;

let launchChromeRunLighthouse = (url, opts, config) => {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results =>
      chrome.kill().then(() => results));
  }).catch(err => { console.error(err); });
};

launchChromeRunLighthouse(url, opts, config).then(results => {
  let socket = net.createConnection(graphitePort, graphiteHost, () => {
    let data = [];
    Object.keys(results.audits).forEach((key) => {
      let value = results.audits[key].rawValue;
      if(isBoolean(value)) {
        value = +value;
      }
      data.push(graphitePath + '.' + key + ' ' + value);
    });
    socket.write(data.join('\r\n'));
    socket.end();
  });
}, err => { console.error(err); });
