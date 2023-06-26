![CI Badge](https://github.com/RanaMohamed99/Automation-Task/actions/workflows/test.yml/badge.svg)

# <p align="center"><img src="https://cdn2.iconfinder.com/data/icons/testing-software-2-filled-outline/128/Testing_Software_2_-_Ps_Style_-_1-08-512.png" width="40" title="Automation-Task"> Automation-Task </p>
This project provide simple ui tests for the website mentioned in the documentation which was implementated using Nightwatch JS along side with the api tests.

## <p align="left"><img src="https://png.pngtree.com/png-vector/20230412/ourmid/pngtree-implementation-flat-icon-vector-png-image_6701398.png" width="40" title="Implemenation"> Implemenation </p>
 The implementation of this project can be broken down into more descriptive points where:
   - The Ui tests were focused on two main parts as for testing the
        - *Home Page*
           - Searched for “dress” and verified the search results.
        - *Contact Us Page*
           - Tested all the possible combinations for contact us form whether it leads to valid or invalid submission.
   - The API tests were focused on testing hitting all the routes mentioned [here](https://www.npmjs.com/package/mock-user-auth?activeTab=readme) with valid/invalid body, 
     valid/invalid authorization.

## <p align="left"><img src="https://www.pngplay.com/wp-content/uploads/6/Exam-Logo-Background-PNG-Image.png" width="40" title="Tests and Results"> Tests and Results </p>
   - *UI Tests and Results*:
        - UI Tests can be found [here](https://github.com/RanaMohamed99/Automation-Task/tree/main/nightwatch/examples/ui-tests) in this folder.
        - UI tests html results can be found [here](https://github.com/RanaMohamed99/Automation-Task/tree/main/tests_output/tests_output_results/uiTestOutput) in this folder.
   - *API Tests and Results*:
        - API Tests can be found [here](https://github.com/RanaMohamed99/Automation-Task/tree/main/nightwatch/api-tests) in this folder.
        - API tests html results can be found [here](https://github.com/RanaMohamed99/Automation-Task/tree/main/tests_output/tests_output_results/apiTestsOutput) in this 
          folder.

   - *Screenshots for the provided test results can also be found [here](https://github.com/RanaMohamed99/Automation-Task/tree/main/tests_output/tests_output_results)*

## <p align="left"><img src="https://gloify.com/wp-content/uploads/2021/06/shopify-2-1210x617.png" width="40" title="Frameworks and Libraries used"> Frameworks and Libraries used </p> 
- Nightwatch js
- Supertest
- JEST

## <p align="left"><img src="https://cdn.iconscout.com/icon/free/png-256/free-circleci-3629946-3031758.png" width="35" title="Integration with CI"> Integration with CI </p>
- I have integrated my project with CI, and included the badge as well.
- **Note the failing part isn't because of the tests itself as all the api tests can be seen passed, however the ui tests the ci fail to start the test runner.**

## <p align="left"><img src="https://www.pngall.com/wp-content/uploads/12/Delivery-Scooter-PNG-Images-HD.png" width="40" title="Deliverables"> Deliverables </p> 
- Bug report pdf attatched [here](https://github.com/RanaMohamed99/Automation-Task/blob/main/Bug%20reports.pdf).
- Test documentation report pdf attatched [here](https://github.com/RanaMohamed99/Automation-Task/blob/main/Testcases%20documentation%20final.pdf).
