# Training Bot Client

![banner](img/logo.png)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Training Bot client application, built in React & Redux

## Table of Contents

- [Background](#background)
- [Deploy](#Deploy)
- [Components](#Components)
- [Auth](#Auth)
- [Store](#Store)
- [Maintainers](#maintainers)
- [License](#license)

## Background

TODO: Write background section

## Deploy

We've configured a one-click deploy to Netlify that will allow you to get the front end of the site up and running with a guided set up:

**Note**: Make sure you've completed the [Auth0 section of the prerequisite docs](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE/blob/master/docs/prerequisites.md#configuring-auth0) in the [Training Bot API repository](https://github.com/labs12-training-bot-2/labs12-training-bot-2-BE)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/labs12-training-bot-2/labs12-training-bot-2-FE)

## Components

    note that the structure of this documentation is broken up by folder. Headings will represent top level folders, and blockquotes will represent nested folders

### Misc

---

#### authenticate

| Name            | Purpose                                                         | How To View                     |
| --------------- | --------------------------------------------------------------- | ------------------------------- |
| authenticate.js | a HOC that checks for authenticated user and routes accordingly | head to "/home" unauthenticated |
| index.js        | import/export authenticate.js for easier loading                | n/a                             |
| styles.js       | styles for authenticate.js                                      | n/a                             |

<br />
<br />

#### Callback

| Name             | Purpose | How To View |
| ---------------- | ------- | ----------- |
| Callback.js      | --      | --          |
| index.js         |         | n/a         |
| styles.js        |         | n/a         |
| SlackCallback.js |         |             |

<br />
<br />

#### Stripe

| Name                | Purpose | How To View |
| ------------------- | ------- | ----------- |
| CheckoutForm.js     |         |             |
| StripeCard.js       |         |             |
| StripeView.js       |         |             |
| UnsubscribeModal.js |         |             |

<br />
<br />

### Navigation

---

#### AppBar

| Name      | Purpose                                     | How To View                                             |
| --------- | ------------------------------------------- | ------------------------------------------------------- |
| AppBar.js | loads the top bar depending on current view | any view loads one of the two variations of the app bar |
| index.js  | loads and exports AppBar.js                 | n/a                                                     |
| styles.js | styles for AppBar.js                        | n/a                                                     |

<br />
<br />

#### ReturnToPreviousPage

| Name                    | Purpose                                                     | How To View |
| ----------------------- | ----------------------------------------------------------- | ----------- |
| index.js                | loads and exports ReturnToPreviousPage.js                   | n/a         |
| ReturnToPreviousPage.js | A components loaded on nested routes to return to last page | /home/...   |

<br />
<br />

### Pages

---

#### Dashboard

> > Dashboard

| Name         | Purpose                                                                                     | How To View |
| ------------ | ------------------------------------------------------------------------------------------- | ----------- |
| index.js     | loads and renders Dashboard.js                                                              | n/a         |
| Dashboard.js | Loads the navigation bars and conditional renders tabs depending on what nav link you click | "/home"     |
| styles.js    | styles for Dashboard.js                                                                     | n/a         |

> > > _helpers_

| Name                 | Purpose                                                              | How To View         |
| -------------------- | -------------------------------------------------------------------- | ------------------- |
| TabNavigation.js     | Navigation bar visible below the @media breakpoint for desktop view | "/home" under 650px |
| DesktopNavigation.js | Navigation bar visible above the @media breakpoint for desktop view | "/home" above 650px |

> > Loader

| Name      | Purpose                                                                                                                          | How To View |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| index.js  | loads and renders Loader.js                                                                                                      | n/a         |
| Loader.js | tells users dashboard how/what to load and when. loads routes, and tells tour to open if a user is logging in for the first time | "/home"     |
| styles.js | styles for Loader.js                                                                                                             | n/a         |

> > Routes

| Name      | Purpose                                                               | How To View |
| --------- | --------------------------------------------------------------------- | ----------- |
| index.js  | loads and renders Routes.js                                           | n/a         |
| Routes.js | includes all routes which require authentication via authenticate.js. | n/a         |

<br />
<br />

#### LandingPage

> > LandingPage

| Name           | Purpose                      | How To View |
| -------------- | ---------------------------- | ----------- |
| index.js       | load and render landing page | n/a         |
| LandingPage.js | landing page for application | "/"         |
| styles.js      | styles for landing page      | n/a         |

> > Pricing

| Name       | Purpose                                            | How To View |
| ---------- | -------------------------------------------------- | ----------- |
| index.js   | loads and renders pricing page                     | n/a         |
| Pricing.js | Pricing page thats accessible via the landing page | "/pricing"  |
| styles.js  | styles for pricing page                            | n/a         |

> > Team

| Name      | Purpose                                         | How To View |
| --------- | ----------------------------------------------- | ----------- |
| index.js  | loads and renders team page                     | n/a         |
| Team.js   | Team page that's accessible via the landing page | "/team"     |
| styles.js | styles for team page                            | n/a         |

<br />
<br />

#### Notifications

> > Card

| Name                | Purpose                                                                                                       | How To View                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| index.js            | loads and renders Card.js                                                                                     | n/a                          |
| Card.js             | Parent "card" container for Notification display                                                              | "/home" on overview tab.     |
| styles.js           | styles for Card and NotificationsTab                                                                          | n/a                          |
| NotificationsTab.js | Essentially same component as Card.js. separated because we planned on adding functionality to this component | "/home" on notifications tab |
| filter.js           | A function for applying pagination                                                                            | n/a                          |

> > > Overview

| Name        | Purpose                                     | How To View |
| ----------- | ------------------------------------------- | ----------- |
| index.js    | loads and renders Overview.js               | n/a         |
| Overview.js | loads cards inside of pending notifications | "/home"     |
| styles.js   | styles for Overview.js                      | n/a         |

> > > TeamMember

| Name          | Purpose                                     | How To View |
| ------------- | ------------------------------------------- | ----------- |
| index.js      | loads and renders TeamMember.js             | n/a         |
| TeamMember.js | loads cards inside of pending notifications | "/home"     |
| styles.js     | styles for TeamMember                       | n/a         |

> > Responses

| Name         | Purpose                                                           | How To View                       |
| ------------ | ----------------------------------------------------------------- | --------------------------------- |
| index.js     | loads and renders Responses.js                                    | n/a                               |
| Responses.js | this component is the tab used to view responses on the dashboard | "/home" navigate to responses tab |
| styles.js    | styles for Responses.js                                           | n/a                               |

<br />
<br />

#### Profile

| Name       | Purpose                                 | How To View     |
| ---------- | --------------------------------------- | --------------- |
| index.js   | loads and renders Profile.js            | n/a             |
| Profile.js | component for the profile/settings page | "/home/profile" |
| styles.js  | styles for Profile.js                   | n/a             |

<br />
<br />

#### TeamMembers

> > Add

| Name      | Purpose                                                             | How To View                                           |
| --------- | ------------------------------------------------------------------- | ----------------------------------------------------- |
| index.js  | loads and renders Add.js                                            | n/a                                                   |
| Add.js    | This component display conditionally the add/edit team member pages | "/home/create-team-member" or "/home/team-member/:id" |
| styles.js | styles for Add.js                                                   | n/a                                                   |

> > > helpers

| Name                   | Purpose                                                                                                                   | How To View            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| AddButtons.js          | Buttons for adding team member. checks if routing and shows animation                                                     | add a team member      |
| EditButtons.js         | Edit buttons for team members. Add.js renders this or AddButtons.js conditionally dependent on if you're adding or editing | edit a team member     |
| MemberInfoForm.js      | Form rendered when adding or editing a team member                                                                        | add/edit a team member |
| Relationships.js       | Renders "Select" drop downs for mentor/manager assignments when adding/editing a team member                              | add/edit a team member |
| SelectSlackID.js       | Conditionally renders slack drop down or a prompt to set up your slack.                                                   | add/edit a team member |
| testPhoneNumber.js     | a RegEx function which checks to see if the input phone number is actually a phone number.                                | add/edit a team member |
| updateNotifications.js | If the user updates a relationship (manager/mentor), this will update their notifications.                                | add/edit a team member |

> > > reducer

| Name     | Purpose                                                                                                                                               | How To View |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| index.js | Reducer for the react "useReducer" hook. stores all team member info for filling out form. essentially the "state" of Add.js and its child components | n/a         |

> > Assign

| Name      | Purpose                                                                                                                                                | How To View                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| Assign.js | Component for the piece of a training series page where you see the list of your currently assigned team members, as well as the button to assign them | "/home/training-series/:id" |
| index.js  | loads and renders Assigns.js                                                                                                                           | n/a                         |
| styles.js | styles for Assign.js                                                                                                                                   | n/a                         |

> > Edit

| Name      | Purpose                                    | How To View            |
| --------- | ------------------------------------------ | ---------------------- |
| Edit.js   | Displays the entire edit team members page | /home/team-member/:id" |
| index.js  | loads and renders Edit.js                  | n/a                    |
| styles.js | styles for Edit.js                         | n/a                    |

> > List

> > > Assign

| Name      | Purpose                                                                               | How To View                |
| --------- | ------------------------------------------------------------------------------------- | -------------------------- |
| Assign.js | Shows list of assigned team members to a training series, as well as their start date | "/home/training-series/29" |
| index.js  | Loads and renders Assign.js                                                           | n/a                        |
| styles.js | styles for Assign.js                                                                  | n/a                        |

> > > Overview

| Name        | Purpose                                       | How To View |
| ----------- | --------------------------------------------- | ----------- |
| Overview.js | List of team members seen on the overview tab | "/home"     |
| index.js    | loads and renders Overview.js                 | n/a         |
| styles.js   | styles for Overview.js                        | n/a         |

> > Tab

| Name                    | Purpose                                                   | How To View                          |
| ----------------------- | --------------------------------------------------------- | ------------------------------------ |
| TeamMembersTab.js       | Team members tab wrapper component                        | "/home" navigate to team member page |
| index.js                | loads and renders TeamMembersTab.js                       | n/a                                  |
| styles.js               | styles for TeamMembersTab.js                              | n/a                                  |
| TeamMembersTabSingle.js | Since member component loaded inside of TeamMembersTab.js | "/home" navigate to team member page |

<br />
<br />

#### TrainingSeries

> > Add

| Name                          | Purpose                                                                    | How To View                    |
| ----------------------------- | -------------------------------------------------------------------------- | ------------------------------ |
| AddMemberToTrainingSeries.js  | Component for adding a team member to a training series                   | "/home/assign-members/:id"     |
| CreateMessage.js              | Component fro creating a new message for a training series                 | "/home/create-message"         |
| CreateMessageStyles.js        | Styles for CreateMessage.js                                                | n/a                            |
| CreateTrainingSeries.js       | Component for creating a training series (form where you fill out a title) | "/home/create-training-series" |
| CreateTrainingSeriesStyles.js | Styles for CreateTrainingSeries                                            | n/a                            |
| MessagePage.js                | Component for Editing a message in a training series                       | "/home/message/:id"            |
| MessagePageStyles.js          | Styles for MessagePage.js                                                  | n/a                            |
| singleMemberCheck.js          | Component for each team member when assigning members to a series          | "/home/assign-members/:id"     |
| styles.js                     | styles for singleMemberCheck.js                                            | n/a                            |

> > Edit

| Name      | Purpose                                      | How To View                 |
| --------- | -------------------------------------------- | --------------------------- |
| Edit.js   | Wrapper component for a training series page | "/home/training-series/:id" |
| index.js  | loads and renders Edit.js                    | n/a                         |
| styles.js | styles for Edit.js                           | n/a                         |

> > > helpers

| Name     | Purpose                                                                           | How To View                 |
| -------- | --------------------------------------------------------------------------------- | --------------------------- |
| Title.js | Title component for a training series. allows editing of title of training series | "/home/training-series/:id" |

> > List

> > > Messages

| Name        | Purpose                                    | How To View                 |
| ----------- | ------------------------------------------ | --------------------------- |
| index.js    | loads and renders Messages.js              | n/a                         |
| Messages.js | list of messages on a training series page | "/home/training-series/:id" |
| styles.js   | styles for Messages.js                     | n/a                         |

> > > Overview

| Name        | Purpose                                              | How To View |
| ----------- | ---------------------------------------------------- | ----------- |
| index.js    | loads and renders Overview.js                        | n/a         |
| Overview.js | List of training series on overview tab of dashboard | "/home"     |
| styles.js   | styles for Overview.js                               | n/a         |

> > > Tab

| Name                       | Purpose                                                        | How To View                             |
| -------------------------- | -------------------------------------------------------------- | --------------------------------------- |
| index.js                   | loads and renders Tab.js                                       | n/a                                     |
| TrainingSeriesTab.js       | Training series wrapper component for tab on dashboard         | "/home" navigate to training series tab |
| styles.js                  | styles for Tab.js                                              | n/a                                     |

> > Messages

| Name        | Purpose                                                            | How To View                 |
| ----------- | ------------------------------------------------------------------ | --------------------------- |
| index.js    | loads and renders Messages.js                                      | n/a                         |
| filter.js   | a function for filtering search results                            | n/a                         |
| styles.js   | styles for Messages.js                                             | n/a                         |
| Messages.js | inner component starting with "Messages" on a training series page | "/home/training-series/:id" |


<br />
<br />
### UI

---

#### ContactModal

| Name            | Purpose                    | How To View                            |
| --------------- | -------------------------- | -------------------------------------- |
| ContactModal.js | Component for contact form | Go through tour and click "contact us" |

<br />
<br />

#### HelpModal

| Name         | Purpose                  | How To View                         |
| ------------ | ------------------------ | ----------------------------------- |
| HelpModal.js | Component for help panel | Click help icon at top left of page |

<br />
<br />

#### InfoPopup

| Name         | Purpose                                            | How To View                                                      |
| ------------ | -------------------------------------------------- | ---------------------------------------------------------------- |
| InfoPopup.js | Reusable component for creating help popups in app | for instance, click on a training series and hover over "i" icon |

<br />
<br />

#### Modals

| Name           | Purpose               | How To View                               |
| -------------- | --------------------- | ----------------------------------------- |
| deleteModal.js | reusable delete modal | click trash icon on overview team members |

<br />
<br />

#### Progress

| Name              | Purpose                              | How To View |
| ----------------- | ------------------------------------ | ----------- |
| loading.css       | styles for progress circle animation | n/a         |
| ProgressCircle.js | a loading progress circle            | on login    |

<br />
<br />

#### SearchCard

| Name          | Purpose                                              | How To View                          |
| ------------- | ---------------------------------------------------- | ------------------------------------ |
| filter.js     | filter function for searching                        | n/a                                  |
| index.js      | loads and renders SearchCard.js                      | n/a                                  |
| SearchCard.js | Parent "card" container for any TeamMembers displays | "/home" team members on overview tab |
| styles.js     | styles for SearchCard                                | n/a                                  |

> > CardHeader

| Name          | Purpose                                         | How To View                      |
| ------------- | ----------------------------------------------- | -------------------------------- |
| CardHeader.js | Header for Team Members search card on overview | "/home" Team Members on overview |
| index.js      | loads and renders CardHeader.js                 | n/a                              |
| styles.js     | styles for CardHeader.js                        | n/a                              |

<br />
<br />

#### Snackbar

| Name                  | Purpose                                                   | How To View       |
| --------------------- | --------------------------------------------------------- | ----------------- |
| Snackbar.js           | renders snackbar popups throughout app                    |                   |
| index.js              | import and render Snackbar.js                             | n/a               |
| SnackBarTeamMember.js | small popup modal for successfully creating a Team Member | add a team member |

<br />
<br />

#### Tour

| Name    | Purpose                                      | How To View                                                  |
| ------- | -------------------------------------------- | ------------------------------------------------------------ |
| Tour.js | parent component for tour on login/take tour | create new account or click show tutorial at "/home/profile" |

<br />
<br />

---

---

---

## Auth

TODO: Write Auth section

    Probably just want to write a description on how auth system works

## Store

    The actions/store setup for this application are fairly standard for react/redux applications you've likely worked with in the past. You'll notice that actions are split into separate folders based on what they're used for. All actions are being exported via index.js and can be referenced as such. Reducers are similar, in that they are being split into separate reducers dependent on usage and combined via Redux's "combineReducers". You can reference individual reducers via their specific files. The store itself lives entirely inside of index.js "rootReducer".

## Maintainers

| ![Andrew Brush](https://github.com/ajb85.png) | ![Nick Cannariato](https://github.com/nickcannariato.png) | ![Adam McKenney](https://github.com/DaftBeowulf.png) | ![Gannon Darcy](https://github.com/GannonDetroit.png) | ![Thomas Hessburg](https://github.com/TomHessburg.png) |
| --------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| [@ajb85](https://github.com/ajb85)            | [@nickcannariato](https://github.com/nickcannariato)      | [@DaftBeowulf](https://github.com/DaftBeowulf)       | [@GannonDetroit](https://github.com/GannonDetroit)    | [@TomHessburg](https://github.com/TomHessburg)         |

## License

MIT © 2019 Training Bot
