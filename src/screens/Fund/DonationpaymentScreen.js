import {
  Chip,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import Authuser from '../../api/Authuser';
import {addtrandata} from '../../store/scllie/Fund';

const DonationpaymentScreen = () => {
  const dispatch = useDispatch();
  let params = useParams();
  const pid = params.id;
  const [totalamount, settotalamount] = useState(0);
  const [valid, setvalid] = useState(false);
  const [orderid, setorderid] = useState();

  const userdata = useSelector(state => state.user.users);
  let navigate = useNavigate();

  const amounthandler = amount => {
    // +amount.replace(/[^0-9]/g,'')
    console.log(amount);

    // if(+amount > 100000 && +amount <= 100)
    if (+amount >= 100 && +amount <= 100000) {
      setvalid(true);
    } else {
      setvalid(false);
    }
    settotalamount(amount);
  };

  const upihandlar = () => {
    console.log('upiclick');
    // RNUpiPayment.initializePayment({
    //   vpa: '7874991863@upi', // or can be john@ybl or mobileNo@upi
    //   payeeName: 'hardik kyada',
    //   amount: '200',
    //   transactionRef: 'aasf-332-aoei-fn'
    // }, () => {console.log('Success')}, () => {console.log('failed')});
  };

  const razopay = () => {
    const order = {
      amount: totalamount,
      user: userdata?.name,
    };

    Authuser.post('/paymentgetway', order).then(res => {
      console.log('7987987987', res.data.data);
      setorderid(res.data.data);
      var options = {
        description: 'Credits towards consultation',
        // image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_EVZWHdHRfszPG2',
        amount: res.data.data?.orderid?.amount,
        name: res.data.data?.receipt,
        order_id: res.data.data?.id, //Replace this with an order_id created using Orders API.
        prefill: {
          email: userdata?.email,
          contact: userdata?.mobileno,
          name: userdata?.name,
        },
        theme: {color: '#53a20e'},
      };
      // RazorpayCheckout.open(options)
      //   .then(data => {
      //     // handle success
      //     alert(`Success: ${data.razorpay_payment_id}`);
      //   })
      //   .catch(error => {
      //     // handle failure
      //     console.log(`Error: ${error.code} | ${error.description}`);
      //     alert(`Error: ${error.code} | ${error.description}`);
      //   });
    });
  };

  const done = () => {
    const data = {
      Fundpost: pid,
      Totalamount: totalamount,
      user: userdata._id,
    };

    console.log(data);

    // dispatch(fundata.ADDDATA(data));
    dispatch(addtrandata(data));

    navigate('/home');

    // props.navigation.navigate('donescreen');
    // props.navigation.popToTop();
  };

  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Paper
        elevation={5}
        sx={{width: {xs: '80%', md: '40%'}, p: 2, mt: 5, borderRadius: 10}}>
        <Grid container spacing={2} sx={{width: '100%'}}>
          <Grid item md={12}>
            <Typography variant="h5">Select Amount</Typography>
          </Grid>
          <Grid item md={12} sx={{display: 'flex', justifyContent: 'center'}}>
            <Chip
              label="1000"
              sx={{mr: 2}}
              onClick={() => amounthandler(1000)}
              variant={totalamount === 1000 ? 'outlined' : ''}
            />
            <Chip
              label="2000"
              sx={{mr: 2}}
              onClick={() => amounthandler(2000)}
              variant={totalamount === 2000 ? 'outlined' : ''}
            />
            <Chip
              label="5000"
              sx={{mr: 2}}
              onClick={() => amounthandler(5000)}
              variant={totalamount === 5000 ? 'outlined' : ''}
            />
            {/* <Chip label="4000" /> */}
          </Grid>
          <Grid item md={12}>
            <TextField
              inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
              id="amount"
              label="Enter Any Amount"
              type="number"
              value={
                totalamount.toString() === '0' ? '' : totalamount.toString()
              }
              onChange={e => amounthandler(e.target.value)}
            />
            <Typography sx={{fontSize: 13}}>Max limit 1,00,000</Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h5">Payment Method</Typography>
          </Grid>
          <Grid item md={12} sx={{display: 'flex', justifyContent: 'center'}}>
            <Box
              disabled={totalamount <= 0 ? true : false}
              onPress={() => upihandlar()}
              sx={{mr: 5}}>
              <img
                src={require('../../img/UPI.png')}
                resizeMode="cover"
                style={{height: '50px', width: '100px'}}
              />
            </Box>

            <Box
              disabled={totalamount <= 0 ? true : false}
              onPress={() => razopay()}>
              <img
                src={require('../../img/icon/razorpay.png')}
                resizeMode="cover"
                style={{height: '50px', width: '100px'}}
              />
            </Box>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h7">
              Total Payment :- {totalamount ? totalamount : '0'}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Button
              variant="contained"
              disabled={!valid ? true : false}
              onClick={() => done()}>
              Done
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default DonationpaymentScreen;
