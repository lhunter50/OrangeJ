import React from 'react'
import { Table, Tag, Button, List, Card, Avatar,  } from 'antd'
import Template from '../components/Template'

class Unlockables extends React.Component {
  state = { 
    width: 0, 
    height: 0,
    size: "large", 
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    
  }

  render() {
    // To add more Unlockables, just add an item to the array, with the 3 fields I have here already,
    const data = [
      {
        title: 'Create Stripe Account',
        content: 'Unlocks withdrawl. Be able to get paid your rep reward.',
        avatar: <Avatar src="https://a.slack-edge.com/80588/img/plugins/stripe/service_512.png" />
      },
      {
        title: 'Follow OJ on Twitter',
        content: 'Unlocks your rep page short URL: OJ.deals', 
        avatar: <Avatar src="https://image.flaticon.com/icons/svg/124/124021.svg" />,
      },
      {
        title: 'Share a Deal on Twitter',
        content: 'Unlocks 50 character customizable Bio.',
        avatar: <Avatar src="https://image.flaticon.com/icons/svg/124/124021.svg" />,
      },
      {
        title: 'Tag Friends on OJ Insta',
        content: "Unlocks unlimited Pins, able to pin more than 5 deals.",
        avatar: <Avatar src="https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png?w=300" />,
      },
    ]

    return (
      <>
        <Template>
          <div id="list">
            <List
              grid={{
                gutter: 4,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={data}
              size='large'
              style={{}}
              renderItem={item => (
                  <div id="items">
                    <List.Item style={{  }}>
                      <List.Item.Meta 
                        avatar={item.avatar}
                        title={<Button  style={{ width: '100%'}}>{item.title}</Button>}
                        description={item.content}
                      />
                  </List.Item>
                  </div>
                )}
              >
            </List>
          </div>
        </Template>
        <style jsx>{`
          #list {
            margin-top: 15px;
            padding: 10px 50px 10px 50px;
          }

          #items {
            border: 2px solid grey;
            margin-right: 10px;
            padding: 10px 0px 10px 0px;
            margin-bottom: 5px;
            -moz-box-shadow: 3px 3px 5px 6px #ccc;
            -webkit-box-shadow: 3px 3px 5px 6px #ccc;
            box-shadow: 3px 3px 5px 6px #ccc;
          }

          @media only screen and (max-width: 768px) {
            #items {
              width: 100%;
              margin: 0px auto;
            }
          }
        `}
        </style>
      </>
    )
  }
}

export default Unlockables