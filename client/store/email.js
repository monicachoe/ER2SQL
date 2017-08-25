import axios from 'axios';

export const sendMail = () => dispatch => {
    axios.get(`/api/email`)
    .then( res => {
      console.log(res.data)
    })
  }