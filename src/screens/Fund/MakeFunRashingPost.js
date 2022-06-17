import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Snackbar,
  TextField,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, {useEffect, useState, useRef, forwardRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {storage} from '../../firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {addpostdata, editpostdata} from '../../store/scllie/Fundpost';
import {useNavigate, useParams} from 'react-router-dom';

const MakeFunRashingPost = props => {
  let params = useParams();
  const post = params?.id;
  // const post = props.route.params?.post;

  const [title, settitle] = useState(post ? post.title : '');
  const [desc, setdesc] = useState(post ? post.desc : '');
  const [amount, setamout] = useState(post ? post.amount.toString() : '');
  const [day, setday] = useState(post ? post.totalday.toString() : '');
  const [seltopic, setseltopic] = useState({
    value: post?.topic._id,
    label: post?.topic.topic,
  });

  const [value, setValue] = useState(post?.topic._id ? post?.topic._id : '');
  const [items, setItems] = useState();

  const [img, setimg] = useState(post?.image ? post.image : '');
  const [selimg, setselimg] = useState(post?.image ? true : false);
  const [cngimg, setscngimg] = useState(false);
  const [isEdit, setisEdit] = useState(post ? true : false);
  const [assets, setassets] = useState();
  const [imgurl, setimgurl] = useState();
  const [refreshing, setRefreshing] = useState(true);
  const [snackbar, setsnacbar] = useState(false);
  const inputFile = useRef(null);
  let filename = '';

  const topic = useSelector(state => state.Fundpost.topic);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(fundaction.Gettopicdata());
  // }, []);

  const uplodeimage = file => {
    // setRefreshing(true);
    filename = Date.now() + file.name;

    // setimg(filename)

    const reference = ref(storage, 'postimage/' + filename);
    const upload = uploadBytes(reference, assets);
    // .putFile(file.uri);

    // const reference = storage().ref(url).putFile(uri.replace('file://', ''));
    // const reference = storage().ref("fsd.png").putFile();

    upload
      .then(() => {
        console.log('Added');
      })
      .catch(e => console.log('uploading image error => ', e));

    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 3000);
  };

  const getimage = async file => {
    try {
      const image = await getDownloadURL(ref(storage, 'profile/' + file));
      setimgurl(image);
    } catch (e) {
      console.log('Making post Error =>', e);
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const adddatahandler = () => {
    if (
      img === '' ||
      title === '' ||
      desc === '' ||
      day === '' ||
      value === ''
    ) {
      alert(`Can't Insert Blanck data`);
      return;
    }
    // setdesc(desc.trim())
    else {
      // console.log(title,desc,day,img);

      uplodeimage(assets);

      if (filename !== '') {
        const post = {
          image: filename,
          title: title,
          desc: desc
            .trim()
            .replaceAll(/^\s+|\s+$/gm, '')
            .replaceAll(/[ ]+/g, ' '),
          // desc: desc.trim().replaceAll(/\s/g,''),
          totalday: day,
          // topic: seltopic.topic,
          topic: value,
          amount: amount,
        };

        console.log(post);

        dispatch(addpostdata(post));

        setselimg(false);
        // setdesc("")
        // settitle("")
        // setamout("")
        // setday("")
        // setimg("")
        // setseltopic("")
        setOpen(true);
        setTimeout(() => {
          navigate('/home');
          console.log('navigate');
        }, 3000);
      }
    }
  };

  const onClick = e => {
    inputFile.current.click();
  };

  const getPhoto = e => {
    console.log('h8755/*/*/*/*/');
    setselimg(true);
    const selectedFile = e.target.files[0];
    setassets(e.target.files[0]);
    const objectUrl = URL.createObjectURL(selectedFile);
    console.log(objectUrl);
    setimg(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  };
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = React.useState(false);

  const Edit = () => {
    if (
      img === '' ||
      title === '' ||
      desc === '' ||
      day === '' ||
      topic === ''
    ) {
      alert(`Can't Insert Blanck data`);
      return;
    } else {
      const postdata = {
        // image: img,
        title: title,
        desc: desc
          .trim()
          .replaceAll(/^\s+|\s+$/gm, '')
          .replaceAll(/[ ]+/g, ' '),
        // desc: desc.trim().replaceAll(/\s/g,''),
        totalday: +day,
        // topic: seltopic.value,
        topic: value,
        amount: +amount,
      };

      if (assets) {
        uplodeimage(assets);
      }
      if (selimg && filename !== '') {
        postdata.image = filename;
      }

      // dispatch(fundaction.Editpost(post._id, postdata));
      dispatch(editpostdata(post._id, postdata));

      setselimg(false);
      setscngimg(false);
      // setdesc("")
      // settitle("")
      // setamout("")
      // setday("")
      // setimg("")
      // setseltopic("")
      setOpen(true);
      setTimeout(() => {
        navigate('/home');
        console.log('navigate');
      }, 2000);
    }
  };

  const setimage = () => {
    if (!selimg) {
      console.log('1');
      // setimg(user.ProfileImg);
      // console.log("false",API_URL + `image/${userdata.ProfileImg}`);
      getimage(post.image);
      return imgurl;
    } else if (isEdit && !cngimg) {
      console.log('2');
      getimage(img);
      return imgurl;
    } else {
      console.log('3');
      return img;
    }
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={4000}>
        <Alert severity="success" sx={{width: '100%'}}>
          Data Added successfully!
        </Alert>
      </Snackbar>
      <form>
        {!selimg ? (
          <div>
            <Button onClick={onClick}>Select Image</Button>
          </div>
        ) : refreshing && isEdit ? (
          <Skeleton variant="rectangular" width="350px" height="140px" />
        ) : (
          <img src={setimage()} onClick={onClick} />
        )}
        <div>
          <input
            type="file"
            name="image"
            ref={inputFile}
            style={{display: 'none'}}
            onChange={getPhoto}
          />
          <FormControl
            sx={{m: 0.5, width: {md: '40ch', sm: '40ch', xs: '30ch'}}}
            variant="outlined">
            <TextField
              label="Title"
              mode="outlined"
              value={title}
              onChange={e => settitle(e.target.value)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl
            sx={{m: 0.5, width: {md: '40ch', sm: '40ch', xs: '30ch'}}}
            variant="outlined">
            <TextField
              label="description"
              mode="outlined"
              value={desc}
              multiline={true}
              numberOfLines={3}
              onChange={e => setdesc(e.target.value)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl
            sx={{m: 0.5, width: {md: '40ch', sm: '40ch', xs: '30ch'}}}
            variant="outlined">
            <TextField
              disabled={isEdit ? true : false}
              label="amount"
              mode="outlined"
              keyboardType="numeric"
              value={amount}
              maxLength={8}
              onChange={e => setamout(e.target.value)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl
            sx={{m: 0.5, width: {md: '40ch', sm: '40ch', xs: '30ch'}}}
            variant="outlined">
            <TextField
              label="TotalDay Runing Event"
              mode="outlined"
              value={day}
              keyboardType="numeric"
              onChange={e => setday(e.target.value)}
            />
          </FormControl>
        </div>
        <div>
          <FormControl
            sx={{m: 0.5, width: {md: '40ch', sm: '40ch', xs: '30ch'}}}
            variant="outlined">
            <InputLabel id="demo-simple-select-label">Select Topic</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Gender"
              value={value}
              onChange={e => setValue(e.target.value)}>
              {topic.map(i => (
                <MenuItem value={i._id}>{i.topic}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {!isEdit ? (
          <div>
            <Button
              // style={btn}
              onClick={() => adddatahandler()}
              mode="contained">
              Submit
            </Button>
            {/*<Button
              style={{marginTop: 20}}
              onPress={() => props.navigation.goBack()}
              mode="contained">
              Back
              </Button>*/}
          </div>
        ) : (
          <Button onClick={() => Edit()} mode="contained">
            Edit
          </Button>
        )}
      </form>
    </>
  );
};

export default MakeFunRashingPost;
