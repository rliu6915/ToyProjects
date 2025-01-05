import { useSelector } from 'react-redux'

import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  // if (message === null) {
  //   return null
  // }

  // return (
  //   <div className={message.type}>
  //     {message.text}
  //   </div>
  // )

  // console.log('state', useSelector(state => state))

  const message = useSelector(state => state.notification)
  // console.log('message', message)

  return (
    <div>
      {message &&
        // <div className={message.variant}>
        //   {message.text}
        // </div>
        <Alert variant={message.variant}>
          {message.text}
        </Alert>
      }
    </div>
  )
}

export default Notification