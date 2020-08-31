# ToDo

1. Client side limit warnings
1. group messages form styling
1. restyle user profile page
1. first time on app instructions

## FIX
1. make buttons consistent across the application. (user programs, etc.)
1. Weigh in list object should have fixed height so it can scroll. Or put the add weigh in button somewhere else.
1. Add error handling to userProgramItem
1. WorkoutList add blank default?
1. Compress before/after images?
1. restyle youtube embed??
1. remove "Programs" from user profile page.
1. adding margin top to email confirmation / email sign in pages

## TODO
1. does the program object need to be stored in json???
1. Organize component structure into components / pages
1. force https?

## Organize

## Thoughts
1. typing autosave -> use the form valid checkmarks on save?
1. Add last message to user object so it can be displayed in the userslist?


## Updates

UPDATE DEPENDENCIES!!!

1. Deleting users: 'On the users side I know we talked about having it done, but I still don't seem to be able to do it and that's actually deleting users!'

* This isn't possible without the firebase admin SDK.

2. More organized user sorting: 'The active/inactive is nice (other than it seems to be flipped - active users pop up on the inactive list) but it's still getting pretty full.'

* User search sort

3. Copy/save programs from within a program: 'I'd love the ability to take a program I created for a user and then add that to the general list of programs to be able to use in the future. Along with this I'd love to be able to copy the current program on the sheet lets say it's "Logan 1" and create a copy that is "Logan 1 Copy" to make a "Logan 2" program.'

'The remake of the programs is best explained in the fact that if I create Logan a program I'd like tp use that same program for let's say Fenske! Currently you can't do that, so the biggest thing is being able to copy a program from a user like mentioned above but also being able to send that program to another user! (So if I create Logan 1 I'd like to be able to copy that so it says Logan 1 - Copy or something so that the set up is very similar and I'd also like to be able to send Logan 1 to Fenske and then change it from there).'

*  Add from copy. Add a copy to clipboard feature within the users program that lets jochum quickly copy the most recent saved program to a new user.

* Add a save to programs list button. Save a program to the master programs list from within a users program.

4. Programs folders: 'Finally with programs it would be awesome to create Folders so let's say all of my "back in action" programs phases 1 - 4 can be in a folder, reason for this being is the list of programs is going to get crazy long other wise!'