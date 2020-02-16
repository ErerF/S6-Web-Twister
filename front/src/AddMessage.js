import React from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class AddMessage extends React.Component{
    constructor(props){
        super(props);

        this.handlePost = this.handlePost.bind(this)
        this.handleResponse = this.handleResponse.bind(this)
    }

    handlePost(){
        const url = "http://localhost:8080/Projet_FENG_XU/add_msg?";
        var fromData = new URLSearchParams();
        fromData.append("key", this.props.cle);
        fromData.append("text", this.refs.message.value);
        axios.get(url+fromData).then(response=>this.handleResponse(response)).catch(e=>alert(e));
    }

    handleResponse(response){        
        if(response.data["code"] === 0){
            this.refs.message.value="";
            this.props.chargerMsgs(this.props.idUser);
        }else if(response.data["code"]===-5){
            alert(response.data["message"]);
            this.props.clickLogout();
        }
    }

    render(){
        return(
            <div className="form-group" style={{marginBottom:60}}>
                <div className="col-sm-13">
                    <form>
                        <textarea className="form-control" ref="message" type="text" placeholder="Post your new twiste here" row="10" style={{height:160}}/>
                        <button onClick={()=>this.handlePost()} type="button" className="btn orange-background white" style={{marginTop:10,marginBottom:10, float:"right"}}>Post</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default AddMessage