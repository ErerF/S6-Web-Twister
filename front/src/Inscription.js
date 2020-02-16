import React from 'react';
import axios from 'axios';
import logo from './img/TwisterLOGO_VersionLight.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './custom.css';

class Inscription extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){
        if(this.refs.cof_pwd.value === this.refs.pwd.value){
            const url = "http://localhost:8080/Projet_FENG_XU/new_user?";
            var formData = new URLSearchParams();
            formData.append("nom", this.refs.nom.value);
            formData.append("prenom", this.refs.prenom.value);
            formData.append("email", this.refs.email.value);
            formData.append("username", this.refs.username.value);
            formData.append("password", this.refs.pwd.value);
            axios.get(url+formData).then(response=>this.handleResponse(response));
        }
        else{
            alert("verfication password fail")
        }
    }

    handleResponse(response){
        if(response.data["code"] === 0){
            this.props.setConnexion()
            this.props.setUser(response.data["key"],response.data["idUser"],response.data["username"], response.data["login"])
        }
        else{
            alert(response.data["message"])
        }
    }

    render(){
        return(
            <div className="container-fluid" style={{padding:0}}>
                <div className="row-fluid" style={{padding:0}}>
                    <div className="right_part col-xs-offset-0 col-xs-12 col-sm-offset-0 col-sm-12 col-md-offset-0 col-md-6" style={{padding:0}}>
                        <div className="col-xs-offset-1 col-xs-10 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8">
                            <div className="title">S'inscrire maintenant!</div>
                                <form>
                                    <div className="form-group">
                                        <label className="form-label">Email:</label>
                                        <div className="col-sm-13">
                                            <input ref="email" className="form-input form-control" type="email" autoFocus="autoFocus" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Username:</label>
                                        <div className="col-sm-13">
                                            <input ref="username" className="form-input form-control" type="text" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Nom:</label>
                                        <div className="col-sm-13">
                                            <input ref="nom" className="form-input form-control" type="text" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Prenom:</label>
                                        <div className="col-sm-13">
                                            <input ref="prenom" className="form-input form-control" type="text" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Mot de passe:</label>
                                        <div className="col-sm-13">
                                            <input ref="pwd" className="form-input form-control" type="password" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Confirmer le mot de passe:</label>
                                        <div className="col-sm-13">
                                            <input ref="cof_pwd" className="form-input form-control" type="password" />
                                        </div>
                                    </div>
                                
                                    <button onClick={this.handleSubmit} className="btn btn-block orange-background white" type="button" style={{marginTop:40,marginBottom:10}}>Je m'inscris</button>

                                </form>

                                <a onClick={this.props.dejaInscrit} style={{float:"right"}}>Déjà inscrit?</a>

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

export default Inscription;