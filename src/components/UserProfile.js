import React from 'react';
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



import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';





function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
         Danil Andreyev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const useStyles = theme => ({
  paper: {
    marginTop: useTheme().spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // background: '#DD00FF',



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


    button: {
      margin: useTheme().spacing(3, 0, 2),
      backgroundColor: '#90CAF9',
      color: '#121212',
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
    color: white;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #494949;
    }
    &:hover fieldset {
      border-color: white;
    }
    &.Mui-focused fieldset {
      border-color: #90CAF9;
      color: white;
    }
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  .Mui-checked {
    color: blue;
  }

  .MuiCheckbox-root {
    color: white;
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


class UserProfile extends React.Component{

constructor(props) {
  super(props);
}



getProfile(){

  const axiosConfig = {
      headers: {

          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.AccessToken,



      }

  }



  Axios.get('http://127.0.0.1:8000/auth/users/me/', axiosConfig)
  .then(response => {


      console.log("HTTP AUTH STATUS: " + response.status);
      console.log("Id: " + response.data.id);
      console.log("Email: " + response.data.email);


      if (response.status == 200){
          this.setState({id: response.data.id});
          this.setState({username: response.data.username});
          this.setState({email: response.data.email});


          Axios.get('http://127.0.0.1:8000/api/accounts/profile/'+ response.data.id, axiosConfig)
          .then(response => {

              console.log("HTTP AUTH STATUS: " + response.status);


              if (response.status == 200){
                this.setState({adminRole: response.data.adminRole});
                this.setState({first_name: response.data.user.first_name});
                this.setState({last_name: response.data.user.last_name});
                this.setState({description: response.data.user.description});


              }

          })

        }

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

                        }

                    })

                    .catch(response => {

                      this.setState({logging: false});
                      localStorage.setItem('logging', false);
                    })





        })

      }



  )



}

componentDidMount(){

  this.getProfile();



}


state = {
  trigger: false,
  id: null,
  username: '',
  adminRole: false,
  first_name: '',
  last_name: '',
  description: '',
  email: '',
  AccessToken: localStorage.getItem('AccessToken'),
  RefreshToken: localStorage.getItem('RefreshToken'),
}



  render(){
    const { classes } = this.props;

    return(
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper} >
          <Avatar className={classes.avatar} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ID:
          </Typography>
          <Typography component="h3" variant="h6" gutterBottom>
            {this.state.id}
          </Typography>

          <Typography component="h1" variant="h5">
            Фамилия:
          </Typography>
          <Typography component="h3" variant="h6" gutterBottom>
            {this.state.last_name}
          </Typography>

          <Typography component="h1" variant="h5">
            Имя:
          </Typography>
          <Typography component="h3" variant="h6" gutterBottom>
            {this.state.first_name}
          </Typography>

          <Typography component="h1" variant="h5">
            Имя пользователя:
          </Typography>
          <Typography component="h3" variant="h6" gutterBottom>
            {this.state.username}
          </Typography>

          <Typography component="h1" variant="h5">
            Электронная почта:
          </Typography>
          <Typography component="h3" variant="h6" gutterBottom>
            {this.state.email}
          </Typography>

          <Typography component="h1" variant="h5">
            Admin?:
          </Typography>
          <Typography component="h3" variant="h6" gutterBottom>
            {this.state.adminRole}
          </Typography>



        </div>
      </Container>
    );
  }

}

// export default function SignIn(props) {
//   const classes = useStyles();
//
//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <div className={classes.paper} >
//         <Avatar className={classes.avatar} >
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Авторизация
//         </Typography>
//
//         <form className={classes.form} noValidate >
//           <StyledTextField
//           // InputLabelProps={{
//           //   classes: {
//           //     root: classes.inputLabel,
//           //     focused: "focused",
//           //     // shrink: "shrink"
//           //   }
//           //   }}
//             // InputProps={{
//             //   className: classes.multilineColor
//             // }}
//             inputProps={{ style: { color: "white" }, label: {color: "white"} }}
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//           />
//           <StyledTextField
//             inputProps={{ style: { color: "white" }, label: {color: "white"} }}
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//           />
//           <StyledFormControlLabel
//
//             control={<Checkbox value="remember" color="primary" />}
//             label="Remember me"
//           />
//           <Button
//             // styles={{color: '#90CAF9'}}
//             type="submit"
//             fullWidth
//             variant="contained"
//             // color="palette.primary.main"
//             className={classes.submit}
//
//           >
//             Войти
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2" color="white">
//                 Забыли пароль? А зачем он Вам?)
//               </Link>
//             </Grid>
//           </Grid>
//           <Grid container>
//           <Grid item xs>
//             <Link href="/registration" variant="body2" color="blue">
//               Регистрация
//             </Link>
//           </Grid>
//
//           </Grid>
//         </form>
//       </div>
//       <Box mt={8}>
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }


export default withStyles(useStyles)(UserProfile);
