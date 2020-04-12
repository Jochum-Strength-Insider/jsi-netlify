# ToDo

###TODAY
1. Messages only load an initial value then add a "load more" button at the top of the messages to load more. Only show load more if the current messages list exceeds a certain size.
1. Overall styling
1. Restyle admin page so it includes everything on one page. More of an admin panel.
1. Chat
   1. restyle users page to include
      1. list of users
      2. chat component
      3. users info
      * how should this be designed on mobile??
   3. Restyle input form so it expands?
1. Look into firebase bucket storage for images.

#Fix
1. in the diet page do I need to have a separate diet id's object. Can I just query the createdAt object of diets object?
1. Should workoutIds be still be apart of the user object
1. Change new Date to Number(moment(date).format(x))????
1. Reapply the bootstrap hidden style to the self created ones.
1. Organize component structure into components / pages
1. Reorganize the user-program components. i.e. expandable table
1. Create use a forEach on table rows to create listeners??

1. weigh in page
   * how should pagination be structured? Week at a time? month?
   * Should the chart be contrained to just that span of dates?s
   * i.e from the start of a month to the end of the same month???

#TODO
1. Add loading to all pages
1. Messages unread count
1. Add account icon that has a submenu ( account / logout );
1. UseMemo more often.
1. Cut back on as many firebase calls as possible.
1. Inputs
   * refactor inputs to be own components / pure components that only update when props change
1. Look into wix / heroku subdomains
1. Restyle workouts page.
1. Make an exercises page for non-admin users?
1. Diet page
   * restyle

### Major

1. Secure api key / api key usage. This will be easier once jochum has a domain subdomain.
https://javebratt.com/hide-firebase-api/
https://console.developers.google.com/apis/credentials?project=wp-practice-227620&folder=&organizationId=

### UI
1. consistent headings on each page
1. style footer
1. fix time to first paint. Aka have items prerendered to dom without dummy data. while the real data is being store. Aka limit { data && <element>} patterns.


### Landing Page:
 1. Would like to edit this and be able to bring customers that havent signed up yet to this page and show them what they'd be getting if they signed up. I think this will be easier to discuss in person when you get back!

 [Landing Page Info](https://www.jochumstrength.com/program-information)


### Before Photos:
1. This would also be huge on the Tracking page to have the ability for them to upload their photos so it keeps everything in one spot

As for logos and stuff, I'm going to make you an editor of our current website and in the file storage thing on the website it should have everything you'd need and let me know if you need anything else