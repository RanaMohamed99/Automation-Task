describe('Contact us page Tets', function() {
   
    const contactUsPageString = 'contact'
    const emailFieldSelector = 'input[id="email"]'
    const subjectHeadingSelector = 'select[id="id_contact"]'
    const subjectHeadingMenuSelectorValue0 = 'select[id="id_contact"] option[value="0"]'
    const subjectHeadingMenuSelectorValue1 = 'select[id="id_contact"] option[value="1"]'
    const subjectHeadingMenuSelectorValue2 = 'select[id="id_contact"] option[value="2"]'
    const orderReferenceSelector = 'input[id="id_order"]'
    const uploadFileSelector = 'input[id="fileUpload"]'
    const messageSelector = 'textarea[id="message"]'
    const sendButtonSelector = 'button[name="submitMessage"]'
    const alertSuccessSelector = '#center_column > p'
    const alertErrorSelector = '#center_column > div'
    const invalidmessageSelector = '#center_column > div > ol > li'

    before(
      browser => browser.navigateTo('http://automationpractice.multiformis.com/index.php')
      
         .waitForElementVisible('body')
         .assert.titleContains('My Store')
         .assert.visible('#contact-link')
         .click('#contact-link')
         .assert.urlContains(contactUsPageString)
         .assert.visible(emailFieldSelector)
         .assert.visible(orderReferenceSelector)
         .assert.visible(messageSelector)
         .assert.visible(sendButtonSelector)
      );
    
   describe('Contact us page fuction Tets', function() {

     it('submit contact us form with all fields', function(browser) {
        browser
         
          .click(subjectHeadingSelector)
          .click(subjectHeadingMenuSelectorValue1)
          .setValue(emailFieldSelector,'test@test.te')
          .setValue(orderReferenceSelector,'Order11223213')
          .setValue(uploadFileSelector, require('path').resolve(__dirname + '/Assets/Textt.txt'))
          .setValue(messageSelector,'Hello from automation')
          .click(sendButtonSelector)
          .assert.hasClass(alertSuccessSelector,'alert alert-success')
      });

      it('submit contact us form with only required fields', function(browser) {
        browser
          .click('#contact-link')
          .click(subjectHeadingSelector)
          .click(subjectHeadingMenuSelectorValue2)
          .setValue(emailFieldSelector,'test@test.te')
          .setValue(messageSelector,'Hello from automation')
          .click(sendButtonSelector)
          .assert.hasClass(alertSuccessSelector,'alert alert-success')
      });

      it('submit contact us form with invalid email, missing message and subject heading', function(browser) {
        browser
          .click('#contact-link')
          .setValue(orderReferenceSelector,'Order11223213')
          .setValue(uploadFileSelector, require('path').resolve(__dirname + '/Assets/Textt.txt'))
          .click(sendButtonSelector)
          .assert.hasClass(alertErrorSelector,'alert alert-danger')
          .assert.textEquals(invalidmessageSelector,'Invalid email address.')
      });

      it('submit contact us form with valid email, missing message and subject heading', function(browser) {
        browser
          .setValue(emailFieldSelector,'test@test.te')
          .setValue(orderReferenceSelector,'Order11223213')
          .setValue(uploadFileSelector, require('path').resolve(__dirname + '/Assets/Textt.txt'))
          .click(sendButtonSelector)
          .assert.hasClass(alertErrorSelector,'alert alert-danger')
          .assert.textEquals(invalidmessageSelector,'The message cannot be blank.')

      });

      it('submit contact us form with valid email, message and missing subject heading', function(browser) {
        browser
          .setValue(emailFieldSelector,'test@test.te')
          .setValue(orderReferenceSelector,'Order11223213')
          .setValue(uploadFileSelector, require('path').resolve(__dirname + '/Assets/Textt.txt'))
          .setValue(messageSelector,'Hello from automation')
          .click(sendButtonSelector)
          .assert.hasClass(alertErrorSelector,'alert alert-danger')
          .assert.textEquals(invalidmessageSelector,'Please select a subject from the list provided.')

      });
    });




      after(browser => browser.end());
    });
