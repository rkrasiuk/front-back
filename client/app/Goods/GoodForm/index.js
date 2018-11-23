import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/CloudUpload';
import PropTypes from 'prop-types';

import './index.scss';

const initialForm = {
  goodId: '',
  vendorCode: '',
  name: '',
  brand: '',
  price: '',
};

class GoodForm extends Component {
  static propTypes = {
    handleClose: PropTypes.func.isRequired,
  };

  state = initialForm;

  handleChange = name => ({target: {value}}) => this.setState({[name]: value});

  submit = (e) => {
    e.preventDefault();
    const form = this.state;

    Meteor.call('goods.addGood', form, (err, res) => {
      if (err) {
        alert(err);
        return console.error(err);
      }
      alert('Item Added');
      this.setState(initialForm);
      return this.props.handleClose();
    });
  };

  render() {
    const {
      goodId, vendorCode, name, brand, price,
    } = this.state;

    return (
      <form className="good-form" autoComplete="off" onSubmit={this.submit}>
        <h3 className="good-form-title">Add Good</h3>
        <TextField
          label="Good ID"
          className="good-form-input"
          value={goodId}
          onChange={this.handleChange('goodId')}
          required
          margin="normal"
        />
        <TextField
          label="Vendor Code"
          className="good-form-input"
          value={vendorCode}
          onChange={this.handleChange('vendorCode')}
          required
          type="number"
          margin="normal"
        />
        <TextField
          label="Name"
          className="good-form-input"
          value={name}
          onChange={this.handleChange('name')}
          required
          margin="normal"
        />
        <TextField
          label="Brand"
          className="good-form-input"
          value={brand}
          onChange={this.handleChange('brand')}
          required
          margin="normal"
        />
        <TextField
          label="Price"
          className="good-form-input"
          value={price}
          onChange={this.handleChange('price')}
          required
          margin="normal"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">UAH</InputAdornment>,
          }}
        />
        <Button variant="contained" color="primary" type="submit" className="good-form-button">
          Submit
          <ChevronRight className="right-icon" />
        </Button>
      </form>
    );
  }
}

export default GoodForm;
