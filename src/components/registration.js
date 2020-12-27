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
    submit: {
      margin: useTheme().spacing(3, 0, 2),
      backgroundColor: '#90CAF9',
      color: '#121212'
    },

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


class Registration extends React.Component{


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

          <form className={classes.form} noValidate >
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
            />

            <Button
              // styles={{color: '#90CAF9'}}
              type="submit"
              fullWidth
              variant="contained"
              // color="palette.primary.main"
              className={classes.submit}

            >
              Зарегистрироваться
            </Button>
            <Grid container>

            /*  <Grid item xs>
                <Link href="#" variant="body2" color="white">
                  Забыли пароль? А зачем он Вам?)
                </Link>
              </Grid> */

            </Grid>
            <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2" color="blue">
                Авторизация
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


export default withStyles(useStyles)(Registration);
