import React from 'react';
import './custom.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import logo from './img/TwisterLOGO_VersionColor.png';

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.handleSearch=this.handleSearch.bind(this);
    }

    handleSearch(){
        if(this.refs.search.value!=="")
            this.props.clickSearch(this.refs.search.value);        
    }

    render(){
        return(
            <div className="container-fluid" style={{padding:0, height:90}}>
                <div className="row-fluid" style={{padding:0, height:90}}>
                    <div className="Menu col-xs-12">
                        <div className="col-xs-offset-1 col-xs-10">

                            <div className="col-xs-1 mx-auto">
                                <img className="logo" height="30" width="auto" src={logo} onClick={this.props.clickHome}/>
                            </div>

                            <div className="col-xs-1 mx-auto">
                                
                            </div>

                            <div className="col-xs-2">
                                <a onClick={this.props.clickHome}><span className="glyphicon glyphicon-home" style={{marginRight:10}}></span>Home</a>
                            </div>

                            <div className="col-xs-2">
                                <a onClick={this.props.clickProfil}><span className="glyphicon glyphicon-user" style={{marginRight:10}}></span>Profil</a>
                            </div>

                            <div className="col-xs-2">
                                <a onClick={this.props.clickStatic}><span className="glyphicon glyphicon-stats" style={{marginRight:10}}></span>Static</a>
                            </div>

                            <div className="col-xs-3">
                                <div className="col-lg-12">
                                    <div className="input-group">
                                        <input type="text" className="search form-control" ref="search" placeholder="Recherchez sur Twister"/>
                                        <span className="input-group-btn" style={{position:"relative",top:-10}}>
                                            <button onClick={()=>this.handleSearch()} className="btn orange-background white" type="button"><span className="glyphicon glyphicon-search"></span></button>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-1">
                                <a onClick={this.props.clickLogout}>Logout</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;