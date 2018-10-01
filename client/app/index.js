import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import uniqueid from 'lodash.uniqueid';

import Goods from 'collections/goods';
import Button from 'components/Button';
import Input from 'components/Input';

import './index.scss';

const initialForm = {
  vendorCode: undefined,
  name: '',
  brand: '',
  price: undefined,
};

const invalidFields = form => Object.keys(form).find(field => form[field] === '');

const tableHeaders = ['Vendor Code', 'Name', 'Brand', 'Price', ''];

class App extends Component {
  state = {
    form: initialForm,
    error: undefined,
  };

  updateFormField = (key, value) => this.setState(({form}) => ({form: {...form, [key]: value}}));

  handleSubmit = (e) => {
    e.preventDefault();
    const {form} = this.state;
    const {vendorCode, price, ...formRest} = form;
    if (invalidFields(form)) {
      return this.setState({error: 'Invalid Fields'});
    }
    Meteor.call('goods.addGood', {vendorCode: Number(vendorCode), price: Number(price), ...formRest}, (err, res) => {
      if (err) {
        alert(err);
        return console.error(err); // TODO handle error;
      }
      alert('Good Added');
      this.setState({form: initialForm, error: undefined});
    });
  };

  handleRemoveClick = (_id) => {
    Meteor.call('goods.removeGood', {_id}, (err, res) => {
      if (err) {
        alert(err);
        return console.error(err); // TODO handle error;
      }
      alert('Good Removed');
    });
  };

  renderGoodRow = ({
    _id, vendorCode, name, brand, price,
  }) => (
    <tr key={_id}>
      <td>{vendorCode}</td>
      <td>{name}</td>
      <td>{brand}</td>
      <td className="price">{`${price} UAH`}</td>
      <td>
        <button onClick={() => this.handleRemoveClick(_id)} type="button">x</button>
      </td>
    </tr>
  );

  render() {
    const {error, form} = this.state;
    const {
      vendorCode, name, brand, price,
    } = form;
    const {goods} = this.props;

    return (
      <div className="app">
        <form className="add-goods-form" onSubmit={this.handleSubmit}>
          <div className="goods-form-inputs">
            <Input
              type="number"
              placeholder="Vendor Code"
              value={vendorCode}
              onChange={value => this.updateFormField('vendorCode', value)}
            />
            <Input
              placeholder="Name"
              value={name}
              onChange={value => this.updateFormField('name', value)}
            />
            <Input
              placeholder="Brand"
              value={brand}
              onChange={value => this.updateFormField('brand', value)}
            />
            <Input
              type="number"
              placeholder="Price"
              value={price}
              onChange={value => this.updateFormField('price', value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <Button type="submit">Add Good</Button>
        </form>
        <div className="goods-data">
          <table>
            <thead>
              <tr>
                {tableHeaders.map(header => <th key={uniqueid(header)}>{header}</th>)}
              </tr>
            </thead>
            <tbody className="tbody">
              {goods.map(this.renderGoodRow)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('goods.list').ready(),
  goods: Goods.find().fetch(),
}))(App);
