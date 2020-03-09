// const INITIAL_DATA = [
//    { 'Number': '1A', "Description": "Monster Walks", "Link": "https://www.youtube.com/watch?v=f82AjZFtIns", 'Sets': 1, 'Reps': "30 Minutes", 'Rest': ":0" },
//    { 'Number': '2A', "Description": "Tricep Push Down", "Link": "https://www.youtube.com/watch?v=MpVBmrLNhjc", 'Sets': 3,'Reps': 43, 'Rest': ":0" },
//    { 'Number': '2C', "Description": "Side Plank with T Spine Rotations", "Link": "https://youtu.be/ci_v3iwDP-w", 'Sets': 3,'Reps': 10, 'Rest': ":0" },
//    { 'Number': '3A', "Description": "Band Pull Aparts", "Link": "https://www.youtube.com/watch?v=781ImK2YCIM", 'Sets': 3, 'Reps': 20, 'Rest': ":0" },
//    { 'Number': '3B', "Description": "Birdog Rows", "Link": "https://youtu.be/3hJLSyj0n5c", 'Sets': 1, 'Reps': "5 (3-3-0 Tempo)", 'Rest': "2:00" }
// ];

// Nested...
// const INITIAL_DATA_With_Tracking = [
//    { 'Number': '1A', "Description": "Monster Walks", "Link": "https://www.youtube.com/watch?v=f82AjZFtIns", 'Sets': 1, 'Reps': "30 Minutes", 'Rest': ":0", "tracking": { "week 1": "1", "week 2": "1", "week 3": "1" } },
//    { 'Number': '2A', "Description": "Tricep Push Down", "Link": "https://www.youtube.com/watch?v=MpVBmrLNhjc", 'Sets': 3, 'Reps': 43, 'Rest': ":0", "tracking": { "week 1": "2", "week 2": "2", "week 3": "2" } },
//    { 'Number': '2C', "Description": "Side Plank with T Spine Rotations", "Link": "https://youtu.be/ci_v3iwDP-w", 'Sets': 3, 'Reps': 10, 'Rest': ":0", "tracking": { "week 1": "3", "week 2": "3", "week 3": "3" } },
//    { 'Number': '3A', "Description": "Band Pull Aparts", "Link": "https://www.youtube.com/watch?v=781ImK2YCIM", 'Sets': 3, 'Reps': 20, 'Rest': ":0", "tracking": { "week 1": "4", "week 2": "4", "week 3": "4" } },
//    { 'Number': '3B', "Description": "Birdog Rows", "Link": "https://youtu.be/3hJLSyj0n5c", 'Sets': 1, 'Reps': "5 (3-3-0 Tempo)", 'Rest': "2:00", "tracking": { "week 1": "5", "week 2": "5", "week 3": "5" } }
// ];

const INITIAL_DATA_WITH_TEMPO = [
   { 'Number': '1A', "Description": "Monster Walks", "Link": "https://www.youtube.com/watch?v=f82AjZFtIns", 'Sets': 1, 'Reps': "30 Minutes", "Tempo": "-", 'Rest': ":0", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '2A', "Description": "Tricep Push Down", "Link": "https://www.youtube.com/watch?v=MpVBmrLNhjc", 'Sets': 3, 'Reps': 43, "Tempo": "-", 'Rest': ":0", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '2C', "Description": "Side Plank with T Spine Rotations", "Link": "https://youtu.be/ci_v3iwDP-w", 'Sets': 3, 'Reps': 10, "Tempo": "-", 'Rest': ":0", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '3A', "Description": "Band Pull Aparts", "Link": "https://www.youtube.com/watch?v=781ImK2YCIM", 'Sets': 3, 'Reps': 20, "Tempo": "-", 'Rest': ":0", "tracking": { "week 1": "", "week 2": "", "week 3": "" } },
   { 'Number': '3B', "Description": "Birdog Rows", "Link": "https://youtu.be/3hJLSyj0n5c", 'Sets': 1, 'Reps': "5", "Tempo": "3-3-0", 'Rest': "2:00", "tracking": { "week 1": "", "week 2": "", "week 3": "" } }
];

// const INITIAL_DATA_WITH_TEMPO= [
//    { 'Number': '1A', "Description": "Monster Walks", "Link": "https://www.youtube.com/watch?v=f82AjZFtIns", 'Sets': 1, 'Reps': "30 Minutes", "Tempo": "5-3-3", 'Rest': ":0", "tracking": { "week 1": "1", "week 2": "1", "week 3": "1" } },
//    { 'Number': '2A', "Description": "Tricep Push Down", "Link": "https://www.youtube.com/watch?v=MpVBmrLNhjc", 'Sets': 3, 'Reps': 43, "Tempo": "5-3-3", 'Rest': ":0", "tracking": { "week 1": "2", "week 2": "2", "week 3": "2" } },
//    { 'Number': '2C', "Description": "Side Plank with T Spine Rotations", "Link": "https://youtu.be/ci_v3iwDP-w", 'Sets': 3, 'Reps': 10, "Tempo": "5-3-3", 'Rest': ":0", "tracking": { "week 1": "3", "week 2": "3", "week 3": "3" } },
//    { 'Number': '3A', "Description": "Band Pull Aparts", "Link": "https://www.youtube.com/watch?v=781ImK2YCIM", 'Sets': 3, 'Reps': 20, "Tempo": "5-3-3", 'Rest': ":0", "tracking": { "week 1": "4", "week 2": "4", "week 3": "4" } },
//    { 'Number': '3B', "Description": "Birdog Rows", "Link": "https://youtu.be/3hJLSyj0n5c", 'Sets': 1, 'Reps': "5", "Tempo": "3-3-0", 'Rest': "2:00", "tracking": { "week 1": "5", "week 2": "5", "week 3": "5" } }
// ];

const INITIALJSON = JSON.stringify(INITIAL_DATA_WITH_TEMPO);

const PROGRAM = (timestamp) => {
   return ({
      instruction: {
         "Phase": {
            "day 1": { title: "Max Effort Upper", exercises: INITIALJSON },
            "day 2": { title: "Max Effort Lower", exercises: INITIALJSON },
            "day 3": { title: "Max Effort Middle", exercises: INITIALJSON },
            "day 4": { title: "Max Effort Under", exercises: INITIALJSON },
            // "day 1": INITIALJSON,
            // "day 2": INITIALJSON,
            // "day 3": INITIALJSON,
            // "day 4": INITIALJSON,
            "completed": "false",
         },
         "Recovery Days": {
            // "day 1": INITIALJSON,
            // "day 2": INITIALJSON,
            // "day 3": INITIALJSON,
            "day 1": { title: "Recovery Day 1", exercises: INITIALJSON },
            "day 2": { title: "Recovery Day 2", exercises: INITIALJSON },
            "day 3": { title: "Recovery Day 3", exercises: INITIALJSON },
            "completed": "false",
         },
      },
      createdAt: timestamp,
      notes: "",
      completed: false,
      gains: false,
      title: "Your First Program!"
   })
}

export { PROGRAM, INITIALJSON };