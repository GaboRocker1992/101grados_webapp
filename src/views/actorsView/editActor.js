import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import InputBase from "@material-ui/core/InputBase";

import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Avatar from "@material-ui/core/Avatar";

import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import md5 from "md5";
import {Strings} from "../../utils/Strings";

import firebase from "../../firebase";

export default class EditActor extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            
            actorId: "0",
            actorName: "",
            actorAge: "",
            actorImageUploaded: "",
            showImageError: false,

            actorNameError: "",
            actorAgeError: "",
            actorImageError: "",

            accionUrl: this.strings.apiHost + this.strings.saveActor,
        };

        //Convert Image to Base 64 (Ya no lo utilizo)
        this.getBase64 = this.getBase64.bind(this)
    }

    md5 = require('md5');

    //Creating Strings Object
    strings = Strings();

    componentDidMount(){
        this.setState({
            openModal: this.props.openModalActor

        });

        if(this.props.currentActor.length > 0){
            this.setState({
                accionUrl: this.strings.apiHost + this.strings.updateActor,
                actorId: JSON.parse(this.props.currentActor).id,
                actorName: JSON.parse(this.props.currentActor).actor_name,
                actorAge: JSON.parse(this.props.currentActor).age,
                actorImageUploaded: JSON.parse(this.props.currentActor).url_photo
            });
        }
    }

    //Setting transition for modal
    Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction = "up" ref={ref} {...props} />;
    });

    openModal = () => {
        this.setState({
            openModal: true
        });
    };

    //Convert Image to Base 64 (Ya no no lo utilizo)
    getBase64(e) {
        var file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {  
            this.setState({
                actorImageUploaded: reader.result
            })
        };
        reader.onerror = function (error) {
            this.setState({
                actorImageUploaded: "",
            })
            alert("Error: ", error);
        }
    }

    closeModal = () => {
        this.props.onClick("reset")
        this.setState({
            openModal: false
        });
    };

    
    uploadImageToFirebase = (e) =>{
        let file = e.target.files[0];
        let bucketName = "img";
        let storageRef = firebase.storage().ref(bucketName+ "/" + file.name);
        let uploadTask = storageRef.put(file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
            'complete': () => {
                storageRef.getDownloadURL().then((url) => {
                    this.setState({
                        actorImageUploaded: url
                    })
               })
            }
        });

        
    }

    //Validation for Edit Actor Form
    isValidActor = () => {
        let flagValidateActor = true;

        let errorNameActorMessg = "";
        if(this.state.actorName.length === 0){
            flagValidateActor = false;
            errorNameActorMessg = this.strings.errorEmptyActorNameMssg;
        }
        this.setState({ actorNameError: errorNameActorMessg });

        let errorAgeActorMssg = "";
        if(this.state.actorAge.length === 0){
            flagValidateActor = false;
            errorAgeActorMssg = this.strings.errorEmptyActorAgeMssg;
        }
        if(isNaN(this.state.actorAge)){
            flagValidateActor = false;
            errorAgeActorMssg = this.strings.errorNotValidActorAgeMssg;
        }
        this.setState({ actorAgeError: errorAgeActorMssg });

        
        let errorImageActorMssg = "";
        let flagShowImageError = false;
        if(this.state.actorImageUploaded.length === 0){
            flagValidateActor = false;
            flagShowImageError = true;
            errorImageActorMssg = this.strings.errorEmptyActorImageMssg;
        }
        this.setState({
            actorImageError: errorImageActorMssg,
            showImageError: flagShowImageError
        });

        return flagValidateActor;
    }

    //Edit or Save Actor
    saveActorData = () => {
        if(this.isValidActor()){
            const requestOption = {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: md5(this.strings.getToken),
                    id: this.state.actorId,
                    actor_name: this.state.actorName,
                    age: this.state.actorAge,
                    url_photo: this.state.actorImageUploaded
                })
            } 

            fetch(this.state.accionUrl, requestOption)
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.header === "OK" && result.size > 0){
                        alert(result.header+ ": "+result.message );
                        this.closeModal();
                    }else{
                        alert(result.response.header + ": " +result.response.message);
                    }
                },

                (error) => {
                    alert("Error: "+ error);
                }
            )
        }
    }

    render(){
        return(
            <Dialog
                open={this.state.openModal}
                TransitionComponent={this.Transition}
                keepMounted
                onClose={this.closeModal}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                
                <DialogTitle id="alert-dialog-slide-title">{this.props.currentActor.length > 0 ? this.strings.editActorTitle : this.strings.saveActorTitle }</DialogTitle>
                <DialogContent>
                    <form style = {{width: 500}} noValidate autoComplete="off">
                        <TextField 
                            style = {{width: "100%"}} 
                            id = "outlined-basic" 
                            label = {this.strings.labelActorName}  
                            variant = "outlined"
                            onChange = {(event) => this.setState({
                                actorName: event.target.value
                            })} 
                            helperText = {this.state.actorNameError}
                            defaultValue = {this.props.currentActor.length > 0 ? JSON.parse(this.props.currentActor).actor_name : ""}/>

                        <TextField 
                            style = {{width: "100%", marginTop: 20}} 
                            id = "outlined-basic" 
                            label = {this.strings.labelActorAge} 
                            variant = "outlined" 
                            onChange = {(event) => this.setState({
                                actorAge: event.target.value
                            })} 
                            helperText = {this.state.actorAgeError}
                            defaultValue = {this.props.currentActor.length > 0 ? JSON.parse(this.props.currentActor).age : ""}/>
                    
                        <Avatar
                            style = {{marginLeft: "auto", marginRight: "auto", marginTop: 20, height: 150, width: 150}}  
                            src = {this.state.actorImageUploaded}/>
                        {this.state.showImageError ? 
                            <InputBase
                                disabled
                                style = {{width: "100%"}} 
                                value  = {this.state.actorImageError}
                                defaultValue = ""
                                inputProps = {{ 'aria-label': 'naked', style: { textAlign: 'center' } }}
                            />
                        : 
                            null
                        }
                    
                        <div style = {{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                            <input accept = "image/*" style = {{display: "none"}} id = "icon-button-file" type = "file" onChange = {(e) => this.uploadImageToFirebase(e)}/>
                            <label htmlFor = "icon-button-file" style = {{marginLeft: "auto", marginRight: "auto"}}>
                                Seleccione una archivo de Imagen
                                <IconButton color = "primary" aria-label = "upload picture" component = "span" > 
                                <PhotoCamera  fontSize = "large"/>
                                </IconButton>
                            </label>
                        </div>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick = {this.closeModal} color = "primary"> {this.strings.cancelButton} </Button>

                    <Button onClick = {this.saveActorData} color = "primary"> {this.strings.saveButton} </Button>
                </DialogActions>
            </Dialog>
        );
    }
}