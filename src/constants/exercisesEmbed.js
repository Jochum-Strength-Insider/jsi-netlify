// const filters = ["https://youtu.be/", "https://www.youtube.com/watch?v="];

const EXERCISES = [
   {
      "e": "1 and 1/2 Rep Goblet Squats",
      "l": "OOJc0LLs8TA"
   },
   {
      "e": "1 Arm Dead Hang Lat Stretch",
      "l": "Dn9kmmaXpaA"
   },
   {
      "e": "1 Arm Hangs",
      "l": "Z8vaDCHA5kc"
   },
   {
      "e": "1 Arm on Medball Push Ups",
      "l": "xgji0PxZOpc"
   },
   {
      "e": "2-1 Eccentric Lat Pull-Downs",
      "l": "oa_d-Mq7pAY"
   },
   {
      "e": "3D Band Pull Aparts",
      "l": "whNM97jlAW8"
   },
   {
      "e": "4-Way Lunge",
      "l": "Kv4T0rEZKxc"
   },
   {
      "e": "Ab Roll-Outs",
      "l": "lG5z2S4oaHg"
   },
   {
      "e": "Around the Worlds",
      "l": "gOmeSQxV4BA"
   },
   {
      "e": "Back Attack 1",
      "l": "dA7pdg18Wn0"
   },
   {
      "e": "Back Attack 2",
      "l": "qEmY84yUsR8"
   },
   {
      "e": "Back Extensions",
      "l": "rdOZFixn1AY"
   },
   {
      "e": "Band Assisted Jumps",
      "l": "9nsweishw6A"
   },
   {
      "e": "Band Assisted Plyo Push-Up",
      "l": "66M0qvtpfrI"
   },
   {
      "e": "Band Assisted Pull Ups",
      "l": "DIxSIa13PdQ"
   },
   {
      "e": "Band Dislocates",
      "l": "F4mrN551boQ"
   },
   {
      "e": "Band Pull Aparts",
      "l": "781ImK2YCIM"
   },
   {
      "e": "Band Pull Down Pull Aparts",
      "l": "2baSac0mG6M"
   },
   {
      "e": "Band Resisted Broad Jumps",
      "l": "QwHIIhQ8tlc"
   },
   {
      "e": "Band Resisted Broad Jumps",
      "l": "QwHIIhQ8tlc"
   },
   {
      "e": "Band Resisted Vertical Jumps",
      "l": "Ym9od6nBzME"
   },
   {
      "e": "Banded Ankle MOB",
      "l": "xq33PqhOB3c"
   },
   {
      "e": "Banded Ankle Stretch",
      "l": "mnvr6179aQE"
   },
   {
      "e": "Banded Barbell Bench",
      "l": "Vu9ClT-Ynjg"
   },
   {
      "e": "Banded Bulgarian Split Squat",
      "l": "k88-_lWwbE4"
   },
   {
      "e": "Banded Curls",
      "l": "Ukv08ySlDKI"
   },
   {
      "e": "Banded Dead Bugs",
      "l": "RGkppQqEF94"
   },
   {
      "e": "Banded Goodmornings",
      "l": "KGauCTzqs4g"
   },
   {
      "e": "Banded Inverted Hangs",
      "l": "srSLwjvytf8"
   },
   {
      "e": "Banded KB Swings",
      "l": "wgE0X7M_kBY"
   },
   {
      "e": "Banded Oblique Up-Across_Down",
      "l": "kx8Qrra4-fk"
   },
   {
      "e": "Banded Overhead Squat",
      "l": "_6DWxwMHc5o"
   },
   {
      "e": "Banded RDLs",
      "l": "bKlfJg3zYlk"
   },
   {
      "e": "Banded Shoulder Stretch Series",
      "l": "gHbuUtN9moc"
   },
   {
      "e": "Banded Squats",
      "l": "CtBZNTyKdmE"
   },
   {
      "e": "Banded T-Spine Rotation",
      "l": "_p3v7-piiqY"
   },
   {
      "e": "Barbell Bench Press",
      "l": "rQAxZ8Jaa1Y"
   },
   {
      "e": "Barbell Calf Raises",
      "l": "ucVIIlCuo20"
   },
   {
      "e": "Barbell Floor Press",
      "l": "MCXMSWhz7uc"
   },
   {
      "e": "Barbell Isometric Incline Press",
      "l": "6d7dOoeN-b8"
   },
   {
      "e": "Barbell Isometric Squat",
      "l": "8hJyHtFISOo"
   },
   {
      "e": "Barbell Squat",
      "l": "n--UjOw35LU"
   },
   {
      "e": "Barbell Suitcase Carries",
      "l": "N6yMhYQ6rX0"
   },
   {
      "e": "Belt Squats",
      "l": "bwiD-Bd4wMM"
   },
   {
      "e": "Bird Dogs",
      "l": "z3U1mdmy1qc"
   },
   {
      "e": "Blackburns",
      "l": "WckMpXVcKi8"
   },
   {
      "e": "Board Press",
      "l": "9c-ymy6mw7w"
   },
   {
      "e": "Bound-Bound Sprint",
      "l": "H36nTAaOCUk"
   },
   {
      "e": "Bounds",
      "l": "WCq_IYpMbyo"
   },
   {
      "e": "Box Squats",
      "l": "3bxKNCxE7rc"
   },
   {
      "e": "Box Squats with Glute Band",
      "l": "zCjoylXOl2s"
   },
   {
      "e": "Breath Hold Golf Swings",
      "l": ""
   },
   {
      "e": "Broad Jump",
      "l": "KWN8SWA9MQ8"
   },
   {
      "e": "Build Ups",
      "l": "CfSAkHcKy44"
   },
   {
      "e": "Chest Supported Rows DB",
      "l": "9xcXGuD42Lc"
   },
   {
      "e": "Chin Ups",
      "l": "7Um9p_4HmGQ"
   },
   {
      "e": "Cossack Squat",
      "l": "Bcerw9oCA1I"
   },
   {
      "e": "Couch Stretch",
      "l": "mk59Pj_S3vg"
   },
   {
      "e": "Cross Over Lunge",
      "l": "Pp3JOdbC3Ng"
   },
   {
      "e": "Curl Superset 1",
      "l": "hcH_XqzdtVo"
   },
   {
      "e": "DB Bench",
      "l": "UVpPBocNgAw"
   },
   {
      "e": "DB Floor Press",
      "l": "kj-mp3zxUA0"
   },
   {
      "e": "DB Glute Bridges",
      "l": "1rjPaZoEibw"
   },
   {
      "e": "DB Jumps",
      "l": "qNKUryqLPVg"
   },
   {
      "e": "DB Military Press",
      "l": "ie6bxI5vGQ8"
   },
   {
      "e": "DB RDL",
      "l": "ReClawKqUtc"
   },
   {
      "e": "DB Row",
      "l": "AglvTqs4cmE"
   },
   {
      "e": "DB Shrugs",
      "l": "xb3_0Ly-9T8"
   },
   {
      "e": "DB Swings",
      "l": "ZdYfCs_uVg8"
   },
   {
      "e": "Dead Bugs",
      "l": "tuRtyQsBAnA"
   },
   {
      "e": "Dead Hangs",
      "l": "ndeD3NWPgWY"
   },
   {
      "e": "Dead Hangs with Scap Depressions",
      "l": "qrCc1SxMMds"
   },
   {
      "e": "Double Banded Tricep Kickbacks",
      "l": "VkhunQMDsn4"
   },
   {
      "e": "Eccentric Chest Support Rows",
      "l": "d0jlQ4Rhe1Y"
   },
   {
      "e": "Eccentric DB Bench",
      "l": "sxiRNbOLvzw"
   },
   {
      "e": "Eccentric DB Bulgarian Squats",
      "l": "624Z0Tyaf6A"
   },
   {
      "e": "Eccentric Incline DB Press",
      "l": "cth9Zadqgkk"
   },
   {
      "e": "e Ball Hamstring Curls",
      "l": "wM7qatRubws"
   },
   {
      "e": "Face Pulls",
      "l": "pRLmJta5dZc"
   },
   {
      "e": "Face Pulls with Y-Press",
      "l": "luAEpQW2tvU"
   },
   {
      "e": "Falling Starts",
      "l": "CFrPt63TNo8"
   },
   {
      "e": "Famers Carry Finisher 1",
      "l": "ofeJ9621oCs"
   },
   {
      "e": "Farmers Carries",
      "l": "PjuJdEybHFo"
   },
   {
      "e": "Flying !0s",
      "l": "FKDSokOgUwk"
   },
   {
      "e": "Foam Roller Planks",
      "l": "87phqNW1p7I"
   },
   {
      "e": "Frog Pumps",
      "l": "AUuJugzAYh0"
   },
   {
      "e": "Frog Stretch - Banded",
      "l": "ZrVpx7kvZQc"
   },
   {
      "e": "Front Loaded Split Squats",
      "l": "yjz6WMyGFTA"
   },
   {
      "e": "Front Loaded Step Ups",
      "l": "z7D-4x7SpJA"
   },
   {
      "e": "Front Raises",
      "l": "MW8hC-04jEU"
   },
   {
      "e": "GHR",
      "l": "QSpzUol4qtw"
   },
   {
      "e": "Glute Bridges",
      "l": "KQPEUTjak6w"
   },
   {
      "e": "Glute Wall Bridges",
      "l": "PaGUSrSGz08"
   },
   {
      "e": "Goblet Squat with Prying",
      "l": "XhUAlz3w80U"
   },
   {
      "e": "Goblet Squats",
      "l": "rOI2P3YGzfU"
   },
   {
      "e": "Hammer Curls",
      "l": "NIIZVxzHbH4"
   },
   {
      "e": "Hanging Leg Raises Eccentric Focus",
      "l": "0NEMkPqchoU"
   },
   {
      "e": "Hexbar Deadlifts",
      "l": "2VTdlCPBFdc"
   },
   {
      "e": "Hip Airplanes",
      "l": "xchqS9kihLg"
   },
   {
      "e": "Hip Flow Series",
      "l": "Fx8mNUkV8_U"
   },
   {
      "e": "Hip Stretch - Banded",
      "l": "p05Ase4XJFk"
   },
   {
      "e": "Horizontal Row with Change of Tempo",
      "l": "oXGB7W5l6t8"
   },
   {
      "e": "Hurdle Hops",
      "l": "54jzcfiGkH8"
   },
   {
      "e": "Intensive Single Leg Hops",
      "l": "-HPeWbMyj6s"
   },
   {
      "e": "Inverted Row",
      "l": "rg5FSrTeKlk"
   },
   {
      "e": "Isometric Back Extensions",
      "l": "Sy4jya2zrbE"
   },
   {
      "e": "Isometric Bulgarian Split Squats",
      "l": "YOgrJZbE8us"
   },
   {
      "e": "Isometric DB Bench Press",
      "l": "kg9qNkRg1W8"
   },
   {
      "e": "Jump Back Sprints",
      "l": "w_DA92vj9nM"
   },
   {
      "e": "Jump Rope",
      "l": "nF32aCXI68w"
   },
   {
      "e": "KB Swings",
      "l": "BkGq9vQFPmM"
   },
   {
      "e": "KB Windmill",
      "l": "ZhFRsmri8Ms"
   },
   {
      "e": "Kneeling Single Arm Landmine Press",
      "l": "KZoSWJZmEG8"
   },
   {
      "e": "Kneeling Sprint",
      "l": "ALOzRh5HSCY"
   },
   {
      "e": "Landmine Cossack Squat",
      "l": "CEFhm2tomCI"
   },
   {
      "e": "Landmine Reverse Lunges",
      "l": "VS2MYomdU1Q"
   },
   {
      "e": "Landmine Single Leg RDL",
      "l": "FfxAwuGJcaw"
   },
   {
      "e": "Landmine Squat",
      "l": "ZuqNZ4EUl4c"
   },
   {
      "e": "Lat Pull Downs",
      "l": "pkVOrs_pOcU"
   },
   {
      "e": "Lat Pull Downs with Varying Tempos",
      "l": "5F_TUjmHFus"
   },
   {
      "e": "Lateral Hip Opener",
      "l": "CJG6Xrym6Oc"
   },
   {
      "e": "Lateral Jumps",
      "l": "Wf_rGfivR-M"
   },
   {
      "e": "Lateral Medball Jumps",
      "l": ""
   },
   {
      "e": "Lateral Raise 21's",
      "l": "D4GIEuqnugI"
   },
   {
      "e": "Lateral Sled Walks",
      "l": "dkbZMmjtyLM"
   },
   {
      "e": "Lateral Starts",
      "l": "ml8YwScCj_M"
   },
   {
      "e": "Leg Curls",
      "l": "onyqxje2Pxw"
   },
   {
      "e": "Low Pogos",
      "l": "MW_J7DQbkTM"
   },
   {
      "e": "Meball Slams",
      "l": "UBU1CCIBGdw"
   },
   {
      "e": "Medball Bench",
      "l": "HDD1NyWKTOo"
   },
   {
      "e": "Medball Curls",
      "l": "ENgUNZ-zp1c"
   },
   {
      "e": "Medball Rotational Throws",
      "l": "tZOLXhiIjv8"
   },
   {
      "e": "Medball Runs",
      "l": "l2S95j2CoKg"
   },
   {
      "e": "Medball Throw with sprint",
      "l": "__hm09YQ-G4"
   },
   {
      "e": "Medball Throws",
      "l": "ziRP08FUqrw"
   },
   {
      "e": "Monster Walks",
      "l": "f82AjZFtIns"
   },
   {
      "e": "Multi Direction Hurdle Hops",
      "l": "19dIlZXHdQQ"
   },
   {
      "e": "Oblique ABCs",
      "l": "wTRRbwDDfWs"
   },
   {
      "e": "Overhead Tricep Extensions",
      "l": "wRGC6odlJaY"
   },
   {
      "e": "Plate Grips",
      "l": "8wLMwRDh2mI"
   },
   {
      "e": "Posterior Flyes",
      "l": "OX5KRMAjl0I"
   },
   {
      "e": "Power Ropes",
      "l": "2BulAdd_r_g"
   },
   {
      "e": "Prone Band Pull Aparts",
      "l": "e9nXbTJ2nMo"
   },
   {
      "e": "Pull Ups",
      "l": "3NzNT05BGMk"
   },
   {
      "e": "Push Up Pulses",
      "l": "p9B-m6zLWA8"
   },
   {
      "e": "Push Up Starts Variations",
      "l": "7ZQBq7VCCY8"
   },
   {
      "e": "Push Ups",
      "l": "AE-XtYDki-U"
   },
   {
      "e": "QL Stretch",
      "l": "Y0utnLyWnDY"
   },
   {
      "e": "RDLs",
      "l": "Xqdi2ZK2iiI"
   },
   {
      "e": "Resisted Vertical Jump",
      "l": "Ym9od6nBzME"
   },
   {
      "e": "Reverse Lunge",
      "l": "90bzpXgXqV4"
   },
   {
      "e": "RKC Plank",
      "l": "t1Wkv-Plosw"
   },
   {
      "e": "RKC Plank with Banded Row",
      "l": "6rppcg5JKJg"
   },
   {
      "e": "Rolling Push Up Start",
      "l": "psxB7Zx1RR0"
   },
   {
      "e": "Rope Core Circuit 1",
      "l": "eRwrzVNgEoM"
   },
   {
      "e": "Rope Grip BOR",
      "l": "5s7EHZVKTKs"
   },
   {
      "e": "Rope Pull into Sled Sprint",
      "l": "l1fSPzMCaGc"
   },
   {
      "e": "Rope Swings",
      "l": "4VFaf-4Y8WA"
   },
   {
      "e": "SA DB Shrug",
      "l": "KsQ18-dEbAM"
   },
   {
      "e": "SA Lateral Raise Circles",
      "l": "I8SY_5uZ0bw"
   },
   {
      "e": "Seated Broad Jump into Medball Chest Pass",
      "l": "uRal7AV_iHI"
   },
   {
      "e": "Seated DB Shrugs",
      "l": "VrkMybNbwek"
   },
   {
      "e": "Shoulder Ladder Series",
      "l": "6-Dd-5MRS-0"
   },
   {
      "e": "Shoulder Series 1",
      "l": "2-autyuI0BU"
   },
   {
      "e": "Shoulder Warm Up Series 1",
      "l": "_XTV7mTqNk8"
   },
   {
      "e": "Shuffle to Sprint",
      "l": "cE1_D3v5pmU"
   },
   {
      "e": "Side to Side Chest Stretch",
      "l": "3YVHcbOteXQ"
   },
   {
      "e": "Single Arm Farmers Carries",
      "l": "8stYn6Xx_vI"
   },
   {
      "e": "Single Arm Incline Press",
      "l": "4hN0NLW_RtU"
   },
   {
      "e": "Single Arm Medball Push-Up",
      "l": "u5F4Vzm4G9k"
   },
   {
      "e": "Single Leg Barbell Curls",
      "l": "TRXu_8EnTL4"
   },
   {
      "e": "Single Leg Glute Marches",
      "l": "71-Ew18lc14"
   },
   {
      "e": "Single Leg Raises",
      "l": "PRDIzsN15PY"
   },
   {
      "e": "Single Leg RDL",
      "l": "S4SnVELZoCg"
   },
   {
      "e": "Skips for Distance",
      "l": "PsPnoN3ui98"
   },
   {
      "e": "Sled Drags",
      "l": "oAXtzo1YS5Q"
   },
   {
      "e": "Sled Pushes",
      "l": "1WhPFtpn00E"
   },
   {
      "e": "Snow Angels",
      "l": "yVT2VejKOjY"
   },
   {
      "e": "Sprinter Sit Ups",
      "l": "53u25N3HRmg"
   },
   {
      "e": "Stair Calf Stretch",
      "l": "fWzgnW_7XjU"
   },
   {
      "e": "Stalions - Banded",
      "l": "R3-ZuFOIm4Y"
   },
   {
      "e": "Statue of Liberty Squats",
      "l": "5Rx3XrnwxdI"
   },
   {
      "e": "Stick Accelerations",
      "l": "rIxezb7pxh0"
   },
   {
      "e": "Suitcase Carry Reverse Lunges",
      "l": "2Xzz4Q9HfXo"
   },
   {
      "e": "Sumo Deadlifts",
      "l": "D3ePa-kzexQ"
   },
   {
      "e": "Sumo Squats",
      "l": "rXHlXePMkfQ"
   },
   {
      "e": "Switch Jumps",
      "l": "B-fAeKx_h7Q"
   },
   {
      "e": "Tempo Runs",
      "l": "gCYz5xMnj8I"
   },
   {
      "e": "Towel Curls",
      "l": "KKht8_UGvyE"
   },
   {
      "e": "Triangle Push Ups",
      "l": "fUPkBccabig"
   },
   {
      "e": "Tricep Push Down",
      "l": "MpVBmrLNhjc"
   },
   {
      "e": "T-Spine Rotations",
      "l": "2fMUaXTgwYw"
   },
   {
      "e": "Underhand Band Pull Aparts",
      "l": "CPSry57YJKk"
   },
   {
      "e": "Underhand Medball Toss For distance",
      "l": "HRc0W87w63c"
   },
   {
      "e": "Uneven Barbell Holds",
      "l": "oBC1oJW8MEQ"
   },
   {
      "e": "Upperbody Murder Giant Set 1",
      "l": "k123GWlYzf0"
   },
   {
      "e": "Vertical Jump",
      "l": "67bDlfiMNYs"
   },
   {
      "e": "Vertical Medball Throw",
      "l": "ziRP08FUqrw"
   },
   {
      "e": "Wall Slides",
      "l": "vDOg6Qzo6G4"
   },
   {
      "e": "Wide Grip Push Ups",
      "l": "X3KAt8VmYYk"
   },
   {
      "e": "YWTs",
      "l": "lHc9hUk5AU8"
   },
   {
      "e": "Zercher Carries",
      "l": "S3vdFW2DFMg"
   },
   {
      "e": "Barbell Incline Press",
      "l": "D5kV4hl2uoA"
   },
   {
      "e": "Straight Arm Pull Downs",
      "l": "tRnN4vtslVc"
   },
   {
      "e": "KB Bench Press",
      "l": "5hbJjYWMhE8"
   },
   {
      "e": "Single Arm Kick Ups",
      "l": "C7ZvWfvAdGM"
   },
   {
      "e": "Lat Pulldown Facepull",
      "l": "xlKNqbiZmII"
   },
   {
      "e": "Crush Grip DB Press",
      "l": "9c78mvUrMpo"
   },
   {
      "e": "Hexbar Shrugs",
      "l": "2TCFq6Nwb08"
   },
   {
      "e": "Chest Flies",
      "l": "qJExHjAX7Wg"
   },
   {
      "e": "Oblique Holds",
      "l": "fsyXZlLhSXE"
   },
   {
      "e": "Weight Sit Ups",
      "l": ""
   },
   {
      "e": "Leg Raises - Eccentric",
      "l": "0NEMkPqchoU"
   },
   {
      "e": "Reverse Hypers",
      "l": "OQLWSUquLtM"
   },
   {
      "e": "Single Arm Glute Bridge Bench",
      "l": "64FPxiV1v1c"
   },
   {
      "e": "KB Floor Press",
      "l": "A-VX9o8RZUU"
   },
   {
      "e": "Front Loaded RDL",
      "l": "jsnI70V2wCo"
   },
   {
      "e": "Hip Abduction",
      "l": "StnbAREI2_k"
   },
   {
      "e": "Bottoms Up Reverse Lunge",
      "l": "k1fNgt_tKB8"
   },
   {
      "e": "Twisting Deadlift",
      "l": "-6cDS_XUqrY"
   },
   {
      "e": "Bulgarian Split Squat Hold",
      "l": "Gjk60usaxEI"
   },
   {
      "e": "DB Zercher Squat",
      "l": "XIERAqpTGbo"
   },
   {
      "e": "Shoudler Super Set #2",
      "l": "Jc6aKfjolmE"
   },
   {
      "e": "Barbell Front Squat",
      "l": "c53IG4dltLs"
   },
   {
      "e": "Barbell Hip Thrust",
      "l": "tLYc0WpUmp0"
   },
   {
      "e": "Split Stance Landmine Press",
      "l": "S62YEKT3Nlo"
   },
   {
      "e": "Front Facing Wall Slide",
      "l": "fpd5UamqZ6U"
   },
   {
      "e": "Front Facing Y Slide",
      "l": "FBo1ROGjRMs"
   },
   {
      "e": "Overhead Medball Throw",
      "l": "nkHEDf2LlmQ"
   },
   {
      "e": "Hot Feet Rotational Medball Throw",
      "l": "UAfLPkeTwKI"
   },
   {
      "e": "Plate Flips",
      "l": "0kL-aNR9lwo"
   },
   {
      "e": "Monster Jumps",
      "l": "EQ4tJSjtmsw"
   },
   {
      "e": "Banded Reverse Flyes",
      "l": "TSOeOyJ8sV4"
   },
   {
      "e": "Sumo Stance Cable Oblique Press",
      "l": "x84gkRn5rpM"
   },
   {
      "e": "Cable Rotational Horizontal Row",
      "l": "LRYOZoyA7nw"
   },
   {
      "e": "Overhead Plate Extensions",
      "l": "Pc1e3D3igI0"
   },
   {
      "e": "Birdog Rows",
      "l": "3hJLSyj0n5c"
   },
   {
      "e": "Calf Raises",
      "l": ""
   },
   {
      "e": "Lateral Raise",
      "l": "l-DLPm3gXSk"
   },
   {
      "e": "DB Hang Clean",
      "l": "7rMYwFqZYCc"
   },
   {
      "e": "Barbell Shoulder Press",
      "l": "W00LFZE0RJw"
   },
   {
      "e": "Box Jumps",
      "l": "-YVdVyFC6B8"
   },
   {
      "e": "1 Arm Plank",
      "l": "rNlWYIYS-Dk"
   },
   {
      "e": "Medball Chest Pass",
      "l": "-eoyJIXHXSw"
   },
   {
      "e": "Banded Zercher Pick Ups",
      "l": "MmuY_yHfy_E"
   },
   {
      "e": "Plate Pinch SL RDL Row",
      "l": "rjsN1MAhVAU"
   },
   {
      "e": "Zercher Squats",
      "l": "sGP2BSAdkkA"
   },
   {
      "e": "Towel Holds",
      "l": "gp3k2bpeTno"
   },
   {
      "e": "Bottoms Up Carries",
      "l": "WETSLoeANcc"
   },
   {
      "e": "Medball Hug Jumps",
      "l": "tA4wS9PlzPY"
   },
   {
      "e": "Depth Drop into Medball Throw",
      "l": "7YiBUCCT_Mk"
   },
   {
      "e": "Cop Runs",
      "l": "EraGMgH-s-4"
   },
   {
      "e": "Lateral Jump Into Medball Throw",
      "l": "lnO7OLX8qhY"
   },
   {
      "e": "Lateral Jump Into Sprint",
      "l": "_cOHmyEUgkM"
   },
   {
      "e": "Seated DB Shoulder Press",
      "l": "zZpaekKKcaE"
   },
   {
      "e": "Single Arm Bottoms Up Shoulder Press",
      "l": "PmSBN5Yncsc"
   },
   {
      "e": "Shadow Boxing",
      "l": "kNLNBGp9PGE"
   },
   {
      "e": "Bottoms Up Floor Press",
      "l": "DNl60RtDpBQ"
   },
   {
      "e": "Bottoms Up Shoulder Press",
      "l": "U0mWIfDaX2A"
   },
   {
      "e": "Plate Rows",
      "l": "U4CSHmPZCS8"
   },
   {
      "e": "Plate Row Holds",
      "l": "VJHKKFUWYls"
   },
   {
      "e": "Back Attack 3",
      "l": "vC35w6rrbJM"
   },
   {
      "e": "Bear Crawl Ab Rollouts",
      "l": "PFpqurHrp-4"
   },
   {
      "e": "Iron Gripped Deadlifts",
      "l": "oag0sTUKWwI"
   },
   {
      "e": "Cable Pull Throughs",
      "l": "3EviHKw1YH4"
   },
   {
      "e": "Psoas Smash",
      "l": "N0IWj3iIf4E"
   },
   {
      "e": "Glute SMR",
      "l": "1VW7xJdUYwk"
   },
   {
      "e": "Dips",
      "l": "XVXN7nYXk6o"
   },
   {
      "e": "Barbell Deadlifts",
      "l": "L4scRRdeZh8"
   },
   {
      "e": "Hip Flexor Foot Pick Ups",
      "l": "-84pIABx7zc"
   },
   {
      "e": "Hurdle Mobility 1",
      "l": "B0DGRJiimig"
   },
   {
      "e": "Runners Lunge",
      "l": "fTEKRn8XuBo"
   },
   {
      "e": "JM Press",
      "l": "Co37_CRxY7Q"
   },
   {
      "e": "Front Loaded KB Squat",
      "l": "MglHvRQyqRE"
   },
   {
      "e": "1 Up 1 Down Reverse Lunge",
      "l": "gy77B4igS-c"
   },
   {
      "e": "SA DB Snatch",
      "l": "NxOS4Xj4S_A"
   },
   {
      "e": "DB Curls",
      "l": "nZzBsbpiO8I"
   },
   {
      "e": "Shoulder Series 3",
      "l": "sOlB-7NGWLg"
   },
   {
      "e": "KB Toss",
      "l": "pz8RUR7cacU"
   },
   {
      "e": "Y Raises",
      "l": "zbgYPgUylxI"
   },
   {
      "e": "Hollow Body Plate Presses",
      "l": "aB25bvSOINE"
   },
   {
      "e": "Renegade Rows",
      "l": "1ZwzmknJ1S8"
   },
   {
      "e": "Medball Shotput",
      "l": "D1UOyCvEaDg"
   },
   {
      "e": "Broad Jump Into Medball Throw",
      "l": "5SOgbFiTAlY"
   },
   {
      "e": "Wall Ball",
      "l": "2X3ySIhF5BM"
   },
   {
      "e": "High Plank",
      "l": "cDcqnnKKU6c"
   },
   {
      "e": "Side Plank with T Spine Rotations",
      "l": "ci_v3iwDP-w"
   },
   {
      "e": "Dynamic Side Planks",
      "l": "-ZAam6SZTyU"
   },
   {
      "e": "Side Plank",
      "l": "MEnQdmcklwQ"
   },
   {
      "e": "Barbell Push Press",
      "l": "braKloX4ZpY"
   },
   {
      "e": "Eccentric DB Chest Supported Rows",
      "l": "d0jlQ4Rhe1Y"
   },
   {
      "e": "DB Bulgarian Split Squats",
      "l": "rbOXs1IbkOE"
   },
   {
      "e": "DB Incline Press",
      "l": "INtzvdraqKo"
   },
   {
      "e": "Straight Arm Pull Downs",
      "l": ""
   },
   {
      "e": "1 1/2 Rep Chest Supported Rows",
      "l": "cMCtDDF3CI8"
   },
   {
      "e": "Shoulder Series 4",
      "l": "MTtHD4f6VNs"
   },
   {
      "e": "Plate Slides",
      "l": "qS0ocPdRsuY"
   },
   {
      "e": "Stealth Lunges",
      "l": "ubIPGatGHd8"
   },
   {
      "e": "Single Arm Single Leg Plank",
      "l": "Fa1ztbK4-20"
   },
   {
      "e": "90 Degree Partial Range Bench",
      "l": "8KP5XPr6qLM"
   },
   {
      "e": "Single Leg RDL into Rotational Jump",
      "l": "7wIwGdRt9RE"
   },
   {
      "e": "DB Curl Lunges",
      "l": "Wqqm2pVYWvM"
   },
   {
      "e": "Banded Renegade Rows",
      "l": "L2nxYvNTWLE"
   },
   {
      "e": "Leg Raised Side Plank with Abduction",
      "l": "D-nf4VE3KhI"
   },
   {
      "e": "Single Leg Bear Crawl Push Ups",
      "l": "UL4naOBa44k"
   },
   {
      "e": "Bottoms Up Single Leg RDL",
      "l": "wxoyVola0s0"
   },
   {
      "e": "Rotational Pause Curls",
      "l": "KKSnK7DvE24"
   },
   {
      "e": "Single Arm Single Leg Bench Press",
      "l": "AKf7QmEW_Ao"
   },
   {
      "e": "Pizza Presses",
      "l": "RyFgTx2Ts5U"
   },
   {
      "e": "Glute Bridge Walkouts",
      "l": "SZIMpC0vWVo"
   },
   {
      "e": "Copenhagen Side Plank",
      "l": "xpeX4GuAskM"
   },
   {
      "e": "Offset Incline Press",
      "l": "rXG1QORHISc"
   },
   {
      "e": "Side Plank KB Windmill",
      "l": "FznY6Kjv4Vk"
   },
   {
      "e": "Band Handled Straight Arm Pull Down",
      "l": "SKvTRs8FO18"
   },
   {
      "e": "Band Distracted Hexbar Split Squat",
      "l": "XrCFA5ZSF-s"
   },
   {
      "e": "Goblet Squat Jump",
      "l": "HiEDzITAyHA"
   },
   {
      "e": "Eccentric Overloaded Push Ups",
      "l": "-ojXsLH1dC4"
   },
   {
      "e": "Goblet Squat with DB Out",
      "l": "ItKzDoNYPS0"
   },
   {
      "e": "Landmine Single Leg Jump",
      "l": "KZNvmMAGERE"
   },
   {
      "e": "Landmine Squat Jump",
      "l": "WjVVt0K4uyc"
   },
   {
      "e": "Bottoms Up SL RDL",
      "l": "wxoyVola0s0"
   },
   {
      "e": "Banded Row",
      "l": "rSTYo2COWcU"
   },
   {
      "e": "Pistol Squat Tricep Pushdowns",
      "l": "p199MsUUfdI"
   },
   {
      "e": "Lunge Hold Banded BOR",
      "l": "ZgIPaJtqKl0"
   },
   {
      "e": "Lunge Hold Banded Curls",
      "l": "k4p1JRo6lfM"
   },
   {
      "e": "Banded Squats",
      "l": "vNnrf7dVY6k"
   },
   {
      "e": "Banded Overhead Press",
      "l": "ACY2H3iUHA8"
   },
   {
      "e": "Banded Single Leg RDL BOR",
      "l": "hmZOI-ELogA"
   },
   {
      "e": "Banded Shrugs",
      "l": "dgwaHhJyTvg"
   },
   {
      "e": "Banded Single Arm Lat Pull Down",
      "l": "ohF3qTOcbhE"
   },
   {
      "e": "Banded Oblique Shuffles",
      "l": "AUpDyUqcK0k"
   },
   {
      "e": "Banded Lunge Hold Tricep Pushdowns",
      "l": "BJy7sG-QGt4"
   },
   {
      "e": "Band Distracted RKC Plank",
      "l": "mNPlea_lEDs"
   },
   {
      "e": "Band Distracted Push Ups",
      "l": "n1079FoLvhI"
   },
   {
      "e": "Reverse Banded Barbell Row",
      "l": "ztHPlVeUHww"
   },
   {
      "e": "Band Resisted Supine Medball Toss",
      "l": "HfIsVtJ6fFs"
   },
   {
      "e": "Lunge Hold Rotational Press",
      "l": "iEuZIM5XHdU"
   },
   {
      "e": "Single Leg RDL Chest Pass",
      "l": "5kFjyOmP82Y"
   },
   {
      "e": "Eccentric Overloaded Push Press",
      "l": "84bq_MMLWek"
   },
   {
      "e": "Landmine Renegade Row",
      "l": "zxqUTKoOy_o"
   },
   {
      "e": "Split Stance Oblique Holds",
      "l": "hu6h0GWLAmY"
   },
   {
      "e": "Kickstand Zercher Goodmorning",
      "l": "hfrK63KdPP4"
   },
   {
      "e": "Split Stance Hack Squats",
      "l": "bKipyWEnNr0"
   },
   {
      "e": "1 1/2 Rep Pull Ups",
      "l": "Tu8R9xjsGLM"
   },
   {
      "e": "Machine Lean Back Curls",
      "l": "xl9rHgsuxpA"
   },
   {
      "e": "Banded Barbell Shoulder Press",
      "l": "zWy6HuBGnZc"
   },
   {
      "e": "Curl Hold Barbell Lunges",
      "l": "qxE1a1G2pV8"
   },
   {
      "e": "Single Arm Box KB Deadlift",
      "l": "clQQIpeYhiA"
   },
   {
      "e": "Double Barbell Pull Ups",
      "l": "In_A1jAP5qY"
   },
   {
      "e": "Plate Pinch Bulgarian Split Squats",
      "l": "kAWOoWHVmYs"
   },
   {
      "e": "Front Loaded DB Goodmorning",
      "l": "_jMsW8mbUK8"
   },
   {
      "e": "Iron Grip Landmine BOR",
      "l": "RLxzRSih-8s"
   },
   {
      "e": "Band Distracted KB RDL",
      "l": "ZJKCDPl7MJQ"
   },
   {
      "e": "Back Extension Row",
      "l": "NRHYz-JVVw0"
   },
   {
      "e": "Single Arm Landmine Floor Press",
      "l": "Zpih1l9qYuA"
   },
   {
      "e": "Runner Stance Pull Ups",
      "l": "Peo5ctsMRNU"
   },
   {
      "e": "Reeves Hexbar Deadlifts",
      "l": "dDT0vndFvWw"
   },
   {
      "e": "Single Leg AB Rollouts",
      "l": "28qe2fuLScw"
   },
   {
      "e": "Single Foot Lateral Raise",
      "l": "hwJxF4492nA"
   },
   {
      "e": "Posterior Fly Renegade Row",
      "l": "SIyCmNmQQQ8"
   },
   {
      "e": "Straight Arm Renegade Row",
      "l": "vjVryavUGVk"
   },
   {
      "e": "Plate Pinch Overhead Press",
      "l": "zMcufYGbnoM"
   },
   {
      "e": "Double Bench Single Leg Glute Bridge",
      "l": "hA7t0s3twlk"
   },
   {
      "e": "Weighted Bulgarian Holds",
      "l": "h8nDSCbIa98"
   },
   {
      "e": "Calf Raise Bicep Curls",
      "l": "UM4HIVjmuwY"
   },
   {
      "e": "Hip Flow Series with BPA",
      "l": "uuUe8f1nqnw"
   },
   {
      "e": "Bodyweight Bulgarian Holds",
      "l": "j50m6e3dQYA"
   },
   {
      "e": "Rapid Lunge Drop",
      "l": "XiOPVOVtKjo"
   },
   {
      "e": "Bottoms Up Lunge",
      "l": "2kK5BChn3Y4"
   },
   {
      "e": "Pull Up Hold Leg Raises",
      "l": "0C1tZt0iGQ4"
   },
   {
      "e": "Single Arm Landmine Deadlift",
      "l": "PxBFNE1lVzY"
   },
   {
      "e": "Offset Barbell Curls",
      "l": "XBOPWiu97p4"
   },
   {
      "e": "Db Pinch Shoulder Series",
      "l": "lA--L5ws9Pc"
   },
   {
      "e": "Uneven Carries",
      "l": "DtfmKCBqg9E"
   },
   {
      "e": "Uneven 90 Degree Bottoms Up Carry",
      "l": "j_E5xxo-1kc"
   },
   {
      "e": "Push Up Hold Pulses",
      "l": "uTEU2J56nwQ"
   },
   {
      "e": "Birdog Renegade Row",
      "l": "py89La4mBZY"
   },
   {
      "e": "e Ball Adductor Squeeze",
      "l": "2Da8uVtAfR8"
   },
   {
      "e": "DB Curled Lunge Hold",
      "l": "eCYCNNLg__Q"
   },
   {
      "e": "Weighted Lunge Hold",
      "l": "hRu5R1SrEGg"
   },
   {
      "e": "DB Pinch RDL BOR",
      "l": "VyPtNRCpDUo"
   },
   {
      "e": "Bodyweight Lunge Hold",
      "l": "4vLL_ZVpMy0"
   },
   {
      "e": "Offset Barbell Shoulder Press",
      "l": "DLTSYw7QFvk"
   },
   {
      "e": "Offset Barbell RDL",
      "l": "PQk9mp2Apb8"
   },
   {
      "e": "Offset Barbell Squats",
      "l": "nrrKpABFWUc"
   },
   {
      "e": "Offset Barbell Lunge",
      "l": "dP5zlk1xO74"
   },
   {
      "e": "Core Engaged DB Out Squats",
      "l": "qwlRBJs5FtU"
   },
   {
      "e": "Hip A-Zs",
      "l": "JIP7DEMKSYg"
   },
   {
      "e": "Bottoms Up 90 Degree Carries",
      "l": "PRj00V2QqnM"
   },
   {
      "e": "Hip Circles",
      "l": "uf6DKegi-Rw"
   },
   {
      "e": "Tic Tocs",
      "l": "wRPakIrhHkQ"
   },
   {
      "e": "Steering Wheels",
      "l": "887kfH3BQkI"
   },
   {
      "e": "Bear Crawl Push Ups",
      "l": "oh15GpmbPsc"
   },
   {
      "e": "Single Foot Balance with Partner Toss",
      "l": "biyA9Oby_vM"
   },
   {
      "e": "Single Foot Balance with Medball Switch",
      "l": "biyA9Oby_vM"
   },
   {
      "e": "Front Curled DB Squat Jump",
      "l": "v0kLB-mH4Vg"
   },
   {
      "e": "Landmine Ab Rollouts",
      "l": "jeA_Z6R7TnI"
   },
   {
      "e": "Landmine Single Leg Swaps",
      "l": "26CoTi6Z8xA"
   },
   {
      "e": "Single Arm Bottoms Up Squats",
      "l": "BVgKXL4Pd5c"
   },
   {
      "e": "Single Arm KB RDL",
      "l": "rE-1hxPW11s"
   },
   {
      "e": "Medball Squeeze Push Ups",
      "l": "iBNI2UBEJek"
   },
   {
      "e": "Cable Machine Pull Overs",
      "l": "jD0W3z83QZI"
   },
   {
      "e": "Ninja Pull Up Holds",
      "l": "s5rfcwLTMSQ"
   },
   {
      "e": "Kneeling Lat Pulldowns",
      "l": "vBosbxQ54pE"
   },
   {
      "e": "Handflip Pull Up Holds",
      "l": "lmHcxegI7SY"
   },
   {
      "e": "Bear Crawl Rows",
      "l": "lxni89la-VA"
   },
   {
      "e": "Single Leg RDL Swaps",
      "l": "hICGAtZEfNA"
   },
   {
      "e": "Ipsilateral Chest Supported Row",
      "l": "Uw1_V3BMASw"
   },
   {
      "e": "Ipsilateral Incline Press",
      "l": "JVsTuQCee50"
   },
   {
      "e": "Plate Pinch Rebound Jumps",
      "l": "6AbFx4WTj4Y"
   },
   {
      "e": "Contrast Power Push Ups",
      "l": "qdD1eTSRT4U"
   },
   {
      "e": "Wrist Hops",
      "l": "Ja5PKomkvYw"
   },
   {
      "e": "Banded DB Floor Press",
      "l": "OxUuad_jsoQ"
   },
   {
      "e": "Partner Accelerated Plyo Pushups",
      "l": "JP2F3UrbTDI"
   },
   {
      "e": "Criss Cross Banded Pull Ups",
      "l": "R9iryXCViBc"
   },
   {
      "e": "2-1 Kneeling Landmine Press",
      "l": "gX2j4mFiToo"
   },
   {
      "e": "Single Foot Power Stance",
      "l": "37cqRJpOtcI"
   },
   {
      "e": "Zercher Carry Reverse Lunge",
      "l": "n-RghfPxqBM"
   },
   {
      "e": "Single Arm KB Swings",
      "l": "_5jDYJFOS5Q"
   },
   {
      "e": "DB Incline Crush Grip",
      "l": "td_CFOl0PB0"
   },
   {
      "e": "Depth Drop Plyo Push Ups",
      "l": "U8cu_XJcWSw"
   },
   {
      "e": "High Plank Row",
      "l": "mIulrUtv_1A"
   },
   {
      "e": "Seated SA Landmine OH Press",
      "l": "GeXy3F3KVUU"
   },
   {
      "e": "SL Contralateral Lat Pull Downs",
      "l": "B9dhGOkTzRI"
   },
   {
      "e": "Banded Squeeze DB Crush Grip Press",
      "l": "QTrtOCzOsS0"
   },
   {
      "e": "SL RDL Bench Hop",
      "l": "UASs5zBldu4"
   },
   {
      "e": "Jump Shrugs",
      "l": "SK7cqsCr198"
   },
   {
      "e": "Hang High Pulls",
      "l": "2GRzsrw3SeU"
   },
   {
      "e": "Banded Bear Crawl Rows",
      "l": "z-wkSYIybCo"
   },
   {
      "e": "Glute Band Vertical Jumps",
      "l": "fOB2b-hRA8U"
   },
   {
      "e": "Sprinter Stance Holds",
      "l": "LRbnsEd7mAc"
   },
   {
      "e": "Weighted e Ball Roll Outs",
      "l": "YUK_yh5Kp9U"
   },
   {
      "e": "Stride Stance Box Jumps",
      "l": "dyNQrHCMrdo"
   },
   {
      "e": "Gorilla Hang Into Pull Ups",
      "l": "4ZU8A6gS1q0"
   },
   {
      "e": "2-1 Smith Machine Horizontal Row",
      "l": "PHELHSjsftQ"
   },
   {
      "e": "Single Leg Banded Curls",
      "l": "m4gn6I-Bp5I"
   },
   {
      "e": "Medball Rotational Slams",
      "l": "pHoEr0iGVpY"
   },
   {
      "e": "Levitation Horizontal Rows",
      "l": "1L2WWeyH54I"
   },
   {
      "e": "NG Handled Lat Pull Downs",
      "l": "ewUJxdG4CUk"
   },
   {
      "e": "Kneeling Overhead Plate Presses",
      "l": "FicO1AjUflo"
   },
   {
      "e": "Single Leg Choas Push Ups",
      "l": "EiYJ1ktQubk"
   },
   {
      "e": "kneeling alternating curls",
      "l": "BikJgKA7D1I"
   },
   {
      "e": "Bulgarian Hold Curls",
      "l": "4YJekEm7riA"
   },
   {
      "e": "Bulgarian Oblique Holds",
      "l": "06UpFWWlN00"
   },
   {
      "e": "Band Distracted Barbell RDL",
      "l": "GXXoqR4aOKw"
   },
   {
      "e": "1 Up 1 Down Squat",
      "l": "aRZCQdGJ94M"
   },
   {
      "e": "1 Up 1 Down Goodmorning",
      "l": "GQEolSWEFp0"
   },
   {
      "e": "Lateral Band Distracted Floor Press",
      "l": "R7IP9xmK0QI"
   },
   {
      "e": "Mini-band Push Ups",
      "l": "4mRcU2XNnUc"
   },
   {
      "e": "Barbell Chest Supported Row",
      "l": "zGtF4_k3Lfc"
   },
   {
      "e": "Barbell Suitcase Jumps",
      "l": "Kq5m5Z3MuYY"
   },
   {
      "e": "Hexbar Pull Ups",
      "l": "zrTNdYzQz-8"
   },
   {
      "e": "Split Stance Hexbar Deadlifts",
      "l": "mK1yKPkIrYs"
   },
   {
      "e": "Cable Machine SL RDL into Row",
      "l": "unuXr9iaGvs"
   },
   {
      "e": "Squatted Lat Pulldowns",
      "l": "yuD5x3LuqwU"
   },
   {
      "e": "Full Plank Landmine Ab Rollouts",
      "l": "_HU1JuDpMjw"
   },
   {
      "e": "KB Push Ups",
      "l": "D-XchNP4ZK4"
   },
   {
      "e": "Single Leg Squat Swaps",
      "l": "qCqI1OG4pvI"
   },
   {
      "e": "Bridge the Gap Goblet Squat",
      "l": "7OYNz_CEslo"
   },
   {
      "e": "Bridge the Gap Lunge",
      "l": "ZNFEidiyrKI"
   },
   {
      "e": "2-1 Barbell Lunge",
      "l": "pPjt8hKFFGE"
   },
   {
      "e": "2-1 Single Leg Squat",
      "l": "fba7PPnwaFs"
   },
   {
      "e": "Lateral Band Distracted Row",
      "l": "a7fMUIZP6AQ"
   },
   {
      "e": "Squatted Chaos Barbell Curls",
      "l": "-SjvNR25yyw"
   },
   {
      "e": "Incline KB Curls",
      "l": "ZNBsYwEdm28"
   },
   {
      "e": "Pause Hexbar Deadlifts",
      "l": "ydw2RQNjD20"
   },
   {
      "e": "KB Pendulum Swing",
      "l": "fo6iC2MYXno"
   },
   {
      "e": "SA SL Lat Pulldown",
      "l": "VwHuODAVdQ8"
   },
   {
      "e": "Bridge The Gap Single Leg Squat",
      "l": "e47kkwGzxCM"
   },
   {
      "e": "Bridge The Gap Single Leg Swap",
      "l": "qET9c1KNHZc"
   },
   {
      "e": "Plate Pinch Cuban Presses",
      "l": "gDRuUEEEAJ4"
   },
   {
      "e": "Mechanical Advantage DB Incline Drop Set",
      "l": "h6ZQ1LCqfPc"
   },
   {
      "e": "SL Hold MB Chest Pass",
      "l": "iq8kUHISejo"
   },
   {
      "e": "Bulgarian KB Swap",
      "l": "s2-UhWxjLD4"
   },
   {
      "e": "Hexbar Jumps",
      "l": "Efib3d0W5TU"
   },
   {
      "e": "Back Extension Lateral Raise",
      "l": "WIqJ3C4CDWQ"
   },
   {
      "e": "Split Stance Swaps",
      "l": "BDxm-mYna24"
   },
   {
      "e": "Lateral Bear Crawl",
      "l": "hnWSAL5idbk"
   },
   {
      "e": "Around the World Calf/Toe Raises",
      "l": "H2L0hdJBBSA"
   },
   {
      "e": "2-1 Punches",
      "l": "4TWVtW3CCig"
   },
   {
      "e": "SL Glute Bridge Abductions",
      "l": "MiTdPrpCj3U"
   },
   {
      "e": "Single Leg KB Swaps",
      "l": "qCqI1OG4pvI"
   },
   {
      "e": "Plate Swings",
      "l": "DaMu1U6ldy8"
   },
   {
      "e": "Single Leg Shrugs",
      "l": "0Mt_qluVRbk"
   },
   {
      "e": "Banded Single Leg RDL",
      "l": "7xXpktZx8Kw"
   },
   {
      "e": "Chaos Lunges",
      "l": "k-BZRXvkwR4"
   },
   {
      "e": "Curl Held Squat",
      "l": "DK9yJT88q1w"
   },
   {
      "e": "Single Leg KB RDL BOR",
      "l": "izhpXcB2xVo"
   },
   {
      "e": "Bird Dog Push Up Touches",
      "l": "_sqEEUzVwUM"
   },
   {
      "e": "Pull Up Hold Sprinter Switches",
      "l": "X_XMowsfPSk"
   },
   {
      "e": "Heel Elevated Bulgarian Split Squats",
      "l": "VmfyhzxYWLg"
   },
   {
      "e": "Lateral Broad Jump",
      "l": "sYATEUDb_Ds"
   },
   {
      "e": "Rotational Broad Jump",
      "l": "7AbtoZVQro8"
   },
   {
      "e": "Banded Straight Arm Pulldowns",
      "l": "6K0dwHA4lCY"
   },
   {
      "e": "Cable Machine RDL BOR",
      "l": "DctQuJUfX4E"
   },
   {
      "e": "Hexbar Kickstand RDL",
      "l": "xfg91ouRuOs"
   },
   {
      "e": "Ankle Rockers",
      "l": "K6gWEMVKXr8"
   },
   {
      "e": "Kickstand BOR",
      "l": "C52_4jt4oAY"
   },
   {
      "e": "Elbow Only Single Arm Glute Bench",
      "l": "nxf1nmcnWrQ"
   },
   {
      "e": "Swinging RDL Jumps",
      "l": "_C13qpuN15Q"
   },
   {
      "e": "Makeshift Safety Squat Bar Squat",
      "l": "toY1Mw3m35I"
   },
   {
      "e": "Band Accelerated Ab Rollouts",
      "l": "36vSJNKMuKw"
   },
   {
      "e": "Lateral Box Jumps",
      "l": "AImxPzoDKnU"
   },
   {
      "e": "Single Leg Bench Plyo Push Up",
      "l": "eNq6w7mDKEc"
   },
   {
      "e": "Goblet SL Goodmorning",
      "l": "P0Qu8RHxvL8"
   },
   {
      "e": "Medball Pull Ups",
      "l": "KBd3SdZYMUg"
   },
   {
      "e": "Press and Overhead Walks",
      "l": "j30kNoCRdyg"
   }
];

export default EXERCISES;