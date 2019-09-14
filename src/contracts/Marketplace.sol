pragma solidity >=0.4.21 <0.6.0;


contract Marketplace {
	string public name;
	uint public productCount = 0;

	mapping(uint => Product) public products;

	struct Product {
		uint id;
		string name;
		uint price;
		address payable owner;
		bool purchased;
	}

	event ProductCreated(
		uint id,
		string name,
		uint price,
		address payable owner,
		bool purchased
	);

	event ProductPurchased(
		uint id,
		string name,
		uint price,
		address payable owner,
		bool purchased
	);
	
	

	constructor() public {
		name = "DuaraCoin Marketplace";
	}

	function createProduct (string memory _name, uint _price) public {
		// require a valid name
		require (bytes(_name).length > 1);
		
		// require a valid price
		require (_price > 0);		
		
		// increment product count
		productCount ++;

		// create the product
		products[productCount] = Product(productCount, _name, _price, msg.sender, false);

		// trigger an event
		emit ProductCreated(productCount, _name, _price, msg.sender, false);
	}
	
	function purchaseProduct (uint _id) payable public {
		// fetch the product
		Product memory _product = products[_id];

		// fetch the product owner's address
		address payable _seller = _product.owner;

		// require that the product has a valid id
		require (_product.id > 0 && _product.id <= productCount);
		
		// require that there is enough ether for the transaction
		require (msg.value >= _product.price);

		// require that the product has not been purchased before
		require (!_product.purchased);
		
		// require that the buyer is not the seller
		require (_seller != msg.sender);

		// transfer product ownership to the buyer
		_product.owner = msg.sender;
		
		// mark product as purchased
		_product.purchased = true;

		// update product in the mapping
		products[_id] = _product;

		// pay the seller by sending them ether
		address(_seller).transfer(msg.value);

		// trigger an event
		emit ProductPurchased(productCount, _product.name, _product.price, msg.sender, true);
	}
	
}

