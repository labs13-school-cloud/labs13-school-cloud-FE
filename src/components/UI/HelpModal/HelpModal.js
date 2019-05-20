import React from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";

const HelpModal = props => {
  return (
    <HelpModalWrapper
      style={{ cursor: "pointer" }}
      onClick={e => {
        e.preventDefault();
        props.history.push("/home");
      }}
    >
      <HelpModalPaper
        style={{ cursor: "auto" }}
        onClick={e => e.stopPropagation()}
      >
        <h3>Welcome to the Help Panel!</h3>
        <hr />
        <TypeWrapper>
          <h4>Login/Set up</h4>

          <p>
            With Training Bot, creating/logging in to an account is simple!
            After clicking onto the login section, simply{" "}
            <span>
              choose an account that you already have (i.e. Facebook, Google, or
              LinkedIn)
            </span>
            , and wel take care of setting your account up for you.
          </p>
        </TypeWrapper>

        <TypeWrapper>
          <h4>Creating A Team Member</h4>

          <p>
            The first thing that you'll want to do with Training Bot is create
            what we like to call <span>"Team Members"</span>. A team member is
            simply{" "}
            <span>an employee who you're wanting to communicate with</span> via
            our application. You can create a Team Member either by navigating
            to the "overview" tab, or the "Team Members" tab, then{" "}
            <span>clicking the big purple "+" sign.</span>
            <br />
            <br />
            Once here, you'll be prompted to fill out your Team Members
            information. You can choose to assign them a{" "}
            <span>phone number, email, or slack account</span> to recieve
            messages from (assuming that you've set up slack in your account
            settings. We will review that later on this page).
            <br />
            <br />
            You can also{" "}
            <span>choose to assign them a "mentor" or "manager".</span> When
            sending out training materials, we assume you may want to get some
            other employees on the loop. This is how you can do that! Simply
            <span>assign an employee's relationships</span>, and youll be able
            to choose to send their "mentor" and "manager" notifications
            directly.
            <br />
            <br />
            Now <span>click the "Add Member" button</span> and BOOM! You're
            ready to rock!
          </p>
        </TypeWrapper>

        <TypeWrapper>
          <h4>Create A Training Series</h4>

          <p>
            Next, you'll want to actually set up a set of training information
            to send to your employees! A <span>Training Series</span> is simply
            a house for a set of training material. You{" "}
            <span>
              name your series, add messages with training materials attatched
              to those series, then assign them to Team Members to start at a
              specified date.
            </span>
            <br />
            <br />
            We'll use a fictional situation to run you through how this works.
            Lets assume you own a coffee shop. Youll likely need to send your
            new hires some information on the basics of coffee making. Lets
            start by <span>naming our series:</span>
            <br />
            <br />
            Navigate to either the <span>"Overview"</span> tab or the{" "}
            <span>"Training Series"</span> tab, and{" "}
            <span>click on the big purple "+" sign.</span>
            <br />
            <br />
            Youll be prompted to name your new series. We will name ours{" "}
            <span>"Coffee Shop Basics".</span> Once it's named, simply click{" "}
            <span>create</span> and you'll be pushed to the Training Series
            configuration page.
            <br />
            <br />
            Here we can <span>add new messages</span> and{" "}
            <span>assign team members to our training series.</span> We will
            start by adding a message.
            <br />
            <br />
            Click on the <span>Add Message</span> button. A "message" is simply
            what ever you want to send to your employees. Fill out the{" "}
            <span>title, content, and link</span> that youd like to send to your
            employees for this series. Now you may ask,{" "}
            <span>WHAT THE HECK IS DAYS FROM START?</span> Easy!! Days from
            start is the number of days after a training series starts that a
            message will be sent. For example, if you assign a team member to
            this training series with a start date of Friday, and you set this
            message's "days from start" number to 3, it will send out the next
            Monday! We can also{" "}
            <span>assign a Team Members mentor or manager</span> to recieve the
            message as well/instead!
            <br />
            <br />
            Since were making a "Coffee Shop Basics" series, we will create a
            message called "how to grind coffee". The link will include a link
            to some training information, and wel set it 1 "days from start",
            meaning that it will send out the day after we assign a member to
            that training series. We could also choose to send a mentor or
            manager this message.
            <br />
            <br />
            Now we can now <span>"assign members"</span> to this training
            series. <span>Click on "Assign Members"</span> and{" "}
            <span>choose a Team Member</span> that you want to be assigned to
            this series. <span>Pick a start date</span> and click submit.
            <br />
            <br />
            And thats IT!!!! When the date you set your materials to send out
            hits, your members will be sent their training materials.
          </p>
        </TypeWrapper>
        <TypeWrapper>
          <h4>Recieving Responses</h4>

          <p>
            Your employees will have the option to respond to messages sent out
            during a Training Series. You can view these responses in the{" "}
            <span>"responses" tab.</span>
          </p>
        </TypeWrapper>
      </HelpModalPaper>
    </HelpModalWrapper>
  );
};

export default HelpModal;
const HelpModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
`;
const HelpModalPaper = styled(Paper)`
  width: 90%;
  max-width: 1400px;
  margin: 10vh auto;
  height: 70vh;
  overflow-y: scroll;
  padding: 20px;
  h3 {
    text-align: center;
    font-size: 35px;
    margin: 0;
    @media (max-width: 600px) {
      font-size: 30px;
    }
  }
`;
const TypeWrapper = styled.div`
  margin: 15px auto;
  width: 95%;
  min-height: 40px;
  padding: 15px;
  h4 {
    margin: 0 10px 10px 0;
    font-size: 32px;
    font-weight: 400;
    @media (max-width: 600px) {
      font-size: 24px;
    }
  }
  span {
  }
`;
