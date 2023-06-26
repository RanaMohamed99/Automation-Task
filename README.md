![CI Badge](https://github.com/RanaMohamed99/Automation-Task/actions/workflows/test.yml/badge.svg)

# Automation-Task
This project provide simple ui tests for the website mentioned in the documentation which was implementated using Nightwatch JS along side with the api tests.

## Implementation
 The implementation of this project can be broken down into more descriptive points where:
   - The Ui tests were focused on two main parts as for testing the
        - *Home Page*
           - Searched for “dress” and verified the search results.
        - *Contact Us Page*
           - Tested all the possible combinations for contact us form whether it leads to valid or invalid submission.
   - The API tests were focused on testing hitting all the routes mentioned [here](https://www.npmjs.com/package/mock-user-auth?activeTab=readme) with valid/invalid body, 
     valid/invalid authorization.

## Tests and Tests Results
   - *UI Tests and Results*:
        - UI Tests can be found [here](https://github.com/RanaMohamed99/Automation-Task/tree/main/nightwatch/examples/ui-tests) in this folder.
        - UI tests html results can be found [here](https://github.com/RanaMohamed99/Automation-Task/tree/main/tests_output/tests_output_results/uiTestOutput) in this folder.
   - *API Tests and Results*:
        - API Tests can be found [here](https://github.com/RanaMohamed99/Automation-Task/tree/main/nightwatch/api-tests) in this folder.
        - API tests html results can be found [here](https://github.com/RanaMohamed99/Automation-Task/tree/main/tests_output/tests_output_results/apiTestsOutput) in this 
          folder.

   - *Screenshots for the provided test results can also be found [here](https://github.com/RanaMohamed99/Automation-Task/tree/main/tests_output/tests_output_results)*

## Frameworks and Libraries used
- Nightwatch js
- Supertest
- JEST

## Integration with CI
- I have integrated my project with CI, and included the badge as well.
- **Note the failing part isn't because of the tests itself as all the api tests can be seen passed, however the ui tests the ci fail to start the test runner.**

## Deliverables
- Bug report and test documentation report are provided as well.
