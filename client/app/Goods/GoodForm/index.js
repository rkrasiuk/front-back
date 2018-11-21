import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

class GoodForm extends Component {
  state = {
    goodId: '',
    vendorCode: '',
    name: '',
    brand: '',
    price: '',
  };

  handleChange = name => event => this.setState({[name]: event.target.value});

  render() {
    const {
      goodId, vendorCode, name, brand, price,
    } = this.state;

    return (
      <form className="good-form">
        <TextField
          label="Good ID"
          className="good-form-input"
          value={goodId}
          onChange={this.handleChange('goodId')}
          margin="normal"
        />
        <TextField
          label="Vendor Code"
          className="good-form-input"
          value={vendorCode}
          onChange={this.handleChange('vendorCode')}
          margin="normal"
        />
        <TextField
          label="Name"
          className="good-form-input"
          value={name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          label="Brand"
          className="good-form-input"
          value={brand}
          onChange={this.handleChange('brand')}
          margin="normal"
        />
        <TextField
          label="Price"
          className="good-form-input"
          value={price}
          onChange={this.handleChange('price')}
          margin="normal"
        />
      </form>
    );
  }
}

export default GoodForm;
