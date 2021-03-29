import React from 'react'
import { Input, Form, Button, Radio, Divider } from 'antd'
import asRep from './../helpers/asRep'
import InjectedCheckoutForm from './../components/CardForm'
import { db, auth, functions } from "./../firebase/index"
import { ElementsConsumer } from '@stripe/react-stripe-js';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Bank extends React.Component {
  formRef = React.createRef();

  state = {
    bank: {
      currency: "cad",
      country: "CA",
      account_holder_type: "individual",
      account_holder_name: "",
      account_number: "",
      transitNumber: "",
      institutionNumber: "",
    }
  }

  componentDidMount = () => {
    db.doc("/reps/" + auth.currentUser.uid).get()
      .then(doc => {
        const data = doc.data()

        this.setState({stripeId: data.stripeId})
      })
  }

  onFinish = async values => {
    const { stripe } = this.props
    console.log('Success:', values);

    const {
      country,
      currency,
      transitNumber,
      institutionNumber,
      account_number,
      account_holder_name,
      account_holder_type,
    } = values

    const {token, error} = await stripe.createToken('bank_account', {
      country,
      currency,
      routing_number: transitNumber.toString() + institutionNumber.toString(),
      account_number,
      account_holder_name,
      account_holder_type,
    });

    console.log(token)
    console.log(error)

    const createBankAccount = functions.httpsCallable("createBankAccount")

    createBankAccount({stripeId: this.state.stripeId, token}).then(r => {
      console.log(r)
    })
  };
  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <>
        <div>
          <h1>Payout Methods</h1>
          <Divider />
          <Form 
            {...layout} 
            ref={this.formRef}
            style={{maxWidth: "600px"}}
            name="basic"
            initialValues={{
              country: "CA",
              currency: "cad",
              account_holder_type: "individual",
            }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <h3>Add Bank Account</h3>
            <Form.Item
              name="country"
              label="Country of Bank"
            >
              <Radio.Group>
                <Radio.Button value="CA">Canada</Radio.Button>
                <Radio.Button value="US">USA</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="currency"
              label="Account Currency"
            >
              <Radio.Group>
                <Radio.Button value="cad">CAD</Radio.Button>
                <Radio.Button value="usd">USD</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="account_holder_type"
              label="Account Type"
            >
              <Radio.Group>
                <Radio.Button value="individual">Individual</Radio.Button>
                <Radio.Button value="company">Company</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="account_holder_name"
              label="Account Holder Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="transitNumber"
              label="Transit Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="institutionNumber"
              label="Institution Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="account_number"
              label="Account Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Divider />
        <div>
        <h3>Add Debit Card</h3>
          <InjectedCheckoutForm stripeId={this.state?.stripeId}/>
        </div>
      </>
    )
  }
}

const InjectedBank = () => {
  return (
    <ElementsConsumer>
      {({ stripe }) => (
        <Bank stripe={stripe} />
      )}
    </ElementsConsumer>
  );
};

export default asRep(InjectedBank)