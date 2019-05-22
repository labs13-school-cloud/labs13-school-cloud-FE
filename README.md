# training-bot-frontend

![banner](img/logo.png)

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Training Bot React/Redux Application

## Table of Contents

- [Background](#background)
- [Deploy](#Deploy)
- [Components](#Components)
- [Maintainers](#maintainers)
- [License](#license)

## Background

TODO: Write background section

## Deploy

We've configured a one-click deploy to Netlify that will allow you to get the front end of the site up and running with a guided set up:

TODO: Write Netlify Deploy buttom

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
| TabNavigation.js     | Navigation bar visiable below the @media breakpoint for desktop view | "/home" under 650px |
| DesktopNavigation.js | Navigation bar visiable above the @media breakpoint for desktop view | "/home" above 650px |

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
| Routes.js | indluces all routes which require authentication via authenticate.js. | n/a         |

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
| Team.js   | Team page thats accessible via the landing page | "/team"     |
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
| index.js    | loads and renders overview.js               | n/a         |
| Overview.js | loads cards inside of pending notifications | "/home"     |
| styles.js   | styles for overview.js                      | n/a         |

> > > TeamMember

| Name          | Purpose                                     | How To View |
| ------------- | ------------------------------------------- | ----------- |
| index.js      | loads and renders TeamMember.js             | n/a         |
| TeamMember.js | loads cards inside of pending notifications | "/home"     |
| styles.js     | styles for TeamMember                       | n/a         |

> > Responses

| Name         | Purpose | How To View |
| ------------ | ------- | ----------- |
| index.js     |         |             |
| Responses.js |         |             |
| styles.js    |         |             |

<br />
<br />

#### Profile

| Name       | Purpose | How To View |
| ---------- | ------- | ----------- |
| index.js   |         |             |
| Profile.js |         |             |
| styles.js  |         |             |

<br />
<br />

#### TeamMembers

> > Add

| Name      | Purpose | How To View |
| --------- | ------- | ----------- |
| index.js  |         |             |
| Add.js    |         |             |
| styles.js |         |             |

> > > helpers

| Name               | Purpose | How To View |
| ------------------ | ------- | ----------- |
| AddButtons.js      |         |             |
| EditButtons.js     |         |             |
| MemberInfoform.js  |         |             |
| Relationships.js   |         |             |
| SelectSlackID.js   |         |             |
| testPhoneNumber.js |         |             |

> > > reducer

| Name     | Purpose | How To View |
| -------- | ------- | ----------- |
| index.js |         |             |

> > Assign

| Name      | Purpose | How To View |
| --------- | ------- | ----------- |
| Assign.js |         |             |
| index.js  |         |             |
| styles.js |         |             |

> > Edit

| Name      | Purpose | How To View |
| --------- | ------- | ----------- |
| Edit.js   |         |             |
| index.js  |         |             |
| styles.js |         |             |

> > List

> > > Assign

| Name      | Purpose | How To View |
| --------- | ------- | ----------- |
| Assign.js |         |             |
| index.js  |         |             |
| styles.js |         |             |

> > > Overview

| Name        | Purpose | How To View |
| ----------- | ------- | ----------- |
| Overview.js |         |             |
| index.js    |         |             |
| styles.js   |         |             |

> > Tab

| Name                    | Purpose | How To View |
| ----------------------- | ------- | ----------- |
| TeamMembersTab.js       |         |             |
| index.js                |         |             |
| styles.js               |         |             |
| TeamMembersTabSingle.js |         |             |

<br />
<br />

#### TrainingSeries

> > Add

| Name                          | Purpose | How To View |
| ----------------------------- | ------- | ----------- |
| AddMemberToTrainingSeries.js  |         |             |
| CreateMessage.js              |         |             |
| CreateMessageStyles.js        |         |             |
| CreateTrainingSeries.js       |         |             |
| CreateTrainingSeriesStyles.js |         |             |
| MessagePage.js                |         |             |
| MessagePageStyles.js          |         |             |
| singleMemberCheck.js          |         |             |

> > Edit

| Name      | Purpose | How To View |
| --------- | ------- | ----------- |
| Edit.js   |         |             |
| index.js  |         |             |
| styles.js |         |             |

> > > helpers

| Name     | Purpose | How To View |
| -------- | ------- | ----------- |
| Title.js |         |             |

> > List

> > > Messages

| Name        | Purpose | How To View |
| ----------- | ------- | ----------- |
| index.js    |         |             |
| Messages.js |         |             |
| styles.js   |         |             |

> > > Overview

| Name        | Purpose | How To View |
| ----------- | ------- | ----------- |
| index.js    |         |             |
| Overview.js |         |             |
| styles.js   |         |             |

> > Messages

| Name        | Purpose | How To View |
| ----------- | ------- | ----------- |
| index.js    |         |             |
| filter.js   |         |             |
| styles.js   |         |             |
| Messages.js |         |             |

> > Tabs

| Name                       | Purpose | How To View |
| -------------------------- | ------- | ----------- |
| TrainingSeriesTab.js       |         |             |
| TrainingSeriesTabSingle.js |         |             |
| TrainingSeriesTabStyles.js |         |             |

<br />
<br />
### UI

---

#### ContactModal

| Name            | Purpose | How To View |
| --------------- | ------- | ----------- |
| ContactModal.js |         |             |

<br />
<br />

#### HelpModal

| Name         | Purpose | How To View |
| ------------ | ------- | ----------- |
| HelpModal.js |         |             |

<br />
<br />

#### InfoPopup

| Name         | Purpose | How To View |
| ------------ | ------- | ----------- |
| InfoPopup.js |         |             |

<br />
<br />

#### Modals

| Name                                     | Purpose | How To View |
| ---------------------------------------- | ------- | ----------- |
| addTeamMembertoTrainingSeriesModal.js.js |         |             |
| addToTrainingSeriesModal.js              |         |             |
| deleteModal.js                           |         |             |
| PostModal.js                             |         |             |
| PostOptionsModal.js                      |         |             |
| TeamMemberModal.js                       |         |             |
| TrainingSeriesModal.js                   |         |             |
| userModal.js                             |         |             |

<br />
<br />

#### Progress

| Name              | Purpose | How To View |
| ----------------- | ------- | ----------- |
| loacing.css       |         |             |
| ProgressCircle.js |         |             |

<br />
<br />

#### SearchCard

| Name          | Purpose | How To View |
| ------------- | ------- | ----------- |
| filter.css    |         |             |
| index.js      |         |             |
| SearchCard.js |         |             |
| styles.js     |         |             |

> > CardHeader

| Name          | Purpose | How To View |
| ------------- | ------- | ----------- |
| CardHeader.js |         |             |
| index.js      |         |             |
| styles.js     |         |             |

<br />
<br />

#### Snackbar

| Name                  | Purpose | How To View |
| --------------------- | ------- | ----------- |
| Snackbar.js           |         |             |
| index.js              |         |             |
| SnackBarTeamMember.js |         |             |

<br />
<br />

#### Tour

| Name    | Purpose | How To View |
| ------- | ------- | ----------- |
| Tour.js |         |             |

<br />
<br />

---

---

---

## Auth

    Probably just want to write a description on how auth system works

## Store

    same for store. think they should probably understand this without any help but mineaswell break it down anyways haha

## Maintainers

| ![Andrew Brush](https://github.com/ajb85.png) | ![Nick Cannariato](https://github.com/nickcannariato.png) | ![Adam McKenney](https://github.com/DaftBeowulf.png) | ![Gannon Darcy](https://github.com/GannonDetroit.png) | ![Thomas Hessburg](https://github.com/TomHessburg.png) |
| --------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------ |
| [@ajb85](https://github.com/ajb85)            | [@nickcannariato](https://github.com/nickcannariato)      | [@DaftBeowulf](https://github.com/DaftBeowulf)       | [@GannonDetroit](https://github.com/GannonDetroit)    | [@TomHessburg](https://github.com/TomHessburg)         |

## License

MIT © 2019 Training Bot
