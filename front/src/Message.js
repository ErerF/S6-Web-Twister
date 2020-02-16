import React from 'react';
import axios from 'axios';

class Message extends React.Component{
    constructor(props){
        super(props);
        this.handleDelete=this.handleDelete.bind(this);
    }

    handleDelete(){
        const url = "http://localhost:8080/Projet_FENG_XU/del_msg?";
        var fromData = new URLSearchParams();
        fromData.append("key", this.props.cle);
        fromData.append("id", this.props.msg._id);
        axios.get(url+fromData).then(response=>this.props.chargerMsgs(this.props.idUser));

    }

    render(){
        var msg=this.props.msg;
        var btn;
        if(msg.author_id===this.props.idUser){
            btn = (<button onClick={this.handleDelete} className="btn orange-background white" type="button" style={{marginTop:-5}}><span className="glyphicon glyphicon-remove"></span></button>)
        }
        return (
            
                <div className="Message" style={{marginBottom:20,height:200}}>

                    <div className="col-xs-11">
                        <div style={{fontSize:25,marginBottom:10}}>{msg.author_name}</div>
                        <p>{msg.text}</p>
                    </div>
                    
                    <div className="col-xs-1">
                        {btn}
                    </div>
                    
                    
                    <br/>                    
                </div>
                
            
            
        );
    }
}

export default Message;