import React, {Component} from 'react';

import Button from 'components/Button';
import Input from 'components/Input';

import './index.scss';

const initialForm = {
  vendorCode: '',
  name: '',
  brand: '',
  price: '',
};

class App extends Component {
  state = {
    form: initialForm,
    error: '',
  };

  updateFormField = (key, value) => this.setState(({form}) => ({form: {...form, [key]: value}}));

  handleSubmit = (e) => {
    e.preventDefault();
    const {form} = this.state;
    Meteor.call('goods.addGood', {...form}, (err, res) => {
      if (err) {
        alert(err);
        return console.error(err); // TODO handle error;
      }
    });
  };

  render() {
    const {error, form} = this.state;
    const {
      vendorCode, name, brand, price,
    } = form;

    return (
      <div className="app">
        <form className="add-goods-form" onSubmit={this.handleSubmit}>
          <Input
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
            placeholder="Price"
            value={price}
            onChange={value => this.updateFormField('price', value)}
          />
          <Button type="submit">Add Good</Button>
        </form>
      </div>
    );
  }
}

export default App;
