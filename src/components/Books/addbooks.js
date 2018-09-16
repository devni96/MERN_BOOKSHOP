import React, { Component } from 'react';
import 'react-bootstrap';
import './addbooks.css';

class Addbook extends Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            author:'',
            description:'',
            publish_year:'',
            publisher:'',
            qty:''
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    handleChange(e){
        let target = e.target;
        let value = target.type ==='checkbox'?target.checked :target.value
        let name = target.name

        this.setState({
            [name]:value,
        });
    }
    handleSubmit(e){
        const book={
            name:this.state.name,
            author:this.state.author,
            description:this.state.description,
            publish_year:this.state.publish_year,
            publisher:this.state.publisher,
            qty:this.state.qty
        }
        e.preventDefault();
        fetch("http://localhost:4000/book/add",{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(book)
        })
        .then(res => res.json())
        .then(json => {
            if(json.success){
                console.log(json)
                this.resetForm();
            }else{

            }
          
        });


    }

    resetForm(){
        this.setState({
            ...this.state,
            name:'',
            author:'',
            description:'',
            publish_year:'',
            publisher:'',
            qty:''
        })
    }
    add() {
        return (
            <div>
                
                <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <h2 className="title">Add new Book Details</h2>
                    <form className="form-horizontal" >
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="email">Name:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="name" placeholder="Enter book name" name="name" value={this.state.name} onChange={this.handleChange} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Author:</label>
                            <div class="col-sm-8">
                                <input type="text" className="form-control" id="author" placeholder="Enter Auhtor name" name="author" value={this.state.author} onChange={this.handleChange} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Description:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="Description" placeholder="Enter book description" name="description" rows="4" cols="5" value={this.state.description} onChange={this.handleChange}  required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Published Year:</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="Description" placeholder="Enter book publish year" name="publish_year" rows="4" cols="5" value={this.state.publish_year} onChange={this.handleChange}  required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Publisher :</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="Description" placeholder="Enter book publisher" name="publisher" rows="4" cols="5" value={this.state.publisher} onChange={this.handleChange}  required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label col-sm-2" for="pwd">Quantity :</label>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" id="qty" placeholder="Enter book quantity" name="qty" value={this.state.qty} onChange={this.handleChange}  required/>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-5">
                                <button type="submit" class="btn btn-success">Submit</button>
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
                <div className="container-fluid text-center">
                    <div className="row content">
                        {this.add()}
                    </div>
                </div>

            </div>
        );
    }
}
export default Addbook;