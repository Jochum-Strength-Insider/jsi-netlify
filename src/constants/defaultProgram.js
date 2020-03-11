const INITIAL_DATA = [
   { 'Number': '1A', "Description": "Bear Crawl Push Ups", "Link": "oh15GpmbPsc", 'Sets': 3, 'Reps': "10", "Tempo": "3-3-0", 'Rest': ":30", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '1B', "Description": "Posterior Fly Renegade Row", "Link": "SIyCmNmQQQ8", 'Sets': 3, 'Reps': "5 Each", "Tempo": "3-3-0", 'Rest': ":0", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '1C', "Description": "Underhand Band Pull Aparts", "Link": "CPSry57YJKk", 'Sets': 3, 'Reps': 10, "Tempo": "3-3-0", 'Rest': ":0", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '2A', "Description": "Bear Crawl Rows", "Link": "lxni89la-VA", 'Sets': 3, 'Reps': 5, "Tempo": "3-3-0", 'Rest': "2:00", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '2B', "Description": "Medball Squeeze Push Ups", "Link": "iBNI2UBEJek", 'Sets': 3, 'Reps': 7, "Tempo": "3-3-0", 'Rest': ":00", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '2C', "Description": "90 Degree Partial Range Bench", "Link": "8KP5XPr6qLM", 'Sets': 4, 'Reps': "4,3,2,1", "Tempo": "(3-3-0), (4-4-0), (5-5-0), (10-10,0)", 'Rest': ":00", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '3A', "Description": "Offset Incline Press", "Link": "rXG1QORHISc", 'Sets': 3, 'Reps': "5 Each", "Tempo": "3-3-0", 'Rest': ":00", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '3B', "Description": "Cable Machine Pull Overs", "Link": "jD0W3z83QZI", 'Sets': 3, 'Reps': 5, "Tempo": "3-3-0", 'Rest': ":00", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '3C', "Description": "Ninja Pull Up Holds", "Link": "s5rfcwLTMSQ", 'Sets': 3, 'Reps': "20 Seconds Each", "Tempo": "-", 'Rest': ":00", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '4A', "Description": "Steering Wheels", "Link": "887kfH3BQkI", 'Sets': 3, 'Reps': "7 Each Way", "Tempo": "-", 'Rest': "1:00", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '4B', "Description": "Tic Tocs", "Link": "wRPakIrhHkQ", 'Sets': 3, 'Reps': "7 Each", "Tempo": "-", 'Rest': ":00", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '4C', "Description": "Uneven 90 Degree Bottoms Up Carry", "Link": "j_E5xxo-1kc", 'Sets': 3, 'Reps': "30 Seconds Each", "Tempo": "-", 'Rest': ":00", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
];

const INITIAL_DATA_RECOVERY = [
   { 'Number': '1A', "Description": "Band Pull Aparts", "Link": "781ImK2YCIM", 'Sets': 3, 'Reps': "15", "Tempo": "-", 'Rest': ":30", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '1B', "Description": "Goblet Squat with Prying", "Link": "XhUAlz3w80U", 'Sets': 3, 'Reps': "1-", "Tempo": "0-3-0", 'Rest': ":0", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '1C', "Description": "Face Pulls", "Link": "pRLmJta5dZc", 'Sets': 3, 'Reps': 10, "Tempo": "-", 'Rest': ":0", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '1D', "Description": "DB Curls", "Link": "nZzBsbpiO8I", 'Sets': 3, 'Reps': 20, "Tempo": "-", 'Rest': ":00", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
]

const INITIALJSON = JSON.stringify(INITIAL_DATA);
const INITIALJSONRECOVERY = JSON.stringify(INITIAL_DATA_RECOVERY);
const PROGRAM = (timestamp) => {
   return ({
      instruction: {
         "Phase": {
            "day 1": { title: "Max Effort Upper", exercises: INITIALJSON },
            "day 2": { title: "Max Effort Lower", exercises: INITIALJSON },
            "day 3": { title: "Dynamic Effort Upper", exercises: INITIALJSON },
            "day 4": { title: "Dynamic Effore Lower Body", exercises: INITIALJSON },
            "completed": "false",
         },
         "Recovery Days": {
            "day 1": { title: "Recovery Day 1", exercises: INITIALJSONRECOVERY },
            "day 2": { title: "Recovery Day 2", exercises: INITIALJSONRECOVERY },
            "day 3": { title: "Recovery Day 3", exercises: INITIALJSONRECOVERY },
            "completed": "false",
         },
      },
      createdAt: timestamp,
      notes: "",
      completed: false,
      title: "Default"
   })
}

export { PROGRAM, INITIALJSON };