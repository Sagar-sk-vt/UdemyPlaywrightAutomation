# GreenKart Storefront and Checkout Test Plan

## Application Overview

Functional test plan for the GreenKart demo storefront at https://rahulshettyacademy.com/seleniumPractise/#/. Live exploration confirmed a 30-product catalog, product quantity controls, search with an explicit no-results message, cart summary and removal, promo-code checkout, country selection and terms consent, and a Top Deals table with page-size, pagination, sorting, and search controls. Start each scenario from a fresh browser session with an empty cart; use independent test data. During exploration the app allowed an empty cart to reach the country-selection step, which should be tracked as a negative-test defect. Browser console errors were also observed during exploration and should be triaged separately if reproducible in a clean run.

## Test Scenarios

### 1. Storefront and product selection

**Seed:** `tests/seed.spec.ts`

#### 1.1. Storefront loads with the product catalog and empty cart

**File:** `tests/greenkart/storefront-load.spec.ts`

**Steps:**
  1. Open the storefront URL in a fresh browser session and wait for the page to finish loading.
    - expect: The GreenKart storefront is displayed without a blocking error.
  2. Inspect the header and product list.
    - expect: Product cards display product names, prices, quantity controls, and Add to Cart buttons.
    - expect: The search field, Top Deals link, and cart control are available.
    - expect: The cart summary starts at zero items and zero price.

#### 1.2. Search filters products and recovers from no matches

**File:** `tests/greenkart/product-search.spec.ts`

**Steps:**
  1. Start on the fresh storefront and enter “Apple” in the product search field.
    - expect: The matching Apple product is shown and unrelated products are filtered out.
  2. Replace the query with a string that does not match any product.
    - expect: A clear no-products-matched message is displayed and no unrelated product cards remain.
  3. Clear the search field.
    - expect: The full product list is restored.

#### 1.3. Product quantity controls respect the lower bound and set cart quantity

**File:** `tests/greenkart/product-quantity.spec.ts`

**Steps:**
  1. On the fresh storefront, locate Brocolli and note its default quantity.
    - expect: The initial quantity is 1.
  2. Click the decrement control once while quantity is 1.
    - expect: The quantity does not fall below 1.
  3. Click the increment control once and add the product to the cart.
    - expect: The selected quantity is 2 and the product is added successfully.
  4. Open the cart preview.
    - expect: Brocolli is listed with quantity 2 and line total ₹240, based on the displayed unit price ₹120.
    - expect: The header total is ₹240.

#### 1.4. Add multiple products and calculate cart totals

**File:** `tests/greenkart/catalog-add-multiple-products.spec.ts`

**Steps:**
  1. Start with an empty cart; add one unit of two different products with known displayed prices.
    - expect: Both products are added without replacing one another.
  2. Open the cart preview and compare quantities and amounts with the catalog prices.
    - expect: Each product appears once with the correct quantity and line amount.
    - expect: The cart total equals the sum of the line amounts.

#### 1.5. Changing one product quantity does not affect other products

**File:** `tests/greenkart/product-quantity-isolation.spec.ts`

**Steps:**
  1. Start with an empty cart and locate the Brocolli and Cauliflower cards.
    - expect: Both cards show an initial quantity of 1.
  2. Increase Brocolli's quantity twice and inspect both product cards.
    - expect: Brocolli shows quantity 3.
    - expect: Cauliflower remains at quantity 1.
  3. Add both products to the cart.
    - expect: The cart shows Brocolli quantity 3 and Cauliflower quantity 1 with correct line totals and combined total.

#### 1.6. Repeatedly adding the same product updates its cart quantity and total

**File:** `tests/greenkart/repeated-product-add.spec.ts`

**Steps:**
  1. Start with an empty cart and add one Brocolli unit to the cart.
    - expect: The cart summary shows 1 item and ₹120.
  2. Add one more Brocolli unit using the same product card's Add to Cart control.
    - expect: The cart summary reflects 2 units and ₹240 rather than creating an inconsistent duplicate line.
  3. Open the cart preview.
    - expect: Brocolli is represented with the combined quantity of 2 and a line total of ₹240.

#### 1.7. Adding a product from filtered search adds only the matching product

**File:** `tests/greenkart/add-product-from-search.spec.ts`

**Steps:**
  1. Start with an empty cart and search for “Apple”.
    - expect: Only the matching Apple product is displayed.
  2. Add the visible product to the cart and open the cart preview.
    - expect: Apple is present with the correct quantity and price.
    - expect: No unrelated or hidden product is added.

#### 1.8. Product search handles different letter casing

**File:** `tests/greenkart/product-search-case.spec.ts`

**Steps:**
  1. Start on the fresh storefront and search for “apple” in lowercase.
    - expect: The Apple product is returned, consistent with case-insensitive product search.
  2. Replace the query with “APPLE” in uppercase.
    - expect: The same Apple result is returned.

### 2. Cart and checkout

**Seed:** `tests/seed.spec.ts`

#### 2.1. Removing cart items updates the cart summary

**File:** `tests/greenkart/cart-remove-item.spec.ts`

**Steps:**
  1. Start with an empty cart and add one product.
    - expect: The header item count and price reflect the added product.
  2. Open the cart preview and remove the product using its remove control.
    - expect: The product disappears from the cart.
    - expect: The header count and price return to zero and the empty-cart message is shown.

#### 2.2. Empty cart cannot be submitted as an order

**File:** `tests/greenkart/empty-cart-checkout.spec.ts`

**Steps:**
  1. Start with an empty cart, open the cart preview, and select Proceed to Checkout.
    - expect: The checkout must prevent progression to order submission when there are no products.
  2. If the application permits navigation, attempt to continue through the country and terms steps without adding products.
    - expect: Order placement remains blocked and a clear empty-cart validation is shown.
    - expect: Failure condition: an empty order reaches the order-completion flow. The explored site did allow an empty cart to reach the country step; log this as a defect if still reproducible.

#### 2.3. Checkout summary matches cart contents and totals

**File:** `tests/greenkart/checkout-summary.spec.ts`

**Steps:**
  1. Start with an empty cart, add two products with known quantities, open the cart preview, and proceed to checkout.
    - expect: The checkout table lists the selected products and quantities.
    - expect: Each line total and total amount match the cart calculations.
  2. Review the item count, discount, and total-after-discount values before applying a promo code.
    - expect: The displayed item count and monetary totals are internally consistent.
    - expect: With no promo code applied, the discount is 0% and the total after discount equals the total amount.

#### 2.4. Valid promo code applies the configured discount

**File:** `tests/greenkart/promo-code-valid.spec.ts`

**Steps:**
  1. Start with an empty cart, add at least one product, and proceed to checkout.
    - expect: The promo-code textbox and Apply button are available.
  2. Enter a valid promo code configured for the demo environment and select Apply.
    - expect: The application confirms that the code was applied.
    - expect: The displayed discount and total-after-discount are calculated correctly and do not change the cart quantities.

#### 2.5. Invalid promo code is rejected without changing totals

**File:** `tests/greenkart/promo-code-invalid.spec.ts`

**Steps:**
  1. Start with an empty cart, add at least one product, and proceed to checkout.
    - expect: A nonzero checkout total is displayed.
  2. Enter an invalid promo code and select Apply.
    - expect: The application gives clear rejection feedback.
    - expect: No discount is applied and the total remains unchanged.

#### 2.6. Country selection and terms consent are required before order completion

**File:** `tests/greenkart/order-country-and-terms.spec.ts`

**Steps:**
  1. Start with an empty cart, add at least one product, proceed through checkout, and select Place Order.
    - expect: The country step displays a country selector, terms checkbox, Terms & Conditions link, and Proceed button.
  2. Select a country and select Proceed without checking the terms box.
    - expect: The user stays on the country step and receives a clear required-consent message.
  3. Check the terms box and select Proceed.
    - expect: The order completes successfully with a clear confirmation.
    - expect: The app returns to the storefront and the completed cart is cleared.

#### 2.7. Country must be selected before proceeding

**File:** `tests/greenkart/country-required.spec.ts`

**Steps:**
  1. Start with an empty cart, add a product, proceed to checkout, and select Place Order.
    - expect: The country selector starts with its placeholder option selected.
  2. Leave the country at the placeholder and attempt to proceed, both with and without terms consent.
    - expect: The flow prevents completion until a country is selected and gives clear validation feedback.

### 3. Top Deals

**Seed:** `tests/seed.spec.ts`

#### 3.1. Top Deals table loads with rows and page-size controls

**File:** `tests/greenkart/top-deals-load.spec.ts`

**Steps:**
  1. Open Top Deals from a fresh storefront session.
    - expect: The Top Deals table shows product name, price, and discount price columns.
    - expect: The table loads rows and exposes page-size, search, sorting, and pagination controls.
    - expect: The default page size is 5.
  2. Change the page size to 10.
    - expect: Ten rows are displayed when at least ten records are available.
    - expect: Pagination updates to reflect the reduced number of pages.

#### 3.2. Top Deals pagination and column sorting work

**File:** `tests/greenkart/top-deals-pagination-sort.spec.ts`

**Steps:**
  1. Open Top Deals and use a page size that yields multiple pages.
    - expect: Next and Last are enabled on the first page when additional records exist.
  2. Move to the next page, then return to the first page.
    - expect: The active page indicator changes correctly and each page shows the appropriate rows.
  3. Sort by product name, then by price, toggling each column sort direction.
    - expect: Rows are ordered according to the selected column and direction.
    - expect: The table's sort status reflects the active sort.

#### 3.3. Top Deals search filters rows and handles no matches

**File:** `tests/greenkart/top-deals-search.spec.ts`

**Steps:**
  1. Open Top Deals and search for “Mango”.
    - expect: Only matching Mango rows are displayed.
  2. Replace the query with text that matches no row.
    - expect: No unrelated rows are displayed and the table communicates that there are no matches.
  3. Clear the search query.
    - expect: The full data set and valid pagination are restored.
