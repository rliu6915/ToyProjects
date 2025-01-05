import { useSelector } from 'react-redux'

const Notification = () => {
  console.log('state', useSelector(state => state))
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // console.log('notification', notification)

  // return (
  //   <>
  //     {notification && (
  //       <div style={style}>
  //         {notification}
  //       </div>
  //     )}
  //   </>
  // )

  return (
    <div>
      {notification && (
        <div style={style}>
          {notification}
        </div>
      )}
    </div>
  )
}

export default Notification