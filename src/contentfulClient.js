import axios from 'axios';

const contentfulClient = axios.create({
  baseURL: 'https://cdn.contentful.com',
  params: {
    space: 'gxz2kpjfag3c', // Replace with your Space ID
    access_token: 'bYq8sH_BpvozOhUgYIoBLxXdo0MAdbkdR1DrQJWDtMA', // Replace with your Content Delivery API access token
    content_type: 'products', // Your content model ID
  },
});

export default contentfulClient;
