import React from 'react';
//import axios from 'axios';
import NameCard from './NameCard.js';
import Statistique from './Statistique.js';
import UserList from './UserList.js';

class SearchResult extends React.Component{
    render(){
        return (
            <div className="Home">
                <div className="col-xs-3">
                    <NameCard 
                        username={this.props.username}
                        email={this.props.email}
                    />
                </div>
                <div className="col-xs-6">
                    <UserList
                        userlist={this.props.userlist}
                        setCurrentUser={this.props.setCurrentUser}
                    />
                </div>
                <div className="col-xs-3">
                    <Statistique
                        nbUser={this.props.nbUser}
                        nbMsgs={this.props.nbMsgs}
                    />
                </div>
            </div>
        );
    }
}

export default SearchResult;