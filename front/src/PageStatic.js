import React from 'react';

class PageStatic extends React.Component{
    render(){
        return(
            <div className="container">
                <div className="row">
                        <div className="title col-xs-2 col-xs-offset-5 mx-auto" style={{fontStyle:"normal", fontWeight:"normal"}}>Statistique</div>
                </div>
                <div className="row">
                    <div className="col-xs-4 col-xs-offset-2">
                        User total:  
                        <span style={{fontSize:30,fontWeight:"bolder",marginLeft:13}}>{this.props.nbUser}</span>
                    </div>   
                    <div className="col-xs-4 col-xs-offset-2">
                        Message total:
                        <span style={{fontSize:30,fontWeight:"bolder",marginLeft:13}}>{this.props.nbMsgs}</span>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default PageStatic;