import React, { useContext } from 'react'
import axios from 'axios';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Context from '../utils/context';
import { useForm, Controller} from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formSelect: {
      maxWidth: 300
    },
    button: {
      margin: theme.spacing(3)
    }
  }));

const Settings = () => {
    const context = useContext(Context);
    const classes = useStyles();
    const { control, handleSubmit } = useForm({
      defaultValues: {
        email: true,
      }
    });
      const [period, setPeriod] = React.useState('');

      const handleChangeSelect = (event) => {
            setPeriod(event.target.value);
        };


      const onSubmit = async data => {
        
        try {
            const response = await axios.put('http://localhost/api/settings', data, { headers: context.authObj.authHeader() })
            
        } catch (error) {
            return error
        }
        
        
      };

    return (
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleSubmit(onSubmit)} >
            
            <label>Mail notifications</label>
            <Controller
              control={control}
              as={<Switch />}
              type="checkbox"
              name="email"
            />
            <FormGroup row>
            <label>Yeasts</label>
            <Controller
                name="yeast"
                control={control}
                defaultValue={true}
                render={(props) => (
                    <Switch
                    onChange={(e) => props.onChange(e.target.checked)}
                    checked={props.value}

                    />
                )}
            />
            <label>Hops</label>
            <Controller
                name="hop"
                control={control}
                defaultValue={true}
                render={(props) => (
                    <Switch
                    onChange={(e) => props.onChange(e.target.checked)}
                    checked={props.value}
                    />
                )}
            />
            <label>Extras</label>
            <Controller
                name="extra"
                control={control}
                defaultValue={true}
                render={(props) => (
                    <Switch
                    onChange={(e) => props.onChange(e.target.checked)}
                    checked={props.value}
                    />
                )}
            />
            <label>Fermentables</label>
            <Controller
                name="fermentable"
                control={control}
                defaultValue={true}
                render={(props) => (
                    <Switch
                    onChange={(e) => props.onChange(e.target.checked)}
                    checked={props.value}
                    />
                )}
            />
            </FormGroup>
            <Grid container direction="column">

            <label>Reminder</label>
            <Controller
                as={
                    <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={period}
                onChange={handleChangeSelect}
                className={classes.formSelect}
                >
                <MenuItem value={1}>Daily</MenuItem>
                <MenuItem value={7}>Weekly</MenuItem>
                <MenuItem value={30}>Monthly</MenuItem>
                </Select>
                
                }
                name="reminder"
                defaultValue=''
                control={control}
            />
            </Grid>
            <Grid item xs={12} lg={2}>
                  <Button variant="outlined" type="submit" className={classes.button}>
                    SAVE
                  </Button>
                </Grid>
            </form>
        </div>
    )
}

export default Settings
