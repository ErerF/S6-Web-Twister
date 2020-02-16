import React from 'react';
import NameCard from './NameCard.js';
import FollowerList from './FollowerList';
import FollowedList from './FollowedList';
import ListMessages from './ListMessages.js';
import AddMessage from './AddMessage.js';

class Profil extends React.Component{
    render(){
        return (
            <div className="Home">
                <div className="col-xs-3">
                    <NameCard 
                        currentUser={this.props.currentUser}
                        username={this.props.crtUsername}
                        email={this.props.crtEmail}
                        canFollow={this.props.canFollow}
                        addFollow={this.props.addFollow}
                        alreadyFollowed={this.props.alreadyFollowed}
                    />
                </div>
                <div className="col-xs-6">
                    {this.props.canFollow?"":(
                        <AddMessage
                            cle = {this.props.cle}
                            idUser={this.props.idUser}
                            chargerMsgs={this.props.chargerCurrentUserMsgs}
                            clickLogout={this.props.clickLogout}
                        />
                        )
                    } 
                    <ListMessages
                        cle = {this.props.cle}
                        listMessages = {this.props.currentUserMsgs}
                        idUser = {this.props.idUser}
                        chargerMsgs={this.props.chargerCurrentUserMsgs}
                    />
                </div>

                <div className="col-xs-3">
                    <FollowerList 
                        cle = {this.props.cle}
                        setCurrentUser={this.props.setCurrentUser}
                        followers={this.props.followers}
                        chargerFollowers={this.props.chargerFollowers}
                    />
                    <FollowedList 
                        cle = {this.props.cle}
                        setCurrentUser={this.props.setCurrentUser}
                        followeds={this.props.followeds}
                        chargerFolloweds={this.props.chargerFolloweds}
                        rmvFollow={this.props.rmvFollow}
                    />
                </div>

                <div>
                    
                </div>
            </div>
        );
    }
}

export default Profil;