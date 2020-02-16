import React from 'react';

class UserList extends React.Component{
    render(){
        var contenu;
        if(this.props.userlist.length===0){
            console.log("in no result");
            contenu=(<p style={{fontSize:30,color:"gray",fontFamily:"Century Gothic"}}>No result</p>);
        }
        else{
            contenu=(  
            <div className="listUsers">
                {this.props.userlist.map(function(u,index){
                    return (
                        <p className="link"  key={index} onClick={()=>this.props.setCurrentUser(u.idUser)}>{u.username}:{u.email}</p>
                    );
                }.bind(this))}
            </div>)
        }
        return(
            <div className="UserList">
                {contenu}    
            </div>    
        );
    }
}

export default UserList;