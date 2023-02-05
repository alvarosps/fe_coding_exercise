# Tempo Frontend challenge

# Solution Improvement

#### Main repo (with all PRs merged): https://github.com/alvarosps/SILVA_fe_ALVARO_exercise

### Describe what you have improved in the solution
#### First PR: Code refactoring, fixing issues: https://github.com/alvarosps/SILVA_fe_ALVARO_exercise/pull/1
- Renamed components and related files for a better naming standard
- Renamed styled components to specify for which components they are used
- Installed typescript for styled-components to fix issue
- Fixed ESLint and Prettier issues
- Fixed errors in the code
- Fixed tests that were wrong
- Created unexisted test
- Fixed typo issues, for example on the User page it would look for :useId instead of :userId
- Other refactoring and issues fixing, described in the PR comments

#### Second PR: Search component : https://github.com/alvarosps/SILVA_fe_ALVARO_exercise/pull/2
- Created the Search component as a generic component, allowing use of different type of objects
- Created unit tests for the search component
- Other comments in the PR

#### Third PR: UI/UX Improvements: https://github.com/alvarosps/SILVA_fe_ALVARO_exercise/pull/3
- Card component when showing user data is displaying the user information in a clean and organized way, with the avatar on the side (although the images coming from the API are not working), the name as key information and display name and location on the bottom
- when hovering the cards, the background color changes, giving more emphasis to the hovered card
- Pagination was implemented for the List component, allowing the user to create pagination for the lists when wanted (it's optional), very useful for the Teams page.
- Created unit tests for the pagination
- The search component is in the header for the main page
- The team's name and search component, in the Team overview, are on a second header of the page
- Page's responsiveness were dealt with, making component responsive for all views
- General UI improvements, more details on the PR

## To Run the project you must run:
```
npm install
```

## after the installation finished, you can run:
```
npm start
```

#### The project will open in your browser with the following url http://localhost:3000;

## To run the tests yo must run
```
npm run test
```