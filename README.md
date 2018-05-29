
[![Build Status](https://travis-ci.org/rudimk/rancher.js.svg?branch=master)](https://travis-ci.org/rudimk/rancher.js)

# rancher.js
A (hopefully?) awesome Javascript wrapper around the Rancher 1 API(v2) for container orchestration.

## Usage

### Getting started

The first step is initializing a connection to your Rancher cluster. 

```javascript

const cattleRustler = new rancher.Rancher(BASE_URL, API_KEY, API_SECRET)

```

The base URL is the URL Rancher uses to communicate with its API. For instance, if you access Rancher at rancher.example.com:8080, then the base URL would be `http://rancher.example.com:8080`. HTTPS URLs also work. API keys and secrets can be generated by navigating to `API > Keys > Add Account API Key`. Note that rancher.js doesn't support environment API keys at this point.

First, it's important to get a list of your Rancher environments - this will be needed later.

```javascript
cattleRustler.getEnvironments()
.then((result) => {
	console.log(result)
	})
```

The library is promises-based, so `await` work just fine:

```javascript
// Inside an async function
let environments = await cattleRustler.getEnvironments()
```

Here's how you can grab a list of Rancher stacks in a particular environment:

```javascript
// Inside an async function
let stacks = await cattleRustler.getStacks(environmentId)
```

To get a list of services inside a stack:

```javascript
// Inside an async function
let services = await cattleRustler.getServices(stackId)
```

### Creating stacks and services

You can create a new stack by supplying the new stack's name and the intended environment's ID to the `createStack` method:

```javascript
// Inside an async function
let newStack = await cattleRustler.createStack(environmentId, newStackName)
```

This creates a new stack and returns its details, including a stack ID. At this point, it's not possible to pass Docker and Rancher Compose files through `rancher.js`, although that's definitely an intended feature.

To create a new service:

```javascript
// Inside an async function
let newService = await cattleRustler.createStackService(environmentId, stackId, serviceName, labels, environmentVars, imageUuid)
```

Here, `labels` is a simple object containing label names and values as key-pairs. The same holds true for `environmentVars`. The `imageUuid` parameter is the Docker image you wish to spin the service from - so if you wish to spin up the official nginx image, the `imageUuid` would be `docker:nginx:latest`. Calling this method results in Rancher orchestrating the service and returning its service ID.

Starting and stopping stacks and services is easy - just call the `startStack` and `stopStack` with an environment ID and a stack ID to start/stop a stack; for starting/stopping services, call `startService` and `stopService` with an environment ID and a service ID.


## License

[Here you go.](https://github.com/rudimk/rancher.js/blob/master/LICENSE)
