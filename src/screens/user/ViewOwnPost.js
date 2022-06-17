import {Button, Grid, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import FundPostitem from '../../componets/UI/Fund/FundPostitem';
import {setpostdata} from '../../store/scllie/user';

const ViewOwnPost = props => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const user = useSelector(state => state.user.users);
  
  console.log(user);

  useEffect(() => {
    dispatch(setpostdata(user?._id));
  }, []);

  const post = useSelector(state => state.user.userpost);
  console.log(post);

  // const [postdata, setpostdata] = useState(post.filter(i=>i.user === user._id));
  const [refreshing, setRefreshing] = useState(false);

  // console.log(post);

  const selectitemHandler = id => {
    navigate(`/FundDetails/${id}`);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{p: {md: 3, sm: 3, xs: 2}}}
      textAlign={'left'}>
      {!post || post?.length === 0 ? (
        <Grid
          item
          md={12}
          sm={12}
          xs={12}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            xs: {alignItems: 'center'},
          }}>
          <Typography sx={{fontSize: 20}}>Not Created Any posts yet</Typography>
          <Button onClick={() => navigate('/Makepost')}>Create Post</Button>
        </Grid>
      ) : (
        post.map(itemdata => (
          <Grid
            item
            key={itemdata._id}
            md={4}
            sm={6}
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              xs: {alignItems: 'center'},
            }}>
            <FundPostitem
              key={itemdata._id}
              item={itemdata}
              onSelect={() => {
                selectitemHandler(itemdata._id, itemdata.title);
              }}
              // selectitemHandler={selectitemHandler()}
              isEdit={user}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ViewOwnPost;
