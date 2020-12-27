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
         width: useTheme().spacing(32),
         height: useTheme().spacing(16)
       }
     },

    button: {
      width: useTheme().spacing(32),
      height: useTheme().spacing(8),
      margin: useTheme().spacing(3, 30, 2),
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




class Logs extends React.Component{



state = {


  loaded: false,
  trigger: false,
  logList: [{}],
  userList: new Map(),
  currentCard: '',

  AccessToken: localStorage.getItem('AccessToken'),
  RefreshToken: localStorage.getItem('RefreshToken'),
}


componentDidMount (){
  console.log("grfewfrrfgefv");
  const axiosConfig = {
      headers: {

          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.AccessToken,



      }

  }


  Axios.get('http://127.0.0.1:8000/log/', axiosConfig)
  .then(response => {







          console.log(response.data);
          response.data.map((log) => {





            const axiosConfig = {
                headers: {

                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('AccessToken'),



                }

            }


            Axios.get('http://127.0.0.1:8000/api/accounts/profile/'+ log.user.id, axiosConfig)
            .then(response => {

                console.log("HTTP AUTH STATUS: " + response.status);


                if (response.status == 200){
                  let tempMap = this.state.userList;
                  tempMap[log.user.id] = response.data.user.last_name + " " + response.data.user.first_name;

                  this.setState({userList: tempMap});


                }

            })


          })

          this.setState({logList: response.data});
          this.setState({loaded: true});






    })
    .catch(response =>{

      var data = {
          token: localStorage.getItem('AccessToken')
      }

      const axiosConfig = {
          headers: {

              'Content-Type': 'application/json',


          }

      }




      Axios.post('http://127.0.0.1:8000/auth/jwt/verify/', JSON.stringify(data), axiosConfig)
      .then(response => {

          console.log("HTTP AUTH STATUS: " + response.status);
          console.log("Id: " + response.data.id);
          console.log("Email: " + response.data.email);

          if (response.status == 200){
            console.log("TOKEN IS VALID!")
            localStorage.setItem('AccessToken', response.data.access);
            localStorage.setItem('RefreshToken', response.data.refresh);
            this.setState({AccessToken: response.data.access});
            this.setState({RefreshToken: response.data.refresh});
            this.setState({trigger: !this.state.trigger});
            this.componentDidMount();



        }
      })
      .catch(response => {

        console.log("TOKEN INVALID");

                  var data2 = {
                      refresh: localStorage.getItem('RefreshToken')
                  }

                    Axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', JSON.stringify(data2), axiosConfig)
                    .then(response => {


                      console.log("GET NEW");




                        if (response.status == 200){
                          localStorage.setItem('AccessToken', response.data.access);
                          this.setState({AccessToken: response.data.access});
                          this.setState({trigger: !this.state.trigger});
                          this.componentDidMount();
                        }

                    })

                    .catch(response => {

                      this.setState({logging: false});
                      localStorage.setItem('logging', false);
                      this.setState({trigger: !this.state.trigger});

                    })





        })

})
}


updateLog() {




let temp = [{}];

  this.state.logList.map((log) => {

    if (log.card.number == this.state.currentCard){
      temp[log.id] = log;
    }
  })
  temp.shift();
  console.log(temp);

  this.setState({logList: temp});


}

onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
        console.log(e.target.value);

}


render() {
  if (this.state.loaded === true){
  const { classes } = this.props;




  return(
<div style={{display: 'inline-block'}}>
<Paper elevation={6} >
  <Box p={1} m={3}>
    <Typography variant="h5">Логирование </Typography>

    <TextField
    id="standard-basic"
    name="currentCard"
    type="number"
    label="Номер карты"
    onChange={this.onChange}
    value={this.state.currentCard}
    />

    <Button
      styles={{color: '#90CAF9'}}
      type="submit"
      onClick={() => { this.updateLog() }}
      variant="contained"
      classes={{ root: classes.button}}
      >
      Найти
      </Button>



  </Box>

</Paper>



  <TableContainer component={Paper}>
  <Table  className={classes.table} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell><b>Номер карты</b></TableCell>
        <TableCell align="center"><b>Пользователь</b></TableCell>
        <TableCell align="center"><b>Действие</b></TableCell>
        <TableCell align="center"><b>Количество</b></TableCell>
        <TableCell align="right"><b>Дата/Время</b></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {this.state.logList.map((row) => (
        <TableRow key={row.id}>
          <TableCell component="th" scope="row">
            {row.card.number}
          </TableCell>
          <TableCell align="center">{this.state.userList[row.user.id]}</TableCell>
          <TableCell align="center">{row.action}</TableCell>
          <TableCell align="center">{row.amount}</TableCell>
          <TableCell align="right">{new Date(row.timeDate).toLocaleDateString()} { new Date(row.timeDate).getHours()}:{new Date(row.timeDate).getMinutes()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

    </div>

  );
} else {
  return(
  <Typography component="h1" variant="h5">
    Загрузка
  </Typography>
  );
}
}

}




export default withStyles(useStyles)(Logs);
