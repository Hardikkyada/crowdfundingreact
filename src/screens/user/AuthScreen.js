import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Select,
  TextField,
  IconButton,
  Grid,
  Paper,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import React, {useEffect, useState, useRef, forwardRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Authuser from '../../api/Authuser';
import '../../css/Authscreencss.css';
// import storage from '../../firebaseconfig';
import {storage} from '../../firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {CheckLogin, CheckReg} from '../../store/scllie/user';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';
import {Box} from '@mui/system';

const AuthScreen = props => {
  let token = useSelector(state => state.user.token);
  let Reducererror = useSelector(state => state.user.error);

  // useEffect(() => {
  //   if (token) {
  //     navigate('/home');
  //   }
  // }, [token]);

  console.log('Authuser', token);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const inputFile = useRef(null);

  const [isloding, setisloding] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, seterror] = useState();
  const [isSignup, setIsSignup] = useState(false);
  const [img, setimg] = useState('default.png');
  const [selimg, setselimg] = useState(false);
  const [assets, setassets] = useState();
  const [imgurl, setimgurl] = useState();
  const [name, setname] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);
  const [Surname, setsurname] = useState('');
  const [surnameIsValid, setsurnameIsValid] = useState(true);
  const [mobileno, setmno] = useState('');
  const [moIsValid, setmoIsValid] = useState(true);
  const [email, setemail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [genIsValid, setgenIsValid] = useState(true);
  const [password, setpassword] = useState('');
  const [passIsValid, setpassIsValid] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [showpassword, setshowpassword] = useState(false);
  const [formvalid, setformvalid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [snackbar, setsnacbar] = useState(false);
  const [snackerrormsg, setsnackerrormsg] = useState('');
  const [loerror, loseterror] = useState(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  let filename = '';

  const getimage = async file => {
    console.log(file, !imgurl);
    if (file === 'default.png' && imgurl) {
      return;
    }
    try {
      // const storageref = ref(storage,'/profile/'+file)
      const image = await getDownloadURL(ref(storage, 'profile/' + file));
      // const image = await ref(storage,'profile/' + file)
      console.log(image);
      // const image = await storage()
      //   .ref('profile/' + file)
      //   .getDownloadURL();
      setimgurl(image);
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  const setimage = () => {
    // console.log(imgurl,selimg);
    if (!selimg) {
      // setimg(user.ProfileImg);
      // console.log("false",API_URL + `image/${userdata.ProfileImg}`);
      // return API_URL + `image/${img}`;
      getimage(img);
      return imgurl;
    } else {
      console.log('true', img);
      return img;
    }
  };

  const uplodeimage = file => {
    filename = Date.now() + file.name;

    const reference = ref(storage, 'profile/' + filename);
    const upload = uploadBytes(reference, assets);
    // .putFile(file.uri);

    // const reference = storage().ref(url).putFile(uri.replace('file://', ''));
    // const reference = storage().ref("fsd.png").putFile();

    upload
      .then(() => {
        console.log('Added');
      })
      .catch(e => console.log('uploading image error => ', e));
  };

  const authHandler = async e => {
    e.preventDefault();
    console.log('shiudsiufh');
    let action;
    if (isSignup) {
      // action = SIGNUP({
      if (assets) {
        uplodeimage(assets);
      } else {
        showsnackbar('Please add Profile Image');
        return;
      }
      if (
        nameIsValid &&
        surnameIsValid &&
        emailIsValid &&
        passIsValid &&
        moIsValid &&
        genIsValid
      ) {
        // action = useraction.Signup({
        action = CheckReg({
          name: name,
          ProfileImg: filename,
          Surname: Surname,
          mobileno: mobileno,
          email: email,
          password: password,
          gender: value,
        });
        console.log('dsd', action);
      } else {
        // console.log(name, Surname, filename, email, password, mobileno);
        if (!passIsValid) {
          showsnackbar('PassWord Must Be 7 Characters');
          return;
        } else {
          showsnackbar('All Fileds are required');
          return;
        }
      }
    } else {
      if (!emailIsValid) {
        showsnackbar('Email Not Valid');
      } else if (emailIsValid) {
        // action = useraction.Login({
        // login({
        action = CheckLogin({
          email,
          password,
        });
      } else {
        showsnackbar('All fileds are required');
        // return alert('All fileds are required', 'error');
      }
    }

    seterror(null);
    setisloding(true);

    try {
      dispatch(action);
      // console.log(x);
      // await action
      // dispatch(useraction.Login())
    } catch (err) {
      console.log(err);
      seterror(err.message);
    }
    setTimeout(() => {
      if (!token) {
        loseterror(true);
      }
      setisloding(false);
    }, 2000);
    setTimeout(() => {
      loseterror(false);
    }, 6000);
  };

  const sendemail = () => {
    console.log(email);
    Authuser.get('/forgetpassword/' + email)
      .then(res => {
        return Alert('Password is Send', 'Check Your Mail Box', [
          {text: 'okay'},
        ]);
      })
      .catch(e => {
        console.log(e?.message);
        if (e?.response?.status === 404) {
          return Alert('Invalid Email', 'Email Not Found', [{text: 'okay'}]);
        } else {
          return Alert('Try Again', 'Send it Again', [{text: 'okay'}]);
        }
      });
    setModalVisible(false);
  };
  const Viewpass = () => {
    setshowpassword(!showpassword);
  };
  const onImgClick = e => {
    inputFile.current.click();
  };
  const getPhoto = e => {
    setselimg(true);
    const selectedFile = e.target.files[0];
    setassets(e.target.files[0]);
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(objectUrl);
    setimg(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  };

  //Validations
  const changeNameHandler = event => {
    setname(event.target.value);
    if (event.target.value.length > 0) {
      setNameIsValid(true);
    } else {
      setNameIsValid(false);
      setformvalid(false);
    }
  };

  const changesurNameHandler = event => {
    setsurname(event.target.value);
    if (event.target.value.length > 0) {
      setsurnameIsValid(true);
      setformvalid(true);
    } else {
      setsurnameIsValid(false);
    }
  };

  const changemnoHandler = event => {
    setmno(event.target.value);
    if (event.target.value.length === 10) {
      setmoIsValid(true);
    } else {
      setmoIsValid(false);
    }
  };

  const changeEmailHandler = event => {
    setemail(event.target.value);
    if (
      event.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };

  const changePasswordHandler = event => {
    setpassword(event.target.value);
    if (event.target.value.length >= 7) {
      setpassIsValid(true);
    } else {
      setpassIsValid(false);
    }
  };

  const changeGenderHandler = event => {
    setValue(event.target.value);
    if (event.target.value.length > 0) {
      setgenIsValid(true);
    } else {
      setgenIsValid(false);
    }
  };

  const showsnackbar = errormsg => {
    console.log(errormsg);
    setsnackerrormsg(errormsg);
    setsnacbar(true);
    setTimeout(() => {
      setsnackerrormsg('');
    }, 5000);
  };

  return (
    <>
      <Snackbar
        open={snackbar || loerror}
        onClose={() => setsnacbar(false)}
        autoHideDuration={4000}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert severity="error" sx={{width: '100%'}}>
          {snackerrormsg ? snackerrormsg : Reducererror}
        </Alert>
      </Snackbar>
      {/* <Grid
        container
        spacing={2}
        sx={{display: 'block', justifyContent: 'center', mt: 5}}> */}
      {/* <form method="post"> */}
      <Box
        component="form"
        onSubmit={authHandler}
        // sx={{mt: 3, width: {xs: '80%', md: '40%'}}}
        sx={{display: 'flex', justifyContent: 'center'}}
        // onClick={() => setTouched(true)}
      >
        <Paper
          variant="outlined"
          sx={{width: {xs: '80%', md: '40%'}, p: 2, m: 2}}>
          <Grid container spacing={1.5}>
            <input
              type="file"
              name="image"
              ref={inputFile}
              style={{display: 'none'}}
              onChange={getPhoto}
            />

            {!isSignup && (
              <Grid item md={12} sm={12} xs={12}>
                <div className="loginimg">
                  <img
                    src={require('../../img/login2.gif')}
                    style={{width: '50%', height: '50%'}}
                  />
                </div>
              </Grid>
            )}
            {isSignup && (
              <Grid item md={12} sm={12} xs={12} sx={{p: 0.5}}>
                <div onClick={() => onImgClick()} className="imgcont">
                  <img className="img" src={setimage()} />
                </div>
              </Grid>
            )}
            {isSignup && (
              <Grid item md={12} sm={12} xs={12}>
                <TextField
                  error={!nameIsValid}
                  color="success"
                  helperText={nameIsValid ? '' : 'Name is required'}
                  id="name"
                  // helperText="sdfsd"
                  label="Name"
                  required
                  fullWidth
                  autoCapitalize="none"
                  onChange={changeNameHandler}
                  onBlur={changeNameHandler}
                />
              </Grid>
            )}
            {isSignup && (
              <Grid item md={12} sm={12} xs={12}>
                <TextField
                  id="surname"
                  label="Surname"
                  required
                  fullWidth
                  error={!surnameIsValid}
                  color="success"
                  helperText={!surnameIsValid ? 'SurName is required' : ''}
                  onChange={changesurNameHandler}
                  onBlur={changesurNameHandler}
                />
              </Grid>
            )}
            {isSignup && (
              <Grid item md={12} sm={12} xs={12}>
                <TextField
                  id="mno"
                  label="Mobile No"
                  required
                  fullWidth
                  inputProps={{
                    pattern: '[6-9]{1}[0-9]{9}',
                  }}
                  // error="Enter Valid Mobile No"
                  style={{borderRadius: 10}}
                  error={!moIsValid}
                  color="success"
                  helperText={
                    !moIsValid
                      ? 'Mobile No should start with number 6-9 and contain 10 digits'
                      : ''
                  }
                  onChange={changemnoHandler}
                  onBlur={changemnoHandler}
                />
              </Grid>
            )}
            <Grid item md={12} sm={12} xs={12}>
              <TextField
                id="email"
                label="E-Mail"
                required
                fullWidth
                autoCapitalize="none"
                error={!emailIsValid}
                color="success"
                helperText={!emailIsValid ? 'Please Enter Valid Email' : ''}
                onChange={changeEmailHandler}
                onBlur={changeEmailHandler}
              />
            </Grid>
            {isSignup && (
              <Grid item md={12} sm={12} xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="demo-simple-select-label">
                    Select Gender
                  </InputLabel>
                  <Select
                    defaultValue=""
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Gender"
                    error={!genIsValid}
                    color="success"
                    onChange={changeGenderHandler}
                    onBlur={changeGenderHandler}>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item md={12} sm={12} xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showpassword ? 'text' : 'password'}
                  required
                  value={password}
                  error={!passIsValid}
                  color="success"
                  onChange={changePasswordHandler}
                  onBlur={changePasswordHandler}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => Viewpass()}
                        // onMouseDown={Viewpass}
                        edge="end">
                        {showpassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            {/* {!isSignup && Reducererror ? showsnackbar(Reducererror) : ''} */}
            <Grid item md={12} sm={12} xs={12}>
              {isloding ? (
                <CircularProgress size={25} />
              ) : (
                <Button
                  type="submit"
                  // disabled={formvalid}
                  className="btn"
                  variant="contained">
                  {isSignup ? 'Sign Up' : 'Login'}
                </Button>
              )}
            </Grid>

            {!isSignup && (
              <Grid item md={12} sm={12} xs={12} sx={{mt: -2}}>
                <div className="buttonContainer">
                  <Button
                    // color={Color.primary}
                    className="btn"
                    onClick={() => setModalVisible(!modalVisible)}>
                    Forget Password
                  </Button>
                </div>
              </Grid>
            )}
            <Grid item md={12} sm={12} xs={12} sx={{mt: -2}}>
              <Button
                className="btn"
                onClick={() => {
                  setIsSignup(prevState => !prevState);
                }}>{`${
                !isSignup
                  ? "Don't have an Account?"
                  : 'Already Have an Account?'
              }`}</Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* </form> */}
    </>
  );
};

export default AuthScreen;
