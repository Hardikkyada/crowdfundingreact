import Authuser from '../../api/Authuser';

export const Addpost = post => {
  console.log('action', post);

  return dispatch => {
    Authuser.post('/AddPost', post)
      .then(res => {
        console.log('res........', res.data);
        dispatch(AddPostData(res.data));
      })
      .catch(e => {
        throw new Error(e);
      });
  };
};

const AddPostData = data => {
  console.log(data);
  return {
    type: 'ADDPOST',
    data: data,
  };
};

//Update post data

export const Editpost = (id, post) => {

  return dispatch => {
    Authuser.patch('/Editpost/' + id, post)
      .then(res => {
        console.log('res........', res.data);
        dispatch(Editpostdata(id, res.data));
      })
      .catch(e => {
        throw new Error(e);
      });
  };
};

const Editpostdata = (id, data) => {
  console.log(data);
  return {
    type: 'EDITPOST',
    id: id,
    data: data,
  };
};

export const Deletepost = id => {
  return dispatch => {
    Authuser.delete('/delpost/' + id)
      .then(res => {
        // console.log(res.data);
        dispatch(DelData(id));
      })
      .catch(e => {
        throw new Error(e);
      });
  };
};

const DelData = data => {
  //   console.log(data);
  return {
    type: 'DELETEPOST',
    id: data,
  };
};

export const setpostdata = (type) => {
  return dispatch => {
    Authuser.get('/getallPost/'+type)
      .then(res => {
        // console.log(res.data);
        dispatch(GetData(res.data));
      })
      .catch(e => {
        if(e.response.status === 404)
        {
          console.log("Data Not Found");
          dispatch(GetData([]));
          return
        }
        // throw new Error(e);
      });
  };
};

const GetData = data => {
    // console.log(data);
  return {
    type: 'GETALLPOST',
    data: data,
  };
};

export const Gettopicdata = () => {
  return dispatch => {
    Authuser.get('/getalltopic')
      .then(res => {
        // console.log("action",res.data);
        dispatch(GetTopic(res.data));
      })
      .catch(e => {
        throw new Error(e);
      });
  };
};

const GetTopic = data => {
  //   console.log(data);
  return {
    type: 'GETALLTOPIC',
    data: data,
  };
};
