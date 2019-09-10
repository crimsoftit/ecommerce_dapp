const Marketplace = artifacts.require("Marketplace")

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('Marketplace', function([deployer, seller, buyer]) {
	 let marketplace

	 before(async () => {
	 	marketplace = await Marketplace.deployed()
	 })

	 describe('deployment', async () => {
	 	it('deploys successfully', async () => {
	 		const address = await marketplace.address;
	 		assert.notEqual(address, 0x0)
	 		assert.notEqual(address, '')
	 		assert.notEqual(address, null)
	 		assert.notEqual(address, undefined)
	 	})

	 	it('has the correct name', async () => {
	 		const name = await marketplace.name()
	 		assert.equal(name, "DuaraCoin Marketplace")
	 	})
	 })

	 describe('products', async () => {
	 	let result, productCount

	 	before(async () => {
	 		result = await marketplace.createProduct('iPhone X', web3.utils.toWei('1', 'Ether'), { from: seller })
	 		productCount = await marketplace.productCount()
	 	})

	 	it('creates products', async () => {
	 		// success
	 		assert.equal(productCount, 1)
	 		const event = result.logs[0].args
	 		assert.equal(event.id.toNumber(), productCount.toNumber(), 'product id is correct')
	 		assert.equal(event.name, 'iPhone X', 'product name is correct')
	 		assert.equal(event.price, '1000000000000000000', 'price is correct')
	 		assert.equal(event.owner, seller, 'owner/seller address is correct')
	 		assert.equal(event.purchased, false, 'purchase status is correct')
	 		console.log(result.logs)

	 		// failure: priduct should have a valid name
	 		await await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected
	 		await await marketplace.createProduct('iPhone X', 0, { from: seller }).should.be.rejected
	 	})
	 })
})