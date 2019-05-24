//dependencies imports
import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//modal imports
import UnsubscribeModal from "./UnsubscribeModal.js";

//redux imports
import {
  getPlans,
  getCustomersPlan,
  unsubscribe,
  submit
} from "store/actions/";
import { getUser } from "store/actions/userActions";

//Material UI and Style Imports
import {
  withStyles,
  FormControl,
  Button,
  Typography,
  Modal
} from "@material-ui/core/";
import TrainingBotGIF from "img/trainingBot.gif";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  submitBtn: {
    maxWidth: 150,
    width: "100%",
    background: "#451476",
    color: "white",
    margin: "20px auto",
    "&:hover": {
      background: "#591a99",
      color: "white"
    }
  },
  root: {
    margin: "20 auto",
    width: "100%",
    maxWidth: 800,
    display: "flex",
    flexDirection: "column"
  },
  formControl: {
    display: "flex",
    margin: "15px 5px",
    whiteSpace: "nowrap"
  },
  paymentForm: {
    display: "flex",
    margin: "30px 90px 0 90px",
    "@media (max-width: 720px)": {
      margin: "30px 40px 0 40px"
    }
  },
  buttonLayout: {
    display: "flex",
    justifyContent: "space-around",
    margin: "0 auto",
    "@media (max-width: 720px)": {
      justifyContent: "center",
      flexWrap: "wrap"
    }
  },
  submitButton: {
    width: 100,
    padding: 5
  },

  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  progress: { margin: "50px auto", maxWidth: 10, width: 100 },
  subCard: {
    border: "1px solid #EBEBEB",
    borderRadiusTopLeft: "3px",
    borderRadiusTopRight: "3px",
    width: "35%",
    minWidth: 211,
    margin: 5,
    textAlign: "center"
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 700,
    margin: 10
  },
  price: {
    fontSize: 20,
    margin: "10px 0"
  },
  subPrice: {
    fontSize: 12,
    color: "grey"
  },
  content: {
    margin: "15px auto",
    width: "80%"
  },
  feature: {
    padding: "5px 0"
  },
  spread: {
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    position: "sticky",
    top: "100%",
    width: "100%",
    marginTop: 10,
    background: "#441476",
    color: "white",
    borderRadius: 0,
    "&:hover": {
      background: "#591a99"
    },
    "&:disabled": {
      color: "grey",
      background: "#EBEBEB"
    }
  },
  LoadingImg: {
    height: "auto",
    overflow: "hidden",
    cursor: "not-allowed",
    pointerEvents: "none",
    position: "relative",
    padding: 0,
    margin: "20px auto"
  },
  gifWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  }
});

/**
 * This Checkout component is required from the Stripe documentation and
 * the format can be found in the react-stripe-elements library.
 * https://stripe.com/docs/recipes/elements-react
 *
 * understand that this component is on the profile page and contains
 * the three plan cards.
 */
class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      plans: "",
      billingName: "",
      billingEmail: "",
      plan: "",
      paymentToggle: false,
      pro: false,
      premium: false,
      open: false,
      buttonState: "",
      error: "",
      activeSelect: ""
    };
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount = () => {
    this.props.getPlans();
  };

  handleChange = (e, nickname) => {
    e.preventDefault();
    if (e.currentTarget.name === "plan") {
      this.setState({
        paymentToggle: true,
        buttonState: nickname,
        activeSelect: nickname
      });
    }
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  /**
   * @function
   * @param {string} email
   * This step is adding functionality to the CheckoutForm component’s submit method
   * so that clicking the button tokenizes the card information. We choose to use
   * email, though anything could have been choosen as long as it's unique to each
   * user.
   *
   *  */
  createToken = async email => {
    try {
      let { token } = await this.props.stripe.createToken({ email: email });
      return token.id;
    } catch (err) {
      this.setState({ error: "Please enter payment information" });
    }
  };

  // the submit method will tokenize the card information by invoking createToken on the stripe prop
  submit = async () => {
    const { name, email, id, stripe } = this.props.userProfile;
    const { plan } = this.state;
    let token = await this.createToken(email);
    if (token !== undefined) {
      await this.props.submit(token, name, email, id, stripe, plan);
      this.setState({
        paymentToggle: false,
        activeSelect: ""
      });
    } else {
      this.setState({ error: "Please enter payment information" });
    }
  };

  /**
   * @function
   * @param {object} user_id
   * @param {object} stripe id.
   * allows the user to unsubscribe from their current plan.
   */
  unsub = (user_id, stripe) => {
    this.props.unsubscribe(user_id, stripe);
    this.setState({ open: false });
  };

  render() {
    //const { classes } is for material UI
    const { classes } = this.props;

    /*account type is to determine which plan our user is on. Our stripe plan has
      only 1 product, with 3 payment plans (Basic, Premium, Pro), but those 3 plans
      need 3 cooresponding subscriptions so Stripe knows to charge the account monthly */

    let accountType;
    if (this.props.userProfile.subscription === "Premium") {
      accountType = "Premium";
    } else if (this.props.userProfile.subscription === "Pro") {
      accountType = "Pro";
    }
    //freeButton is for Material UI
    let freeButton;

    if (this.props.userProfile.subscription !== "free") {
      freeButton = (
        <Button
          color="primary"
          className={classes.button}
          onClick={this.handleOpen}
        >
          Basic
        </Button>
      );
    } else {
      freeButton = (
        <Button color="default" className={classes.button} disabled>
          Current Plan
        </Button>
      );
    }

    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className={classes.root}>
        <div>
          {this.props.userError}
          {this.props.stripeError}
          {/* <Pricing /> */}
          <FormControl component="fieldset" className={classes.formControl}>
            <div className={classes.buttonLayout}>
              <div className={classes.subCard}>
                <Typography className={classes.title}>Basic</Typography>
                <Typography className={classes.price}>FREE</Typography>
                <div className={classes.content}>
                  <Typography className={classes.feature}>
                    Automated Text/Email
                  </Typography>
                  <Typography className={classes.feature}>
                    Unlimited Training Series
                  </Typography>
                  <Typography className={classes.feature}>
                    Unlimited Team Members
                  </Typography>

                  <Typography className={classes.feature}>
                    Notification Limit 50/month
                  </Typography>
                </div>
                {freeButton}
              </div>

              {this.props.plans.map((plan, i) => {
                return plan.nickname === accountType ? (
                  <div key={plan.id} className={classes.subCard}>
                    <Typography className={classes.title}>
                      {plan.nickname}
                    </Typography>
                    <Typography className={classes.price}>
                      ${plan.amount / 100}
                      <span className={classes.subPrice}> / month</span>
                    </Typography>
                    <div className={classes.content}>
                      <Typography className={classes.feature}>
                        Automated Text/Email
                      </Typography>
                      <Typography className={classes.feature}>
                        Unlimited Training Series
                      </Typography>
                      <Typography className={classes.feature}>
                        Unlimited Team Members
                      </Typography>

                      <Typography className={classes.feature}>
                        Notification Limit
                        {plan.nickname === "Premium"
                          ? " 200/month"
                          : " 1000/month"}
                      </Typography>
                    </div>
                    <Button
                      key={plan.created}
                      className={classes.button}
                      disabled
                    >
                      Current Plan
                    </Button>
                  </div>
                ) : (
                  <div key={plan.id} className={classes.subCard}>
                    <Typography className={classes.title}>
                      {plan.nickname}
                    </Typography>
                    <Typography className={classes.price}>
                      ${plan.amount / 100}
                      <span className={classes.subPrice}> / month</span>
                    </Typography>
                    <div className={classes.content}>
                      <Typography className={classes.feature}>
                        Automated Text/Email
                      </Typography>
                      <Typography className={classes.feature}>
                        Unlimited Training Series
                      </Typography>
                      <Typography className={classes.feature}>
                        Unlimited Team Members
                      </Typography>
                      <Typography className={classes.feature}>
                        Notification Limit
                        {plan.nickname === "Premium"
                          ? " 200/month"
                          : " 1000/month"}
                      </Typography>
                    </div>
                    <Button
                      key={plan.created}
                      color="primary"
                      name="plan"
                      className={classes.button}
                      value={plan.id}
                      onClick={e => this.handleChange(e, plan.nickname)}
                      style={
                        this.state.activeSelect === plan.nickname
                          ? { background: "#3DBC93" }
                          : null
                      }
                    >
                      {plan.nickname}
                    </Button>
                  </div>
                );
              })}
            </div>
          </FormControl>
          {/* Payment Handling Below */}
          {this.props.paymentLoading ? (
            <div className={classes.gifWrapper}>
              <img
                src={TrainingBotGIF}
                alt="Loading Icon"
                className={classes.LoadingImg}
              />
            </div>
          ) : this.state.paymentToggle ? (
            <FormControl component="fieldset" className={classes.paymentForm}>
              <CardElement style={{ base: { fontSize: "18px" } }} />
              <Button
                variant="contained"
                className={classes.submitBtn}
                onClick={this.submit}
              >
                Submit Payment
              </Button>
            </FormControl>
          ) : (
            <span />
          )}
        </div>

        {/* Unsubscribe Modal */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <UnsubscribeModal handleClose={this.handleClose} unsub={this.unsub} />
        </Modal>
      </div>
    );
    // }
  }
}

const mapStateToProps = state => {
  return {
    plans: state.stripeReducer.plans,
    plan: state.stripeReducer.plan,
    stripeLoading: state.stripeReducer.isLoading,
    userLoading: state.userReducer.isLoading,
    userProfile: state.userReducer.userProfile.user,
    userError: state.userReducer.error,
    stripeError: state.stripeReducer.error,
    paymentLoading: state.userReducer.paymentLoading
  };
};

CheckoutForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {
    getPlans,
    getCustomersPlan,
    unsubscribe,
    submit,
    getUser
  }
)(injectStripe(withStyles(styles)(CheckoutForm)));
