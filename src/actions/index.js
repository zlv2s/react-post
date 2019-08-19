import jsonPlaceholder from '../api/jsonplaceholder'

export const fetchPosts = () => {
  return async dispatch => {
    const res = await jsonPlaceholder.get('/posts')
    dispatch({ type: 'FETCH_POSTS', payload: res.data })
  }
}

export const fetchUser = (id) => {
  return async dispatch => {
    const res = await jsonPlaceholder.get('/users/' + id)
    dispatch({ type: 'FETCH_USER', payload: res.data })
  }
}

export const fetchPostsAndUsers = () => {
  return async (dispatch, getState) => {
    await dispatch(fetchPosts())
    const userIds = [...new Set(getState().posts.map(post => post.userId))]
    userIds.forEach(userId => dispatch(fetchUser(userId)))
  }
}