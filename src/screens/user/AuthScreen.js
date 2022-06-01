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
} from '@mui/material';
import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Authuser from '../../api/Authuser';
import '../../css/Authscreencss.css';
// import storage from '../../firebaseconfig';
import {storage} from '../../firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {CheckLogin, CheckReg} from '../../store/scllie/user';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const AuthScreen = props => {
  let token = useSelector(state => state.user.token);
  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  }, [token]);

  console.log('Authuser', token);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const inputFile = useRef(null);

  const [isloding, setisloding] = useState(false);
  const [error, seterror] = useState();
  const [loerror, loseterror] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [img, setimg] = useState('default.png');
  const [selimg, setselimg] = useState(false);
  const [assets, setassets] = useState();
  const [imgurl, setimgurl] = useState();

  const [name, setname] = useState('');
  const [Surname, setsurname] = useState('');
  const [mobileno, setmno] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [refreshing, setRefreshing] = useState(true);
  const [showpassword, setshowpassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');

  let filename = '';
  useEffect(() => {
    if (error) {
      // Alert.alert('An Error', error, [{text: 'okay'}]);
      console.log(error);
    }
  }, [error]);

  const getimage = async file => {
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
    console.log(selimg);
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

  const authHandler = async () => {
    console.log(!filename);
    let action;
    if (isSignup) {
      // action = SIGNUP({

      uplodeimage(assets);

      if (
        name !== '' &&
        Surname !== '' &&
        email !== '' &&
        password !== '' &&
        mobileno !== '' &&
        value !== ''
      ) {
        console.log('********');
        if (!filename) {
          return alert('Please add Profile Image');
        } else {
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
        }
      } else {
        console.log(name, Surname, filename, email, password, mobileno);
        alert("You Can' Add Empty Data");
        return;
      }
    } else {
      if (email !== '' && password !== '') {
        // action = useraction.Login({
        // login({
        action = CheckLogin({
          email: email,
          password: password,
        });
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
  const onClick = e => {
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

  return (
    <div className="screen">
      {!isSignup && (
        <div className="loginimg">
          <img
            src={require('../../img/login2.gif')}
            style={{width: '20%', height: '20%'}}
          />
        </div>
      )}
      <div className="authcon">
        <form method="post">
          <input
            type="file"
            name="image"
            ref={inputFile}
            style={{display: 'none'}}
            onChange={getPhoto}
          />
          {isSignup && (
            <div onClick={onClick} className="imgcont">
              <img className="img" src={setimage()} />
            </div>
          )}
          {isSignup && (
            <div className="textfiled">
              <FormControl sx={{m: 0.5, width: '25ch'}} variant="outlined">
                <TextField
                  id="name"
                  label="Name"
                  required
                  autoCapitalize="none"
                  onChange={e => setname(e.target.value)}
                />
              </FormControl>
            </div>
          )}
          {isSignup && (
            <div className="textfiled">
              <FormControl sx={{m: 0.5, width: '25ch'}} variant="outlined">
                <TextField
                  id="surname"
                  label="Surname"
                  required
                  autoCapitalize="none"
                  onChange={e => setsurname(e.target.value)}
                />
              </FormControl>
            </div>
          )}
          {isSignup && (
            <div className="textfiled">
              <FormControl sx={{m: 0.5, width: '25ch'}} variant="outlined">
                <TextField
                  id="mno"
                  label="Mobile No"
                  required
                  // error="Enter Valid Mobile No"
                  style={{borderRadius: 10}}
                  onChange={e => setmno(e.target.value)}
                />
              </FormControl>
            </div>
          )}
          <div className="textfiled">
            <FormControl sx={{m: 0.5, width: '25ch'}} variant="outlined">
              <TextField
                id="email"
                label="E-Mail"
                required
                autoCapitalize="none"
                onChange={e => setemail(e.target.value)}
              />
            </FormControl>
          </div>
          {isSignup && (
            <div className="textfiled">
              <FormControl sx={{m: 0.5, width: '25ch'}} variant="outlined">
                <InputLabel id="demo-simple-select-label">
                  Select Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Gender"
                  onChange={e => setValue(e.target.value)}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
          <div className="password">
            <FormControl sx={{m: 0.5, width: '25ch'}} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showpassword ? 'text' : 'password'}
                value={password}
                onChange={e => setpassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={Viewpass}
                      // onMouseDown={Viewpass}
                      edge="end">
                      {showpassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <div className="buttonContainer">
            {!isSignup && loerror && (
              <div className={{color: 'red', fontSize: 15}}>
                Wrong Id and Password
              </div>
            )}

            <Button
              // color={Color.primary}
              className="btn"
              onClick={authHandler}
              mode="contained">
              {isSignup ? 'Sign Up' : 'Login'}
            </Button>

            {!isSignup && (
              <div className="buttonContainer">
                <Button
                  // color={Color.primary}
                  className="btn"
                  onClick={() => setModalVisible(!modalVisible)}>
                  Forget Password
                </Button>
              </div>
            )}
          </div>
          <div className="buttonContainer">
            <Button
              className="btn"
              onClick={() => {
                setIsSignup(prevState => !prevState);
              }}>{`${
              !isSignup ? "Don't have an Account?" : 'Already Have an Account?'
            }`}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
