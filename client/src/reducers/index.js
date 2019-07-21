import React from 'react';
import { combineReducers } from 'redux';
import posts from './posts'
import slug from './slug'

const cosmicBlog = combineReducers({
    posts,
    slug
})
  
export default cosmicBlog;
