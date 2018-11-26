import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import FileCopyOutlined from '@material-ui/icons/FileCopyOutlined';
import ReactTooltip from 'react-tooltip';
import XLSX from 'xlsx';

import Modal from 'components/Modal';
import Logistics from 'illustrations/logistics';
import InProgress from 'illustrations/inprogress';

import Header from '../components/Header';
import NavigationBar from '../components/Navigation';
import GoodForm from './GoodForm';
import GoodsTable from './GoodsTable';

import './index.scss';

class GoodsPage extends Component {
  state = {
    addGoodModal: false,
    editGoodModal: false,
    editMode: false,
    editValues: null,
  };

  fileInput = React.createRef();

  handleAddClick = () => this.setState({addGoodModal: true});

  handleEditClick = ({_id, ...rest}) => this.setState({editGoodModal: true, editValues: {goodId: _id, ...rest}});

  handleAddGoodClose = () => this.setState({addGoodModal: false});

  handleEditGoodClose = () => this.setState({editGoodModal: false, editMode: false});

  toggleEditMode = () => this.setState(({editMode}) => ({editMode: !editMode}));

  triggerInputFile = () => this.fileInput.click();

  handleFileUpload = ({target}) => {
    const file = target.files[0];
    const reader = new FileReader();

    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {type: rABS ? 'binary' : 'array'});
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {header: 1});
      console.log(data)
      const response = confirm('File uploaded successfully. Are you sure you want to add records to DB?');
      if (!response) {
        return;
      }
      Meteor.call('goods.parseFile', {data}, (err) => {
        if (err) {
          alert(err);
          return console.error(err);
        }
        alert('Records added');
      });
    };

    if (rABS) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  renderAddGoodModal = () => (
    <Modal open={this.state.addGoodModal} handleClose={this.handleAddGoodClose}>
      <GoodForm
        handleClose={this.handleAddGoodClose}
        headerText="Add Good"
        buttonText="Submit"
      />
      <Logistics />
    </Modal>
  );

  renderEditGoodModal = good => (
    <Modal open={this.state.editGoodModal} handleClose={this.handleEditGoodClose}>
      <GoodForm
        handleClose={this.handleEditGoodClose}
        headerText="Edit Good"
        buttonText="Save"
        values={good}
      />
      <InProgress />
    </Modal>
  );

  render() {
    return (
      <div className="app">
        <Header>
          <Button onClick={this.handleAddClick} variant="fab" color="primary" aria-label="Add" className="edit-button">
            <AddIcon />
          </Button>
          <Button
            onClick={this.triggerInputFile}
            variant="fab"
            color="primary"
            aria-label="Add"
            className="edit-button"
          >
            <Input
              inputRef={(ref) => {
                this.fileInput = ref;
              }}
              type="file"
              name=""
              id="file"
              style={{display: 'none'}}
              onChange={this.handleFileUpload}
            />
            <FileCopyOutlined />
          </Button>
          <Button
            onClick={this.toggleEditMode}
            data-tip="React-tooltip"
            variant="fab"
            color={this.state.editMode ? 'default' : 'primary'}
            aria-label="Edit"
            className="edit-button"
          >
            <Icon>edit_icon</Icon>
          </Button>
          <ReactTooltip place="top" type="dark" effect="float">
            <span>Click on the row to edit</span>
          </ReactTooltip>
        </Header>
        <div className="content">
          <NavigationBar activeLink={this.props.match.url} />
          <div className="goods-table">
            <GoodsTable onRowClick={this.state.editMode ? this.handleEditClick : null} />
          </div>
        </div>
        {this.renderAddGoodModal()}
        {this.renderEditGoodModal(this.state.editValues)}
      </div>
    );
  }
}

export default GoodsPage;
