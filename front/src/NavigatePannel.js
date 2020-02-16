import React from 'react';
import Menu from './Menu.js'
import Home from './Home.js';
import Profil from './Profil.js';
import Connexion from './Connexion.js';
import Inscription from './Inscription.js';
import ResetPwd from './ResetPwd.js';
import PageStatic from './PageStatic.js';
import SearchResult from './SearchResult.js';

class NavigatePannel extends React.Component{
    render(){
        var contenu;
        var menu;
        if(!this.props.access){
            if(this.props.page==="connexion"){
                contenu=(<Connexion 
                    setConnexion = {this.props.setConnexion}
                    pasInscrit = {this.props.pasInscrit}
                    setUser = {this.props.setUser}
                    pwdForget = {this.props.pwdForget}/>);
            }
            else if(this.props.page==="inscription"){
                contenu=(<Inscription
                    setConnexion = {this.props.setConnexion}
                    dejaInscrit = {this.props.dejaInscrit}
                    setUser = {this.props.setUser}/>);
            }
            else{
                contenu=(<ResetPwd
                    dejaInscrit = {this.props.dejaInscrit}
                    pasInscrit = {this.props.pasInscrit}/>);
            }
        }else{
            menu = (<Menu 
                clickHome = {this.props.clickHome}
                clickProfil = {this.props.clickProfil}
                clickStatic = {this.props.clickStatic}
                clickSearch={this.props.clickSearch}
                clickLogout={this.props.clickLogout}
                />)
            if(this.props.page==="home"){
                contenu=(<Home 
                    cle = {this.props.cle}
                    email = {this.props.email}
                    username = {this.props.username}
                    setCurrentUser={this.props.setCurrentUser}
                    allMsgs={this.props.allMsgs}
                    chargerAllMsgs={this.props.chargerAllMsgs}
                    idUser = {this.props.idUser}
                    nbUser={this.props.nbUser}
                    nbMsgs={this.props.nbMsgs}
                    clickLogout={this.props.clickLogout}
                    />
                );
            }
            else if(this.props.page==="profil"){
                contenu=(<Profil
                    crtUsername={this.props.crtUsername}
                    crtEmail={this.props.crtEmail}
                    canFollow={this.props.canFollow}
                    addFollow={this.props.addFollow}
                    alreadyFollowed={this.props.alreadyFollowed}
                    cle={this.props.cle}
                    currentUserMsgs={this.props.currentUserMsgs}
                    chargerCurrentUserMsgs={this.props.chargerCurrentUserMsgs}
                    followers={this.props.followers}
                    chargerFollowers={this.props.chargerFollowers}
                    followeds={this.props.followeds}
                    chargerFolloweds={this.props.chargerFolloweds}
                    setCurrentUser={this.props.setCurrentUser}
                    idUser = {this.props.idUser}
                    rmvFollow={this.props.rmvFollow}
                    clickLogout={this.props.clickLogout}
                />
                )
            }
            else if(this.props.page==="search"){
                contenu=(<SearchResult
                    email = {this.props.email}
                    username = {this.props.username}
                    userlist={this.props.userlist}
                    setCurrentUser={this.props.setCurrentUser}
                    nbUser={this.props.nbUser}
                    nbMsgs={this.props.nbMsgs}
                />)
            }
            else{
                contenu=(<PageStatic
                    nbUser={this.props.nbUser}
                    nbMsgs={this.props.nbMsgs}
                />
                )
            }               
        }
        return(
            <div>
                {menu}
                {contenu}
            </div>
        );
    }
}

export default NavigatePannel;