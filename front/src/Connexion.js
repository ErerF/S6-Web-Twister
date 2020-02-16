import React from 'react';
import axios from 'axios';
import logo from './img/TwisterLOGO_VersionLight.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './custom.css';


class Connexion extends React.Component{
    constructor(props){
		super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
    }

	handleSubmit(){
		const url = "http://localhost:8080/Projet_FENG_XU/login?";
		var formData = new URLSearchParams();
		formData.append("login", this.refs.email.value);
		formData.append("password", this.refs.pwd.value);
        axios.get(url+formData).then(response=>this.handleResponse(response));
    }
    
	handleResponse(response){
		if(response.data["code"] === 0){
			this.props.setConnexion()
            this.props.setUser(response.data["key"],response.data["idUser"],response.data["username"], response.data["login"])
		}else{
			alert(response.data["message"])
		}
	}
    
    render(){
        return (
            <div className="container-fluid" style={{padding:0}}>
                <div className="row-fluid" style={{padding:0}}>
                    <div className="right_part col-xs-offset-0 col-xs-12 col-sm-offset-0 col-sm-12 col-md-offset-0 col-md-6" style={{padding:0}}>
                        <div className="col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8">
                            <div className="title">Je me connecte</div>
                            <form>
                                <div className="form-group">
                                    <div className="col-sm-13">
                                        <input ref="email" className="form-input form-control" type="email" autoFocus="autoFocus" placeholder="Email"/>
                                    </div>
                                </div>        
                                <div className="form-group">
                                    <div className="col-sm-13">
                                        <input ref="pwd" className="form-input form-control" type="password" placeholder="Password"/>
                                    </div>
                                </div> 

                                        <button onClick={this.handleSubmit} className="btn btn-block orange-background white" type="button" style={{marginTop:40,marginBottom:10}}>Je me connecte</button>
                                    
                                
                            </form>

                            <a onClick={this.props.pwdForget} style={{float:"right"}}>Mot de passe oublié?</a>
                            <br/>
                            <a onClick={this.props.pasInscrit} style={{float:"right"}}>Pas encore inscrit?</a>

                        </div>
                    </div>

                    <div className="left_part col-xs-offset-0 col-xs-12 col-sm-offset-0 col-sm-12 col-md-offset-0 col-md-6" style={{padding:0}}>
                        <div className="info">
                            <img className="logo" height="90" width="auto" src={logo}/>
                            Welcome to twister
                        </div>        
                    </div>
                </div>
            </div>
            );
    }
}

export default Connexion;