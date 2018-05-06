const expect = require('chai').expect
const rancher = require('./lib.js')

describe("Rancher.js tests: ", function(){
	const cattleRustler = new rancher.Rancher(process.env.BASE_URL, process.env.API_KEY, process.env.API_SECRET)

	it("Get a list of all Rancher environments", function(){
		cattleRustler.getEnvironments()
		.then((result) => {
			for(let environment of result){
				expect(environment['id']).to.be.a('string')
				console.log(`Environment ID: ${environment['id']} || Environment Name: ${environment['name']}`)
			}
		})
	})

	it("Get a list of all Rancher stacks", function(){
		cattleRustler.getEnvironments()
		.then((environmentResult) => {
			cattleRustler.getStacks(environmentResult[0]['id'])
			.then((stackResult) => {
				for(let stack of stackResult){
				expect(stack['id']).to.be.a('string')
				console.log(`Stack ID: ${stack['id']} || Stack Name: ${stack['name']}`)
			}})
		})
	})

	it("Get a list of all services in a random Rancher stack", function(){
		cattleRustler.getEnvironments()
		.then((environmentResult) => {
			cattleRustler.getStacks(environmentResult[0]['id'])
			.then((stackResult) => {
				cattleRustler.getStackServices(stackResult[0]['id'])
			.then((serviceResult) => {
				for(let service of serviceResult){
					expect(service['id']).to.be.a('string')
					console.log(`Service ID: ${service['id']} || Service Name: ${service['name']}`)
				}
			})
			})
		})
	})
})