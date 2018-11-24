import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/ChevronRight';
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
    buttonText: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
    values: PropTypes.shape({}),
  };

  static defaultProps = {
    values: null,
  };

  state = this.props.values || initialForm;

  handleChange = name => ({target: {value}}) => this.setState({[name]: value});

  submit = (e) => {
    e.preventDefault();
    const form = this.state;
    const methodName = this.props.values ? 'goods.updateGood' : 'goods.addGood';
    const successMessage = this.props.values ? 'Item Updated' : 'Item Added';

    Meteor.call(methodName, form, (err) => {
      if (err) {
        alert(err);
        return console.error(err);
      }
      alert(successMessage);
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
        <h3 className="good-form-title">{this.props.headerText}</h3>
        <TextField
          label="Good ID"
          className="good-form-input"
          value={goodId}
          onChange={this.handleChange('goodId')}
          required
          margin="normal"
          disabled={!!this.props.values}
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
          {this.props.buttonText}
          <ChevronRight className="right-icon" />
        </Button>
      </form>
    );
  }
}

export default GoodForm;
