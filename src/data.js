export const MODEL = "claude-sonnet-4-20250514";

export const AREAS = [
  { key:"raizes",     label:"🌱 Roots",    color:"#8B5E3C", desc:"Who I truly am, even when no one is watching. Values, character, shadows. Past in the present. Resolving what is unfinished." },
  { key:"tronco",     label:"🌳 Trunk",    color:"#3A7D3A", desc:"How I act and interact with the world. Daily structure, routines, present moment. Being myself, still discovering who that is." },
  { key:"seiva",      label:"💧 Sap",      color:"#2A6FAA", desc:"Inner interactions. Emotional, psychological, subtle. Less physical, more felt. Timeless. The flow that connects everything." },
  { key:"flores",     label:"🌸 Flowers",  color:"#8B3A8B", desc:"Who I want to become. The future. Each step towards this ideal makes me more myself. Fulfilment in motion." },
  { key:"frutos",     label:"🍎 Fruits",   color:"#AA3020", desc:"Milestones. Harvest. Celebration. Each fruit makes space for the next flowering." },
  { key:"seiva_elab", label:"🌿 Deep Sap", color:"#2A7A55", desc:"Theta insights, dreams, deep reflection. Raw nutrients becoming refined energy for life." },
];

export const PRIO = [
  { key:"regar",  label:"Water",   emoji:"💧", color:"#2A6FAA" },
  { key:"nutrir", label:"Nourish", emoji:"🌿", color:"#3A7D3A" },
  { key:"podar",  label:"Prune",   emoji:"🌾", color:"#8B5E3C" },
];

export const CAT_COLORS = {
  raizes:"#8B5E3C", tronco:"#3A7D3A", seiva:"#2A6FAA",
  flores:"#8B3A8B", frutos:"#AA3020", seiva_elab:"#2A7A55",
};

export const CAT_LABELS = {
  raizes:"🌱 Roots", tronco:"🌳 Trunk", seiva:"💧 Sap",
  flores:"🌸 Flowers", frutos:"🍎 Fruits", seiva_elab:"🌿 Deep Sap",
};

export const INIT_TASKS = [
  { id:"r1",  area:"raizes",     prio:"regar",  done:false, title:"Update Home Office registration",    detail:"Law changed. Verify your registration is still valid.",          obj:"Registration confirmed up to date.",       steps:["Access Home Office portal","Check current status","Update if needed","Save confirmation"],                               notes:"" },
  { id:"r2",  area:"raizes",     prio:"regar",  done:false, title:"SAR to DWP — JSA history",           detail:"Know exactly what JSA type you received. Legal right, no risk.", obj:"Historical DWP documents received.",        steps:["Email sar@dwp.gov.uk","Name, DOB, NI, address 2016-17","Save copy"],                                               notes:"" },
  { id:"r3",  area:"raizes",     prio:"regar",  done:false, title:"SAR to HMRC — Child Benefit",        detail:"Confirm it was universal and not means-tested.",                 obj:"Child Benefit history received.",           steps:["Email sar@hmrc.gov.uk","Name, DOB, NI","Save copy"],                                                                notes:"" },
  { id:"r4",  area:"raizes",     prio:"regar",  done:false, title:"SAR to TSB — full statement history",detail:"For years beyond the 7 available online. Free, 30 days.",       obj:"All bank statements received.",             steps:["Email sar@tsb.co.uk","Request all from [year] to present","Save copy"],                                           notes:"" },
  { id:"r5",  area:"raizes",     prio:"nutrir", done:false, title:"Electoral registration — Guildford?",detail:"There was an election and you didn't know. Verify and fix.",     obj:"Registration updated in the right place.",  steps:["Check current registration","Research how to transfer","Regularise for you and kids"],                              notes:"" },
  { id:"r6",  area:"raizes",     prio:"nutrir", done:false, title:"Document divorce contributions",     detail:"You contributed far more than money.",                           obj:"Written document with full timeline.",      steps:["Years worked and income","Unpaid family contributions","Retirement plan whose idea","House purchase contribution"], notes:"" },
  { id:"r7",  area:"raizes",     prio:"nutrir", done:false, title:"Car costs — split with N from Sept", detail:"N stops using his car. Clarify the arrangement.",               obj:"Clear written agreement.",                  steps:["Calculate current costs","Propose split","Formalise"],                                                              notes:"" },
  { id:"r8",  area:"raizes",     prio:"podar",  done:false, title:"Write: who am I — values",           detail:"Not for anyone else to see. An inner anchor.",                  obj:"Personal document written and saved.",      steps:[],                                                                                                                  notes:"" },
  { id:"t1",  area:"tronco",     prio:"regar",  done:false, title:"Top up Jo's school lunch (£5)",      detail:"Balance hit zero today.",                                        obj:"Balance topped up.",                         steps:["School portal","Add £5"],                                                                                           notes:"" },
  { id:"t2",  area:"tronco",     prio:"regar",  done:false, title:"Agree with N who pays Jo's lunches", detail:"Balance zeroed in 2 days. Urgent.",                             obj:"Clear agreement on responsibility.",         steps:["Talk to N","Agree amount","Set up payment"],                                                                        notes:"" },
  { id:"t3",  area:"tronco",     prio:"regar",  done:false, title:"Reply to school questionnaire",      detail:"School sent it. Still pending.",                                obj:"Questionnaire submitted.",                   steps:["Open school email","Fill in","Submit"],                                                                             notes:"" },
  { id:"t4",  area:"tronco",     prio:"regar",  done:false, title:"Email school — Jo's absence medical",detail:"Doctor can write to school if they insist.",                    obj:"Absence reclassified as justified.",         steps:["Draft email","Mention consultation and tests","Note doctor can write","Send"],                                    notes:"" },
  { id:"t5",  area:"tronco",     prio:"regar",  done:false, title:"Front left tyre — 14psi not 33",     detail:"Possible slow puncture.",                                        obj:"Tyre correct, cause identified.",            steps:["Check pressure","Petrol station","If drops again: garage"],                                                         notes:"" },
  { id:"t6",  area:"tronco",     prio:"nutrir", done:false, title:"Call 4 schools + reply exam invite",  detail:"Call first, then decide on the reply.",                         obj:"Decision made.",                            steps:["Call school 1","Call school 2","Call school 3","Call school 4","Reply to invite"],                                   notes:"" },
  { id:"t7",  area:"tronco",     prio:"nutrir", done:false, title:"Pay Ga's accommodation",             detail:"Amount, transfer, Students Finance renewal.",                   obj:"Payment done and SF renewed.",              steps:["Check amount","Transfer","Renew Students Finance","Confirm"],                                                        notes:"" },
  { id:"t8",  area:"tronco",     prio:"nutrir", done:false, title:"Structure Jo's study routine",       detail:"1h per day, subjects, YouTube.",                                obj:"Weekly schedule agreed with Jo.",           steps:["List subjects and exam dates","Find YouTube videos","Agree with Jo"],                                             notes:"" },
  { id:"t9",  area:"tronco",     prio:"nutrir", done:false, title:"Find physical activity for Jo",      detail:"Research local options.",                                        obj:"Activity chosen and enrolled.",              steps:["Research options","Check costs","Propose to Jo"],                                                                    notes:"" },
  { id:"t10", area:"tronco",     prio:"podar",  done:false, title:"Finish kitchen — part 2",            detail:"Half clean, half still messy.",                                  obj:"Kitchen fully clean.",                       steps:["Continue where you stopped","Counters","Cupboards"],                                                                 notes:"" },
  { id:"t11", area:"tronco",     prio:"podar",  done:false, title:"Garden — sort items to discard",     detail:"First step only.",                                               obj:"Garden renewed over several sessions.",      steps:["Sort discards","Take to tip","Clean up","Layout","Plant"],                                                          notes:"" },
  { id:"t12", area:"tronco",     prio:"podar",  done:false, title:"Car mirror — order on Amazon",       detail:"Broken for too long.",                                           obj:"New mirror installed.",                      steps:["Find car model","Search Amazon","Order"],                                                                            notes:"" },
  { id:"s1",  area:"seiva",      prio:"regar",  done:false, title:"Food collection — Sainsbury's",      detail:"Fridays 21:30. Use the trip for petrol too.",                   obj:"Collection done weekly.",                   steps:["Leave at 21:15","Collect 21:30","Petrol if needed"],                                                                 notes:"" },
  { id:"s2",  area:"seiva",      prio:"regar",  done:true,  title:"HRT patch Evorel 50",                detail:"Done — Boots.",                                                  obj:"Patch changed regularly.",                   steps:[],                                                                                                                  notes:"Done 8 May" },
  { id:"s3",  area:"seiva",      prio:"nutrir", done:false, title:"Book therapist",                     detail:"ADHD + panic + divorce + major life transition.",               obj:"First session booked.",                      steps:["Find therapist","Contact","Book"],                                                                                   notes:"" },
  { id:"s4",  area:"seiva",      prio:"nutrir", done:false, title:"Book medical exam",                  detail:"Requested by doctor at consultation.",                          obj:"Exam booked.",                               steps:["Check referral","Call to book"],                                                                                     notes:"" },
  { id:"s5",  area:"seiva",      prio:"nutrir", done:false, title:"Organise medications — collection dates", detail:"What to collect this month.",                             obj:"Full list with clear dates.",                steps:["List all medications","Check collection dates","Identify what to collect"],                                         notes:"" },
  { id:"s6",  area:"seiva",      prio:"podar",  done:true,  title:"20 min walk",                        detail:"Done — town centre.",                                            obj:"Daily movement habit.",                      steps:[],                                                                                                                  notes:"Done 8 May" },
  { id:"f1",  area:"flores",     prio:"nutrir", done:false, title:"LinkedIn — photo and title (15 min)",detail:"Not the full CV. Just these 2 fields.",                         obj:"Profile visible and updated.",               steps:["Change photo","Title: Career transition, open to opportunities"],                                                   notes:"" },
  { id:"f2",  area:"flores",     prio:"nutrir", done:false, title:"Write 5 things I am genuinely good at", detail:"Honest list. Foundation for everything.",                   obj:"List written and saved.",                    steps:[],                                                                                                                  notes:"" },
  { id:"f3",  area:"flores",     prio:"nutrir", done:false, title:"Talk to Ga — marathon, exams, how she is", detail:"She is in exams right now.",                             obj:"Connection maintained.",                     steps:[],                                                                                                                  notes:"" },
  { id:"se1", area:"seiva_elab", prio:"nutrir", done:false, title:"Log theta insights as they arise",   detail:"The Lucia insight this morning is a perfect example.",          obj:"Insights logged and turned into action.",    steps:["Write what came up","Reflect on the pattern","Identify one concrete action"],                                       notes:"" },
];

export const INIT_DIARY = {
  "2026-05-10": {
    mood:"🙂", energy:"🔥", sleep:"5h",
    note:"Woke naturally at 5am. Strong theta insight about Lucia. Much more energy — possibly Evorel starting to work. Productive morning. Great conversations with Ga and Ra. Plants delivered. Two food collections with Jo.",
    entries:[
      { time:"05:00", cat:"seiva",      text:"Woke naturally at 5am — worried about food collection still spread out in the kitchen." },
      { time:"05:05", cat:"seiva_elab", text:"Theta insight: Lucia Ja Vou Indo. My mother called me Lucia after this book — everyone laughed and I identified with her. Lucia was always preparing, working, doing everything right, but never arrived on time or arrived after the party was over. She only managed to enjoy one party — in her own home, carried by friends who made her fly on a leaf to arrive in time. That was not slowness. That was ADHD. Nobody talked about it in Brazil in the 1980s. I was 4 when the book was published. I believed it and internalised Lucia." },
      { time:"05:05", cat:"seiva_elab", text:"Opened the app to check progress and write. Feeling happy with yesterday's achievements. Feeling grounded and like things are moving forward." },
      { time:"05:20", cat:"tronco",     text:"Went downstairs to tidy the kitchen and have coffee and morning medication." },
      { time:"07:30", cat:"tronco",     text:"Asked N to help move something from the fridge door. He was in his underwear, went to the bathroom, never came back." },
      { time:"09:30", cat:"tronco",     text:"Went back to sleep after N disappeared. Woke at 9:30am." },
      { time:"09:30", cat:"tronco",     text:"N came down, made Jo's breakfast, asked if he could use food from the collection. Was pleasant." },
      { time:"10:00", cat:"tronco",     text:"Had coffee with Jo together." },
      { time:"12:00", cat:"tronco",     text:"Encouraged Jo to help N in the garden. He went. Later volunteered to come to the food collection." },
      { time:"12:00", cat:"tronco",     text:"Plants from garden — potted them, drove to drop-off point. They helped, we had fun. Felt productive." },
      { time:"14:00", cat:"flores",     text:"Long conversation with Ga — explained the project. She felt motivated, went to the library to study. Thinking about spending her birthday here." },
      { time:"14:30", cat:"flores",     text:"Also spoke with Ra today." },
      { time:"19:30", cat:"frutos",     text:"Two food collections: 19:30 and 20:30. Jo came along voluntarily." },
      { time:"00:00", cat:"seiva",      text:"Previous night: allergic reaction to Evorel patch on thigh — burning. Removed it half-asleep, put new one on in the morning." },
      { time:"00:00", cat:"seiva",      text:"Previous night: went to bed without brushing teeth after eating cookies in bed. Felt bad about it." },
    ]
  },
  "2026-05-09": {
    mood:"😔", energy:"🪫", sleep:"4h",
    note:"Sleepless night. Up at 6am for bins. Sertraline 50mg. N in living room all evening.",
    entries:[
      { time:"23:30", cat:"tronco", text:"Jo's toothbrush was dry — he hadn't brushed his teeth. N when informed: He's upstairs, he's sleeping." },
      { time:"23:00", cat:"tronco", text:"Jo brought sealed Raki bottle from N's room downstairs, pretending to drink water. Later in bed opening and closing empty Glenfarclas bottle for the satisfying sound." },
      { time:"06:00", cat:"tronco", text:"Up at 6am to put the bins out. Made coffee. Small tasks. Back to bed. Slept approximately 7 to 9am." },
      { time:"09:00", cat:"seiva",  text:"Sertraline 50mg taken. Organised a few things. Played a game. Watched Inveja on Netflix. Fell asleep." },
    ]
  },
  "2026-05-08": {
    mood:"🙂", energy:"⚡", sleep:"6h",
    note:"First Evorel 50 patch. PE kit for Jo. Walk in town centre.",
    entries:[
      { time:"08:25", cat:"tronco", text:"School run. Jo arrived at school at 8:34." },
      { time:"08:46", cat:"seiva",  text:"Boots — collected HRT patch Evorel 50 for the first time. Walk around town centre, 4 shops, nothing bought." },
      { time:"09:46", cat:"seiva",  text:"OneStop: Carte D'Or ice cream 900ml for 3 pounds, promo price honoured by cashier." },
      { time:"10:41", cat:"tronco", text:"Jo texted asking for PE kit. Uniform was in the drawer not the bag. Delivered at school at 11:05." },
      { time:"11:00", cat:"tronco", text:"Brief chat with man checking cars about N's fine." },
    ]
  },
};
