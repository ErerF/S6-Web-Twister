import React from 'react'
import NavigatePannel from './NavigatePannel';
import axios from 'axios';

class IndexPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            page: "connexion",
            access: false,
            cle: "",
            idUser: "",
            email: "",
            username: "",
            currentUser: "",
            crtUsername:"",
            crtEmail:"",
            allMsgs:[],
            currentUserMsgs:[],
            followers:[],
            followeds:[],
            alreadyFollowed:true,

            nbUser:0,
            nbMsgs:0,
            userlist:[]
        };

        this.setConnexion = this.setConnexion.bind(this);
        this.setUser = this.setUser.bind(this);
        this.pasInscrit = this.pasInscrit.bind(this);
        this.pwdForget = this.pwdForget.bind(this);
        this.dejaInscrit = this.dejaInscrit.bind(this);
        this.clickHome=this.clickHome.bind(this);
        this.clickStatic = this.clickStatic.bind(this);
        this.clickProfil = this.clickProfil.bind(this);
        this.clickSearch=this.clickSearch.bind(this);
        this.saveUserList=this.saveUserList.bind(this);
        this.clickLogout=this.clickLogout.bind(this);
        this.setCurrentUser=this.setCurrentUser.bind(this);
        this.chargerAllMsgs=this.chargerAllMsgs.bind(this);
        this.saveAllMsgs=this.saveAllMsgs.bind(this);
        this.chargerCurrentUserMsgs=this.chargerCurrentUserMsgs.bind(this);
        this.saveCurrentUserMsgs=this.saveCurrentUserMsgs.bind(this);

        this.saveBasicInfo=this.saveBasicInfo.bind(this);
        this.chargerFollowers=this.chargerFollowers.bind(this);
        this.saveFollwers=this.saveFollwers.bind(this);
        this.chargerFolloweds=this.chargerFolloweds.bind(this);
        this.saveFollweds=this.saveFollweds.bind(this);
        this.addFollow=this.addFollow.bind(this);
        this.saveFollow=this.saveFollow.bind(this);
        this.rmvFollow=this.rmvFollow.bind(this);
        this.loadStats=this.loadStats.bind(this);
    }

    pasInscrit(){
        this.setState({
            page:"inscription"
        })
    }
    pwdForget(){
        this.setState({
            page:"resetPwd"
        })
    }
    dejaInscrit(){
        this.setState({
            page:"connexion"
        })
    }
    setConnexion(){
        this.setState({
            access:true,
            page:"home"
        });        
    }
    setUser(cle, id, user, mail){
        this.setState({
            cle:cle,
            idUser: id,
            email: mail,
            username: user,
            currentUser:id,
            crtUsername:user,
            crtEmail:mail
        });
        this.chargerAllMsgs(id);
        this.chargerCurrentUserMsgs(id);
        this.chargerFollowers(id);
        this.chargerFolloweds(id);
    }
    setCurrentUser(id){
        this.setState({
            currentUser:id,
            alreadyFollowed:true,
            page:"profil"
        });

        if(this.state.cle!==undefined && this.state.cle!==""){
            const url="http://localhost:8080/Projet_FENG_XU/search_user?";
            var fromData=new URLSearchParams();
            fromData.append("key",this.state.cle);
            fromData.append("idUser",id);  
            axios.get(url+fromData)
                .then(res=>{this.saveBasicInfo(res)})
        }
        
        this.chargerAllMsgs(id);
        this.chargerCurrentUserMsgs(id);
        this.chargerFollowers(id);
        this.chargerFolloweds(id);
    }

    clickHome(){
        this.setCurrentUser(this.state.idUser);
        this.setState({
            page:"home",
        })        
    }
    clickProfil(){
        this.setState({
            page:"profil",
        });
        this.setCurrentUser(this.state.idUser);
    }
    clickStatic(){
        this.setState({
            page:"static",
        });
    }
    clickSearch(n){
        if(this.state.cle!==undefined && this.state.cle!==""){
            const url="http://localhost:8080/Projet_FENG_XU/search_username?";
            var fromData=new URLSearchParams();
            fromData.append("username",n);
            axios.get(url+fromData)
                .then(res=>this.saveUserList(res))
        }       
    }
    saveUserList(r){        
        var u=r.data["users"];
        if(u===undefined){
            this.setState({userlist:[]});
        }
        else{
            if(!Array.isArray(u)){
                u=[u];
            }
            this.setState({userlist:u});
        }
        this.setState({
            page:"search",
        });
    }
    clickLogout(){
        const url="http://localhost:8080/Projet_FENG_XU/logout?";
        var fromData=new URLSearchParams();
        fromData.append("key",this.state.cle);
        axios.get(url+fromData).then(response=>{
            if(response.data["code"] === 0){
                this.setState({
                    access:false,
                    page:"connexion",
                    cle:"",
                    idUser: "",
                    email: "",
                    username: "",
                    currentUser:""
                })
            }
        })        
    }

    saveBasicInfo(r){
        this.setState({
            crtUsername:r.data["username"],
            crtEmail:r.data["email"]
        });
        if(r.data["followed"]===1){
            this.setState({alreadyFollowed:true});
        }
        else{
            this.setState({alreadyFollowed:false});
        }
    }

    chargerAllMsgs(id){
        if(this.state.cle!==undefined&& this.state.cle!==""){
            const url="http://localhost:8080/Projet_FENG_XU/list_msg?";
            var fromData=new URLSearchParams();
            fromData.append("key",this.state.cle);
            fromData.append("id_author","");  
            axios.get(url+fromData)
                .then(res=>this.saveAllMsgs(res))
        }        
    }
    saveAllMsgs(r){
        var m=r.data["msgs"];
        if(m===undefined){
            this.setState({allMsgs:[]});
        }
        else{
            if(!Array.isArray(m)){
                m=[m];
            }
            this.setState({allMsgs:m});
        }
        this.loadStats();
    }

    chargerCurrentUserMsgs(id){
        if(this.state.cle!==undefined&& this.state.cle!==""){
            const url="http://localhost:8080/Projet_FENG_XU/list_msg?";
            var fromData=new URLSearchParams();
            fromData.append("key",this.state.cle);
            fromData.append("id_author",id);  
            axios.get(url+fromData)
                .then(res=>this.saveCurrentUserMsgs(res))
        }        
    }    
    saveCurrentUserMsgs(r){
        var m=r.data["msgs"];
        if(m===undefined){
            this.setState({currentUserMsgs:[]});
        }
        else{
            if(!Array.isArray(m)){
                m=[m];
            }
            this.setState({currentUserMsgs:m});
        }
    }

    chargerFollowers(id){
        if(this.state.cle!==undefined&& this.state.cle!==""){
            const url="http://localhost:8080/Projet_FENG_XU/list_foll?";
            var fromData=new URLSearchParams();
            fromData.append("key",this.state.cle);
            fromData.append("id_follower","");
            fromData.append("id_followed",id);  
            axios.get(url+fromData).then(response=>{this.saveFollwers(response)});
        }        
    }
    saveFollwers(r){
        var f=r.data["followers"];
        if(f===undefined){
            this.setState({followers:[]});
        }        
        else{
            if(!Array.isArray(f)){
                f=[f];
            }
            this.setState({followers:f});
        }
    }

    chargerFolloweds(id){
        if(this.state.cle!==undefined&& this.state.cle!==""){
            const url="http://localhost:8080/Projet_FENG_XU/list_foll?";
            var fromData=new URLSearchParams();
            fromData.append("key",this.state.cle);
            fromData.append("id_follower",id);
            fromData.append("id_followed","");  
            axios.get(url+fromData).then(response=>{this.saveFollweds(response)});
        }
    }
    saveFollweds(r){
        var f=r.data["followeds"];
        if(f===undefined){
            this.setState({followeds:[]});
        }
        else{
            if(!Array.isArray(f)){
                f=[f];
            }
            this.setState({followeds:f});
        }
    }

    addFollow(){
        if(this.state.cle!==undefined && this.state.cle!==""){
            const url="http://localhost:8080/Projet_FENG_XU/add_foll?";
            var fromData=new URLSearchParams();
            fromData.append("key",this.state.cle);
            fromData.append("id_friend",this.state.currentUser); 
            axios.get(url+fromData).then(response=>this.saveFollow(response));
        }        
    }
    saveFollow(r){
        if(r.data["code"]===0){
            this.setState({alreadyFollowed:true});
        }  
        else if(r.data["code"]===-5)
        {
            alert(r.data["message"]);
            this.clickLogout();
        }              
    }

    rmvFollow(id){
        if(this.state.cle!==undefined && this.state.cle!==""){
            const url="http://localhost:8080/Projet_FENG_XU/rmv_foll?";
            var fromData=new URLSearchParams();
            fromData.append("key",this.state.cle);
            fromData.append("id_friend",id); 
            axios.get(url+fromData).then(response=>this.chargerFolloweds(this.state.idUser));
        }     
    }

    loadStats(){
        const url1="http://localhost:8080/Projet_FENG_XU/nb_user?";
        axios.get(url1).then(response1=>{
            if(response1.data["code"]===0){
                this.setState({nbUser:response1.data["nbUser"]})
            }
            else if(response1.data["code"]===-5)
                {
                    alert(response1.data["message"]);
                    this.clickLogout();
                }    
        })

        const url2="http://localhost:8080/Projet_FENG_XU/nb_msgs?";
        axios.get(url2).then(response2=>{
            if(response2.data["code"]===0){
                this.setState({nbMsgs:response2.data["nbMsgs"]})
            }
            else if(response2.data["code"]===-5)
            {
                alert(response2.data["message"]);
                this.clickLogout();
            }    
        })

    }

    render(){
        return (
            <div>
                <NavigatePannel 
                    setConnexion = {this.setConnexion}

                    pasInscrit = {this.pasInscrit}
                    pwdForget = {this.pwdForget}
                    dejaInscrit = {this.dejaInscrit}

                    clickHome = {this.clickHome}
                    clickProfil = {this.clickProfil}
                    clickStatic = {this.clickStatic}
                    clickSearch={this.clickSearch}
                    clickLogout={this.clickLogout}

                    page = {this.state.page}
                    access = {this.state.access}
                    setUser = {this.setUser}

                    cle = {this.state.cle}
                    idUser={this.state.idUser}

                    email = {this.state.email}
                    username = {this.state.username}
                    userlist={this.state.userlist}

                    setCurrentUser={this.setCurrentUser}

                    allMsgs={this.state.allMsgs}
                    chargerAllMsgs={this.chargerAllMsgs}
                    currentUserMsgs={this.state.currentUserMsgs}
                    chargerCurrentUserMsgs={this.chargerCurrentUserMsgs}

                    followers={this.state.followers}
                    chargerFollowers={this.chargerFollowers}
                    followeds={this.state.followeds}
                    chargerFolloweds={this.chargerFolloweds}

                    username={this.state.username}
                    email={this.state.email}
                    crtUsername={this.state.crtUsername}
                    crtEmail={this.state.crtEmail}
                    canFollow={this.state.idUser!==this.state.currentUser}
                    addFollow={this.addFollow}
                    alreadyFollowed={this.state.alreadyFollowed}
                    rmvFollow={this.rmvFollow}

                    nbUser={this.state.nbUser}
                    nbMsgs={this.state.nbMsgs}
                />
            </div>
        );
    }
}
export default IndexPage;
