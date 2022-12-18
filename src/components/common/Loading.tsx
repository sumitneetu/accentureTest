import React from 'react'

interface Loading {
  isLoading: boolean
}
const Loading = (props: Loading) => {
  return (
    <React.Fragment>
      {props.isLoading ? (
        <div className="loadingBox">
          <img src="/loader.gif" />
        </div>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

export default Loading
