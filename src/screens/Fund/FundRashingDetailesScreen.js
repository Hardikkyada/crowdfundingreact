import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {storage} from '../../firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';

// import {API_URL} from '@env';
import Authuser from '../../api/Authuser';
import {useParams, useNavigate} from 'react-router-dom';
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Skeleton,
  Typography,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import {Box} from '@mui/system';
import '../../css/FundRashingDetailesScreencss.css';

const FundRashingDetailesScreen = props => {
  const [amount, setamount] = useState();
  const [dayleft, setdayleft] = useState();
  const [over, setover] = useState();
  const [image, setimage] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [userlist, setuserlist] = useState();

  let params = useParams();
  let navigate = useNavigate();
  const pid = params.id;
  console.log(pid);

  let curentpost = useSelector(state =>
    state.Fundpost.FundPost.find(i => i._id === pid),
  );

  const user = useSelector(state => state.user.users);

  if (!curentpost) {
    // curentpost = useSelector(state =>
    //   state.user.userpost.find(i => i._id === pid),
    // );
  }

  useEffect(() => {
    Authuser('/totalfund/' + pid).then(res => {
      setamount(res.data.data);
    });
    Authuser('/dayleft/' + pid).then(res => {
      // console.log(res.data.data);
      if (res.data.data < 1) {
        setover('Rasing Amount Time is Over');
      }
      setdayleft(res.data.data);
    });
    Authuser.get('/totalsupports/' + pid).then(res => {
      setuserlist(res.data.data);
      console.log('****************', res.data.data);
    });
    getimage();
  }, []);

  // const imgurl = API_URL + `image/${curentpost.image}`;
  console.log(user?._id, curentpost?.user);

  const getimage = async () => {
    try {
      const imgurl = await getDownloadURL(
        ref(storage, 'postimage/' + curentpost.image),
      );

      setimage(imgurl);
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    // <Scrolldiv>
    <>
      <Grid container spacing={2}>
        <Grid item md={12}>
          {!curentpost && (
            <div className="Notfound">
              <h3 style={{fontSize: 20}}>Not Data Found</h3>
            </div>
          )}
        </Grid>
        <Grid
          item
          md={12}
          sx={{display: 'flex', justifyContent: 'center', p: 5}}>
          {refreshing ? (
            <Skeleton
              // className={imgcon}
              // isLoading={refreshing}
              variant="rectangular"
              width="250px"
              height="150px"
            />
          ) : (
            <div>
              <img
                src={image}
                style={{
                  width: 250,
                  height: 150,
                }}
              />
            </div>
          )}
        </Grid>
        <Grid item md={12} p={5}>
          <h3 className="desc">{curentpost?.desc}</h3>
        </Grid>

        {!over && (
          <div className="progreescnt">
            <Grid
              item
              md={12}
              sx={{
                paddingInline: 5,
                paddingBottom: 2,
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Typography
                variant="h3"
                sx={{fontSize: 18}}
                onClick={() => setModalVisible(true)}>
                {userlist ? userlist.length : 0} Supports
              </Typography>
              <Typography variant="h3" sx={{fontSize: 18}}>
                Days Left : {dayleft ? dayleft : ''}
              </Typography>
            </Grid>

            {console.log(
              curentpost.amount,
              amount,
              (curentpost.amount * 100) / amount,
            )}

            <Grid item md={12} sx={{paddingInline: 5}}>
              <Box sx={{width: '100%'}}>
                <LinearProgress
                  variant="determinate"
                  value={
                    amount
                      ? (amount * 100) / curentpost.amount
                      : ''
                  }
                />
              </Box>
            </Grid>

            <Grid
              item
              md={12}
              sx={{
                paddingInline: 5,
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Typography variant="h6">
                Target <div>₹{curentpost?.amount}</div>
              </Typography>
              <Typography variant="h6">
                Raised
                <div>₹{amount ? amount : '0'}</div>
              </Typography>
            </Grid>
            <div className="action">
              <Button
                className="btn"
                disabled={user?._id === curentpost?.user._id ? true : false}
                onPress={() => {
                  //dispatch(cartActions.addtocart(curentpost));
                  navigate('DonationDetails', {
                    fundpostid: pid,
                    name: props.route.params.name,
                  });
                }}
                mode="contained">
                Donate
              </Button>
            </div>
          </div>
        )}
        {over && (
          <div className="over">
            <h3 className="overh3">{over}</h3>
            <h3 className="overh3"> Total Amount Raise :- {amount}</h3>
          </div>
        )}
      </Grid>
      <Modal
        open={modalVisible}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={{...style, backgroundColor: 'white'}}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            ml={12}>
            Supports's
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2, ml: 5}}>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'GrayText'}}>
              {userlist && userlist.length > 0 ? (
                userlist.map(itemdata => (
                  <ListItem key={itemdata._id}>
                    <ListItemText
                      sx={{ml: 2, borderWidth: 0, height: 30, fontSize: 20}}
                      primary={itemdata.name}
                      secondary={`Donate Amount : ${itemdata.Totalamount}`}
                    />
                  </ListItem>
                ))
              ) : (
                <div
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <h3>No Data Found</h3>
                </div>
              )}
            </List>
            <div style={{flexDirection: 'row', marginTop: 10}}>
              <Button
                onClick={() => setModalVisible(false)}
                mode="contained"
                className="btn"
                style={{marginLeft: 10}}>
                <h3>Cancel</h3>
              </Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default FundRashingDetailesScreen;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};
