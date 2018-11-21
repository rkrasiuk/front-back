import React, {Component} from 'react';

import './index.scss';

class Table extends Component {
  render() {
    return (
      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table">

              <div className="row header">
                <div className="cell">
                  Full Name
                </div>
                <div className="cell">
                  Age
                </div>
                <div className="cell">
                  Job Title
                </div>
                <div className="cell">
                  Location
                </div>
              </div>

              <div className="row">
                <div className="cell" data-title="Full Name">
                  Vincent Williamson
                </div>
                <div className="cell" data-title="Age">
                  31
                </div>
                <div className="cell" data-title="Job Title">
                  iOS Developer
                </div>
                <div className="cell" data-title="Location">
                  Washington
                </div>
              </div>

              <div className="row">
                <div className="cell" data-title="Full Name">
                  Joseph Smith
                </div>
                <div className="cell" data-title="Age">
                  27
                </div>
                <div className="cell" data-title="Job Title">
                  Project Manager
                </div>
                <div className="cell" data-title="Location">
                  Somerville, MA
                </div>
              </div>

              <div className="row">
                <div className="cell" data-title="Full Name">
                  Justin Black
                </div>
                <div className="cell" data-title="Age">
                  26
                </div>
                <div className="cell" data-title="Job Title">
                  Front-End Developer
                </div>
                <div className="cell" data-title="Location">
                  Los Angeles
                </div>
              </div>

              <div className="row">
                <div className="cell" data-title="Full Name">
                  Sean Guzman
                </div>
                <div className="cell" data-title="Age">
                  25
                </div>
                <div className="cell" data-title="Job Title">
                  Web Designer
                </div>
                <div className="cell" data-title="Location">
                  San Francisco
                </div>
              </div>

              <div className="row">
                <div className="cell" data-title="Full Name">
                  Keith Carter
                </div>
                <div className="cell" data-title="Age">
                  20
                </div>
                <div className="cell" data-title="Job Title">
                  Graphic Designer
                </div>
                <div className="cell" data-title="Location">
                  New York, NY
                </div>
              </div>

              <div className="row">
                <div className="cell" data-title="Full Name">
                  Austin Medina
                </div>
                <div className="cell" data-title="Age">
                  32
                </div>
                <div className="cell" data-title="Job Title">
                  Photographer
                </div>
                <div className="cell" data-title="Location">
                  New York
                </div>
              </div>

              <div className="row">
                <div className="cell" data-title="Full Name">
                  Vincent Williamson
                </div>
                <div className="cell" data-title="Age">
                  31
                </div>
                <div className="cell" data-title="Job Title">
                  iOS Developer
                </div>
                <div className="cell" data-title="Location">
                  Washington
                </div>
              </div>

              <div className="row">
                <div className="cell" data-title="Full Name">
                  Joseph Smith
                </div>
                <div className="cell" data-title="Age">
                  27
                </div>
                <div className="cell" data-title="Job Title">
                  Project Manager
                </div>
                <div className="cell" data-title="Location">
                  Somerville, MA
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
