import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
});

const IngredientCard = ({ingredient}) => {
  const classes = useStyles();

  return (
    <Grid container item xs={3} >
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {ingredient.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {ingredient.name}
        </Typography>
        <Typography variant="body2" component="p">
          29.11.2020
        </Typography>
        <Typography variant="body2" component="p">
          Quantity 100
        </Typography>
      </CardContent>
      <Grid container direction="row">
          <Grid item>
            <CardActions>
                <Button size="small" variant="outlined" color="primary">Edit</Button>
            </CardActions>
          </Grid>
        <Grid item>
            <CardActions>
                <Button size="small" variant="outlined" color="secondary">Delete</Button>
            </CardActions>
        </Grid>
      </Grid>
    </Card>
    </Grid>
  );
}

export default IngredientCard;