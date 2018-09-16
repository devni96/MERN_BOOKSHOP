import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './removebooks.css';
import Contact from '../contact';
class Booklist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };

    }
    componentDidMount() {
        fetch("http://localhost:4000/book/Booklist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(data => {
                this.setState({
                    books: data
                });
            });
    }
    delete(id) {
        console.log(id);
        fetch("http://localhost:4000/book/Delete/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(result => result.json())
            .then(json => {
                if (json.success) {
                    console.log(json)
                    window.location.reload();

                } else {
                    console.log(json)
                }
            })
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
                                <li><a href="/">LOGOUT</a></li>
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
                <h2 className="title">Books Details</h2>
                    <div className="row content">
                        <div class="col-sm-2 sidenav">
                        </div>
                        <div class="col-sm-8 text-left">
                            {this.state.books.map(book =>
                                <div className="well">
                                    <ul>
                                        <li><span className="attribute">NAME : </span>"{book.name}"</li>
                                        <li><span className="attribute">AUTHOR: </span>{book.author}</li>
                                        <li><span className="attribute">DESCRIPTION : </span>{book.description}</li>
                                        <li><span className="attribute">PUBLISH YEAR : </span>{book.PublishYear}</li>
                                        <li><span className="attribute">PUBLISHER : </span>{book.Publisher}</li>
                                        <li><span className="attribute">AVAILABLE STOCK : </span>{book.Qty}</li>
                                        <div className="buttonlists">
                                            <Link to={"/edit/"+book._id} className="btn btn-info">Edit</Link>
                                            <button className="btn btn-danger" onClick={this.delete.bind(this, book._id)}>Delete</button>
                                        </div>
                                    </ul>
                                    <hr />
                                </div>
                            )
                            }
                        </div>


                    </div>
                </div>
                <Contact />
            </div>
        );
    }
}
export default Booklist;