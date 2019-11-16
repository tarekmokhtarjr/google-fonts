import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import GoogleFontLoader from 'react-google-font-loader';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import GridOnIcon from '@material-ui/icons/GridOn';
import NavBar from './navBar';
import Box from "@material-ui/core/Box";
import InputBase from '@material-ui/core/InputBase';
import ListIcon from '@material-ui/icons/List';
import NavigationRoundedIcon from '@material-ui/icons/NavigationRounded';
import Radio from "@material-ui/core/Radio";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RefreshIcon from '@material-ui/icons/Refresh';

function Copyright(theme) {
  return (
    <footer style={{
      position: 'fixed',
      width: '100%',
      bottom: 0,
      color: theme.color,
    }}>
      <Typography variant="body2" color="inherit" align="center" style={{fontSize: 'large'}}>
        {'Coded by Tarek | '}
        {new Date().getFullYear()}
        {' | Chingu Pre-Work Project'}
      </Typography>
      <Typography variant="body2" color='inherit' align="right">
          <a href='#top' color='inherit'>
            <NavigationRoundedIcon style={{color: theme.color}} fontSize='large'/>
          </a>
      </Typography>
    </footer>
  );
}

const boxDefaultProps = {
  borderTop: 1,
  borderBottom: 1,
  borderLeft: 1,
  borderRight: 1,
  m: 1,
  style: { width: "99%" },
  bgcolor: "inherit",
};
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(15, 0, 6),
    width: "99%"
  },
  card: {
    height: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    background: 'inherit',
    color: 'inherit'
  },
  input: {
    margin: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    borderColor: theme.palette.common.white,
    background: 'inherit',
    color: 'inherit'
  },
  item: {
    background: 'inherit',
    color: 'inherit'
  },
  title: {
    background: 'inherit',
    color: 'inherit',
    width: '50%',
  },
}));

export default function AppContainer() {
  const classes = useStyles();
  const [fonts, getFonts] = useState([]);
  const [fontSize, setFontSize] = useState(20);
  const [displayText, setDisplayText] = useState("Then came the night of the first star");
  const [filteredData, setFilteredData] = useState([]);
  const [themeColors, setThemeColors] = useState({backgroundColor:"white", color:"black"});
  const [gridStyle, setGridStyle] = useState({xs: 6, sm: 3});
  const [scrollIndex, setScrollIndex]= useState(0);

  useEffect(() => {
    try {
      axios.post('/fonts').then((response) => {
        getFonts(response.data.fonts.items);
        setFilteredData(response.data.fonts.items.slice(0,10));
      });
    } catch (error) {
      console.log(error);
    }
    setThemeColors({backgroundColor:"white", color:"black"});
  }, []);
  
  window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        let len = fonts.length;
        const remainder = fonts.length % 10;
        len = len - remainder;
        setScrollIndex(scrollIndex+1);
        if(scrollIndex < len)
        {
          let data = fonts.slice(scrollIndex*10, (scrollIndex*10)+10);
          let currentData = filteredData;
          data.map((item) => {
            currentData.push(item);
            return item;
          });
          setFilteredData(currentData);
        }
    }
  };
  const handleTheme = () => {
    if(themeColors.backgroundColor === "black" && themeColors.color === "white"){
      setThemeColors({backgroundColor: "white",color: "black"})
    }else if(themeColors.backgroundColor === "white" && themeColors.color === "black"){
      setThemeColors({backgroundColor: "black",color: "white"})
    }
  };
  console.log(themeColors);
  return (
    <React.Fragment>
      <NavBar color={themeColors} />
      <Grid container 
          id="top" 
          className={classes.root} 
          style={{
            background: themeColors.backgroundColor,
            color: themeColors.color,
          }}
      >
        <Box 
          className={classes.container}
          {...boxDefaultProps} 
          borderTopColor={themeColors.color}
          borderBottomColor={themeColors.color}
          borderLeftColor={themeColors.color}
          borderRightColor={themeColors.color}
          borderRadius={16}
        >
          <Grid item xs={2} className={classes.item}>
            <InputBase
                defaultValue=""
                placeholder="Type Something Here"
                className={classes.input}
                onChange={e => {
                  if(e.target.value === ""){
                    setDisplayText("Then came the night of the first star");
                  }else{
                    setDisplayText(e.target.value)
                  }
                }}
            />
          </Grid>
          <Grid item xs={2} className={classes.item}>
            <Select
              value={fontSize}
              defaultValue={20}
              onChange={e => setFontSize(e.target.value)}
              className={classes.input}
            >
              <MenuItem value={20} className={classes.input}>20px</MenuItem>
              <MenuItem value={24} className={classes.input}>24px</MenuItem>
              <MenuItem value={32} className={classes.input}>32px</MenuItem>
              <MenuItem value={40} className={classes.input}>40px</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2} className={classes.item}>
            <InputBase
                defaultValue=""
                placeholder="Search Fonts"
                className={classes.input}
                onChange={e => {
                  console.log(scrollIndex);
                  let data = fonts.slice(scrollIndex, scrollIndex+10).filter(font => {
                    return font.family.toLowerCase().includes(e.target.value.toLowerCase());
                  });
                  setFilteredData(data);
                }}
            />
          </Grid>
          <Grid item xs={2} className={classes.item}>
            <Radio
              checked={
                themeColors.backgroundColor === "white" 
                && 
                themeColors.color === "black"
              }
              style={{color: themeColors.color}}
              onClick={handleTheme}
              name="radio-button-demo"
              inputProps={{ "aria-label": "B" }}
            />
            <Radio
              checked={
                themeColors.backgroundColor === "black" 
                && 
                themeColors.color === "white"
              }
              style={{color: themeColors.color}}
              onClick={handleTheme}
              name="radio-button-demo"
              inputProps={{ "aria-label": "B" }}
            />
          </Grid>
          <Grid item xs={2} className={classes.item}>
            <Button
              onClick={() => {
                if(gridStyle.xs === 6 && gridStyle.sm === 3){
                  setGridStyle({xs: 12});
                }else {
                  setGridStyle({xs: 6, sm: 3});
                }
              }}
              className={classes.input}
            >
            { gridStyle.xs === 12 && <GridOnIcon className={classes.input}/> }
            { gridStyle.xs === 6 && <ListIcon className={classes.input}/> }
            </Button>
          </Grid>
          <Grid item xs={2} className={classes.item}>
            <Button
              onClick={() => {
                try {
                    axios.post('/fonts').then((response) => {
                      getFonts(response.data.fonts.items);
                    });
                  } catch (error) {
                    console.log(error);
                  }
                  setThemeColors({backgroundColor:"white", color:"black"});
                }}
              className={classes.input}
            >
            <RefreshIcon className={classes.input}/>
            </Button>
          </Grid>
        </Box>
        <GoogleFontLoader
          fonts={fonts.map(a => { return {font : a.family}})}
        />
        <Grid container justify="center" spacing={2} style={{ color: themeColors.color, backgroundColor: themeColors.backgroundColor}}>
            {filteredData.map(value => (
              <Grid key={fonts.indexOf(value)} item {...gridStyle}>
                <Box 
                  className={classes.container}
                  {...boxDefaultProps} 
                  borderTopColor={themeColors.color}
                  borderBottomColor={themeColors.color}
                  borderLeftColor={themeColors.color}
                  borderRightColor={themeColors.color}
                >
                  <Card elevation={0} className={classes.card} style={{ color: themeColors.color, backgroundColor: themeColors.backgroundColor}}>
                    <CardContent style={{ color: themeColors.color, backgroundColor: themeColors.backgroundColor}}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          { value.family }
                          <Button className={classes.input}>
                            <AddCircleIcon />
                          </Button>
                        </Typography>  
                        <Typography style={{
                          fontFamily : value.family,
                          fontSize: fontSize 
                          }}
                        >
                          {displayText}
                        </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Grid>  
      <Copyright color={themeColors.color} />     
    </React.Fragment>  
  );
}