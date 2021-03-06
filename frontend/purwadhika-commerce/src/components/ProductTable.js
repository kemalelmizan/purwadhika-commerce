import React from "react";
import { Table } from "reactstrap";
import Request from "request";

export default class ProductTable extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
  }
  componentDidMount() {
    let options = {
      method: "GET",
      url: "http://localhost:5004/products.json"
    };

    Request(options, (error, response, body) => {
      if (error) throw new Error(error);
      response.body = JSON.parse(response.body);
      console.log(response.body);
      this.setState({ products: response.body.data });
    });
  }
  render() {
    const products = this.state.products.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index +1}</th>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{item.category}</td>
        </tr>
      );
    });
    return (
      <Table dark>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products}
        </tbody>
      </Table>
    );
  }
}