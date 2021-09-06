import blogServices from '../services/blogs';
import {
  createNotificationObject,
  createSetNotificationAction,
  createRemoveNotificationAction
} from './notificationReducer';


export const createSetBlogAction = (id) => {
  const failedNotification = createNotificationObject(false, 'Fetching blog failed');

  return async (dispatch) => {
    try {
      const blog = await blogServices.getBlog(id);
      console.log('Got', blog);
      dispatch({
        type: 'SET_BLOG_DATA',
        data: blog
      });
    }
    catch(err) {
      dispatch(createSetNotificationAction(failedNotification));
      setTimeout(() => {
        dispatch(createRemoveNotificationAction());
      }, 3000);
    }
  };
};

const blogReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_BLOG_DATA':
    return action.data;
  case 'BLOG_LIKED':
    return action.data;
  default:
    return state;
  }
};

export default blogReducer;