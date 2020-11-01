import React, {Component} from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Avatar from "@material-ui/core/Avatar";

import InputAdornment from "@material-ui/core/InputAdornment";

import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";


import {Strings} from "../../utils/Strings";

export default class WatchMovie extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,

            isLoaded: false,
            listOfActors: ""
        };

        
    }

    md5 = require("md5");

    //Creating Strings Object
    strings = Strings();

    componentDidMount(){
        this.getMovieCast(JSON.parse(this.props.currentMovie).cast);

        this.setState({
            openModal: this.props.openWatchMoview

        });
    }

    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });

    openModal = () => {
        this.setState({
            openModal: true
        });
    };

    closeModal = () => {
        this.props.onClick("reset")
        this.setState({
            openModal: false
        });
    };

    getMovieCast = (cast) => {
        fetch(this.strings.apiHost + this.strings.getMovieCast + "/" + this.md5(this.strings.getToken)+"/"+cast)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.header === "OK" && result.size > 0){
                    this.setState({
                        isLoaded: true,
                        listOfActors: JSON.stringify(result.body),

                    });
                }else{
                    alert(result.response.header + ": " +result.response.message);
                    this.setState({
                        isLoaded: false,
                        listOfActors: ""
                    });
                }
            },

            (error) => {
                alert("Error: "+ error);
                this.setState({
                    isLoaded: false,
                    listOfActors: ""
                });
            }
        )
    }

    renderCastMovie = () => {
        return(
            <div style = {{marginTop: 20}}>
                <h4>Reparto</h4>
                {JSON.parse(this.state.listOfActors).map((dataRow, i) => {
                    return(
                        <div style = {{display: "flex", flexDirection: "row", marginTop: 20,}}>
                            <TextField
                                style = {{width: "100%"}} 
                                id = "input-with-icon-textfield"
                                label = ""
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Avatar src = {dataRow.url_photo}/>
                                        </InputAdornment>
                                    ),
                                }}
                                defaultValue = {dataRow.actor_name + ". " + dataRow.age + " años."}
                                variant = "outlined"
                            />
                        </div>
                    )
                    ;
                })}
            </div>
        );
    }

    render(){
        return(
            <Dialog
                open = {this.state.openModal}
                TransitionComponent = {this.Transition}
                keepMounted
                onClose = {this.closeModal}
                aria-labelledby = "alert-dialog-slide-title"
                aria-describedby = "alert-dialog-slide-description">
                
                <DialogTitle id = "alert-dialog-slide-title">{"Información de la película"}</DialogTitle>
                <DialogContent>
                <form style = {{width: 500}} noValidate autoComplete="off">
                    
                    <h1>{this.props.currentMovie.length > 0 ? JSON.parse(this.props.currentMovie).name : ""}</h1>
                    <p>{this.props.currentMovie.length > 0 ? JSON.parse(this.props.currentMovie).duration + " minutos." : ""}</p>
                    
                    <TextField
                        style = {{width: "100%", marginTop: 20}} 
                        id = "outlined-read-only-input"
                        label = "Sinopsis"
                        defaultValue = {this.props.currentMovie.length > 0 ? JSON.parse(this.props.currentMovie).sinopsis : ""}
                        InputProps = {{
                            readOnly: true,
                        }}
                        variant = "outlined"/>

                    {this.state.isLoaded ?
                        this.renderCastMovie()
                    :
                        null
                    }
                   
                </form>
                </DialogContent>

                <DialogActions style = {{marginTop: 20}}>
                    <Button onClick = {this.closeModal} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}