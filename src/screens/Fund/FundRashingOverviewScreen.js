import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FundPostitem from '../../componets/UI/Fund/FundPostitem';
import FundPostitemlist from '../../componets/UI/Fund/FundPostitemlist';
import {
  Alert,
  Button,
  Card,
  Chip,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {setpostdata} from '../../store/scllie/Fundpost';
import '../../css/FundRashingOverviewScreencss.css';
import {useNavigate} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

// import FastImage from 'react-native-fast-image'

const FundRashingOverviewScreen = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [scroll, setscroll] = useState(true);

  const user = useSelector(state => state.user.users);
  let fundpost = useSelector(
    state => state.Fundpost.FundPost /*.filter(i => {
      if (searchQuery !== '') {
        // console.log('1');
        return i.title.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (props.route.params?.topic && !divAll) {
        return i.topic._id === props.route.params.topic;
      } else {
        return true;
      }
    }),*/,
  );

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [seltopic, setseltopic] = useState();
  const [sortingdata, setsortingdata] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setSearchQuery] = useState();
  let timer;
  let navigate = useNavigate();
  const topic = useSelector(state => state.Fundpost.topic);
  useEffect(() => {
    dispatch(setpostdata('All'));
  }, []);
  const selectitemHandler = id => {
    navigate(`/FundDetails/${id}`);

    // props.navigation.navigate('FundDetails', {
    //   fundpostid: id,
    //   name: title,
    // });
  };
  // console.log("/*/*/*/*/",user._id);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(setpostdata('All'));
    setValue('');
    setsortingdata(false);
    setRefreshing(false);
  };

  const onChangeSearch = query => {
    console.log(query);
    setloading(true);
    // // fundpost.filter(i => i.title === searchQuery)
    // console.log(query);

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (query === '') {
        dispatch(setpostdata('All'));
        setSearchQuery(query);
        setloading(false);
      } else {
        dispatch(setpostdata(query));
        setSearchQuery(query);
        setloading(false);
      }
    }, 500);
  };

  const sorting = type => {
    setsortingdata(true);
    dispatch(setpostdata(type));
    setModalVisible(false);
  };
  // let fundpost = useSelector(state => state.fundpost.FundPost);

  return (
    <>
      <Grid container sx={{p: {md: 3, sm: 3, xs: 2}}}>
        {/* <div className="mainscreen"> */}
        {/*!value && <Button>{value}</Button>*/}

        <Grid container item md={11} xs={11}>
          <Grid item md={8} xs={9} textAlign={'right'}>
            <FormControl>
              <TextField
                sx={{width: {md: 400, xs: 300}}}
                placeholder="Search"
                onChange={e => onChangeSearch(e.target.value)}
                // value={query}
                // onChange={q => onChangeSearch(q.nativeEvent.div)}
              />
            </FormControl>
          </Grid>
          <Grid item md={4} xs={3}>
            <Typography sx={{textAlign: 'left', mt: 2, ml: 2}}>
              {loading ? <CircularProgress size={25} /> : undefined}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          md={1}
          xs={1}
          mt={1.5}
          direction="row"
          justifyContent="flex-start">
          <img
            onClick={() => setModalVisible(!modalVisible)}
            src={require('../../img/icon/sorting.jpeg')}
            style={{height: 30, width: 30, cursor: 'pointer'}}
          />
        </Grid>

        {!fundpost && (
          <Grid item md={12} sm={12} xs={12} mt={2}>
            {/* <div className="Notfound"> */}
            <div style={{fontSize: 20}}>Not Data Found</div>
            {/* </div> */}
          </Grid>
        )}
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{p: {md: 3, sm: 3, xs: 2}}}
        textAlign={'left'}>
        {sortingdata && (
          <Grid item md={12} sm={12} xs={12} p={0} mt={-3}>
            <Chip
              label={value}
              onDelete={() => {
                setValue('');
                dispatch(setpostdata('All'));
                setsortingdata(false);
              }}
            />
          </Grid>
        )}
        <Modal
          open={modalVisible}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          // animationType="slide"
          // transparent={true}
          // onRequestClose={() => {
          //   Alert('Modal has been closed.');
          //   setModalVisible(!modalVisible);
          // }}
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              ml={12}>
              Select Filter
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2, ml: 5}}>
              <FormControl sx={{m: 0.5, width: '25ch'}} variant="outlined">
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select Gender"
                  onChange={e => setValue(e.target.value)}>
                  <MenuItem value="RaiseAmount">Sort by Raise Amount</MenuItem>
                  <MenuItem value="TargetAmount">
                    Sort by Target Amount
                  </MenuItem>
                  <MenuItem value="LeftTime">Sort by Left Time</MenuItem>
                </Select>
              </FormControl>

              <div>
                <Button
                  onClick={() => sorting(value)}
                  mode="contained"
                  className="btn"
                  disabled={value ? false : true}
                  sx={{
                    ml: '35px',
                  }}>
                  Apply
                </Button>
                <Button
                  onClick={() => setModalVisible(!modalVisible)}
                  mode="contained"
                  className="btn"
                  style={{marginLeft: 10}}>
                  Cancel
                </Button>
              </div>
            </Typography>
          </Box>
        </Modal>

        {/* <div className="list"> */}

        {fundpost &&
          fundpost.map(itemdata =>
            !query || query === '' ? (
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
                  user={user?._id}
                  onSelect={() => {
                    selectitemHandler(itemdata._id);
                  }}
                />
              </Grid>
            ) : (
              <Grid item key={itemdata._id} md={4} sm={6} xs={12}>
                <FundPostitemlist
                  key={itemdata._id}
                  item={itemdata}
                  onSelect={() => {
                    selectitemHandler(itemdata._id);
                  }}
                />
              </Grid>
            ),
          )}
        {/* </Grid> */}
        {/* <Fab
          className="fab"
          icon={require('../../img/icon/plus.png')}
          onClick={() => props.navigation.navigate('Makepost')}
        /> */}

        {/* </div> */}
        {/* </div> */}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => navigate('/Makepost')}
        sx={{position: 'fixed', bottom: 10, right: 10}}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default FundRashingOverviewScreen;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
