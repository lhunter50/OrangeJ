import React from 'react'

class Loading extends React.Component {
  
  render() {
    return (
      <>
        <div className="page">
          <img src="/fiverLogoV1.png"></img>
          <h2>{this.props.message}</h2>
        </div>
        <style global jsx>{`
          @keyframes rotation {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(-359deg);
            }
          }

          .page {
            height: 95vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          body {
            background-color: #63D8F2;

          }

          img {
            animation: rotation 2s infinite linear;
            width: 200px;
            height: 200px;
          }
          
        `}</style>
      </>
    )
  }
}

export default Loading