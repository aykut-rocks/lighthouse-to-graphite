# lighthouse-to-graphite
feeds lighthouse performance data into graphite

## requirement
- node.js version 6 or later
- latest google chrome

## configuration
complete the missing constant values in the index.js
```
const graphitePort  = 'your port';  // e.g. '2003'
const graphiteHost  = 'your host';  // e.g. 'carbon.hostedgraphite.com'
const graphitePath  = 'your path';  // e.g. 'lighthouse.performance' or 'your api-key'
const url           = 'your url';   // e.g. 'https://github.com/'

```
## howto
type in terminal:
1. npm install
2. node index.js