import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      Name: '',
      State: '',
      City: '',
      MobileNo: ''
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers() {
    fetch("https://localhost:44315/api/employee")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  addUser = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InNqOFB5T25LVmI1d2oxMGRrYkZxWCJ9.eyJpc3MiOiJodHRwczovL2Rldi1vNTYtN3Qybi51cy5hdXRoMC5jb20vIiwic3ViIjoiWmRCaFNxSmdmZkQ0OUp4aDlHcXNRblVvbUVHTUlaWm5AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZW1wbG95ZWVhYmIuY29tIiwiaWF0IjoxNTk3ODk3MjY2LCJleHAiOjE1OTc5ODM2NjYsImF6cCI6IlpkQmhTcUpnZmZENDlKeGg5R3FzUW5Vb21FR01JWlpuIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.BATT8Mxd4E3ECGQoUlbD1ErqtYJrVYi6G6A6b_Frau4TdDmvf0OH6Yp863lNQHfpj__iGM0haGls_iFVvYzz0ICYfAkN8qCh0YWVltNN_q8K565zNVIXiDM5ya90udYzlssn1oCiKpNBgfDV7l5NcPX2Vn5uTN_kZJGZs1VK3UTDJo42DvWTI-LVLbmgMg4CtUxpq4NI2JZrDnX02AJXDC0OP0_25T81x_h6fo9AbFpv1S1f9ymbZTzDdBds25xwaZNgNWMI2k3Jh1NfWTC0AkzVR-oLsPq6XkVz08RD-ansVEPxXG_ZneKr419XruZDXSN-KAVJBJEx_SllzHyqMg'
      },
      body: JSON.stringify({
        "name": this.state.Name,
        "city": this.state.City,
        "state": this.state.State,
        "mobile": this.state.MobileNo
      })
    };
    fetch('https://localhost:44315/api/Employee/', requestOptions)
      .then(response => response.json())
      .then(data => {
        alert(data);
        console.log(data)
        this.loadUsers();
      });
  }

  render() {
    return (
      <div className="row d-flex justify-content-center container">

        <div className="col-md-6">
          <div className="card-hover-shadow-2x mb-3 card">
            <div className="card-header-tab card-header">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal"><i className="fa fa-tasks"></i>&nbsp;New Employee</div>
            </div>
            <div className="scroll-area-sm">
              <div className="ps-content">
                <Form>
                  <Form.Group>
                    <Form.Control type="text" placeholder="Enter Name" onChange={(event) => this.setState({ "Name": event.target.value })} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control type="text" placeholder="Enter City" onChange={(event) => this.setState({ "City": event.target.value })}/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Control type="text" placeholder="Enter State" onChange={(event) => this.setState({ "State": event.target.value })}/>
                  </Form.Group>

                  <Form.Group>
                    <Form.Control type="text" placeholder="Enter Mobile No" onChange={(event) => this.setState({ "MobileNo": event.target.value })}/>
                  </Form.Group>

                </Form>
              </div>
            </div>
            <div className="d-block text-right card-footer">
              <button className="mr-2 btn btn-link btn-sm">Cancel</button>
              <button className="btn btn-primary" onClick={() => this.addUser()}>Add Employee</button></div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card-hover-shadow-2x mb-3 card">
            <div className="card-header-tab card-header">
              <div className="card-header-title font-size-lg text-capitalize font-weight-normal"><i className="fa fa-tasks"></i>&nbsp;Employee Lists</div>
            </div>
            <div className="scroll-area-sm">
              <div style={{ "position": "static" }} className="ps ps--active-y">
                <div className="ps-content">
                  <ul className=" list-group list-group-flush">
                    {this.state.items.map((data, i) =>
                      <li className="list-group-item" key={i}>
                        <div className="todo-indicator bg-info"></div>
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mr-2">
                              <div className="custom-checkbox custom-control"><input className="custom-control-input" id="exampleCustomCheckbox2" type="checkbox" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox2">&nbsp;</label></div>
                            </div>
                            <div className="widget-content-left">
                              <div className="widget-heading">{data.name}</div>
                              <div className="row">
                                <div className="col-md-4">
                                  <div className="widget-subheading">{data.city}</div>
                                </div>
                                <div className="col-md-3">
                                  <div className="widget-subheading">{data.state}</div>
                                </div>
                                <div className="col-md-5">
                                  <div className="widget-subheading">{data.mobile}</div>
                                </div>
                              </div>
                            </div>
                            <div className="widget-content-right"> <button className="border-0 btn-transition btn btn-outline-success"> <i className="fa fa-check"></i></button> <button className="border-0 btn-transition btn btn-outline-danger"> <i className="fa fa-trash"></i> </button> </div>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App;
