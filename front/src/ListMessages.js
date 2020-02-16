import React from 'react'
import Message from './Message';

class ListMessages extends React.Component{
    render(){
        var contenu;
        const l=this.props.listMessages.slice(0);
        if(l.length===0){
            contenu=(<p style={{fontSize:30,color:"gray",fontFamily:"Century Gothic"}}>No twister published.</p>);
        }
        else{
            const lr=l.reverse();
            contenu=(
                <div>
                    {lr.map((m)=><Message 
                        key={m.date}
                        msg={m}
                        idUser = {this.props.idUser}
                        cle = {this.props.cle}
                        chargerMsgs={this.props.chargerMsgs}
                    />)} 
                </div>
            )
        }
        
        return(
            <div className="listMessages">
                {contenu} 
            </div>
        );
    }
}

export default ListMessages;