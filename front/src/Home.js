import React from 'react';
//import axios from 'axios';
import NameCard from './NameCard.js';
import AddMessage from './AddMessage.js';
import ListMessages from './ListMessages.js';
import Statistique from './Statistique.js';

class Home extends React.Component{
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
                    <AddMessage
                        cle = {this.props.cle}
                        idUser={this.props.idUser}
                        chargerMsgs={this.props.chargerAllMsgs}
                        clickLogout={this.props.clickLogout}
                    />
                    <ListMessages
                        cle = {this.props.cle}
                        listMessages = {this.props.allMsgs}
                        idUser = {this.props.idUser}
                        chargerMsgs={this.props.chargerAllMsgs}
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

export default Home;