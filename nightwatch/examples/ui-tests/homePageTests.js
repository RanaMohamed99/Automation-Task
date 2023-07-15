describe('Home page Tests', function() {

  const contactUsButtonSelector = 'div[id="contact-link"]'
  const contactUsLinkSelector = '#block_various_links_footer > ul > li:nth-child(5) > a'
  const searchFieldSelector = 'input[type=text]'
  const searchButtonSelector = 'button[type=submit]'
  const dressSpanSelector = 'span[class="lighter"]'
  
 before( 
    browser => browser.navigateTo('http://automationpractice.multiformis.com/index.php')
    .waitForElementVisible('body')
    .assert.titleContains('My Store')
  );

  it('check contact us button is clickable', function(browser) {
    browser
      .assert.visible(contactUsButtonSelector)
      .click(contactUsButtonSelector)
      .assert.urlContains('contact')
  });

  it('check contact us link is clickable', function(browser) {
    browser
      .assert.visible(contactUsLinkSelector)
      .click(contactUsLinkSelector)
      .assert.urlContains('contact')
  });

  it('search for dress with lowercase', function(browser) {
    browser
      .assert.visible(searchFieldSelector)
      .setValue(searchFieldSelector, 'dress')
      .assert.visible('button[type=submit]')
      .click(searchButtonSelector)
      .assert.urlContains('search_query=dress&submit_search=')
      .assert.textEquals(dressSpanSelector,'"DRESS"')
  });

  it('search for dress with Uppercase', function(browser) {
    browser
      .assert.visible(searchFieldSelector)
      .setValue(searchFieldSelector, 'DRESS')
      .assert.visible('button[type=submit]')
      .click(searchButtonSelector)
      .assert.urlContains('search_query=DRESS&submit_search=')
      .assert.textEquals(dressSpanSelector,'"DRESS"')
  });

  it('search for dress with Uppercase', function(browser) {
    browser
      .assert.visible(searchFieldSelector)
      .setValue(searchFieldSelector, 'DreSS')
      .assert.visible('button[type=submit]')
      .click(searchButtonSelector)
      .assert.urlContains('search_query=DreSS&submit_search=')
      .assert.textEquals(dressSpanSelector,'"DRESS"')
  });

 it('search for dress and verify results', function(browser) {
    browser
      .assert.visible(searchFieldSelector)
      .setValue(searchFieldSelector, 'dress')
      .assert.visible('button[type=submit]')
      .click(searchButtonSelector)
      .elements('css selector', '.product_list .product-container', function (result) {
        const itemCount = result.value.length;
        console.log('itemcounttttt:',itemCount )
        for (let i = 1; i <= itemCount; i++) {
          browser.verify.attributeContains(`#product_list > li:nth-child(${i}) > div > div.right-block > h5 > a`,'title', 'Dress');
          }
      })
    })
  
  after(browser => browser.end());
});
