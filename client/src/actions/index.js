export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_SLUG = 'RECEIVE_SLUG';
export const REQUEST_SLUG = 'REQUEST_SLUG';

function requestPosts(posts) {
  return {
    type: 'REQUEST_POSTS',
    posts
  }
}


function receivePosts(json) {
  return {
    type: 'RECEIVE_POSTS',
    posts: json.map(data => {
      data.author = data.metadata.author.title;
      data.authorImage = data.metadata.author.metadata.image.url;
      return data
    }),
    receivedAt: Date.now()
  }
}

export function postsHasErrored(bool) {
  return {
    type: 'POSTS_HAS_ERRORED',
    hasErrored: bool
  }
}


export function fetchBlogPosts(url) {
  return (dispatch) => {
    dispatch(requestPosts(url))
    fetch(url)
      .then(response => response.json(),
        error => {
          console.log('An error occurred.', error)
          dispatch(postsHasErrored(error))
        }
      )
      .then(json => {
        console.log(json);
        dispatch(receivePosts(json))
      }
      )
  };
}

function requestSlug(slug) {
  return {
    type: 'REQUEST_SLUG',
    slug
  }
}

function receiveSlug(json) {
  const slug = {
    'author': json.metadata.author.title,
    'author_image': json.metadata.author.metadata.image.url,
    'image': json.metadata.hero.url
  }
  return {
    type: 'RECEIVE_SLUG',
    slug: Object.assign(slug, json),
    receivedAt: Date.now()
  }
}


function slugHasErrored(bool) {
  return {
    type: 'SLUG_HAS_ERRORED',
    hasErrored: bool
  }
}

export function fetchSlugPost(url) {
  return (dispatch) => {
    dispatch(requestSlug(url))
    fetch(url)
      .then(response => response.json(),
        error => {
          console.log('An error occurred.', error)
          dispatch(slugHasErrored(error))
        }
      )
      .then(json => {
        dispatch(receiveSlug(json))
      }
      )
  };
}