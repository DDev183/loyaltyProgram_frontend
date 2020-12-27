import * as React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import purple from "@material-ui/core/colors/purple";
import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import FormErrors from '../layout/FormErrors';
import Alert from '@material-ui/lab/Alert';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';



const useStyles = theme => ({
  paper: {
    marginTop: useTheme().spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // background: '#DD00FF',



  },
  table: {



},


    avatar: {
      margin: useTheme().spacing(1),
      backgroundColor: useTheme().palette.info.dark,


    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: useTheme().spacing(1),
      // backgroundColor: 'black',


    },
    root: {
       "& > *": {
         margin: useTheme().spacing(1),
         width: useTheme().spacing(10),
         height: useTheme().spacing(16)
       }
     },

    button: {
      width: useTheme().spacing(32),
      height: useTheme().spacing(8),
      margin: useTheme().spacing(3, 32, 2),
      backgroundColor: '#91dfef',
      color: '#FFFFFF',
        "&$buttonDisabled": {
          backgroundColor: '#567995',
          color: '#121212'
        }
      },
      buttonDisabled: {},

    inputLabel: {
      "&.focused": {
        color: '#FFFFFF',
      },
      // "&.shrink": {
      //   backgroundColor: "#00FF00"
      // }
    },
    multilineColor:{
      root: { // Name of the rule
        '&:hover': {
          backgroundColor: '#fff',
        },
        '&$focused': {
          borderColor: useTheme().palette.primary.main,
        },
      }
  }
  });





  const StyledTextField = styled(TextField)`
    label.Mui-focused {
      color: #90CAF9;
    }

    label {
      color: #03045e;
    }
    .MuiOutlinedInput-root {
      fieldset {
        border-color: #03045e;
      }
      &:hover fieldset {
        border-color: #00b4d8;
      }
      &.Mui-focused fieldset {
        border-color: #90CAF9;
        color: black;
      }
    }
  `;




  const StyledFormControlLabel = styled(FormControlLabel)`
    .Mui-checked {
      color: blue;
    }

    .MuiCheckbox-root {
      color: blue;
    }
  `;



  const StyledButton = styled(Button)`



  .MuiButton-contained {
      margin: useTheme().spacing(3, 0, 2),
      backgroundColor: '#90CAF9',
      color: '#90CAF9'
    },

    .MuiButton-contained.Mui-disabled {
      margin: useTheme().spacing(3, 0, 2),
      backgroundColor: '#90CAF9',
      color: '#90CAF9'
    },
  `;


class SellPage extends React.Component{

  state = {


    loaded: true,
    trigger: false,
    logList: [{}],
    userList: new Map(),
    currentCard: 0,
    balance: 0,
    minusBalance: 0,
    plusBalance: 0,

    AccessToken: localStorage.getItem('AccessToken'),
    RefreshToken: localStorage.getItem('RefreshToken'),
  }







getCard(){

  const axiosConfig = {
      headers: {

          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.AccessToken,



      },

  }



  Axios.get('http://127.0.0.1:8000/card/?number=' + this.state.currentCard, axiosConfig)
  .then(response => {

    this.setState({balance: response.data});
  });

}


minusBalance() {

  const axiosConfig = {
      headers: {

          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.AccessToken,



      },

  }


  var data = {
      action: 'minus',
      number: parseInt(this.state.currentCard),
      amount: parseInt(this.state.minusBalance)
  }

  Axios.put('http://127.0.0.1:8000/card/', JSON.stringify(data), axiosConfig)
  .then(response => {

    this.setState({balance: response.data})
  });

}




plusBalance() {

  const axiosConfig = {
      headers: {

          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.AccessToken,



      },

  }


  var data = {
      action: 'plus',
      number: parseInt(this.state.currentCard),
      amount: parseInt(this.state.plusBalance)
  }

  Axios.put('http://127.0.0.1:8000/card/', JSON.stringify(data), axiosConfig)
  .then(response => {

    this.setState({balance: response.data})
  });

}

onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});

}



  render() {
    const { classes } = this.props;


    if (this.state.loaded === true){
      if (this.state.balance == 0){
      return(
        <div style={{display: 'inline-block'}}>
        <Paper elevation={6} >
          <Box p={1} m={3}>
            <Typography variant="h5">Списание и начисление бонусов </Typography>

            <TextField
            id="standard-basic"
            name="currentCard"
            type="number"
            label="Номер карты"
            onChange={this.onChange}

            />

            <StyledButton
              styles={{color: '#90CAF9'}}
              type="submit"
              onClick={() => { this.getCard() }}
              variant="contained"
              classes={{ root: classes.button}}
              >
              Найти
              </StyledButton>



          </Box>

        </Paper>
        </div>
      );
    } else {
      return(
        <div style={{display: 'inline-block'}}>
        <Paper elevation={6} >
          <Box p={1} m={3}>
            <Typography variant="h5">Списание и начисление бонусов </Typography>

            <TextField
            id="standard-basic"
            name="currentCard"
            type="number"
            label="Номер карты"
            onChange={this.onChange}

            />

            <StyledButton
              styles={{color: '#90CAF9'}}
              type="submit"
              onClick={() => { this.getCard() }}
              variant="contained"
              classes={{ root: classes.button}}
              >
              Найти
              </StyledButton>



          </Box>

        </Paper>




        <Paper elevation={6} >
          <Box p={1} m={3}>
            <Typography variant="h4">Карта #{this.state.currentCard}</Typography>
            <Typography variant="h5">Баланс {this.state.balance}</Typography>




          </Box>

        </Paper>



        <Grid container spacing={3}>
        <Grid item xs={6}>
        <Paper elevation={6} >
          <Box p={1} m={3}>
          <Typography variant="h5">Списание</Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <StyledTextField
              inputProps={{ style: { color: "#00b4d8" }, label: {color: "blue"} }}
              variant="outlined"
              margin="normal"
              fullWidth
              id="number"
              type="number"
              defaultValue=""
              label="Сумма"
              name="minusBalance"
              onChange={this.onChange}

            />
            </form>
            <Button
              style={{      backgroundColor: '#91dfef',
                    color: '#FFFFFF'}}
              type="submit"
              variant="contained"
              onClick={() => { this.minusBalance() }}

            >
              Выполнить
            </Button>
          </Box>
        </Paper>
        </Grid>
        <Grid item xs={6}>
        <Paper elevation={6} >
          <Box p={1} m={3}>
          <Typography variant="h5">Зачисление</Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <StyledTextField
              inputProps={{ style: { color: "#00b4d8" }, label: {color: "blue"} }}
              variant="outlined"
              margin="normal"
              fullWidth
              id="number"
              type="number"
              defaultValue=""
              label="Сумма"
              name="plusBalance"
              onChange={this.onChange}

            />
            </form>
            <Button
              style={{      backgroundColor: '#91dfef',
                    color: '#FFFFFF'}}
              type="submit"
              variant="contained"
              onClick={() => { this.plusBalance() }}

            >
              Выполнить
            </Button>
          </Box>
        </Paper>
        </Grid>
        </Grid>

        </div>
      );
    }
    } else {
      return(
        <div>
        <Typography component="h3" variant="h6" gutterBottom>
          Loading...
        </Typography>
        </div>
      );
    }


  }




}





export default withStyles(useStyles)(SellPage);
