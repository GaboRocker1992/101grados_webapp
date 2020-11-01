import React, {Component} from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {Strings} from "../../utils/Strings";

export default class EditMovie extends Component{
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,

            accionUrl: this.strings.apiHost + this.strings.saveMovie,

            isLoadedGenres: false,
            listOfGenres: "",
            currentGenre: "{}",

            isLoadedActors: false,
            Actors: "",

            movieId: "0",
            movieName: "",
            movieDuration: "",
            movieGenre: "",
            movieSinopsis: "",
            movieCast: "",

            movieNameError: "",
            movieDurationError: "",
            movieGenreError: "",
            movieSinopsisError: "",
            movieCastError: "",
        };

        
    }

    md5 = require("md5");

    //Creating Strings Object
    strings = Strings();

    componentDidMount(){
        this.setState({
            openModal: this.props.openEditMovie
        });

        if(this.props.currentMovie.length > 2){
            this.setState({
                accionUrl: this.strings.apiHost + this.strings.updateMovie,
                movieId: JSON.parse(this.props.currentMovie).id,
                movieName: JSON.parse(this.props.currentMovie).name, 
                movieDuration: JSON.parse(this.props.currentMovie).duration,                
                movieGenre: JSON.parse(this.props.currentMovie).genre,
                movieSinopsis: JSON.parse(this.props.currentMovie).sinopsis,
                movieCast: JSON.parse(this.props.currentMovie).cast
                
            });
        }

        this.getListOfGenres();
        this.getListOfActors();
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

    setCurrentGenre = (Genres) => {
        
        for(let i = 0; i < Genres.length; i++) {
            if(Genres[i].genre_name === JSON.parse(this.props.currentMovie).genre){
                this.setState({currentGenre: JSON.stringify(Genres[i])});
                break;
            }  
        }
        
    }

    getListOfGenres = () => {
        fetch(this.strings.apiHost + this.strings.getAllgenres + "/" + this.md5(this.strings.getToken))
        .then(res => res.json())
        .then(
            (result) => {
                if(result.header === "OK" && result.size > 0){
                    this.setCurrentGenre(result.body);
                    this.setState({
                        isLoadedGenres: true,
                        listOfGenres: JSON.stringify(result.body),

                    });
                }else{
                    this.setState({
                        isLoadedGenres: false,
                        listOfGenres: ""
                    });
                }
            },

            (error) => {
                alert("Error: "+ error);
                this.setState({
                    isLoadedGenres: false,
                    listOfGenres: ""
                });
            }
        )
    }

    getListOfActors = () => {
        fetch(this.strings.apiHost + this.strings.getAllActors + "/" + this.md5(this.strings.getToken))
        .then(res => res.json())
        .then(
            (result) => {
                if(result.header === "OK" && result.size > 0){
                    this.setState({
                        isLoadedActors: true,
                        Actors: JSON.stringify(result.body),

                    });
                }else{
                    this.setState({
                        isLoadedActors: false,
                        Actors: ""
                    });
                }
            },

            (error) => {
                alert("Error: "+ error);
                this.setState({
                    isLoadedActors: false,
                    Actors: ""
                });
            }
        )
    }

    getCastForMovie = (castMoview) => {
        let castMovieString = "";
        let stringSplit = "";

        for(let i = 0; i < castMoview.length; i++){
            castMovieString = castMovieString.concat(stringSplit+castMoview[i].id);
            stringSplit = ", ";
        }

        this.setState({
            movieCast: castMovieString,
        });
    }

    isValidMovie = () => {
        let flagValidate = true;
        
        let errorMovieMssg = "";
        if(this.state.movieName.length === 0){
            flagValidate = false;
            errorMovieMssg = this.strings.errorEmptyMovieName;
        }
        this.setState({movieNameError: errorMovieMssg});


        let errorDurationMssg = "";
        if(this.state.movieDuration.length === 0){
            flagValidate = false;
            errorDurationMssg = this.strings.errorEmptyMovieDuration;
        }
        if(isNaN(this.state.movieDuration)){
            flagValidate = false;
            errorDurationMssg = this.strings.errorNotValidMovieDuration;
        }
        this.setState({movieDurationError: errorDurationMssg});
    
        let errorGenreMssg = "";
        if(this.state.movieGenre.length === 0){
            flagValidate = false;
            errorGenreMssg = this.strings.errorEmptyMovieGenre;
        }
        this.setState({movieGenreError: errorGenreMssg});

        let errorSinopsisMssg = "";
        if(this.state.movieSinopsis.length === 0){
            flagValidate = false;
            errorSinopsisMssg = this.strings.errorEmptyMovieSinopsis;
        }
        this.setState({movieSinopsisError: errorSinopsisMssg});

        let errorCastMssg = "";
        if(this.state.movieCast.length === 0){
            flagValidate = false;
            errorCastMssg = this.strings.errorEmptyMovieCast;
        }
        this.setState({movieCastError: errorCastMssg});

        return flagValidate;        
    }

    saveMovieData = () => {
        if(this.isValidMovie()){
            const requestOption = {
               method: "POST",
               headers: { "Accept": "application/json", "Content-Type": "application/json"},
               body: JSON.stringify({
                    token: this.md5(this.strings.getToken),
                    id: this.state.movieId,
                    name: this.state.movieName,
                    duration: this.state.movieDuration,
                    genre: this.state.movieGenre,
                    sinopsis: this.state.movieSinopsis,
                    cast: this.state.movieCast,
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
                open = {this.state.openModal}
                TransitionComponent = {this.Transition}
                keepMounted
                onClose = {this.closeModal}
                aria-labelledby = "alert-dialog-slide-title"
                aria-describedby = "alert-dialog-slide-description">
                
                <DialogTitle id = "alert-dialog-slide-title">{this.props.currentMovie.length > 0 ? this.strings.editMovieTitle : this.strings.saveMovieTitle }</DialogTitle>
                <DialogContent>
                    <form style = {{width: 500}} noValidate autoComplete="off">
                        <TextField 
                            style = {{width: "100%"}} 
                            onChange = {(event) => this.setState({ movieName: event.target.value })} 
                            id = "outlined-basic" 
                            label = {this.strings.labelMovieName} 
                            variant = "outlined" 
                            helperText = {this.state.movieNameError}
                            defaultValue = {this.props.currentMovie.length > 0 ? JSON.parse(this.props.currentMovie).name : ""}/>

                        <TextField 
                            style = {{width: "100%", marginTop: 20}} 
                            id = "outlined-basic" 
                            label = {this.strings.labelMovieDuration} 
                            variant = "outlined" 
                            onChange = {(event) => this.setState({ movieDuration: event.target.value })} 
                            helperText = {this.state.movieDurationError}
                            defaultValue = {this.props.currentMovie.length > 0 ? JSON.parse(this.props.currentMovie).duration : ""}/>

                        {this.state.isLoadedGenres ?
                            <Autocomplete
                                style = {{width: "100%", marginTop: 20}} 
                                id = "combo-box-demo"
                                options = {this.state.isLoadedGenres ? JSON.parse(this.state.listOfGenres) : {}}
                                defaultValue = {JSON.parse(this.state.currentGenre)}
                                getOptionLabel = {(option) => option.genre_name}
                                onChange = {(event, newValue) =>{
                                    let genreItem = "";
                                    if(newValue != null){
                                        genreItem = newValue.genre_name;
                                    }
                                    this.setState({ movieGenre: genreItem })
                                }} 
                                renderInput = {(params) => <TextField {...params} label = {this.strings.labelMovieGenre} variant = "outlined"  helperText = {this.state.movieGenreError}/>}
                            />
                        :
                            null
                        }

                        <TextField
                            style = {{width: "100%", marginTop: 20}} 
                            id="outlined-multiline-flexible"
                            label = {this.strings.labaleMovieSinopsis}
                            multiline
                            rowsMax = {10}
                            onChange = {(event) => this.setState({ movieSinopsis: event.target.value })}
                            helperText = {this.state.movieSinopsisError}
                            defaultValue = {this.props.currentMovie.length > 0 ? JSON.parse(this.props.currentMovie).sinopsis : ""}
                            variant="outlined"/>

                        <Autocomplete
                            style = {{width: "100%", marginTop: 20}} 
                            multiple
                            id = "tags-outlined"
                            options = {this.state.isLoadedActors ? JSON.parse(this.state.Actors) : {}}
                            getOptionLabel = {(option) => option.actor_name}
                            filterSelectedOptions
                            onChange = {(event, newValue) => {
                                this.getCastForMovie(newValue);
                            }}
                            defaultValue = {JSON.parse(this.props.movieCast)}
                            renderInput = {(params) => (
                                <TextField
                                    {...params}
                                    variant = "outlined"
                                    label = {this.strings.labaleMovieCast}
                                    placeholder = {this.strings.labaleMovieCast}
                                    helperText = {this.state.movieCastError}
                                />
                            )}
                        />
                    
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick = {this.closeModal} color="primary"> {this.strings.cancelButton} </Button>

                    <Button onClick = {this.saveMovieData} color="primary"> {this.strings.saveButton} </Button>
                </DialogActions>
            </Dialog>
        );
    }
}