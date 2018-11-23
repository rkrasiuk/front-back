import React, {Component} from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/CloudUpload';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

import Goods from 'collections/goods';

import './index.scss';

const initialForm = {
  goodId: '',
  url: '',
};

class CompetitorGoodForm extends Component {
  static propTypes = {
    handleClose: PropTypes.func.isRequired,
  };

  state = initialForm;

  handleChange = name => ({target: {value}}) => this.setState({[name]: value});

  submit = (e) => {
    e.preventDefault();
    const form = this.state;
    const {competitorId} = this.props;

    Meteor.call('competitors.addCompetitorGood', {competitorId, ...form}, (err, res) => {
      if (err) {
        alert(err);
        return console.error(err);
      }
      // alert('Item Added');
      this.setState(initialForm);
      return this.props.handleClose();
    });
  };

  render() {
    const {goodId, url} = this.state;
    const {goods} = this.props;

    return (
      <form className="competitor-good-form" autoComplete="off" onSubmit={this.submit}>
        <h3 className="competitor-good-form-title">Add Competitor Good</h3>
        <FormControl required className="competitor-good-form-input">
          <InputLabel htmlFor="goodid-select">Good ID</InputLabel>
          <Select
            value={goodId}
            onChange={this.handleChange('goodId')}
            inputProps={{
              name: 'goodId',
              id: 'goodId-select',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {goods.map(({_id, name}) => <MenuItem key={_id} value={_id}>{name}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          label="URL"
          className="competitor-good-form-input"
          value={url}
          onChange={this.handleChange('url')}
          required
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" className="competitor-good-form-button">
          Submit
          <ChevronRight className="right-icon" />
        </Button>
      </form>
    );
  }
}

export default withTracker(() => ({
  ready: Meteor.subscribe('goods.list').ready(),
  goods: Goods.find({}).fetch(),
}))(CompetitorGoodForm);
