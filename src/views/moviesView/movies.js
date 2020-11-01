import React, {Component} from "react";

import Button from "@material-ui/core/Button";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import DataTable from "../generalComponents/dataTableView";

import {GeneralStyle} from "../../utils/generalStyles";
import {Strings} from "../../utils/Strings";

class Movies extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            listOfMovies: "",
            openModal: false,
        };

        this.updateOpenModal = this.updateOpenModal.bind(this);
        this.resetModal = this.resetModal.bind(this);
    }

    updateOpenModal() {
        this.setState(state => ({
            openModal: true
        }));
    }

    resetModal() {
        this.setState(state => ({
            openModal: false
        }));
        this.getListOfMovies();
    }

    md5 = require("md5");
    
    //Creating Strings Object
    strings = Strings();

    componentDidMount(){
        this.getListOfMovies();
    }

    getListOfMovies = () => {
        fetch(this.strings.apiHost + this.strings.getAllMoviews + "/" + this.md5(this.strings.getToken))
        .then(res => res.json())
        .then(
            (result) => {
                if(result.header === "OK" && result.size > 0){
                    this.setState({
                        isLoaded: true,
                        listOfMovies: JSON.stringify(result.body),

                    });
                }else{
                    alert(result.response.header + ": " +result.response.message);
                    this.setState({
                        isLoaded: false,
                        listOfMovies: ""
                    });
                }
            },

            (error) => {
                alert("Error: "+ error);
                this.setState({
                    isLoaded: false,
                    listOfMovies: ""
                });
            }
        )
    }

    render(){
        return(
            <div style = {GeneralStyle.body} heigth = "100%">
                <div style = {GeneralStyle.headerActor}>
                    <h1 style = {{flex: 1, alignSelf: "end"}}>{this.strings.movieTitle}</h1>
                    <Button
                        variant = "contained"
                        color = "primary"
                        onClick = {this.updateOpenModal}
                        style = {GeneralStyle.button}
                        endIcon = {<AddToQueueIcon fontSize = "large"/>}>
                        {this.strings.addNewMovieButton}
                    </Button>
                </div>

                {/* //<DataTable headers = {this.strings.movieDataTableHeaders}/> */}
                {this.state.isLoaded ?
                    <DataTable headers = {this.strings.movieDataTableHeaders} dataSource = {this.state.listOfMovies} comesFrom = "movies" openEditMovieModalFromParent = {this.state.openModal} onClick = {this.resetModal}/> 
                : 
                   null
                }
            </div>
        );
    }
}

export default Movies;