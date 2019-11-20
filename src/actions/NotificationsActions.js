import axios from 'axios'
import {
  NOTIFICATIONS_UPDATED,
} from '../constants/NotificationsConstants'

const updateNotifications = (notifications, lastCreationTime) => {
  return {
    type: NOTIFICATIONS_UPDATED,
    notifications,
    lastCreationTime
  }
}

export const doHideNotification = (id) => {
  return (dispatch, getState) => {
    axios.delete('/api/notifications/' + id)
    .then(() => {
      let notifications = Object.assign({}, getState().notifications.notifications)
      let lastNotificationDate = getState().notifications.lastCreationTime
      delete notifications[id]
      dispatch(updateNotifications(notifications, lastNotificationDate))
    })
    .catch(() => {
      //TODO better handling
    })
  }
}

export const doFetchNotifications = () => {
  return (dispatch, getState) => {
    if(getState().user.currentUser.isAuthenticated) {
      axios.get('/api/notifications?createdAfter=' + getState().notifications.lastCreationTime)
      .then((res) => {
        let notifications = Object.assign({}, getState().notifications.notifications)
        let lastNotificationDate = ''

        if(res.data !== null && res.data.length > 0) {
          res.data.map(n => {
            notifications[n.id] = n
            if(lastNotificationDate === '') {
              lastNotificationDate = n.createdAt
            }
          })
          dispatch(updateNotifications(notifications, lastNotificationDate))
        }
      })
      .catch(() => {
        //TODO better handling
      })
    }
  }
}
