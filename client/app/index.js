import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import uniqueid from 'lodash.uniqueid';
import classnames from 'classnames';

import CompetitorGoods from 'collections/competitorgoods';
import ParsedGoods from 'collections/parsedgoods';
import Competitors from 'collections/competitors';
import Goods from 'collections/goods';
import Button from 'components/Button';
import Input from 'components/Input';

import data from './data';
import './index.scss';

const constructInitialForm = (tableName) => {
  const form = {};
  data.formInfo[tableName].fields.forEach(({name, isNum}) => {
    form[name] = isNum ? undefined : '';
  });
  return form;
};

const invalidFields = form => Object.keys(form).find(field => form[field] === '');

class App extends Component {
  state = {
    table: 'goods',
    form: constructInitialForm('goods'),
    error: undefined,
  };

  updateFormField = (key, value) => this.setState(({form}) => ({form: {...form, [key]: value}}));

  handleSubmit = (e) => {
    e.preventDefault();
    const {form, table} = this.state;

    const convertNumberInputsToNum = (formFieldName) => {
      const formFieldInfo = data.formInfo[table].fields.find(({name}) => name === formFieldName);
      if (formFieldInfo.isNum) {
        form[formFieldName] = Number(form[formFieldName]);
      }
    };
    Object.keys(form).forEach(convertNumberInputsToNum);

    if ('parsingRules' in form && !form.parsingRules) {
      form.parsingRules = 'None';
    }
    if (invalidFields(form)) {
      return this.setState({error: 'Invalid Fields'});
    }
    if ('price' in form && Number(form.price) <= 0) {
      return this.setState({error: 'Price cannot be less than or equal to 0'});
    }

    Meteor.call(data.formInfo[table].addMethodName, {...form}, (err, res) => {
      if (err) {
        alert(err);
        return console.error(err); // TODO handle error;
      }
      alert('Item Added');
      this.setState({form: constructInitialForm(table), error: undefined});
    });
  };

  handleTableChange = (tableName) => {
    const nextTable = tableName.toLowerCase().split(' ').join('');
    this.setState({table: nextTable, form: constructInitialForm(nextTable), error: undefined});
  };

  handleRemoveClick = (_id) => {
    Meteor.call(data.formInfo[this.state.table].removeMethodName, {_id}, (err, res) => {
      if (err) {
        alert(err);
        return console.error(err); // TODO handle error;
      }
      alert('Item Removed');
    });
  };

  renderRow = ({
    _id, price, ...rest
  }) => (
    <tr key={_id}>
      <td>{_id}</td>
      {
        Object.values({...rest}).map(val => (
          <td key={val}>
            {val}
          </td>
        ))
      }
      {price && <td>{price} UAH</td>}
      <td>
        <button onClick={() => this.handleRemoveClick(_id)} type="button">x</button>
      </td>
    </tr>
  );

  render() {
    const {error, form, table} = this.state;
    const items = this.props.tables[table];

    return (
      <div className="app">
        <div className="menu">
          {data.tableNames.map(tableName => (
            <p
              onClick={() => this.handleTableChange(tableName)}
              key={tableName}
              className={classnames('menu-item', table === tableName.toLowerCase().split(' ').join('') && 'active')}
            >
              {tableName}
            </p>
          ))}
        </div>
        <form className="add-goods-form" onSubmit={this.handleSubmit}>
          <div className="goods-form-inputs">
            {
              Object.keys(form).map((inputName) => {
                const inputInfo = data.formInfo[table].fields.find(({name}) => name === inputName);

                return (
                  <Input
                    key={inputName}
                    type={inputInfo.isNum ? 'number' : 'text'}
                    placeholder={inputInfo.placeholder}
                    value={form[inputName]}
                    onChange={value => this.updateFormField(inputName, value)}
                  />
                );
              })
            }
          </div>
          {error && <p className="error">{error}</p>}
          <Button type="submit">Add Good</Button>
        </form>
        <div className="goods-data">
          <table>
            <thead>
              <tr>
                {data.tableHeaders[table].map(header => <th key={uniqueid(header)}>{header}</th>)}
              </tr>
            </thead>
            <tbody className="tbody">
              {items.map(this.renderRow)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('goods.list').ready()
    && Meteor.subscribe('competitors.list').ready()
    && Meteor.subscribe('competitorgoods.list').ready()
    && Meteor.subscribe('parsedgoods.list').ready(),
  tables: {
    goods: Goods.find().fetch(),
    competitors: Competitors.find().fetch(),
    competitorgoods: CompetitorGoods.find().fetch(),
    parsedgoods: ParsedGoods.find().fetch(),
  },
}))(App);
