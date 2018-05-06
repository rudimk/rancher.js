const axios = require('axios')


class Rancher {

	// Initialize the Rancher object with an API key and secret.
	constructor(baseUrl, apiKey, apiSecret){
		this.baseUrl = baseUrl
		this.apiKey = apiKey
		this.apiSecret = apiSecret
	}

	// Get a list of environments.
	async getEnvironments(){
		try{
			let endpoint = this.baseUrl + '/v2-beta/projects'
			let response = await axios({url: endpoint, method: 'get', auth: {username: this.apiKey, password: this.apiSecret}})
			return response.data.data
		}
		catch(err){
			console.log(err)
		}
	}

	// Get a list of stacks.
	async getStacks(environmentId){
		try{
			let endpoint = this.baseUrl + '/v2-beta/projects/' + environmentId + '/stacks'
			let response = await axios({url: endpoint, method: 'get', auth: {username: this.apiKey, password: this.apiSecret}})
			return response.data.data
		}
		catch(err){
			console.log(err)
		}
	}

	// Get a list of services inside a particular stack. Accepts a stack ID.
	async getStackServices(stackId){
		try{
			let endpoint = this.baseUrl + '/v2-beta/stacks/' + stackId + '/services'
			let response = await axios({url: endpoint, method: 'get', auth: {username: this.apiKey, password: this.apiSecret}})
			return response.data.data
		}
		catch(err){
			console.log(err)
		}
	}

	// Create a new service inside a particular stack.
	async createStackService(environmentId, stackId, name, labels, environmentVariables, image){
		try{
			let serviceObject = {stackId: stackId, startOnCreate: true, name: name, launchConfig: {labels: labels, environment: environmentVariables, imageUuid: image}}
			let endpoint = this.baseUrl + '/v2-beta/projects/' + environmentId + '/services'
			let response = await axios({url: endpoint, method: 'post', auth: {username: this.apiKey, password: this.apiSecret}, data: serviceObject})
			return response.data
		}
		catch(err){
			console.log(err)
		}
	}

}

exports.Rancher = Rancher