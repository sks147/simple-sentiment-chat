import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default props => {
  if (props.msg) {
    const type = `alert alert-${props.type || 'light'}`

    return <div className={type}>{props.msg}</div>
  }
  return null
}
