import React, {useEffect, useState} from 'react';
// import {API_URL} from '@env';
import Authuser from '../../../api/Authuser';
import {useDispatch} from 'react-redux';
// import * as postaction from '../../../store/action/Fundpost';
import {storage} from '../../../firebase';
import {getDownloadURL, ref} from 'firebase/storage';
import {
  Alert,
  Box,
  Button,
  Skeleton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@mui/material';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import '../../../css/FundPostitem.css';

const FundPostitem = props => {
  const [dayleft, setdayleft] = useState();
  const [imgurl, setimgurl] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const [average, setaverage] = useState('');

  const [totalraise, settotalraise] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(props);
    Authuser.get('/totalfund/' + props.item._id).then(res => {
      const avg = (res.data.data * 100) / props.item.amount;

      setaverage(avg);
      settotalraise(res.data.data);
      // console.log(avg , res.data.data , props.item.amount);
    });

    Authuser.get('/dayleft/' + props.item._id).then(res => {
      // if (res.data.data < 1) {
      //   // setover('Rasing Amount Time is Over');
      // }
      // console.log(props.item._id,res.data.data);

      setdayleft(res.data.data);
    });
    getimage();
  }, [props.item]);

  // console.log(props.item?.raiseamount);

  const selectitemHandler = (id, title) => {
    props.navigation.navigate('FundDetails', {
      fundpostid: id,
      name: title,
    });
  };

  const deleteconfirm = () => {
    Alert('Post Delete', 'Plase Confirm Your Post is Deleted', [
      {
        Text: 'Cancel',
        onClick: () => console.log('Cancel Pressed'),
        className: 'cancel',
      },
      {
        Text: 'OK',
        // onClick: () => dispatch(postaction.Deletepost(props.item._id)),
      },
    ]);
  };
  const getimage = async () => {
    try {
      setTimeout(async () => {
        const image = await getDownloadURL(
          ref(storage, 'postimage/' + props.item.image),
        );
        // const image = await storage()
        //   .ref('postimage/' + props.item.image)
        //   .getDownloadURL();

        setimgurl(image);
        setRefreshing(false);
      }, 3000);
      // image.then((res)=>{
      //   console.log("@@@@"+res);
      //   return res
      // }).catch((e)=>console.log('geting image error => ',e))

      // return image;
    } catch (e) {
      setRefreshing(true);
      console.log('********');
      console.log(props.item.image, e);
    }
  };

  // const imgurl = API_URL + `image/${props.item.image}`;
  // console.log('----', props.item.image, imgurl);

  return (
    <div className="product">
      <Card
        sx={{
          maxWidth: 345,
          height:300,
          cursor: 'pointer',
        }}
        onClick={props.onSelect}>
        {true ? (
          <Skeleton
            // className={imgcon}
            // isLoading={refreshing}
            variant="rectangular"
            // width="350px"
            // height="140px"
            sx={{height: '50%'}}
          />
        ) : (
          <CardMedia
            component="img"
            alt="Image"
            // height="140"
            sx={{height: '50%'}}
            image={imgurl}
          />
        )}
        <CardContent sx={{height:'10%'}}>
          <Typography gutterBottom variant="h5" component="div"></Typography>
          <Typography variant="body2" color="text.secondary">
            <div className="details">
              <div className="title">{props.item.title}</div>
              {/*<div className={price}>${Number(props.item.price).toFixed(2)}</div>*/}
            </div>
          </Typography>
        </CardContent>
        <CardActions sx={{height: '30%'}}>
          <Grid
            container
            style={{
              justifyContent: props.isEdit ? 'space-evenly' : 'space-between',
            }}>
            {!props.isEdit && (
              <>
                <Grid xs={2} item>
                  <CircularProgressWithLabel
                    value={average !== '0' ? +average : 100}
                  />
                </Grid>

                <Grid xs={3} item>
                  <Typography style={{marginLeft: 7}}>
                    <Typography sx={{color: 'rgb(105,103,103)'}}>
                      Raised
                    </Typography>
                    <Typography sx={{fontSize: {md: 19}}}>
                      ₹
                      {props.item?.raiseamount
                        ? props.item?.raiseamount
                        : totalraise}
                    </Typography>
                  </Typography>
                </Grid>
              </>
            )}
            <Grid xs={7} item textAlign={'start'}>
              {!props.isEdit && (
                <Typography
                  sx={{
                    border: 1,
                    borderColor: 'gray',
                    // borderLeftColor:'greay',
                    borderWidth: 2,
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    borderRightWidth: 0,
                    ml: 2,
                  }}>
                  <Typography
                    className="createby"
                    sx={{ml: 2}}
                    style={{color: 'rgb(105,103,103)'}}>
                    Create By
                  </Typography>
                  <Typography sx={{ml: 2, fontSize: {md: 19}}}>
                    {props.item.user?.name + props.item.user?.Surname}
                  </Typography>
                </Typography>
              )}
            </Grid>

            {props.isEdit && (
              <Button
                style="btn"
                mode="contained"
                title="Edit"
                onClick={() =>
                  props.navigation.navigate('Makepost', {
                    post: props.item,
                  })
                }>
                Edit
              </Button>
            )}
            {props.isEdit && (
              <Button
                className="btn"
                mode="contained"
                title="Delete"
                onClick={
                  () => deleteconfirm()
                  // ,props.navigation.navigate('Home');
                }>
                Delete
              </Button>
            )}

            {/*
                !props.isEdit && dayleft > 0 && (
                // !props.isEdit && (
                  <Button
                    className={btn}
                    disabled={props?.user === props.item.user ? true : false}
                    mode="contained"
                    onClick={() => {
                      props.navigation.navigate('DonationDetails', {
                        fundpostid: props.item._id,
                        name: props.item.title,
                      });
                    }}>
                    Donate
                  </Button>
                )
                  */}
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

export default FundPostitem;
