import { useSelector } from 'react-redux'

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
        <div className={message.type}>
          {message.text}
        </div>
      }
    </div>
  )
}

export default Notification