# ToDo

###TODAY
1. Diet page
1. Send email login link?
   * Create sendLoginLink page.
   * change emailverify redirect link to send loginLink page.
   * User enters email address. Gets another email that logs them in.
   * Prompt user to change password upon sign in.
   * Do they need to enter their email? Can this be sent right after user creation?

#Fix
1. users account page: shows program count even when none are live.
1. Reapply the bootstrap hidden style to the self created ones.

#TODO

1. Chat
   1. restyle users page to include
      1. list of users
      2. chat component
      3. users info
      * how should this be designed on mobile??
   3. Restyle input form so it expands?
1. Inputs
   * refactor inputs to be own components / pure components that only update when props change
1. Restyle into material ui?
1. Look into wix / heroku subdomains
1. Make an exercises page for non-admin users.

1. Restyle admin page so it includes everything on one page. More of an admin panel.

### Major

1. Secure api key / api key usage. This will be easier once jochum has a domain subdomain.
https://javebratt.com/hide-firebase-api/
https://console.developers.google.com/apis/credentials?project=wp-practice-227620&folder=&organizationId=

1. copy the landing page.
1. Leave a check in today button as well as check in on date?
1. So users can check in when they want to and put the date they want to check in on.
1. if there is no localstorage for tasks in the searchbar make sure to load them.

### UI
1. consistent headings on each page
1. style footer
1. fix time to first paint. Aka have items prerendered to dom without dummy data. while the real data is being store. Aka limit { data && <element>} patterns.

### Minor
1. Rename days in createProgram ???
1. Look into firebase offline use.

### Landing Page:
 1. Would like to edit this and be able to bring customers that havent signed up yet to this page and show them what they'd be getting if they signed up. I think this will be easier to discuss in person when you get back!

 [Landing Page Info](https://www.jochumstrength.com/program-information)

 1. As for the landing page I'd like it to be similar to this https://www.jochumstrength.com/program-information so when a new user goes there they can see this , I'm also thinking we could add the paypal button onto the website, I was able to do it on wix, I'm assuming you can do it on this website? Not sure but let me know, after seeing this website I think this should really be the landing, selling and program page if we could, let me know if I'm making sense here. I could eventually see this turning into just our base website but thats for the future

### Diet Sheet:
1. Don't want to lock after the day of as some people add in their diets at the end of the week each week!

### Chat:
* split database?
* Styling
* emojis?

### Before Photos:
1. This would also be huge on the Tracking page to have the ability for them to upload their photos so it keeps everything in one spot

As for logos and stuff, I'm going to make you an editor of our current website and in the file storage thing on the website it should have everything you'd need and let me know if you need anything else