import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import 'react-bootstrap';
import './editbooks.css';

class Editbook extends Component {
    constructor(props){
        super(props);
        this.state={
            book:[],
            success:''
        };
    }
    componentDidMount() {
        fetch("http://localhost:4000/book/"+this.props.match.params.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    book: data
                });
            });
    }
  
  
    onChange =(e)=>{
        const state = this.state.book;
        state[e.target.name] = e.target.value;
        this.setState({book:state});
    }
    onSubmit=(e)=>{
        e.preventDefault();
        const{
            name,
            author,
            description,
            publish_year,
            publisher,
            qty
        }=this.state.book;
        fetch("http://localhost:4000/book/Update/"+this.props.match.params.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(this.state.book)
        }).then(result => result.json())
        .then(json => {
            if (json.success) {
                console.log(json)
                this.setState({
                    success:json.success
                });
               // window.location.reload();
               this.props.history.push("/Booklist");

            } else {
                console.log(json)
                this.setState({
                    success:json.success
                });
            }
        });

    }
    add() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                <div className="container">
                    <h2 className="title">UPDATE BOOK DETAILS</h2>
                    <form className="form-horizontal" >
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="email">Name:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="name" placeholder="Enter book name" name="name" value={this.state.book.name} onChange={this.onChange} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Author:</label>
                            <div class="col-sm-8">
                                <input type="text" className="form-control" id="author" placeholder="Enter Auhtor name" name="author" value={this.state.book.author} onChange={this.onChange} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Published Year:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="publishyear" placeholder="Enter book publish year" name="PublishYear" rows="4" cols="5" value={this.state.book.PublishYear} onChange={this.onChange}  required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Publisher :</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="publisher" placeholder="Enter book publisher" name="Publisher" rows="4" cols="5" value={this.state.book.Publisher} onChange={this.onChange}  required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Quantity :</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" id="qty" placeholder="Enter book quantity" name="Qty" value={this.state.book.Qty} onChange={this.onChange}  required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Description:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="Description" placeholder="Enter book description" name="description" rows="4" cols="5" value={this.state.book.description} onChange={this.onChange}  required/>
                            </div>
                        </div>
                        <div className="buttonlists">
                        <div class="form-group">
                            <div class="col-sm-5">
                                <button type="submit" class="btn btn-success">Submit</button>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            </form>
            </div>
        );
    }

    navbar() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#myPage">PREMIER</a>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="/about">ABOUT</a></li>
                                <li><a href="/Employee">DASHBOARD</a></li>
                                <li><a href="/Booklist">BOOKLIST</a></li>
                                <li><a href="/home">LOGOUT</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
    render() {
        return (
            <div>
                <div className="head">
                    {this.navbar()}
                </div>
                <div className="container-fluid">
                
                    <div className="row content">
                        <div class="col-sm-2 sidenav">
                        </div>
                        
                        <div class="col-sm-8">
                          {this.add()}
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}
export default Editbook;