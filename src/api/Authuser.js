import axios from 'axios';

export default axios.create({
  baseURL: 'http://192.168.200.36:4000/',

  // ,headers:{
  //         Authorization:'Bearer '+{token}
  //     }
});
