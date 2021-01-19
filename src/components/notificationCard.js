import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    margin: theme.spacing(3),
    '&:hover': {
      background: 'rgba(0,0,0,.05)',
      cursor: 'pointer'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

 const NotificationCard = ({notification}) => {
  const classes = useStyles();
  const [list, setList] = useState([])

  useEffect(() => {
    setList(notification)
  }, [])

  const deleteHandler = (id) => {
    setList(list.filter(item => item.id !== id))
  }
  

  const notifications = () => {
    
    return notification.map(item => {
      return (
      <Card className={classes.root} key={item.uuid} onClick={(e) => deleteHandler(item.uuid)}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {item.data.Message}
        </Typography>
        <Typography variant="h5" component="h2">
          {item.data.Date}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {item.data.Ingredient}
        </Typography>
        
      </CardContent>
    </Card>
      )
    })
  } 


  return (
    <div>
      {notifications()}
    </div>
  );
}


export default NotificationCard