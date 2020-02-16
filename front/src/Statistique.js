import React from 'react';

class Statistique extends React.Component{
    render(){
        return(
            <div className="Statistique">
            <div className="Part-title" style={{fontWeight:"normal"}}>Static</div>
                User total:  
                <span style={{fontSize:30,fontWeight:"bolder",marginLeft:13}}>{this.props.nbUser}</span>
                <br/>
                Message total:
                <span style={{fontSize:30,fontWeight:"bolder",marginLeft:13}}>{this.props.nbMsgs}</span>
            </div>
        );
    }
}

export default Statistique;