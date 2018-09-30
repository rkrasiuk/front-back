import React, {Component} from 'react';

const initialForm = {

};

class App extends Component {
  state = {
    form: initialForm,
  };

  updateFormField = (key, value) => this.setState({form: {...this.state.form, [key]: value}});

  render() {
    const form = this.state;
    const {
      vendorCode, name, brand, price,
    } = form;

    return (
      <div className="app">
        <form className="add-goods-form">
          <input
            type="text"
            placeholder="Vendor Code"
            value={vendorCode}
            onChange={value => this.updateFormField('vendorCode', value)}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={value => this.updateFormField('name', value)}
          />
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={value => this.updateFormField('brand', value)}
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={value => this.updateFormField('price', value)}
          />
        </form>
      </div>
    );
  }
}

export default App;
