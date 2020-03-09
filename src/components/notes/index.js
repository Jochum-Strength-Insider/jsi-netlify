const questions = [
   "Are the goal sheets / my why specific to the program are to the user. Do they carry over to every new program?",
   "Same quesion with the diet sheet"
];

const dataStructure = [
   {
      "program 1 / Program id": [
         {
            // Restructure this to just be sets of exercises instead of Phases and Recovery??
            "phases": [
               {
                  "phase 1": [
                     {
                        "Day 1": [
                           { "Number": "1A", "Description": "Incline Walk", "Link": "www.link.com", "Sets": "1", "Reps": "30 minutes", "Rest": " : 30" },
                           { "Number": "2A", "Description": "Side Plank", "Link": "www.link.com", "Sets": "2", "Reps": "20", "Rest": "x" },
                           { "Number": "2B", "Description": "Band Pull", "Link": "www.link.com", "Sets": "2", "Reps": "10", "Rest": "x" },
                           // {"Number" : "2B" , "Exercise" : {"Description" : "Band Pull", "Link" : "www.link.com"}, "Sets" : "2", "Reps" : "10", "Rest" : "x" }
                        ],
                        "Completed": "false",
                     },
                     {
                        "Day 2": [
                           { " Number": "1A", "Description": "Incline Walk", "Link": "www.link.com", "Sets": "1", "Reps": "30 minutes", "Rest": " : 30" },
                           { " Number": "2A", "Description": "Side Plank", "Link": "www.link.com", "Sets": "2", "Reps": "20", "Rest": "x" },
                           { " Number": "2B", "Description": "Band Pull", "Link": "www.link.com", "Sets": "2", "Reps": "10", "Rest": "x" },
                           // {" Number" : "2B" , "Exercise" : {"Description" : "Band Pull", "Link" : "www.link.com"}, "Sets" : "2", "Reps" : "10", "Rest" : "x" }
                        ],
                        "Completed": "false",
                     },
                     { "Day 3": [] },
                     { "Day 4 etx": [] },
                  ],
               },
               { "Phase 2": [] },
               { "Phase 3": [] },
            ]
         },
         {
            "Recovery": [
               {
                  "Recovery 1": [
                     {
                        "Day 1": [
                           { " Number": "1A", "Description": "Incline Walk", "Link": "www.link.com", "Sets": "1", "Reps": "30 minutes", "Rest": " : 30" },
                           { " Number": "2A", "Description": "Side Plank", "Link": "www.link.com", "Sets": "2", "Reps": "20", "Rest": "x" },
                           { " Number": "2B", "Description": "Band Pull", "Link": "www.link.com", "Sets": "2", "Reps": "10", "Rest": "x" },
                        ],
                        "Completed": "false",
                     },
                     {
                        "Day 2": [
                           { " Number": "1A", "Description": "Incline Walk", "Link": "www.link.com", "Sets": "1", "Reps": "30 minutes", "Rest": " : 30" },
                           { " Number": "2A", "Description": "Side Plank", "Link": "www.link.com", "Sets": "2", "Reps": "20", "Rest": "x" },
                           { " Number": "2B", "Description": "Band Pull", "Link": "www.link.com", "Sets": "2", "Reps": "10", "Rest": "x" },
                        ],
                        "Completed": "false",
                     },
                     { "Day 3": [] },
                     { "Day 4 etc": [] },
                  ],
               },
               { "Recovery 2": [] },
               { "Recovery 3": [] },
            ]
         },
      ],

      // Are Diet and Goal associated with the user or with the Program
      "Diet Sheet": [
         { "Date": "3-mar", "Meal 1": "", "Meal 2": "", "Meal 3": "", "Notes": "" },
         { "Date": "3-mar", "Meal 1": "", "Meal 2": "", "Meal 3": "", "Notes": "" },
         { "Date": "3-mar", "Meal 1": "", "Meal 2": "", "Meal 3": "", "Notes": "" },
      ],

      "Goal Sheet": [
         { "Date": "3-mar", "Goal 1": "", "Goal 2": "", "Goal 3": "" },
         { "Date": "3-mar", "Goal 1": "", "Goal 2": "", "Goal 3": "" },
         { "Date": "3-mar", "Goal 1": "", "Goal 2": "", "Goal 3": "" },
      ],

      "createdAt": "time",

      "Completed": "false",

      "User Notes": "No notes",

      "userID": "idNumber",

      "gains": "None yet",

      "Goals": {
         "Your WHY": "",
         "Life Goals": { "1": "stuff", "2": "stuff", "3": "" },
         "Program Goals": { "1": "Stuff", "2": "Stuff", "3": "Stuff" },
      },

      "Overall Notes": "10 Minute Walks Everyday after you eat."
   },

   { "Program 2": [] }
]

console.log(dataStructure, questions);


//Do the same thing with programs as workouts. The user has a "Programs" : [ "id#", ] that associates with a programs path / object with the full program.
// User should have a goals object. That is part of the user account not the workout.
// User object should have a last program date that sorts the list of users in the admin usersList.

//Admin creation program structure.
//  User List
//    Specific user account page - user info, last program, suspend user, add program, etc.
//       Add Program - Add Phase, add recovery, set notes, save program select from default programs?
//       //should the admin have a draft option? How would it be stored? On the users account but not visible? Draft object on the admin user?
//       //should the program creation have a default phases/days/recovery etc.? Probably
//          Select Recovery / Phase
//             Add Phase/Recovery - Add Day, day notes, etc., set title, set date
//                Add task ( task Id/# : task (dropdown of selectable tasks) : sets : reps: rest );
//       "Make program public to user?" "Save program to draft?" "Are you sure?"

//Admin creation component structure

// Users List (state = list of users)
// Specific user (state = specific user data)
// Specific user programs lists (state = specific user data passed down from specific user)
// Specific user program (state = specifc user program which is taken be querying the specific program id)
// Specific user program phase / recovery (state = specific user program passed down from specific program)


//Checking for nested properties within a user object.
const user = {
   id: 101,
   email: 'jack@dev.com',
   personalInfo: {
      name: 'Jack',
      address: {
         line1: 'westwish st',
         line2: 'washmasher',
         city: 'wallas',
         state: 'WX'
      }
   }
}

// Simple way to prevent "cant find property of undefined" errors
const name = ((user || {}).personalInfo || {}).name;
// this cannot check nested arrays
console.log(name);
