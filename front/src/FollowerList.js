import React, { Component } from 'react';
import axios from 'axios';

class FollowerList extends Component{
    render(){
        return (
            <div className="FollowerList">
                <div className="Part-title" style={{fontSize:23}}>Follower(s):</div>
                {this.props.followers.map(function(f,index){
                    return (
                    <div key={index} style={{height:30,marginTop:10}}>
                        <p className="follow col-xs-10" onClick={()=>this.props.setCurrentUser(f.id_follower)}><span style={{fontStyle:"italic",fontWeight:"bold"}}>{f.username}:</span>{f.email}</p>
                    </div>
                        );
                    }.bind(this))
                }
            </div>
        );
    }
}

export default FollowerList;