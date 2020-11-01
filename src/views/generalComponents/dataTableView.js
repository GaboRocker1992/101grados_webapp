import React, {Component} from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {GeneralStyle} from "../../utils/generalStyles";
import {Strings} from "../../utils/Strings";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import EditActor from "../actorsView/editActor";
import EditMoview from "../moviesView/editMovie";
import WatchMoview from "../moviesView/watchMovie";

export default class DataTableView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openModalActor: false,
            currentActor: "",

            openWatchMovie: false,
            openEditMovieModal: false,
            currentMovie: "{}",

            isLoadedCast: false,
            Cast: "[]"
        };

        //Parent - Child Communication
        this.updateOpenModal = this.updateOpenModal.bind(this);
        this.updateWatchMoviewModal = this.updateWatchMoviewModal.bind(this);
        this.updateEditMoviewModal = this.updateEditMoviewModal.bind(this);
    }

    updateOpenModal(type){
        this.resetEditActorModal();
    }

    updateWatchMoviewModal(type){
        this.resetWatchMoviewModal();
    }

    updateEditMoviewModal(type){
        this.resetEditMovieModal();
    }

    md5 = require("md5");

    //Creating Strings Object
    strings = Strings();

    //Tabel Cell for datatable
    StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
    }))(TableCell);
    
    //Tabel Cell for datatable
    StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    //open Edit Actor Modal
    openEditActorModal = (val) => {
        this.setState({
            openModalActor: true,
            currentActor: JSON.stringify(val)
        });
    }

    //Open Edit/Save Movie Modal
    openEditMovieModal = (val) => {
        this.getMovieCast(val.cast);
        this.setState({
            openEditMovieModal: true,
            currentMovie: JSON.stringify(val)
        });
    }

    //Open View Movie Info Modal
    openwatchModal = (val) => {
        this.setState({
            openWatchMovie: true,
            currentMovie: JSON.stringify(val)
        });
    }

    resetEditActorModal = () => {
        this.setState({
            openModalActor: false,
            currentActor: ""
        });
        this.props.onClick("reset");
    }

    resetEditMovieModal = () => {
        this.setState({
            openEditMovieModal: false,
            currentMovie: "{}",
            isLoadedCast: false,
            Cast: "[]"
        });
        this.props.onClick("reset");
    }

    resetWatchMoviewModal = () => {
        this.setState({
            openWatchMovie: false,
            currentMovie: "{}"
        });
    }

    getMovieCast = (cast) => {
        fetch(this.strings.apiHost + this.strings.getMovieCast + "/" + this.md5(this.strings.getToken) + "/"+cast)
        .then(res => res.json())
        .then(
            (result) => {
                if(result.header === "OK" && result.size > 0){
                    this.setState({
                        isLoadedCast: true,
                        Cast: JSON.stringify(result.body),

                    });
                }else{
                    alert(result.response.header + ": " +result.response.message);
                    this.setState({
                        isLoadedCast: false,
                        Cast: "[]"
                    });
                }
            },

            (error) => {
                alert("Error: "+ error);
                this.setState({
                    isLoadedCast: false,
                    Cast: ""
                });
            }
        )
    }

    render(){
        return(
            <div>
                <TableContainer component={Paper} style = {{marginTop: 20}}>
                    <Table style = {GeneralStyle.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                            {this.props.headers.map((header, i) => {
                                return (
                                    <this.StyledTableCell align = "center">{header}</this.StyledTableCell>
                                )
                            })}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {JSON.parse(this.props.dataSource).map((dataRow, i) => {
                                return(
                                    <this.StyledTableRow key={i}>
                                            <this.StyledTableCell align = "center" style = {{justifyContent: "center"}}>
                                                {this.props.comesFrom === "actors" ?
                                                    <Avatar src = {dataRow.url_photo} style = {{alignSelf: "center", marginLeft: "auto", marginRight: "auto"}}/>
                                                :
                                                    dataRow.name
                                                }
                                            </this.StyledTableCell>
                                            
                                            <this.StyledTableCell align = "center">
                                                {this.props.comesFrom === "actors" ?
                                                    dataRow.actor_name 
                                                :
                                                    dataRow.duration
                                                }
                                            </this.StyledTableCell>

                                            <this.StyledTableCell align = "center">
                                                {this.props.comesFrom === "actors" ?
                                                    dataRow.age
                                                :
                                                    dataRow.genre
                                                }
                                            </this.StyledTableCell>

                                            <this.StyledTableCell align = "center">
                                                {this.props.comesFrom === "actors" ?
                                                    <Button variant="contained" color="secondary" key = {i} style = {{width: 200}} onClick = {() => this.openEditActorModal(dataRow)}>
                                                        {this.strings.editActorButton}
                                                    </Button>
                                                :
                                                    <div style = {{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                                        <Button variant = "contained" color = "secondary" key = {i} style = {{ marginLeft: 20, marginRight: 10, width: 200}} onClick = {() => this.openwatchModal(dataRow)}>
                                                            {this.strings.watchMovieButton}
                                                        </Button>
                                                        <Button variant = "contained" color = "secondary" style = {{marginLeft: 10, marginRight: 20, width: 200}} onClick = {() => this.openEditMovieModal(dataRow)}>
                                                            {this.strings.editMovieButton}
                                                        </Button>
                                                    </div>
                                                }
                                            </this.StyledTableCell>
                                    </this.StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                {this.state.openModalActor || this.props.openActorModalFromParent ?
                    <EditActor openModalActor = {true} currentActor = { this.state.currentActor} onClick = {this.updateOpenModal}/>
                :
                    null
                }

                {this.state.openWatchMovie ?
                    <WatchMoview openWatchMoview = {true} currentMovie = { this.state.currentMovie} onClick = {this.updateWatchMoviewModal}/>
                :
                    null
                }

                {(this.state.openEditMovieModal && this.state.isLoadedCast) || this.props.openEditMovieModalFromParent ?
                    <EditMoview 
                        openEditMovie = {true} 
                        currentMovie = { this.state.currentMovie} 
                        action = { this.state.openEditMovieModal && this.state.isLoadedCast ? "edit" : "save" }
                        movieCast = { this.state.Cast } 
                        onClick = { this.updateEditMoviewModal }/>
                :
                    null
                }
                
            </div>
        );
    }
}
