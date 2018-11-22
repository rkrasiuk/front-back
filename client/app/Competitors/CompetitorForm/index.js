import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PropTypes from 'prop-types';

import './index.scss';

const initialForm = {
  name: '',
  parsingRules: '',
};

class CompetitorForm extends Component {
  static propTypes = {
    handleClose: PropTypes.func.isRequired,
  };

  state = initialForm;

  handleChange = name => ({target: {value}}) => this.setState({[name]: value});

  submit = (e) => {
    e.preventDefault();
    const form = this.state;

    Meteor.call('', form, (err, res) => {
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
    const {name, parsingRules} = this.state;

    return (
      <form className="good-form" autoComplete="off" onSubmit={this.submit}>
        <h3 className="good-form-title">Add Competitor</h3>
        <TextField
          label="Name"
          className="good-form-input"
          value={name}
          onChange={this.handleChange('name')}
          required
          margin="normal"
        />
        <TextField
          label="Parsing Rules"
          className="good-form-input"
          value={parsingRules}
          onChange={this.handleChange('parsingRules')}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" className="good-form-button">
          Submit
          <CloudUploadIcon className="right-icon" />
        </Button>
      </form>
    );
  }
}

export default CompetitorForm;
