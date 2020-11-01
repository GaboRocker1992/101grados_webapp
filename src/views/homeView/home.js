import React, {Component} from "react";
import AuthorInfo from "../../utils/AuthorInfo";
import AutorInfo from "../../utils/AuthorInfo";
import Avatar from "@material-ui/core/Avatar";
import authorImg from "../../img/author.jpg";

import {Strings} from "../../utils/Strings";

class Home extends Component{
    //Creating Strings Object
    strings = Strings();

    render(){
        return(
           <div style = {{width: "100%", paddingTop: 100, display: "flex", flexDirection: "column", justifyContent: "center", margin: "auto", alignSelf: "center"}}>
                <Avatar
                        style = {{marginLeft: "auto", marginRight: "auto", marginTop: 20, marginBottom: 20, height: 300, width: 300}}  
                        src = {authorImg}/>
                <h1 style = {{margin: "auto", fontWeight: "bold"}}>{AutorInfo.author}</h1>
                <h2 style = {{margin: "auto"}}>{AutorInfo.profession}</h2>
                <h3 style = {{margin: "auto"}}>{AuthorInfo.phone}</h3>
                <h3 style = {{margin: "auto"}}>{AuthorInfo.mail}</h3>
           </div>
        );
    }
}

export default Home;


