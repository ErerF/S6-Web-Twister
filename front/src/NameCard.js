import React from 'react';
import axios from 'axios';
import "./custom.css";

class NameCard extends React.Component{
    render(){
        var btnFollow="";
        if(this.props.canFollow){
            if(this.props.alreadyFollowed){
                btnFollow=(<button className="btn btn-block gray-background" disabled="disabled" onClick={this.props.addFollow}>Followed</button>);
            }
            else{
                btnFollow=(<button className="btn btn-block white-background" onClick={this.props.addFollow}>Follow</button>);
            }
        }

        return(
            <div className="Namecard">
                <div className="Part-title">
                    {this.props.username}
                </div>
                <span style={{marginRight:10}} className="glyphicon glyphicon-envelope"></span><span style={{fontStyle:"italic"}}>{this.props.email}</span>
                <br/>{btnFollow}
            </div>
        );
    }
}

export default NameCard;