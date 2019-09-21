import React, { Component } from 'react';

class Main extends Component {

    render () {
        return (
            <div id="content">
                <h1>Add Product</h1>
                <form onSubmit={ (event) => {
                    event.preventDefault()
                    const name = this.productName.value
                    const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                    this.props.createProduct(name, price);
                } }>
                    <div className="form-group mr-sm-2">
                        <input
                            id="productName"
                            ref={(input) => { this.productName = input }}
                            type="text"
                            className="form-control"
                            placeholder="product name"
                            required />
                    </div>

                    <div className="form-group mr-sm-2">
                        <input
                            id="productPrice"
                            type="text"
                            ref={(input) => { this.productPrice = input }}
                            className="form-control"
                            placeholder="product price (in ether)"
                            required />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Add Product
                    </button>

                </form>

                <p>&nbsp;</p>
                <h2>Buy Product</h2>

                <table className="table">

                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">product name</th>
                            <th scope="col">product price</th>
                            <th scope="col">owner address</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody id="productList">
                        { this.props.products.map((product, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">{product.id.toString()}</th>
                                    <td>{product.name}</td>
                                    <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} ETH</td>
                                    <td>{product.owner}</td>
                                    <td>

                                    { !product.purchased
                                        ?   <button
                                                name={product.id}
                                                value={product.price}
                                                onClick={ (event) => {
                                                    this.props.purchaseProduct(event.target.name, event.target.value)
                                                } }
                                            >
                                            Buy
                                            </button>
                                        : null
                                    }
                                        
                                    </td>
                                </tr>
                            )
                        }) }                
                    </tbody>

                </table>

            </div>
        );
    }

}

export default Main;
