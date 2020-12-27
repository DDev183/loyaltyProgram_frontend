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


class LoginForm extends React.Component{

constructor(props) {
  super(props);

}


  state = {
    email: '',
    password: '',
    emailValid: false,
    passwordValid: false,
    formValid: false,
    formErrors: {emailValid: '', password: ''},
    regState: false
}


onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
                      () => { this.validateField(name, value) });


    }


    validateField(fieldName, value){
        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;
        let emailValid = this.state.emailValid;

        switch(fieldName){
            case 'email':
                emailValid = value.length >= 3;
                fieldValidationErrors.email = emailValid ? '' : 'Минимальная длина 3 буквы';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
            break;
        }

        this.setState({formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
        }, this.validateForm);
    }


    validateForm() {
         this.setState({formValid: this.state.passwordValid &&
                                   this.state.emailValid
                                 });
       }


       onSubmit = (e) => {

         console.log("SUBMIT!!!!");

         const {email, username} = this.state;

var data = {
    username: this.state.email,
    password: this.state.password
}

const axiosConfig = {
    headers: {

        'Content-Type': 'application/json',


    }

}


e.preventDefault();
Axios.post('http://127.0.0.1:8000/auth/jwt/create/', JSON.stringify(data), axiosConfig)
.then(response => {

    console.log("HTTP AUTH STATUS: " + response.status);
    console.log("REFRESH: " + response.data.refresh);
    console.log("ACCESS: " + response.data.access);

    if (response.status == 200){
        localStorage.clear();
        localStorage.setItem('AccessToken', response.data.access);
        localStorage.setItem('RefreshToken', response.data.refresh);
        localStorage.setItem('logging', true);



        this.props.updateLoggingState();


    }

})


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
            Авторизация
          </Typography>
          <div>
            <FormErrors formErrors={this.state.formErrors} />
          </div>

          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <StyledTextField
            // InputLabelProps={{
            //   classes: {
            //     root: classes.inputLabel,
            //     focused: "focused",
            //     // shrink: "shrink"
            //   }
            //   }}
              // InputProps={{
              //   className: classes.multilineColor
              // }}
              inputProps={{ style: { color: "white" }, label: {color: "white"} }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onChange}
              value={this.state.email}
            />
            <StyledTextField
              inputProps={{ style: { color: "white" }, label: {color: "white"} }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
              value={this.state.password}
            />

            <Button
              // styles={{color: '#90CAF9'}}
              type="submit"
              fullWidth
              variant="contained"
              disabled={!this.state.formValid}
              // color="primary"
              classes={{ root: classes.button, disabled: classes.buttonDisabled }}




            >
              Войти
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="white">
                  Забыли пароль? А зачем он Вам?)
                </Link>
              </Grid>
            </Grid>
            <Grid container>
            <Grid item xs>
              <Link href="/registration" variant="body2" color="blue">
                Регистрация
              </Link>
            </Grid>

            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
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


export default withStyles(useStyles)(LoginForm);
