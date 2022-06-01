import React, {useEffect, useState} from 'react';
// import {API_URL} from '@env';
import Authuser from '../../../api/Authuser';
import {useDispatch} from 'react-redux';
// import * as postaction from '../../../store/action/Fundpost';
import {storage} from '../../../firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {
  Alert,
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from '@mui/material';
import '../../../css/FundPostitemlist.css';

const FundPostitemlist = props => {
  const [dayleft, setdayleft] = useState();
  const [imgurl, setimgurl] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const [average, setaverage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(props);
    Authuser.get('/totalfund/' + props.item._id).then(res => {
      const avg = (res.data.data * 100) / props.item.amount;

      setaverage(avg);

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

  const selectitemHandler = (id, title) => {
    props.navigation.navigate('FundDetails', {
      fundpostid: id,
      name: title,
    });
  };

  const deleteconfirm = () => {
    Alert.alert('Post Delete', 'Plase Confirm Your Post is Deleted', [
      {
        Text: 'Cancel',
        onClick: () => console.log('Cancel Pressed'),
        view: 'cancel',
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
      <div className="tochabale">
        <div onClick={props.onSelect}>
          <List
            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <ListItem>
              <ListItemAvatar>
                {refreshing ? (
                  <Skeleton
                    // className="img"
                    // isLoading={refreshing}
                    variant="square"
                    width="100px"
                    height="100px"
                  />
                ) : (
                  <Avatar
                    variant="square"
                    sx={{
                      width: {md: '100px', xs: '50px'},
                      height: {md: '100px', xs: '50px'},
                    }}
                    src={imgurl}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                sx={{ml: 2}}
                primary={props.item.title}
                // secondary="Jan 9, 2014"
              />
            </ListItem>
          </List>
          {/* {console.log(props.item.imageUrl)} */}
        </div>
      </div>
    </div>
  );
};

export default FundPostitemlist;
