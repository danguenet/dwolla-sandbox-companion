# Dwolla Sandbox Companion
Explore the different payment flows you can accomplish with Dwolla using only 3 endpoints in the Dwolla sandbox.

## Getting Started
1. Create a Dwolla sandbox account here: https://accounts-sandbox.dwolla.com/sign-up
2. Get the key and secret to submit in the application here: https://dwolla-sandbox-companion.herokuapp.com/
3. Use the nav bar to choose the payment flow you are interested in.
4. Enjoy the ride.

## localStorage
The key and secret as well as the location of some sandbox assets you create are stored in localStorage. This comes with the security concern of the localStorage being assessable to different websites you visits and extensions you have downloaded. I ultimately came to the conclusion this was an acceptable risk as no one should be using this for production data. Worst case scenario someone starts using your sandbox creds to create data. And using localStorage reduced friction in both my developer experience, as well as the users experience since this is not gated behind another login.
