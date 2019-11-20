import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormattedMessage } from 'react-intl';
import { Paper, Typography, Tabs, Tab, FormGroup, FormControlLabel, Switch, FormControl} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import PageContentComponent from '../../PageContent/PageContentComponent'
import LocationContainer from '../../../containers/LocationContainer';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },  
  textFieldBig: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 415,
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function ShipmentOriginComponents(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(2);
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
console.log("PROPS",props);

  return (
  <PageContentComponent title={<FormattedMessage id='requestNewShipment' />}>  
           <form className={classes.container} noValidate autoComplete="on">
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="start"
                    control={<Switch color="primary" />}
                    label={<FormattedMessage id="useDefaultOrigin" />}
                    labelPlacement="start"
                  />
                </FormGroup>
              </FormControl>
              </form>
          <form className={classes.container} noValidate autoComplete="on">
        <div>
            <React.Fragment>
            <TextField
            id="outlined-basic"
            className={classes.textFieldBig}
            label={<FormattedMessage id="fullName" />}
            margin="normal"
            variant="outlined"
            />
            </React.Fragment>
        </div>
        </form>
        <form className={classes.container} noValidate autoComplete="off">
        <div>
            <React.Fragment>
            <TextField
            id="outlined-basic"
            className={classes.textFieldBig}
            label={<FormattedMessage id="pickupAddress" />}
            margin="normal"
            variant="outlined"
            />
            </React.Fragment>
        </div>
        </form>
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <React.Fragment>
        <TextField
          disabled
          id="outlined-basic"
          className={classes.textField}
          label={<FormattedMessage id="region" />}
          margin="normal"
          variant="outlined"
        />
         <TextField 
          disabled
          id="outlined-basic"
          className={classes.textField}
          label={<FormattedMessage id="city" />}
          margin="normal"
          variant="outlined"
        />
        </React.Fragment>
      </div>
    </form>
    <form className={classes.container} noValidate autoComplete="off">
      <div>
        <React.Fragment>
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label={<FormattedMessage id="district" />}
          margin="normal"
          variant="outlined"
        />
         <TextField
          id="outlined-basic"
          className={classes.textField}
          label={<FormattedMessage id="zipCode" />}
          margin="normal"
          variant="outlined"
        />
        </React.Fragment>
      </div>
    </form>
        <form className={classes.container} noValidate autoComplete="off">
        <div>
          <React.Fragment>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label={<FormattedMessage id="phone" />}
            margin="normal"
            variant="outlined"
          />
           <TextField
            id="outlined-basic"
            className={classes.textField} 
            label={<FormattedMessage id="email" />}
            margin="normal"
            variant="outlined"
          />
          </React.Fragment>
        </div>
      </form>
      <div className="form-horizontal">
      <React.Fragment>
            <div className={classes.container}>
                    {/* {this.getError('location')} */}
                <LocationContainer isEditable={true} />
            </div>
            </React.Fragment>
         </div>
      <form className={classes.container} noValidate autoComplete="off">
      <div>
      <Link to='/shipment-rates' style={{ margin: '0 auto' }}>
          <button className="btn btn-secondary" type='submit'>
           <FormattedMessage id="back" />
          </button>
      </Link>
      <Link to='/to-destination' style={{ margin: '0 auto' }}>
          <button className="btn btn-secondary" type='submit'>
          <FormattedMessage id="next" />
          </button>
      </Link>
    </div>
    </form>
</PageContentComponent>
  );
}
 