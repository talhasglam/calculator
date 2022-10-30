import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import {Button, Grid, Card, Modal, Typography, Box, TextField, Tooltip,OutlinedInput ,MenuItem,FormControl,Select,InputAdornment,IconButton, Stack  } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { addDays } from 'date-fns';


function App() {
  const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 10,
    p: 4,

  };

  const [fabricType, setValue] = React.useState(0);
  const [shipDate, setDate] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [calculatedTime, setCalculatedTime] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setValue(
        value
      );


    };

    const handleCharacters = (event) => {

      const onlyNums = event.target.value.replace(/[^0-9]/g, '');
      if (onlyNums < 101) {
          setQuantity(onlyNums );
        } else if (onlyNums.length === 10) {
        console.log(onlyNums);
          const number = onlyNums.replace(
              /(\d{3})(\d{3})(\d{4})/,
              '($1) $2-$3'
          );
          setQuantity(number);
      }

    }

    const calculateTime = (event) => {

      let calculated_days = 0
      let selected_ship_date = shipDate
      let selected_fabric_type = fabricType
      let selected_quantity = quantity

      if (selected_ship_date == "" || selected_fabric_type == "" || selected_quantity == "" || selected_quantity == 0) {
        handleOpen()
      }else{

        if (selected_fabric_type == "1" && selected_quantity < 50) {
          calculated_days += 1;
        }else if(selected_fabric_type == "1" && selected_quantity >= 50){
          calculated_days += 2;
        }else if(selected_fabric_type == "2" && selected_quantity < 50){
          calculated_days += 3;
        }else if(selected_fabric_type == "2" && selected_quantity >= 50){
          calculated_days += 4;
        }

        const selected_date  = new Date(selected_ship_date);
        let calculated_date = selected_date.setDate(selected_date.getDate() + calculated_days);
        let new_date_calculated = new Date(calculated_date)

        let day_index_of_week = new_date_calculated.getDay();
        if (day_index_of_week == 6) { //if it's saturday
          calculated_days += 2
        }else if(day_index_of_week == 0){ //if it's sunday
          calculated_days += 1
        }

        calculated_date = selected_date.setDate(selected_date.getDate() + calculated_days);
        new_date_calculated = new Date(calculated_date)

        let new_date_day = new Intl.DateTimeFormat('en-US', {day: '2-digit'}).format(calculated_date);
        let new_date_month = new Intl.DateTimeFormat('en-US', { month: 'long'}).format(calculated_date);
        let new_date_year = new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(calculated_date);
        let new_date = new Date( new_date_day + "/" + new_date_month + "/" + new_date_year);

        if (new_date.getDay() == 6) { //if it's saturday
          new_date =new_date.setDate(new_date.getDate() + 2)
        }else if(new_date_calculated.getDay() == 0){ //if it's sunday
          new_date = new_date.setDate(new_date.getDate() + 1)
        }

        new_date_day = new Intl.DateTimeFormat('en-US', {day: '2-digit'}).format(new_date);
         new_date_month = new Intl.DateTimeFormat('en-US', { month: 'long'}).format(new_date);
         new_date_year = new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(new_date);
         new_date =  new Date(new_date_day + " " + new_date_month + " " + new_date_year);

        let month = new_date.getMonth()
        let day = new_date.getDate()


        if ((month == 6 && day == 4 && (new_date.getDay() != 6 ||  new_date.getDay() != 0)) || (month == 11 && day == 25 && (new_date.getDay() != 6 || new_date.getDay() != 0))) {
          
          new_date =new_date.setDate(new_date.getDate() + 1)
          
        }

         new_date_day = new Intl.DateTimeFormat('en-US', {day: '2-digit'}).format(new_date);
         new_date_month = new Intl.DateTimeFormat('en-US', { month: 'long'}).format(new_date);
         new_date_year = new Intl.DateTimeFormat('en-US', {year: 'numeric'}).format(new_date);
         new_date =  new_date_day + " " + new_date_month + " " + new_date_year;

        setCalculatedTime(new_date.toString())

      }
    }


  return (
    <div className="App">

      <div className='main'>
      <Grid  container spacing={2}>
        <Grid  item xs={12}>
          <div className="App-header">
            <div className="content">
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Calculate Alert !
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Please Fill All Information Correctly
                </Typography>
              </Box>
            </Modal>
            <Grid  container spacing={2}>
              <Grid item xs={12}>
                <div className="head">
                  <h1 className="title">The Company</h1>
                </div>
              </Grid>
            </Grid>

            <Grid  container spacing={2}>
              <Grid item xs={12}>
                <div className="body">

                  <div className="title">
                    <h2>Shipping Time Calculator</h2>
                  </div>

                  <div className="elements">

                  <Grid container spacing={1}>
                    <Grid container item spacing={3}>
                    <React.Fragment>
                      <Grid item xs={12} md={4}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          id="datepicker"
                          label="Order Date"
                          inputFormat="DD-MM-YYYY"
                          value={shipDate}
                          onChange={(newValue) => {
                            setDate(newValue);
                            console.log("shipDate==> " , shipDate.format("DD MMMM YYYY"));
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} md={4}>
                      <Box sx={{ minWidth: 120 }}>

                        <FormControl fullWidth>
                          {/* <InputLabel id="select-item-label">Fabric Type</InputLabel> */}
                          <Select
                            displayEmpty
                            labelId="demo-simple-select-label"
                            id="productstyle"
                            onChange={handleChange}
                            value={fabricType}
                            type="text"
                          >
                            <MenuItem id='' disabled value={0}>
                              <em>Fabric Type</em>
                            </MenuItem>
                            <MenuItem value={1}>Cotton</MenuItem>
                            <MenuItem value={2}>Linen</MenuItem>
                          </Select>
                        </FormControl>

                      </Box>
                      </Grid>
                      <Grid item xs={12} md={4}>

                        <FormControl fullWidth>
                          <OutlinedInput
                          value={quantity}
                          id="productnumber"
                          placeholder="Quantity"
                          onChange={handleCharacters}
                          endAdornment={
                            <Tooltip
                            title="Shipping Dates May Vary Based on Quantity"
                            placement="top"
                            >
                            <InputAdornment position="start">
                              <InfoRoundedIcon />
                            </InputAdornment>
                            </Tooltip>
                          }
                          />
                        </FormControl>

                      </Grid>
                    </React.Fragment>
                    </Grid>
                  </Grid>

                  </div>

                  <div id='actions'>
                  <Grid container spacing={1}>
                    <Grid container item spacing={3}>
                      <React.Fragment>
                        <Grid item xs={12} md={4}>
                          <Stack spacing={2} direction="row">
                            <Button onClick={calculateTime} variant="contained">Calculate</Button>
                          </Stack>
                        </Grid>
                      </React.Fragment>
                    </Grid>
                  </Grid>
                  </div>

                  <div id="result">
                    <Grid container spacing={1}>
                      <Grid container item spacing={3}>
                        <React.Fragment>
                          <Grid item xs={12}>
                          <Typography variant="h3" gutterBottom>
                            {/* Your Estimated Shipping Time Is <span>{ shipDate == "" ? "": shipDate.format("DD MMMM YYYY")}</span> */}
                            {calculatedTime == "" ? 'Please enter your order information to estimate shipping date' :  'Your Estimated Shipping Time Is '}
                            <span>{calculatedTime == "" ? "" : calculatedTime}</span>
                          </Typography>
                          </Grid>
                        </React.Fragment>
                      </Grid>
                    </Grid>
                  </div>

                </div>

              </Grid>
            </Grid>

            </div>

            <Card className="Card-header" sx={{ minWidth: 275 }}>

           </Card>
          </div>
        </Grid>
      </Grid>

      </div>
    </div>
  );
}

export default App;
