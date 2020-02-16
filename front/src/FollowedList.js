import React, { Component } from 'react';
import axios from 'axios';

class FollowedList extends Component{
    render(){
        return (
            <div className="FollowedList">
                <div className="Part-title" style={{fontSize:23}}>Followed(s):</div>
                {this.props.followeds.map(function(f,index){
                    return (
                        <div key={index} style={{height:30,marginTop:10}}>
                            <p className="follow col-xs-10" key={index} onClick={()=>this.props.setCurrentUser(f.id_followed)}><span style={{fontStyle:"italic",fontWeight:"bold"}}>{f.username}:</span>{f.email}</p>
                            {
                                this.props.canFollow?"":(
                                    <div className="follow col-xs-2">
                                        <button className="btn orange-background white" onClick={()=>this.props.rmvFollow(f.id_followed)} type="button" style={{marginTop:-5}}><span className="glyphicon glyphicon-remove"></span></button>
                                    </div>
                                )
                            }                            
                        </div>
                        );
                    }.bind(this))                        
                }
            </div>
        );
    }
}

export default FollowedList;