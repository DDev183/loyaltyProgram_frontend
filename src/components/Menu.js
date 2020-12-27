import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles';
import UserProfile from './UserProfile.js';
import AddCard from './AddCard.js';
import Logs from './Logs.js';
import SellPage from './SellPage.js';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    "& .MuiPaper-root":{

    },
    "& .MuiAppBar-colorPrimary":{
      backgroundColor: "#121212"
    },
    "& .MuiTab-textColorPrimary.Mui-selected":{
      color: '#90e0ef',
    },
    "& .MuiTab-textColorPrimary": {
      color: "#005d8f",
    },



  },

  flexContainer: {

    backgroundColor: '#192961',
    textColor: '#00DD00',

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,




  justifyContent: "center"
},



}));



export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };




  return (
    <div className={classes.root} >
      <AppBar position="static" color='primary' >
        <Tabs



        classes={{
  flexContainer: classes.flexContainer
}}

          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Начисление бонуса" {...a11yProps(0)} />
          <Tab label="Добавить карту" {...a11yProps(1)} />
          <Tab label="Логирование" {...a11yProps(2)} />
          <Tab label="Инфо о пользователе" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} style={{backgroundColor: '#111b41',     borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
        <SellPage />

      </TabPanel>
      <TabPanel value={value} index={1} style={{backgroundColor: '#111b41',     borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
        <AddCard />
      </TabPanel>
      <TabPanel value={value} index={2} style={{backgroundColor: '#111b41',     borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
        <Logs />
      </TabPanel>
      <TabPanel value={value} index={3} style={{backgroundColor: '#111b41',     borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
        <UserProfile />
      </TabPanel>

    </div>
  );
}
