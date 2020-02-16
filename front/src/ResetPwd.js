import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './custom.css';

class ResetPwd extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleResponse=this.handleResponse.bind(this);
    }

    handleSubmit(){
        if(this.refs.cof_pwd.value === this.refs.pwd.value){
            const url = "http://localhost:8080/Projet_FENG_XU/reset_pwd?";
            var fromData = new URLSearchParams();
            fromData.append("login", this.refs.email.value);
            fromData.append("password", this.refs.pwd.value);
            axios.get(url+fromData).then(response=>this.handleResponse(response));
        }
        else{
            alert("verfication password fail")
        }
    }

    handleResponse(response){
        if(response.data["code"] === 0){
            this.props.dejaInscrit()
            alert("Reset successfully")
		}else{
			alert(response.data["message"])
		}
    }

    render(){
        return(
            <div className="container-fluid" style={{padding:0}}>
                <div className="row-fluid" style={{padding:0}}>
                    <div className="col-xs-offset-1 col-xs-10 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4" style={{marginTop:50}}>
                        <div className="title">Reset mot de passe</div>
                        <form>
                                <div className="form-group">
                                    <label className="form-label">Email:</label>
                                    <div className="col-sm-13">
                                        <input ref="email" className="form-input form-control" type="email" autoFocus="autoFocus" placeholder="Email"/>
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

                                        <button onClick={this.handleSubmit} className="btn btn-block orange-background white" type="button" style={{marginTop:40,marginBottom:10}}>Reset</button>
                            </form>

                            <a onClick={this.props.pasInscrit}>Pas encore inscrit?</a>
                            <br/>
                            <a onClick={this.props.dejaInscrit}>Login</a>

                    </div>
                </div>
            </div>
        );
    }

}

export default ResetPwd;