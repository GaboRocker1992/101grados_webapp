import React, {Component} from "react";

import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DataTable from "../generalComponents/dataTableView";

import {GeneralStyle} from "../../utils/generalStyles";
import {Strings} from "../../utils/Strings";

class Actors extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            listOfActors: "",
            openModal: false
        };

        //Parent - Child Communication
        this.updateOpenModal = this.updateOpenModal.bind(this);
        this.resetActorModal = this.resetActorModal.bind(this);
    }

    updateOpenModal() {
        this.setState(state => ({
            openModal: true
        }));
    }

    resetActorModal() {
        this.setState(state => ({
            openModal: false
        }));
        this.getListOfActors();
    }

    md5 = require("md5");

    //Creating Strings Object
    strings = Strings();

    componentDidMount(){
        this.getListOfActors();
    }

    getListOfActors = () => {
        fetch(this.strings.apiHost + this.strings.getAllActors + "/" + this.md5(this.strings.getToken))
        .then(res => res.json())
        .then(
            (result) => {
                if(result.header === "OK" && result.size > 0){
                    this.setState({
                        isLoaded: true,
                        listOfActors: JSON.stringify(result.body),

                    });
                }else{
                    alert(result.response.header + ": " + result.response.message);
                    this.setState({
                        isLoaded: false,
                        listOfActors: ""
                    });
                }
            },

            (error) => {
                alert("Error: " + error);
                this.setState({
                    isLoaded: false,
                    listOfActors: ""
                });
            }
        )
    }

    render(){
        return(
            <div style = {GeneralStyle.body} heigth = "100%">
                <div style = {GeneralStyle.headerActor}>
                    <h1 style = {{flex: 1, alignSelf: "end"}}> {this.strings.actorTitle} </h1>
                    <Button
                        variant = "contained"
                        color = "primary"
                        style = {GeneralStyle.button}
                        onClick = {this.updateOpenModal}
                        endIcon = {<AddCircleOutlineIcon fontSize = "large"/>}>
                        {this.strings.addNewActorButton}
                    </Button>
                </div>

                {this.state.isLoaded ?
                    <DataTable 
                        headers = {this.strings.actorDataTableHeaders} 
                        dataSource = {this.state.listOfActors} 
                        comesFrom = "actors" 
                        openActorModalFromParent = {this.state.openModal} 
                        onClick = {this.resetActorModal}
                    /> 
                : 
                   null
                }
                
            </div>
        );
    }
}

export default Actors;


