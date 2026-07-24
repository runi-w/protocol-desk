import { useState, useEffect, useRef } from 'react';

const RAW_PROTOCOLS = [
  {
    id: "p20",
    category: "Style Issues",
    title: "Style Confirmation Dispute — Detail Claimed But Not on Order Form",
    trigger: "Customer insists a specific style detail was verbally agreed upon at their appointment — lapel, button, pocket, stitching, lining, or any detail — but it is not documented on the order form.",
    steps: [
      "Pull up the order form immediately before responding — do not admit fault before reviewing",
      "Check every detail carefully and compare what the client claims vs. what the form shows",
      "If detail is not on the form: explain warmly that the order form is the reference document for everything confirmed at the appointment",
      "Always check with the team to see if anything can still be done — never close the door before looking into it",
      "Document on Monday and tag Runi with both what the client claims and what the order form shows",
      "If the client is very adamant: get internal approval first, then accommodate and communicate it as a goodwill gesture because we value their business — never promise before approval is confirmed"
    ],
    approvedLanguage: "Initial response:\n\"I really appreciate you reaching out and I hear you. Let me go through your order carefully to make sure I have the full picture. I'll get back to you by [specific time] with a clear answer — and I want to make sure we do everything we can for you.\"\n\nIf not on order form:\n\"I went through your order and I want to be transparent — this detail wasn't noted at the time of your appointment. We always refer to the order form as our reference. That said, I want to check with my team to see what we can do for you — I'll be back to you shortly.\"\n\nIf accommodating as goodwill (after internal approval):\n\"I spoke with our team and because we truly value your business and want to make sure you're happy, we'd like to take care of this for you as a gesture of goodwill.\"",
    avoid: "Admitting fault before checking the order form. Closing the door without internal review. Promising accommodation before getting approval from Runi.",
    escalate: true,
    icon: "📋"
  },

  {
    id: "p19",
    category: "Style Issues",
    title: "Style Issues Quick Reference Guide",
    trigger: "Client reaches out with a specific style complaint or discrepancy on their garment. Use this guide to find the issue and get the correct response.",
    steps: [
      "ALWAYS FIRST: Check the order form before responding. Do not admit fault before verifying what was noted at the appointment",
      "GENERAL RULE — ADAMANT CLIENT: If a client is very adamant about any style issue, we can accommodate them regardless — but it must be approved internally first. Once approved, communicate it as a goodwill gesture because we value their business. Never promise this to the client before getting internal approval",
      "━━ JACKET STYLE ━━",
      "Wrong lapel style (peak vs notch): Check order form → if GC error → $100 credit OR remake the jacket",
      "Contrasting stitching missing or wrong (buttonhole or lapel): $50 credit OR repair it. If needed in under 2 weeks, discuss with team before promising",
      "Buttonhole size wrong (too small): $50 credit OR repair the jacket",
      "Wrong buttons came in: Order correct buttons from system. Get order number + send client the button book to choose from",
      "Sleeve buttons not functional: Client ships garment back → we repair it",
      "Sleeve button spacing wrong (touching instead of spaced): $50 credit. If very pushy → offer to remake",
      "Pocket flap too narrow: $50 credit. If very pushy → offer to remake",
      "Pocket style wrong (flap vs jetted vs patch): $50 credit. If very pushy → offer to remake",
      "Ticket pocket missing or added when not wanted: $100 credit OR add the pocket. If very pushy → remake",
      "Custom lining missing or wrong: Replace the lining. Find out client deadline and confirm we can accommodate",
      "Half lining missing: $100 credit OR remake the jacket",
      "Back flap not lined (gets stuck in waistband): Style choice the client made. Explain nicely. Suggest they show a tailor to see if anything can be done",
      "Button slots not angled or slanted: Check order form first. If GC error → $100 credit OR remake",
      "Italian waistband missing: $100 credit OR remake the pants",
      "Wrong blazer style (single vs double breasted): Remake OR credit toward future purchase",
      "━━ TROUSER STYLE ━━",
      "Belt loops missing when wanted: Order and add correct style belt loops from system. Confirm style with client first",
      "Side adjuster missing or wrong: Order from manufacturer. If tight timeframe → make from the pants directly",
      "Cuffs missing or added when not wanted: Can add or remove cuffs — either direction is fixable",
      "Pleat vs flat front wrong: Check with tailor if pleats can be removed. If not → $100 credit OR remake pants",
      "━━ FIT ISSUES (Not Style Errors — Redirect to Tailor) ━━",
      "Jacket too long, front longer than back, shoulders too wide or uneven: Fit issue → set client up with appropriate tailor by location",
      "Pants too short, too long, too wide, too tight at waist or seat: Fit issue → set client up with appropriate tailor by location",
      "Sleeve not sitting right, stitching off, or pants torn after alteration: Alteration issue → client reaches back out to the tailor who handled it",
      "━━ PERSONALIZATION ━━",
      "Monogram or inscription missing under collar: Order new collar felt from system. Customer service handles directly",
      "Monogram text wrong: Order new name label or find replacement. If not possible → escalate to supervisor",
      "Collar inscription added or changed after appointment: Cannot guarantee — explain that changes after order is finalized usually cannot be accommodated",
      "Collar felt wrong color: Order new collar felt in correct color and replace",
      "━━ FABRIC ━━",
      "Fabric color lighter or darker than expected: Confirm correct fabric was used then explain warmly we cannot make a change on this",
      "Wrong fabric came in (different pattern or texture): Offer to replace or remake. Find out client deadline and confirm we can accommodate before promising"
    ],
    approvedLanguage: "Universal opening:\n\"Let me pull up your order right now to check what was noted. I want to make sure I give you the most accurate answer before I come back to you.\"\n\nWhen client cannot be accommodated:\n\"I completely understand how important this detail is to you. Based on your order, [explain what was noted]. I want to be transparent — [explain limitation]. That said, let me check with my team to see if there is anything we can still do for you.\"\n\nWhen offering credit:\n\"As a gesture of goodwill we would like to offer you a [$50 / $100] credit toward a future purchase. We truly appreciate your business and want to make sure you feel taken care of.\"",
    avoid: "Admitting fault before checking the order form. Promising a fix or remake before confirming internally. Offering a credit amount before supervisor approves. Dismissing a fit complaint without empathizing first.",
    escalate: true,
    icon: "🧥"
  },

  {
    id: "p18",
    category: "Alteration Policy",
    title: "Alteration Reimbursement for Remote Clients",
    trigger: "Client is outside Baltimore and went to a local tailor for alterations and is now requesting reimbursement for the cost.",
    steps: [
      "Confirm whether the client was authorized to go to a local tailor — was this agreed upon with GC beforehand or did they go on their own",
      "REIMBURSEMENT RULE: Up to $100 is automatically covered — no escalation needed. Anything above $100 requires Runi's approval before confirming to the client",
      "If GC authorized the alteration: ask the client for a receipt. If the amount is under $100 process it. If over $100 forward to Runi for approval before confirming",
      "If the client went on their own without authorization: document on Monday and tag Runi before communicating anything — reimbursement may not be covered",
      "Reimbursement is generally only covered within the 30-day alteration window",
      "If the alterations made the garment worse or created a new issue: document thoroughly on Monday with photos and tag Runi immediately",
      "Never confirm a reimbursement amount over $100 without Runi's approval"
    ],
    approvedLanguage: "Authorized alteration, under $100:\n\"Of course — please send me the receipt for the alterations and I'll get this taken care of for you.\"\n\nAuthorized alteration, over $100:\n\"Thank you — please send me the receipt and I'll get this reviewed right away. I'll confirm the reimbursement with you shortly.\"\n\nUnauthorized, pending review:\n\"I appreciate you reaching out. Let me look into this on my end and get back to you within the next day or two with an answer on the reimbursement.\"",
    avoid: "Confirming a reimbursement over $100 before Runi approves. Reimbursing alterations done outside the 30-day window without authorization. Processing anything without a receipt.",
    escalate: true,
    icon: "🧾"
  },
  {
    id: "p17",
    category: "Production",
    title: "Customer Ordering Additional Pieces",
    trigger: "Customer already received their suit and wants to order additional pieces — a matching vest, extra trousers, a second shirt, or any add-on to their original order.",
    steps: [
      "This is a positive interaction — treat it as a new order opportunity, not a service issue",
      "Find out exactly what they are looking to add and whether they want it to match their existing order",
      "If matching fabric is needed: check whether the original fabric is still available. Pull up the order to find the fabric details and check with production on availability",
      "If fabric is no longer available: let the client know honestly and offer alternatives",
      "Direct them to book an appointment if measurements are needed, or confirm existing measurements are on file",
      "Document the new order on Monday and proceed through the normal order process"
    ],
    approvedLanguage: "\"That's great — we'd love to take care of that for you. Let me pull up your order and check on the fabric availability so we can make sure everything matches. I'll get back to you by [specific time] with an update on what we can do.\"",
    avoid: "Confirming fabric availability before checking with production. Assuming existing measurements are still accurate without verifying.",
    escalate: false,
    icon: "➕"
  },
  {
    id: "p16",
    category: "Fit Issues",
    title: "Suit Too Tight / No Room to Let Out",
    trigger: "Customer or tailor reports the suit is too tight and there is no extra fabric left to let out — meaning standard alterations cannot fix the fit issue.",
    steps: [
      "Lead with empathy — acknowledge how frustrating this must be, especially if they have an event approaching",
      "FIRST ACTION: Ask the client for photos wearing the garment — front, back, and both sides — taken at a level angle, not facing up or down. This allows us to properly assess before involving the tailor",
      "Once photos received: speak with the relevant tailor to confirm whether there is truly no room and understand the full limitation",
      "━━ BALTIMORE ━━ Speak with the seamstress team",
      "━━ 5 TOWNS / BROOKLYN / QUEENS ━━ Speak with Mark",
      "━━ LAKEWOOD ━━ Speak with Mordy at In Style",
      "━━ ANY OTHER LOCATION ━━ Speak with whatever tailor is handling the garment",
      "Document on Monday with the photos and full details, tag Runi before responding to the client with any resolution",
      "Runi will determine next steps — partial remake, full remake, or credit. Do not communicate any options to the client before Runi confirms"
    ],
    approvedLanguage: "\"I hear you and I want to make sure we look into this properly for you. Can you send me a few photos wearing the garment — front, back, and both sides — taken at a level angle, not facing up or down? Once I can see exactly what we're working with I'll speak with our team and get back to you by [specific time] with a clear answer.\"",
    avoid: "Telling the client there is nothing that can be done before photos have been reviewed and Runi has weighed in. Promising a remake before Runi approves. Leaving without a specific callback time.",
    escalate: true,
    icon: "📏"
  },
  {
    id: "p15",
    category: "Fit Issues",
    title: "Persistent Fit Issues After Multiple Alterations",
    trigger: "Customer has been in for alterations two or more times and is still not satisfied with the fit.",
    steps: [
      "Lead with empathy — reframe multiple fittings as a positive. Let the client know multiple fittings are completely normal and are part of the service we offer. We allow as many fittings as needed until the garment is perfected",
      "Tell the client you are going to speak with the tailor handling their alterations to get a full picture of where things stand",
      "━━ BALTIMORE ━━ Speak directly with the seamstress team. Ask what has been done, what the current issue is, and what is still possible",
      "━━ 5 TOWNS / BROOKLYN / QUEENS ━━ Speak directly with Mark. Ask what has been done and what the current situation is",
      "━━ LAKEWOOD ━━ Speak directly with Mordy at In Style. Ask what has happened and what the current status is",
      "━━ ANY OTHER LOCATION ━━ Speak directly with whatever tailor the client has been working with. Get the full picture from them first",
      "Once you have spoken with the relevant tailor: document the full history on Monday and tag Runi with all details",
      "Wait for Runi to respond with direction before communicating anything further to the client",
      "Do not promise a remake, credit, or any specific resolution before Runi weighs in"
    ],
    approvedLanguage: "\"I really appreciate you letting me know and I completely understand the frustration. I want you to know that multiple fittings are a completely normal part of our process — we offer them because we're committed to making sure the garment is perfected for you. I'm going to speak with [our seamstress team / Mark / Mordy] today to get a full picture of where things stand and figure out the best next step for you. I'll get back to you by [specific time] with an update.\"",
    avoid: "Making the client feel like multiple fittings are unusual or a problem. Promising a remake without Runi's approval. Responding without first speaking to the relevant tailor. Mentioning anything about body measurements changing — never say this to the client.",
    escalate: true,
    icon: "🔄"
  },
  {
    id: "p1",
    category: "Order Status",
    title: "Customer Asking for ETA",
    trigger: "Customer asks when their suit will be ready, whether it will arrive in time for an event, or requests any production update.",
    steps: [
      "First find out two things: when was the fitting appointment, and does the customer have a specific date they need the suit by",
      "NO DEADLINE — Reassure them it generally takes 4–6 weeks from the fitting. We'll reach out as soon as it arrives",
      "HAS A DEADLINE — Find out the exact date. Tell them you'll check and get back within a day or two. Be honest that we don't always have an exact date but will keep them updated and expect to be on track",
      "Update Monday.com immediately with the event date and tag whoever can check on the arrival",
      "If no internal answer by end of day, follow up directly via WhatsApp or text",
      "Never promise a specific delivery date unless confirmed internally"
    ],
    approvedLanguage: "No deadline:\n\"Hi [Name] — your suit is still in production and generally takes around 4–6 weeks from your fitting. No need to worry — as soon as it comes in we'll reach out right away.\"\n\nHas a deadline:\n\"Hi [Name] — thanks for letting me know. I want to make sure we're on track for [event/date]. I'm going to check on this and will get back to you within a day or two. We don't always get an exact date from production, but we'll keep you updated and expect to be on track.\"",
    avoid: "Giving a specific date that hasn't been confirmed. Saying 'it should be there soon' without checking. Leaving Monday without tagging someone.",
    escalate: false,
    icon: "📦"
  },
  {
    id: "p2",
    category: "Fit Issues",
    title: "Fit Complaints After Delivery",
    trigger: "Customer says the jacket is too tight, too loose, sleeves wrong length, collar gapping, chest popping, shoulders too wide, or any general fit dissatisfaction.",
    steps: [
      "━━ IDENTIFY LOCATION FIRST ━━ The process is completely different by location",
      "━━ 5 TOWNS / BROOKLYN / QUEENS ━━ Lead with empathy. Ask if they've reached out to Mark. If not, direct them — he handles most alterations in this area and does great work",
      "If client wants us to assess first: ask for photos — front, back, both sides — straight angle, not angled up or down",
      "If client returns from Mark unhappy: recommend a second adjustment. Normal and can happen 2–3 times",
      "If Mark says he can't fix it: ask Mark what happened, document on Monday, wait for supervisor response before communicating next steps",
      "━━ ALL OTHER REMOTE LOCATIONS ━━ Ask for photos first before recommending anything",
      "Once photos received: upload to Monday and tag a supervisor — ask if this can go to a local tailor. Do NOT reassure the client yet",
      "MINOR: Direct to local tailor, confirm we reimburse. CRITICAL: Ask client to ship garment back to Baltimore",
      "━━ LAKEWOOD ━━ Contact Mordy at In Style directly. Document on Monday and wait for supervisor response",
      "━━ BALTIMORE ━━ Ask how many times they've come in for adjustments. Check the seamstress group chat. Document on Monday and wait for supervisor response"
    ],
    approvedLanguage: "Opening:\n\"I completely understand how frustrating this must feel — especially when you've been looking forward to having a suit that fits just right. Custom garments typically need a fitting or two to perfect the fit — we're here to see it through with you.\"\n\nRequesting photos:\n\"Can you send a few photos — front, back, and both sides — taken straight on? This helps us see exactly what's needed.\"\n\nDirecting to Mark:\n\"I'd like to get you in touch with Mark — he handles most of our alterations in your area and does a great job. He can usually take care of any adjustments to get the fit exactly right.\"",
    avoid: "Promising a remake before alterations are attempted. Telling a remote client to go to a local tailor before supervisor reviews photos. Making any commitment before internal direction is confirmed.",
    escalate: true,
    icon: "👔"
  },
  {
    id: "p3",
    category: "Style Dispute",
    title: "Customer Claims Wrong Item Produced",
    trigger: "Customer says what arrived is not what they ordered — wrong style, color, buttons, lining, or any discrepancy.",
    steps: [
      "━━ STEP 1 — INITIAL RESPONSE ━━ Be empathetic but do NOT admit fault before verifying. Never say 'sorry you got the wrong item'",
      "━━ STEP 2 — INTERNAL CHECK ━━ Pull up the order immediately. Compare what the client claims vs. what the order form shows",
      "Document both on Monday and tag a supervisor. Do not respond to the client yet",
      "━━ STEP 3A — CLIENT IS WRONG ━━ Wait for supervisor confirmation then respond",
      "SMALL FIX: GC may fix as goodwill — make clear it's a gesture, not an admission of error",
      "BIGGER FIX — STANDARD: Use approved language below. Close warmly, don't argue",
      "BIGGER FIX — CLIENT DIFFICULT: Offer $20–$50 credit toward a future purchase as goodwill",
      "━━ STEP 3B — GC ERROR ━━ Wait for supervisor confirmation then respond",
      "SMALL FIX: Fix at no cost. BIGGER FIX: Offer remake OR credit — present both options",
      "━━ STEP 4 — DOCUMENTATION ━━ REMAKE: Create new order in system. CREDIT: Log on credit sheet on Monday. Mark resolved with notes on what was offered and accepted"
    ],
    approvedLanguage: "Initial response:\n\"I'm sorry to hear that — let me look into this right away. I want to make sure I have the full picture before I come back to you.\"\n\nClient is wrong — standard:\n\"Hi [Name], I really appreciate you reaching out. I've looked thoroughly through your order and the style you received is exactly what was requested at your appointment. We always refer to the order form and the style confirmed at your fitting, so this wouldn't be something we'd offer to remake. We truly appreciate your business and are happy to help with anything else.\"\n\nClient is difficult:\n\"I completely understand this isn't the answer you were hoping for, and I hear you. While we're not able to offer a remake, as a token of our appreciation and in case of any miscommunication, I'd like to offer a small credit of $[20–50] toward a future purchase.\"\n\nGC error:\n\"After reviewing everything, what you received doesn't match your order and that's on us. I want to make this right — I'll [remake/credit] and follow up with details shortly.\"",
    avoid: "Admitting fault before verifying. Responding before supervisor reviews. Offering remedy without supervisor approval. Leaving Monday unupdated.",
    escalate: true,
    icon: "🔍"
  },
  {
    id: "p4",
    category: "Production",
    title: "Style Change Requested After Production",
    trigger: "Customer asks to add or change a style detail after their appointment — cuffs, monogram, stitching color, buttons, pockets, lapel, waistband, buttonholes, or anything not captured at the fitting.",
    steps: [
      "FIRST — Before responding, document the requested change on Monday. A supervisor will reach out to the production team internally. No escalation needed — standard internal step",
      "Lead with empathy — acknowledge that the detail matters to them",
      "Explain why changes are difficult: once production starts, patterns are already cut — changes at this stage are not possible",
      "Let them know you are passing the request to production and asking on their behalf",
      "Be honest upfront: we usually don't hear back from production, so we likely won't know until the garment arrives",
      "Tell the client you will check when the garment comes in and follow up right away"
    ],
    approvedLanguage: "\"I completely understand — that detail is important and I wish we had more flexibility here. Once an order goes into production the patterns are already cut, which makes changes very difficult at this stage. That said, I'll pass your request along to our production team and ask if anything can still be done. I do want to be upfront — we usually don't hear back on these requests, so we likely won't know if the change was made until the garment arrives. As soon as it comes in I'll check and let you know right away.\"",
    avoid: "Promising the change will be made. Saying you'll get back with a definite answer before arrival. Forgetting to document on Monday.",
    escalate: false,
    icon: "✂️"
  },
  {
    id: "p5",
    category: "Production",
    title: "Customer Asking to Confirm a Style Detail",
    trigger: "Customer reaches out after their appointment to verify a specific detail was captured — lapel style, stitching color, button type, functional buttons, monogram, fabric color, lining, pocket style, or any detail they want confirmed.",
    steps: [
      "Pull up the order in the system immediately and check whether the detail they're asking about is noted",
      "DETAIL IS ON THE ORDER — Confirm it warmly and reassure them it's been captured. Can be answered directly and closed",
      "DETAIL IS NOT ON THE ORDER — Do not admit an error. Document on Monday and tag a supervisor before responding. This now falls under the Style Change After Production protocol",
      "If the detail requires Runi to confirm (something discussed verbally that may not be written clearly) — document on Monday and tag Runi before responding",
      "Keep the response short and positive — this is usually a quick reassurance, not a complicated issue"
    ],
    approvedLanguage: "Detail confirmed:\n\"Hi [Name] — I just pulled up your order and yes, [the detail] is noted. You're all set! Let me know if there's anything else you'd like me to check.\"\n\nNeeds verification first:\n\"Hi [Name] — great question. Let me pull this up and confirm with our team to make sure I give you the right answer. I'll come back to you shortly.\"",
    avoid: "Telling the customer a detail is on the order without actually checking. Guessing. Confirming something verbally that turns out to be wrong.",
    escalate: false,
    icon: "✅"
  },
  {
    id: "p6",
    category: "Wear & Tear",
    title: "Fabric Pilling, Pulling, Thinning, or Rip",
    trigger: "Customer complains that the fabric is pulling, pilling, thinning, or has a rip — often after the first or second wear, frequently in the crotch area or seat.",
    steps: [
      "Lead with empathy — get on the customer's side immediately. Validate their frustration and let them know you take it seriously",
      "Acknowledge honestly that there are times where this is normal wear and tear, and also times where a garment can get caught on something causing a pull or rip — present both without blaming or dismissing",
      "Ask for photos — you need to see what's happening before anything can be assessed",
      "Tell the client you will reach out to your team to see what can be done — do NOT use the word 'supervisor' with the client",
      "Once photos received: upload to Monday immediately — a supervisor will review and provide guidance",
      "Do not promise any specific resolution before hearing back internally",
      "Never reveal a discount amount upfront — wait to see if the customer accepts the gesture first"
    ],
    approvedLanguage: "\"I really appreciate you reaching out and I completely understand how frustrating this must be — especially when you've invested in a quality garment. There are times where this kind of thing can happen through normal wear, and there are also times where the fabric can get caught on something which causes a pull or a rip. Either way, I want to make sure we look into this properly for you. Can you send me a few photos of the area? Once I have a look I'll reach out to my team and see what we can do for you.\"",
    avoid: "Immediately saying 'this is normal wear and tear' without first validating frustration. Using the word 'supervisor' with the client. Promising a replacement or credit before internal guidance. Revealing a discount amount before the customer accepts.",
    escalate: true,
    icon: "🧵"
  },
  {
    id: "p7",
    category: "Alteration Policy",
    title: "Alteration Window Extension or Late Alteration Request",
    trigger: "Customer asks to extend the 30-day complimentary alteration window because they can't come in on time, OR customer reaches out after the window has already passed requesting alterations.",
    steps: [
      "━━ SCENARIO 1 — STILL WITHIN WINDOW ━━ Customer knows they can't come in on time and is asking ahead",
      "EXTENSION UP TO 2 MONTHS: Can be approved immediately. Tell the customer we can accommodate but need a specific date from them. Once given, that becomes the confirmed deadline",
      "EXTENSION LONGER THAN 2 MONTHS: Ask the customer for their specific date first, then document on Monday and tag a supervisor. Wait for approval before confirming to the client",
      "━━ SCENARIO 2 — ALREADY PAST THE WINDOW ━━ Before saying no to anything, tell the customer you'll look into it and get back within a day or two — never leave it open-ended. Tell them to follow up if they don't hear back",
      "We are generally looking to please the customer — if someone is unhappy or pushes back, we can often find a way to accommodate. Never close the door before checking internally",
      "NON-BALTIMORE LOCATIONS: Generally flexible. More than 3 months past window: likely not covered — supervisor must approve before telling the client",
      "BALTIMORE: After the window alterations would be charged. Veronica speaks to seamstresses directly about the client and charge before communicating. If client pushes back: document on Monday — one-time exception may be offered but make clear future alterations beyond window would be charged"
    ],
    approvedLanguage: "Scenario 1 — Up to 2 months:\n\"Absolutely, we can accommodate that for you. We just need a specific date from you so we can make note of it — what date works for your schedule?\"\n\nScenario 1 — Longer than 2 months:\n\"I appreciate you letting us know ahead of time. We'd like to work with you on this — can you let me know what specific date you're looking at? I'll check with my team and confirm for you shortly.\"\n\nScenario 2 — Before any decision:\n\"I hear you and I want to make sure we look into this properly for you. I'll get back to you within the next day or two with an answer. And if for any reason you don't hear back from me, please feel free to follow up — things can get busy and I don't want this to get missed.\"\n\nAlterations not covered (after supervisor confirms):\n\"I really appreciate your patience and I'm glad you reached out. I want to be transparent with you — our complimentary alteration window is 30 days from when you receive the garment. The reason for this is that over time, body shape and weight can naturally change, and since we make every suit fitted specifically to you at the time of your appointment, it's not possible for us to cover alterations long after that point. We truly value your business and if there's anything else I can do please don't hesitate to reach back out — I'd love to be of help.\"",
    avoid: "Saying no before looking into it. Leaving follow-up open-ended without a firm timeframe. Confirming a free extension beyond 2 months without supervisor approval. Leaving an extension without a specific confirmed date.",
    escalate: true,
    icon: "📅"
  },
  {
    id: "p8",
    category: "Refunds",
    title: "Customer Requesting a Refund",
    trigger: "Customer asks for a refund for any reason — style, fit, or fabric quality dissatisfaction.",
    steps: [
      "Lead with empathy always — never open with policy or 'we don't give refunds.' Acknowledge their frustration and reassure them you want to see what can be done",
      "Identify which of the three categories their issue falls under",
      "━━ CATEGORY A — STYLE ISSUE ━━ Follow the Style Dispute protocol (Protocol 3) exactly. Treat this as a style dispute first — resolve the cause and the refund request usually resolves itself",
      "━━ CATEGORY B — FIT ISSUE ━━ Follow the Fit Issues protocol (Protocol 2) exactly. Ask if they've done any alterations yet. Reassure them it is completely normal for a custom suit to need one or two fittings. Walk them through the alteration process",
      "━━ CATEGORY C — FABRIC OR QUALITY CONCERN ━━ Respond with genuine empathy without admitting fault",
      "Document on Monday and tag a supervisor before responding with any resolution",
      "Custom clothing cannot be refunded — but the response should never feel cold or dismissive. Once supervisor reviews, respond warmly",
      "Document this feedback for future reference even when no action is taken"
    ],
    approvedLanguage: "Initial response (all categories):\n\"I completely understand why this is frustrating and I appreciate you reaching out. I want to make sure we address this properly — let me look into this and see what we can do for you. I'll get back to you within the next day or two, and if you don't hear from me please feel free to follow up.\"\n\nFabric / quality concern — after supervisor review:\n\"I really appreciate your patience and I want you to know your feedback genuinely matters to us. We put a lot of care into sourcing quality fabrics and I'm sorry to hear the garment hasn't met your expectations. With custom clothing we aren't able to offer a refund, but I want you to know this has been noted and we take it seriously. If there's anything else I can do for you please don't hesitate to reach out.\"",
    avoid: "Leading with 'we don't give refunds.' Treating a fit complaint as a refund issue before alterations have been attempted. Responding to a fabric complaint without supervisor review first.",
    escalate: true,
    icon: "💳"
  },
  {
    id: "p9",
    category: "GC Error",
    title: "Missing Item from Order",
    trigger: "Customer receives their order but something is missing — a vest, second suit, shirt, trousers, or any other item that was part of their order is not in the package.",
    steps: [
      "Lead with empathy — acknowledge the frustration, especially if they were expecting a complete order for an event",
      "Do not admit the item is missing before checking internally — confirm what was supposed to ship",
      "Pull up the order immediately and check what was included in the shipment",
      "Document on Monday and tag a supervisor to find out the status before responding with a resolution",
      "Tell the client you are looking into it and will get back by a specific time — same day if event is approaching, next day or two otherwise",
      "ITEM SHIPPED SEPARATELY: Give tracking information and expected arrival date",
      "ITEM NOT YET SHIPPED OR IN PRODUCTION: Give an honest update and realistic timeline. If event is approaching flag as urgent on Monday immediately",
      "If event is within 2 weeks and item has not shipped: escalate to Runi immediately"
    ],
    approvedLanguage: "Initial response:\n\"I appreciate you reaching out and I'm sorry to hear the full order wasn't in the package. Let me look into this right away and find out exactly where things stand. I'll get back to you by [specific time] with a clear update.\"\n\nEvent approaching, item still in production:\n\"I completely understand how stressful this must be with [event] coming up. I've flagged this as urgent with my team and we're looking into the fastest possible solution. I'll be back to you by [specific time] — and if you don't hear from me please follow up right away.\"",
    avoid: "Telling the client the item is on its way before confirming internally. Leaving without a specific callback time. Not flagging urgency on Monday when an event is approaching.",
    escalate: true,
    icon: "📭"
  },
  {
    id: "p10",
    category: "GC Error",
    title: "Wrong or Missing Personalization / Monogram / Embroidery",
    trigger: "Customer says their initials, name, custom text, or embroidery is wrong, missing, or placed incorrectly on the garment.",
    steps: [
      "Lead with empathy — do not admit fault before verifying anything",
      "First find out two things: what was supposed to be written, and exactly where it was supposed to be located",
      "Pull up the order form and verify what was actually noted before responding with any solution",
      "━━ NAME LABEL ━━ Can be replaced. Order a new name label through the order system with the correct name. No escalation needed",
      "━━ COLLAR FELT ━━ Can be replaced. Order a new collar felt through the order system. You need: the customer's order number, correct size, and correct color. If no color specified — default to black",
      "━━ MONOGRAM ANYWHERE ELSE ON THE SUIT ━━ Whether on the order form or not — always check internally first. Document on Monday, tag a supervisor, ask whether it can be done. Do not tell the client yes or no before getting confirmation",
      "If not on the order form: explain warmly that personalizations must be confirmed at the appointment — but always follow up by checking with your team to see if anything can still be done",
      "Document all resolutions on Monday"
    ],
    approvedLanguage: "Before checking anything:\n\"I appreciate you reaching out — let me pull up your order right now to see exactly what was noted. I want to make sure I give you the right answer. I'll follow up with you shortly.\"\n\nNot on the order form:\n\"I just reviewed your order and it looks like the personalization wasn't noted at the time of your appointment. That said, I want to make sure we do everything we can for you — let me check with my team to see if it's something we can still take care of. I'll get back to you within the next day or two.\"",
    avoid: "Admitting error before reviewing the order form. Promising a monogram can be fixed before getting internal confirmation. Ordering a collar felt without confirming size, order number, and color. Closing the door without first checking if anything can be done.",
    escalate: true,
    icon: "🪡"
  },
  {
    id: "p11",
    category: "Shipping",
    title: "Customer Asking About Delivery / Shipping Delay",
    trigger: "Customer asks when their suit will be delivered, expresses concern about timing, or mentions a specific event date they need it for.",
    steps: [
      "Always open by letting the client know you are happy to help and will check on this for them",
      "Ask the client when their fitting appointment was and whether a specific date was discussed or promised at the appointment",
      "Check Monday for any notes on the order and what was communicated at the time of the appointment",
      "━━ NO SPECIFIC DATE / ORDERED 2–3 WEEKS AGO ━━ Tell them the suit is still in production and give the standard 4–6 week timeframe. Reassure them there is nothing to worry about",
      "━━ CLIENT HAS A SPECIFIC DATE OR IS NERVOUS ━━ Use stronger reassuring language — make the client feel their order is a priority and you are personally on top of it",
      "Find out the exact date they need it by and what date was promised at the appointment",
      "Document on Monday immediately and tag Runi to check where the order stands before responding with any timeline",
      "If no exact delivery date available: reassure the client you expect it on time and will connect them with a tailor right away for any quick adjustments",
      "If real concern the order won't arrive in time: escalate to Runi immediately and mark urgent on Monday"
    ],
    approvedLanguage: "Opening (all situations):\n\"Of course — I'd be happy to check on that for you. Can you let me know when your fitting appointment was and if a specific date was discussed or promised at the time of your appointment? That will help me look into this properly for you.\"\n\nClient is nervous or specifies a rush:\n\"I completely understand and I want you to know your order is extremely important to us. I am personally going to make sure we stay on top of this for you. I'm looking into it right now and will get back to you by [specific time] with a full update. Please don't hesitate to follow up with me directly if you need anything in the meantime — I want to make sure you feel taken care of every step of the way.\"\n\nNo specific date:\n\"Your suit is still in production — our standard timeframe is around 4–6 weeks from your fitting appointment. No need to worry at all — as soon as it comes in we'll reach out to you right away.\"\n\nRush / specific date, no confirmed delivery date yet:\n\"I completely understand how important this is and I want to reassure you — your order is a priority for us. Let me check on this right away and find out exactly where things stand. I'll get back to you by [specific time]. And once your suit arrives we'll make sure you're connected with a tailor immediately so any adjustments are handled quickly and you're fully set before your event.\"",
    avoid: "Responding before asking about the appointment date and promised timeline. Giving a delivery date before checking with Runi. Not flagging urgency on Monday when a rush is involved.",
    escalate: true,
    icon: "🚚"
  },
  {
    id: "p12",
    category: "Customer Relations",
    title: "Customer Demands to Speak with Runi Directly",
    trigger: "Customer insists on speaking with the owner, refuses to deal with customer service, or says they only want to speak with Runi personally.",
    steps: [
      "Never refuse the request and never immediately promise Runi will call — both make the situation worse",
      "Validate the request — let them know you completely understand and that getting to the right person matters",
      "Ask for one chance to help them first before escalating — most customers will accept this when they feel genuinely heard",
      "Work through the issue using whatever protocol applies to their specific concern",
      "If you resolve it — great, no escalation needed",
      "If after your best effort the customer still insists: document the full situation on Monday and tag Runi with every detail",
      "Let the customer know Runi has been made aware and you will follow up once he is available to schedule a call — do not promise a specific time without confirming with Runi first",
      "Never make the customer feel they are being blocked or passed around"
    ],
    approvedLanguage: "First response:\n\"I completely understand and I want to make sure you get taken care of properly. Before I loop anyone else in, would you give me the chance to look into this for you? That's exactly what I'm here for — and I want to make sure we get this right for you personally.\"\n\nIf customer still insists:\n\"I completely respect that and I want you to know I hear you. I'm going to make sure Runi is personally made aware of your situation right now. Once he's been notified I'll follow up with you to let you know when he's available to schedule a call. In the meantime please know that everything you've shared has been documented and is being taken seriously.\"",
    avoid: "Refusing the request outright. Promising Runi will call at a specific time without confirming with him first. Making the customer feel deflected or passed around.",
    escalate: true,
    icon: "👤"
  },
  {
    id: "p13",
    category: "Pricing",
    title: "Customer Requests Discount or Questions Pricing",
    trigger: "Customer says suits are too expensive, asks for a price match, requests a discount, or is ordering multiple suits and asking about bulk pricing.",
    steps: [
      "Thank them warmly for their interest — never make them feel judged for asking",
      "Explain that pricing reflects premium fabrics, expert craftsmanship, and a fully personalized experience",
      "━━ 1–2 SUITS ━━ No discount offered. Let the customer know there are no current promotions but you are happy to reach out when one becomes available. Mention the referral program — $50 credit per referred client who places an order",
      "━━ 3+ SUITS — SAME TIME AND LOCATION ━━ $25 off per suit can be offered directly — no escalation needed",
      "━━ 3+ SUITS — DIFFERENT TIMES OR LOCATIONS ━━ Needs Runi's approval. Document on Monday with full details, tag Runi, and include the timeframe the customer needs garments by",
      "━━ 4+ SUITS ━━ Work with the customer. If asking for a steep discount consult Runi first. Document on Monday — include number of suits, discount requested, and timeframe needed. Wait for Runi's direction before responding"
    ],
    approvedLanguage: "1–2 suits, no discount:\n\"We truly appreciate your interest. At this time we don't have any active promotions, but we'd be happy to reach out to you when something becomes available. We'd love to work with you when the timing is right. In the meantime, we do have a referral program where you earn a $50 credit for every client you refer who places an order.\"\n\n3+ suits, discount confirmed:\n\"We'd love to take care of you on this. For [number] suits placed together we can offer $25 off each — happy to move forward whenever you're ready.\"\n\nSteep discount or complex order, pending Runi:\n\"I appreciate you sharing that with me — let me check with my team on what we can do for an order of this size. I'll get back to you within the next day or two with an answer.\"",
    avoid: "Offering any discount on 1–2 suits. Offering discounts on multi-location or multi-time orders without Runi's approval. Committing to a steep discount on 4+ suits without consulting Runi.",
    escalate: true,
    icon: "💰"
  },
  {
    id: "p14",
    category: "Payment",
    title: "Outstanding Payment / Client Has Not Paid",
    trigger: "Client has a completed order but has not paid the outstanding balance, is not responding to payment requests, or is disputing an amount.",
    steps: [
      "Be professional and direct — not aggressive or threatening",
      "If the client has questions about the amount, address them first before pushing for payment",
      "State clearly and warmly that the balance is outstanding and you'd love to get this wrapped up for them",
      "Give them a specific timeframe or ask when they can process payment",
      "If no response after 2–3 follow-up attempts: escalate to Runi — do not keep messaging without a response",
      "Never send multiple messages in rapid succession without waiting for a response"
    ],
    approvedLanguage: "\"Hi [Name] — I'm reaching out regarding your order. We have an outstanding balance of $[amount] and wanted to make sure everything is in order on your end. If you have any questions about the amount we're happy to go over it with you. We truly appreciate your business and look forward to getting this wrapped up for you.\"",
    avoid: "Being aggressive or threatening. Sending multiple messages without waiting for a response. Not escalating to Runi after 2–3 unanswered attempts.",
    escalate: true,
    icon: "💵"
  }
];

// ─── FINDABILITY ENRICHMENT ──────────────────────────────────────
// keywords = the words/phrases customers actually use (feeds search).
// tags     = symptom-based facets; a protocol can carry several (cross-listed in Browse by Tag).
const ENRICH = {
  p1:  { tags: ["timing"], keywords: "eta, when ready, how long, when will it be ready, in time, on time, status, update, production time, four to six weeks, done, finished, ready yet" },
  p2:  { tags: ["fit"], keywords: "doesn't fit, does not fit, too tight, too loose, sleeves too long, sleeves too short, collar gap, collar gapping, chest popping, shoulders too wide, baggy, snug, fit complaint, tailor, alteration needed" },
  p3:  { tags: ["style", "missing"], keywords: "wrong item, not what I ordered, wrong color, wrong style, wrong buttons, wrong lining, this is not what, mistake, different from what I ordered, incorrect" },
  p4:  { tags: ["style"], keywords: "change a detail, add cuffs, add monogram, change stitching, change buttons, add pocket, change lapel, modify, can you change, after my appointment, after ordering" },
  p5:  { tags: ["style"], keywords: "confirm, did you get, is it noted, verify, check my order, double check, make sure, lapel, stitching, button, monogram, lining, pocket, functional buttons" },
  p6:  { tags: ["fabric"], keywords: "rip, ripped, tear, torn, hole, pilling, pill, pills, snag, snagged, pull, pulling, thinning, worn through, crotch, seat, seam split, fell apart, poor quality, falling apart" },
  p7:  { tags: ["alterations", "timing"], keywords: "extend, extension, alteration window, 30 days, thirty days, late, too late, missed the window, past the window, can't come in, reschedule alteration, alter later" },
  p8:  { tags: ["refund", "money"], keywords: "refund, money back, return, give me my money, cancel order, not happy, dissatisfied, want a refund, get my money" },
  p9:  { tags: ["missing"], keywords: "missing, not in the package, didn't get, did not receive, vest missing, second suit missing, shirt missing, trousers missing, incomplete order, where is the rest, only got part" },
  p10: { tags: ["personalization"], keywords: "monogram, initials, name, embroidery, inscription, collar felt, name label, wrong name, missing monogram, misspelled, spelled wrong, wrong initials, personalization" },
  p11: { tags: ["timing"], keywords: "shipping, delivery, ship, tracking, delay, delayed, when will it arrive, event date, deadline, not here yet, where is my package, hasn't arrived, need it by" },
  p12: { tags: ["escalation"], keywords: "speak to the owner, talk to Runi, manager, supervisor, escalate, demand, only deal with, won't talk to anyone else, speak to someone in charge" },
  p13: { tags: ["pricing", "money"], keywords: "discount, too expensive, price, pricing, deal, bulk, multiple suits, price match, cheaper, promo, coupon, cost too much, lower price, can you do better" },
  p14: { tags: ["payment", "money"], keywords: "balance, owe, payment, hasn't paid, has not paid, unpaid, outstanding, invoice, collect, pay the rest, disputing the amount, still owes" },
  p15: { tags: ["fit", "alterations"], keywords: "still doesn't fit, multiple alterations, came in twice, two times, three times, keeps coming back, not satisfied after alteration, repeated fittings, more than once" },
  p16: { tags: ["fit"], keywords: "too tight, no room, can't let out, cannot let out, no fabric left, let out, gained weight, doesn't close, can't button, won't close, no seam allowance" },
  p17: { tags: ["new-order"], keywords: "order more, additional pieces, extra trousers, matching vest, second shirt, add on, another suit, more pieces, buy more, want to add" },
  p18: { tags: ["alterations", "money"], keywords: "reimburse tailor, local tailor, alteration cost, receipt, pay me back, refund for alterations, went to a tailor, cover the alteration, paid for alterations" },
  p19: { tags: ["style"], keywords: "style guide, lapel, buttons, pocket, lining, stitching, buttonhole, cuffs, belt loops, waistband, blazer, ticket pocket, quick reference, what to do for" },
  p20: { tags: ["style"], keywords: "I asked for, we discussed, verbally agreed, not on my order, agreed at appointment, promised at appointment, said at the fitting, dispute, but I said" },
};

const APPROVED_PROTOCOLS = RAW_PROTOCOLS.map(p => ({
  keywords: "",
  tags: [],
  ...p,
  ...(ENRICH[p.id] || {}),
}));

// ─── TEMPLATES (copy-ready customer messages + reference) ────────
const TEMPLATE_GROUP_ORDER = [
  "Appointment Booking",
  "Garment Ready — by location",
  "Alterations (Baltimore)",
];
const RAW_TEMPLATES = [
  { id:"t1", group:"Appointment Booking", title:"Interested in an appointment",
    body:"Hi [Customer name], thank you for your interest in booking an appointment with us! You can always easily book your appointment right here:\n\nhttps://gcclothiers.com/pages/custom-suit-booking\n\nTo help us accommodate you best, it also helps to know a few quick details:\n\n• When do you need the garment by?\n• Which location works best for your appointment?\n• What is your budget for the garment?\n\nWe look forward to working with you!" },

  { id:"t3", group:"Garment Ready — by location", title:"Suit Ready — Baltimore",
    body:"Hi [Customer name], we're reaching out from Gage Court Clothiers to let you know your garment(s) are in! Please use the link below to book your fitting:\n\nhttps://calendly.com/customerservice-95/gage-court-clothiers-alterations\n\nA reminder that alterations are covered by the company within 30 days of the fitting. You can review our full alteration policy here: https://gcclothiers.com/pages/alterations-policy\n\nWe look forward to seeing you!" },
  { id:"t4", group:"Garment Ready — by location", title:"Suit Ready — Lakewood (pickup at Sew N Style)",
    body:"Hi [Customer name], we're reaching out from Gage Court Clothiers to let you know your suit will be ready for pickup tomorrow after 4 PM at Sew N Style, where your fitting will also be done:\n\nSew N Style — 5172 US-9, Howell Township, NJ 07731\n\nPlease stop in for a fitting or walk-in during their normal business hours. As a reminder, the company covers alterations for as many fittings as needed within 30 days from the first fitting. We recommend trying the garment on before final pickup to ensure a proper fit.\n\nFull alteration policy: https://gcclothiers.com/pages/alterations-policy — reach out with any questions!" },
  { id:"t5", group:"Garment Ready — by location", title:"Suit Ready — Lakewood (shipping to client)",
    body:"Hi [Customer name], we're reaching out from Gage Court Clothiers to let you know your suit is ready! Please share your shipping address and we'll send the garment directly to you.\n\nFor alterations, please visit Sew N Style once they're open — your fitting will be done at their address:\n\nSew N Style — 5172 US-9, Howell Township, NJ 07731\n\nStop in for a fitting or walk-in during their normal business hours. As a reminder, the company covers alterations for as many fittings as needed within 30 days from the first fitting. We recommend trying the garment on before final pickup to ensure a proper fit.\n\nFull alteration policy: https://gcclothiers.com/pages/alterations-policy — reach out with any questions!" },
  { id:"t6", group:"Garment Ready — by location", title:"Suit Ready — 5 Towns / Brooklyn",
    body:"Hi [Customer name], great news — your garment(s) are in! Please share your shipping address and we'll send them right out to you.\n\nWith every custom suit, we expect a fitting or two to get everything just right. If you have any questions about the fit, send us a few photos of you wearing the suit (front, back, and both sides) and we'll point you to the right tailor.\n\nFor any basic alterations, we recommend Mark at 718-496-9396 (text or WhatsApp), who can usually provide an in-home fitting.\n\nAlterations are covered by the company within 30 days of the first fitting. Full policy: https://gcclothiers.com/pages/alterations-policy" },
  { id:"t7", group:"Garment Ready — by location", title:"Suit Ready — Monsey",
    body:"Hi [Customer name], great news — your garment(s) are in! Please share your shipping address and we'll send them right out to you.\n\nWith every custom suit, we expect a fitting or two to get everything just right. If you have any questions about the fit, send us a few photos of you wearing the suit (front, back, and both sides) and we'll point you in the right direction.\n\nFor any basic alterations, you're welcome to use your own tailor and we'll reimburse you up to $100. If you'd prefer to use one of ours:\n• Sew N Style — Lakewood, NJ (5172 US-9, Howell Township)\n• Mark — Brooklyn, Queens & 5 Towns — 718-496-9396 (text or WhatsApp)\n\nAlterations are covered by the company within 30 days of the first fitting. Full policy: https://gcclothiers.com/pages/alterations-policy" },
  { id:"t11", group:"Alterations (Baltimore)", title:"Alterations completed (Baltimore)",
    body:"Hi [Customer name], we're reaching out from Gage Court Clothiers to let you know your alterations are complete! Please book an appointment to try on and pick up your clothing:\n\nhttps://calendly.com/customerservice-95/gage-court-clothiers-alterations\n\nThank you!" },

];


// ─── DESIGN TOKENS ───────────────────────────────────────────────
const D = {
  background:  "#F7F4EF",
  surface:     "#FFFFFF",
  surfaceSoft: "#FBFAF7",
  text:        "#171717",
  muted:       "#7A746D",
  border:      "#E7DED2",
  accent:      "#B89563",
  accentDark:  "#6F5533",
  danger:      "#B42318",
  dangerBg:    "#FFF4F2",
  success:     "#3F7D5A",
  successBg:   "#F1F7F3",
};
const FONT = "-apple-system, BlinkMacSystemFont, 'Inter', 'Helvetica Neue', Arial, sans-serif";

// ─── Brand stylesheet (injected once into <head>) ────────────────
// The app is otherwise inline-styled, which can't express breakpoints. These classes carry the
// mobile / tablet / desktop layouts for the home screen.
const GC_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');
:root{
  --gc-bg:#F2EEE7; --gc-surface:#FBF9F5; --gc-card:#FFFFFF; --gc-text:#171717; --gc-muted:#7A746D;
  --gc-border:#E7DED2; --gc-accent:#B8945F; --gc-accent-dark:#6F5533;
  --gc-serif:'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --gc-sans:${FONT};
}
.gc-page{min-height:100vh;background:var(--gc-bg);font-family:var(--gc-sans);color:var(--gc-text);
  padding:20px;box-sizing:border-box;}
.gc-shell{max-width:1180px;margin:0 auto;background:var(--gc-surface);border:1px solid var(--gc-border);
  border-radius:16px;box-shadow:0 12px 44px rgba(90,70,40,.09);overflow:hidden;}

/* top bar */
.gc-top{display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding:20px 30px;border-bottom:1px solid var(--gc-border);background:var(--gc-surface);}
.gc-mark{font-family:var(--gc-serif);line-height:1;text-align:center;flex-shrink:0;}
.gc-mark b{display:block;font-size:29px;font-weight:600;letter-spacing:.15em;}
.gc-mark span{display:block;font-size:10.5px;letter-spacing:.42em;margin-top:5px;font-family:var(--gc-sans);font-weight:600;}
.gc-mark i{display:block;width:26px;height:2px;background:var(--gc-text);margin:7px auto 0;}
.gc-top-right{display:flex;align-items:center;gap:11px;}
.gc-tabs{display:inline-flex;gap:8px;}
.gc-tab{padding:11px 26px;border-radius:7px;font-size:14.5px;font-weight:600;cursor:pointer;
  font-family:var(--gc-sans);border:1px solid var(--gc-accent);background:transparent;color:var(--gc-text);}
.gc-tab.on{background:var(--gc-accent);color:#fff;}
.gc-acct{width:42px;height:42px;border-radius:50%;border:1px solid var(--gc-border);background:var(--gc-card);
  display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--gc-accent-dark);flex-shrink:0;}
.gc-acct-wrap{position:relative;}
.gc-menu{position:absolute;right:0;top:52px;z-index:60;background:var(--gc-card);border:1px solid var(--gc-border);
  border-radius:11px;box-shadow:0 12px 32px rgba(0,0,0,.13);min-width:210px;overflow:hidden;}
.gc-menu button{display:flex;align-items:center;gap:9px;width:100%;padding:13px 16px;background:none;border:none;
  border-bottom:1px solid var(--gc-border);font-size:13.5px;font-weight:600;color:var(--gc-text);cursor:pointer;
  font-family:var(--gc-sans);text-align:left;}
.gc-menu button:last-child{border-bottom:none;}
.gc-menu button:hover{background:var(--gc-surface);}

/* hero */
.gc-hero{position:relative;text-align:center;padding:56px 26px 44px;overflow:hidden;}
.gc-crest{position:absolute;right:-30px;top:50%;transform:translateY(-50%);width:400px;opacity:.05;pointer-events:none;}
.gc-inner{position:relative;z-index:1;}
.gc-eyebrow{margin:0;font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gc-accent);}
.gc-h1{font-family:var(--gc-serif);font-weight:600;font-size:56px;line-height:1.1;margin:16px 0 0;letter-spacing:.005em;}
.gc-rule{display:flex;align-items:center;justify-content:center;gap:9px;margin:20px 0 26px;}
.gc-rule s{display:block;width:52px;height:1px;background:var(--gc-accent);opacity:.65;}
.gc-rule em{display:block;width:6px;height:6px;background:var(--gc-accent);transform:rotate(45deg);opacity:.85;}
.gc-hero-tabs{display:none;justify-content:center;margin:18px 0 0;}

/* search */
.gc-search{position:relative;max-width:660px;margin:0 auto;}
.gc-search input{width:100%;box-sizing:border-box;padding:18px 46px 18px 50px;font-size:15.5px;font-family:var(--gc-sans);
  border:1px solid var(--gc-border);border-radius:10px;background:var(--gc-card);color:var(--gc-text);outline:none;}
.gc-search input:focus{border-color:var(--gc-accent);box-shadow:0 0 0 3px rgba(184,148,95,.13);}
.gc-search .gc-mag{position:absolute;left:17px;top:50%;transform:translateY(-50%);color:var(--gc-muted);pointer-events:none;}
.gc-clear{position:absolute;right:13px;top:50%;transform:translateY(-50%);width:25px;height:25px;border-radius:50%;
  border:none;background:var(--gc-border);color:var(--gc-muted);cursor:pointer;font-size:14px;line-height:1;font-family:var(--gc-sans);}

/* CTAs */
.gc-cta{display:flex;flex-direction:column;gap:13px;max-width:520px;margin:24px auto 0;}
.gc-btn{display:flex;align-items:center;justify-content:center;gap:11px;padding:17px 24px;border-radius:9px;
  font-size:15px;font-weight:600;cursor:pointer;font-family:var(--gc-sans);transition:filter .15s,background .15s;}
.gc-btn:disabled{opacity:.55;cursor:default;}
.gc-btn-primary{background:var(--gc-accent);color:#fff;border:1px solid var(--gc-accent);}
.gc-btn-primary:hover:not(:disabled){filter:brightness(.94);}
.gc-btn-ghost{background:transparent;color:var(--gc-accent-dark);border:1px solid var(--gc-accent);}
.gc-btn-ghost:hover:not(:disabled){background:rgba(184,148,95,.08);}
.gc-help{margin:20px auto 0;max-width:470px;font-size:14px;line-height:1.6;color:var(--gc-muted);}

/* footer */
.gc-foot{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;
  border-top:1px solid var(--gc-border);padding:20px 16px;}
.gc-foot button{display:flex;align-items:center;gap:9px;padding:6px 26px;background:none;border:none;
  font-size:14px;font-weight:500;color:var(--gc-text);cursor:pointer;font-family:var(--gc-sans);
  border-right:1px solid var(--gc-border);}
.gc-foot button:last-child{border-right:none;}
.gc-foot button:hover{color:var(--gc-accent-dark);}
.gc-foot .gc-chev{display:none;}
.gc-foot .gc-badge{background:var(--gc-accent);color:#fff;border-radius:11px;padding:1px 8px;font-size:11.5px;font-weight:700;}

/* results area */
.gc-body{padding:0 26px 34px;}
.gc-body-inner{max-width:700px;margin:0 auto;}

/* ── TABLET ── */
@media (max-width:1023px){
  .gc-page{padding:14px;}
  .gc-h1{font-size:46px;}
  .gc-hero{padding:46px 22px 38px;}
  .gc-top{padding:18px 22px;}
  .gc-mark b{font-size:25px;}
  .gc-tab{padding:10px 20px;font-size:14px;}
  .gc-foot button{padding:6px 18px;font-size:13.5px;}
}
/* ── MOBILE ── */
@media (max-width:719px){
  .gc-page{padding:0;background:var(--gc-surface);}
  .gc-shell{border:none;border-radius:0;box-shadow:none;max-width:none;}
  .gc-top{justify-content:center;padding:22px 16px 16px;border-bottom:none;}
  .gc-mark{text-align:center;}
  .gc-mark b{font-size:27px;letter-spacing:.16em;}
  .gc-top-right{display:none;}
  .gc-hero{padding:6px 20px 30px;}
  .gc-hero-tabs{display:flex;gap:0;justify-content:center;margin:16px 0 0;}
  .gc-hero-tabs .gc-tab{flex:1;max-width:152px;border-radius:0;}
  .gc-hero-tabs .gc-tab:first-child{border-radius:7px 0 0 7px;}
  .gc-hero-tabs .gc-tab:last-child{border-radius:0 7px 7px 0;border-left:none;}
  .gc-h1{font-size:37px;margin-top:26px;}
  .gc-eyebrow{font-size:11px;letter-spacing:.15em;}
  .gc-crest{width:300px;right:-70px;opacity:.045;}
  .gc-search input{padding:15px 42px 15px 46px;font-size:15px;}
  .gc-cta{gap:11px;margin-top:22px;}
  .gc-btn{padding:16px 20px;}
  .gc-help{font-size:13.5px;}
  .gc-body{padding:0 18px 30px;}
  /* footer becomes a tap list */
  .gc-foot{display:block;padding:0;background:#F3EFE8;border-top:1px solid var(--gc-border);}
  .gc-foot button{width:100%;justify-content:flex-start;padding:17px 20px;border-right:none;
    border-bottom:1px solid var(--gc-border);font-size:15px;box-sizing:border-box;}
  .gc-foot button:last-child{border-bottom:none;}
  .gc-foot .gc-chev{display:block;margin-left:auto;color:var(--gc-muted);}
}
`;

// ─── CATEGORY CONFIG ─────────────────────────────────────────────
const CAT_COLOR = {
  "Order Status":       D.accent,
  "Fit Issues":         "#0891b2",
  "Style Issues":       "#7c3aed",
  "Style Dispute":      "#7c3aed",
  "Production":         D.success,
  "Wear & Tear":        "#d97706",
  "Alteration Policy":  "#9333ea",
  "Refunds":            D.danger,
  "GC Error":           D.danger,
  "Shipping":           "#2563eb",
  "Pricing":            D.success,
  "Payment":            D.muted,
  "Customer Relations": "#d97706",
};

const CATEGORIES = Object.keys(CAT_COLOR);

const GROUPS = [
  { label: "All",                  cats: null },
  { label: "Orders & Shipping",    cats: ["Order Status","Shipping","GC Error"] },
  { label: "Fit & Alterations",    cats: ["Fit Issues","Alteration Policy"] },
  { label: "Style & Production",   cats: ["Style Issues","Style Dispute","Production","Wear & Tear"] },
  { label: "Payments",             cats: ["Pricing","Payment","Refunds"] },
  { label: "Customer",             cats: ["Customer Relations"] },
];

const PRIORITY_IDS = ["p8","p2","p3","p9","p11","p12"];

// ─── TAGS (symptom-based facets) ─────────────────────────────────
const TAG_META = {
  timing:          "Timing & Delivery",
  fit:             "Fit",
  style:           "Style & Details",
  missing:         "Missing / Wrong Item",
  fabric:          "Fabric & Quality",
  alterations:     "Alterations",
  personalization: "Personalization",
  money:           "Money",
  refund:          "Refunds",
  pricing:         "Pricing",
  payment:         "Payments",
  "new-order":     "New Orders",
  escalation:      "Escalation",
};
const ALL_TAGS = Object.keys(TAG_META);

// ─── STAFF ACCESS ────────────────────────────────────────────────
// Shared passcode that unlocks editing, the Needs-Answers inbox, and flagging.
// NOTE: this is a public single-file app, so this is light deterrence (keeps casual
// visitors from editing your shared data) — not server-grade security.
// >>> Change this to the passcode you want staff to use. <<<
const STAFF_PASSCODE = "Gc1505123!";

// ─── AI BACKEND (optional) ───────────────────────────────────────
// Base URL of the deployed AI service (protocol-desk-ai). Empty = AI features hidden.
// Set this to the Railway URL once deployed, e.g. "https://protocol-desk-ai-production.up.railway.app".
const AI_BACKEND_URL = "https://protocol-desk-ai-production.up.railway.app";
const TEMPLATES_LIVE = true;   // Templates content approved & live (2026-07-19)
// Session credentials sent with backend calls (set by the app on login / staff unlock).
const SESSION = { staff: false, agentUser: "", agentPass: "" };
const aiCall = async (path, body, method = "POST") => {
  const headers = { "content-type": "application/json" };
  if (SESSION.staff) headers["x-staff-passcode"] = STAFF_PASSCODE;
  if (SESSION.agentUser) { headers["x-agent-user"] = SESSION.agentUser; headers["x-agent-pass"] = SESSION.agentPass; }
  const opts = { method, headers };
  if (method !== "GET" && body) opts.body = JSON.stringify(body);
  const r = await fetch(AI_BACKEND_URL + path, opts);
  if (!r.ok) throw new Error("Request failed (" + r.status + ")");
  return r.json();
};
// Verify an agent login against the backend; on success remember it for the session.
const agentLoginCall = async (username, passcode) => {
  try {
    const r = await fetch(AI_BACKEND_URL + "/agent/login", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, passcode }),
    });
    if (!r.ok) return null;
    const j = await r.json();
    if (j && j.ok) { SESSION.agentUser = username; SESSION.agentPass = passcode; return j.name || username; }
  } catch {}
  return null;
};

// ─── COMMON SITUATIONS (plain-language quick picks → a protocol) ──
const SITUATIONS = [
  { label: "Where's my order?",          icon: "📦", pid: "p1"  },
  { label: "Shipping / delivery delay",  icon: "🚚", pid: "p11" },
  { label: "Doesn't fit",                icon: "👔", pid: "p2"  },
  { label: "Too tight, can't let out",   icon: "📏", pid: "p16" },
  { label: "Still off after alterations",icon: "🔄", pid: "p15" },
  { label: "Wrong style detail",         icon: "🧥", pid: "p19" },
  { label: "Something's missing",        icon: "📭", pid: "p9"  },
  { label: "Wrong monogram / name",      icon: "🪡", pid: "p10" },
  { label: "Fabric ripped or pilling",   icon: "🧵", pid: "p6"  },
  { label: "Wants a refund",             icon: "💳", pid: "p8"  },
  { label: "Price / discount",           icon: "💰", pid: "p13" },
  { label: "Hasn't paid",                icon: "💵", pid: "p14" },
  { label: "Change a detail now",        icon: "✂️", pid: "p4"  },
  { label: "Extend alteration window",   icon: "📅", pid: "p7"  },
  { label: "Order more pieces",          icon: "➕", pid: "p17" },
  { label: "Wants to talk to Runi",      icon: "👤", pid: "p12" },
];

// ─── TRIAGE TREE (guided "help me find it") ──────────────────────
// Each option either jumps to a protocol (pid) or descends to another node (go).
const TRIAGE = {
  start: {
    q: "What is the customer reaching out about?",
    options: [
      { label: "Where their order is / when it'll be ready", icon: "📦", go: "timing" },
      { label: "How the garment fits",                        icon: "👔", go: "fit" },
      { label: "A style detail (lapel, buttons, lining…)",    icon: "🧥", go: "style" },
      { label: "Something missing or the wrong item",         icon: "📭", go: "missing" },
      { label: "Personalization (monogram, name, embroidery)",icon: "🪡", pid: "p10" },
      { label: "Fabric quality — rip, pilling, snag",         icon: "🧵", pid: "p6" },
      { label: "Money — price, discount, payment, refund",    icon: "💰", go: "money" },
      { label: "Wants to order more / add pieces",            icon: "➕", pid: "p17" },
      { label: "Insists on speaking with Runi",               icon: "👤", pid: "p12" },
    ],
  },
  timing: {
    q: "More specifically…",
    options: [
      { label: "When will it be ready? (general ETA)",                 pid: "p1" },
      { label: "Shipping / delivery delay, or a specific event date",  pid: "p11" },
    ],
  },
  fit: {
    q: "What's the fit problem?",
    options: [
      { label: "General fit complaint after delivery",          pid: "p2" },
      { label: "Too tight — no room left to let out",            pid: "p16" },
      { label: "Still not right after 2+ alterations",           pid: "p15" },
      { label: "Wants to extend the window / came in late",      pid: "p7" },
      { label: "Wants reimbursement for a local tailor",         pid: "p18" },
    ],
  },
  style: {
    q: "Which style situation?",
    options: [
      { label: "A detail is wrong or missing (look it up)",                pid: "p19" },
      { label: "Insists a detail was agreed but it's not on the form",     pid: "p20" },
      { label: "Claims the whole item is wrong (style / color)",           pid: "p3" },
      { label: "Wants to change a detail now (after the appointment)",     pid: "p4" },
      { label: "Just confirming a detail was captured",                    pid: "p5" },
    ],
  },
  missing: {
    q: "What's missing or wrong?",
    options: [
      { label: "An item is missing from the package", pid: "p9" },
      { label: "Received the wrong item entirely",    pid: "p3" },
      { label: "Monogram / name is wrong or missing", pid: "p10" },
    ],
  },
  money: {
    q: "What kind of money question?",
    options: [
      { label: "Wants a refund",                              pid: "p8" },
      { label: "Price, discount, or bulk pricing",            pid: "p13" },
      { label: "Hasn't paid / outstanding balance",           pid: "p14" },
      { label: "Reimbursement for a local tailor's work",     pid: "p18" },
    ],
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────
const isHeader = s => s?.startsWith("━━");
const isRule   = s => s?.startsWith("ALWAYS FIRST") || s?.startsWith("GENERAL RULE") || s?.startsWith("FIRST —");

const groupSteps = (steps = []) => {
  const groups = []; let cur = { header: null, items: [] };
  steps.forEach(s => {
    if (isHeader(s)) {
      if (cur.items.length || cur.header) groups.push(cur);
      cur = { header: s.replace(/━━\s?/g,"").replace(/\s?━━/g,"").trim(), items: [] };
    } else cur.items.push(s);
  });
  if (cur.items.length || cur.header) groups.push(cur);
  return groups;
};

// Next unique protocol id ("p" + first free number) — never collides with existing ids.
const nextId = (list) => {
  const nums = list
    .map(p => parseInt(String(p.id).replace(/\D/g, ""), 10))
    .filter(n => !isNaN(n));
  const max = nums.length ? Math.max(...nums) : 0;
  return "p" + (max + 1);
};

// ── Steps <-> editable rows (preserves the ━━ header and rule-prefix conventions) ──
const ROW_KINDS = { STEP: "step", HEADER: "header", RULE: "rule" };
const RULE_PREFIXES = ["ALWAYS FIRST", "GENERAL RULE", "FIRST —"];

const stepsToRows = (steps = []) => steps.map(s => {
  if (isHeader(s)) return { kind: ROW_KINDS.HEADER, text: s.replace(/━━\s?/g,"").replace(/\s?━━/g,"").trim() };
  if (isRule(s))   return { kind: ROW_KINDS.RULE,   text: s };          // keep prefix so edit round-trips
  return { kind: ROW_KINDS.STEP, text: s };
});

const rowsToSteps = (rows = []) => rows
  .filter(r => r.text && r.text.trim())
  .map(r => {
    const t = r.text.trim();
    if (r.kind === ROW_KINDS.HEADER) return `━━ ${t} ━━`;
    if (r.kind === ROW_KINDS.RULE) {
      const hasPrefix = RULE_PREFIXES.some(p => t.startsWith(p));
      return hasPrefix ? t : `ALWAYS FIRST: ${t}`;  // guarantee isRule() stays true
    }
    return t;
  });

// ─── SMART "ASK" SEARCH ──────────────────────────────────────────
// Ranks protocols by relevance to a natural-language question. Fully local
// (no network) — weights keyword/title/tag/trigger/step matches. Answers unchanged.
const STOPWORDS = new Set(("a an the is are was were be been being am to of for on in it its " +
  "at as by with from about into over after before i we you they he she him her me my our your " +
  "their this that these those customer client said say says saying tell told ask asks asked " +
  "want wants wanted need needs needed reached out has have had having do does did just really " +
  "very please help can could would should will what when where who why how which if or but so").split(/\s+/));

const tokenize = (s) => (s || "").toLowerCase()
  .replace(/[^a-z0-9\s]/g, " ")
  .split(/\s+/)
  .filter(w => w.length > 1 && !STOPWORDS.has(w));

const scoreProtocol = (p, tokens) => {
  const kw    = (p.keywords || "").toLowerCase();
  const title = (p.title || "").toLowerCase();
  const tagTx = (p.tags || []).map(t => (TAG_META[t] || t).toLowerCase()).join(" ") + " " + (p.tags || []).join(" ");
  const trig  = (p.trigger || "").toLowerCase();
  const steps = (p.steps || []).join("  ").toLowerCase();
  let score = 0;
  const matched = new Set();
  tokens.forEach(tok => {
    let hit = false;
    if (kw.includes(tok))    { score += 8; hit = true; }
    if (title.includes(tok)) { score += 6; hit = true; }
    if (tagTx.includes(tok)) { score += 4; hit = true; }
    if (trig.includes(tok))  { score += 3; hit = true; }
    if (steps.includes(tok)) { score += 1; hit = true; }
    if (hit) matched.add(tok);
  });
  score += matched.size * 2;
  return { score, matched: [...matched] };
};

const rankProtocols = (protocols, query) => {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  return protocols
    .map(p => ({ p, ...scoreProtocol(p, tokens) }))
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score || a.p.title.length - b.p.title.length);
};

const StepNum = ({ n, color }) => (
  <span style={{ width:"22px", height:"22px", borderRadius:"50%", background: color, color:"#fff",
    display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:800,
    flexShrink:0, fontFamily:FONT }}>{n}</span>
);

// ─── SMALL COMPONENTS ────────────────────────────────────────────
const CategoryPill = ({ category, small }) => {
  const color = CAT_COLOR[category] || D.muted;
  return (
    <span style={{ display:"inline-block", fontSize: small?"10px":"11px", fontWeight:700, letterSpacing:"0.4px",
      color, background: color + "18", padding: small?"2px 8px":"3px 11px", borderRadius:"20px", lineHeight:1.6 }}>
      {category}
    </span>
  );
};

const ApprovalBadge = ({ escalate, small }) => escalate ? (
  <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", fontSize: small?"10px":"11px",
    fontWeight:700, color: D.danger, background: D.dangerBg, padding: small?"2px 8px":"3px 11px",
    borderRadius:"20px", lineHeight:1.6 }}>
    <span>⚠</span> Needs Runi Approval
  </span>
) : (
  <span style={{ display:"inline-flex", alignItems:"center", gap:"4px", fontSize: small?"10px":"11px",
    fontWeight:600, color: D.success, background: D.successBg, padding: small?"2px 8px":"3px 11px",
    borderRadius:"20px", lineHeight:1.6 }}>
    ✓ Can Handle Directly
  </span>
);

const CopyButton = ({ text, label = "Copy Response", small = false }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
    try {
      navigator.clipboard.writeText(text).then(done, () => { fallbackCopy(text); done(); });
    } catch { fallbackCopy(text); done(); }
  };
  return (
    <button onClick={copy} style={{ display:"flex", alignItems:"center", gap:"6px",
      padding: small ? "5px 12px" : "8px 16px",
      background: copied ? D.success : D.surface, color: copied ? "#fff" : D.muted,
      border: `1.5px solid ${copied ? D.success : D.border}`, borderRadius:"8px",
      fontSize: small ? "11px" : "12px", fontWeight:600, cursor:"pointer", transition:"all 0.2s",
      fontFamily:FONT, flexShrink:0 }}>
      {copied ? "✓ Copied" : label}
    </button>
  );
};

// Clipboard fallback for non-secure contexts.
function fallbackCopy(text) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.focus(); ta.select();
    document.execCommand("copy"); document.body.removeChild(ta);
  } catch {}
}

// Split approved language into individually-copyable responses (by blank-line variants).
// A leading "Label:" line becomes the card heading; the quote/body is what gets copied.
const splitResponses = (text) => {
  if (!text) return [];
  return text.split(/\n\n+/).map(block => {
    const lines = block.split("\n");
    let label = null, bodyLines = lines;
    if (lines.length > 1 && /:\s*$/.test(lines[0]) && !lines[0].trim().startsWith('"')) {
      label = lines[0].replace(/:\s*$/, "").trim();
      bodyLines = lines.slice(1);
    }
    return { label, body: bodyLines.join("\n").trim() };
  }).filter(s => s.body);
};

const DetailSection = ({ title, children, color, icon }) => (
  <div style={{ background: D.surface, borderRadius:"14px", border:`1.5px solid ${color || D.border}`,
    overflow:"hidden", marginBottom:"12px" }}>
    <div style={{ padding:"14px 20px", borderBottom:`1px solid ${color || D.border}`,
      display:"flex", alignItems:"center", gap:"8px",
      background: color ? color + "0D" : D.surfaceSoft }}>
      {icon && <span style={{ fontSize:"15px" }}>{icon}</span>}
      <span style={{ fontSize:"11px", fontWeight:800, letterSpacing:"1px", textTransform:"uppercase",
        color: color || D.muted, fontFamily:FONT }}>{title}</span>
    </div>
    <div style={{ padding:"16px 20px" }}>{children}</div>
  </div>
);

// ─── STEP GROUPS COMPONENT ───────────────────────────────────────
const StepGroups = ({ steps, protocolId }) => {
  const [open, setOpen] = useState({});
  const groups = groupSteps(steps);
  const isLong = steps.length > 15;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"4px" }}>
      {groups.map((g, gi) => (
        <div key={gi}>
          {g.header && (
            <button onClick={() => setOpen(p => ({...p, [`${protocolId}-${gi}`]: !p[`${protocolId}-${gi}`]}))}
              style={{ width:"100%", background: D.accent + "15", border:`1px solid ${D.accent}30`,
                color: D.accentDark, padding:"9px 14px", borderRadius:"9px", fontSize:"11px",
                fontWeight:700, letterSpacing:"0.8px", textTransform:"uppercase",
                display:"flex", justifyContent:"space-between", alignItems:"center",
                cursor:"pointer", marginTop:"6px", marginBottom:"3px", fontFamily:FONT }}>
              {g.header}
              <span style={{ fontSize:"11px", opacity:0.6 }}>
                {(!isLong || open[`${protocolId}-${gi}`]) ? "▲" : "▼"}
              </span>
            </button>
          )}
          {(!g.header || !isLong || open[`${protocolId}-${gi}`]) && (
            <div style={{ display:"flex", flexDirection:"column", gap:"3px" }}>
              {g.items.map((step, si) => {
                const rule = isRule(step);
                return (
                  <div key={si} style={{ display:"flex", gap:"12px", alignItems:"flex-start",
                    padding:"11px 14px", borderRadius:"9px",
                    background: rule ? "#FEFBEA" : (si % 2 === 0 ? D.surfaceSoft : D.surface),
                    border: rule ? `1.5px solid ${D.accent}60` : "none" }}>
                    <div style={{ minWidth:"24px", height:"24px", borderRadius:"50%", flexShrink:0,
                      background: rule ? D.accent : D.border, color: rule ? "#fff" : D.muted,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:"11px", fontWeight:800, marginTop:"1px" }}>
                      {rule ? "!" : si + 1}
                    </div>
                    <span style={{ fontSize:"14px", lineHeight:"1.7", color: rule ? D.accentDark : D.text,
                      fontWeight: rule ? 600 : 400, fontFamily:FONT }}>{step}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── PROTOCOL CARD ───────────────────────────────────────────────
const ProtocolCard = ({ p, onClick, compact }) => {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={() => onClick(p)}
      onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}
      style={{ background: D.surface, borderRadius:"14px", padding: compact?"12px 14px":"16px 18px",
        border:`1.5px solid ${hover ? D.accent + "60" : D.border}`,
        boxShadow: hover ? "0 4px 20px rgba(0,0,0,0.07)" : "0 1px 4px rgba(0,0,0,0.04)",
        cursor:"pointer", transition:"all 0.18s", display:"flex", gap:"12px", alignItems:"flex-start",
        fontFamily:FONT }}>
      <div style={{ fontSize: compact?"22px":"26px", flexShrink:0, lineHeight:1, marginTop:"2px" }}>{p.icon||"📋"}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px", flexWrap:"wrap", marginBottom:"5px" }}>
          <CategoryPill category={p.category} small />
          <ApprovalBadge escalate={p.escalate} small />
        </div>
        <div style={{ fontSize: compact?"13px":"14px", fontWeight:700, color:D.text, lineHeight:1.35, marginBottom: compact?"0":"4px" }}>
          {p.title}
        </div>
        {!compact && (
          <p style={{ margin:0, fontSize:"12px", color:D.muted, lineHeight:"1.5",
            overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
            {p.trigger}
          </p>
        )}
      </div>
      <span style={{ color: D.border, fontSize:"16px", flexShrink:0, alignSelf:"center", marginTop: compact?0:"2px" }}>›</span>
    </div>
  );
};

// ─── FORM PRIMITIVES ─────────────────────────────────────────────
// ─── Line icons (inline SVG, stroke follows currentColor) ────────
const Ico = ({ d, size = 18, fill = "none", extra }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
    strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
    <path d={d} />{extra}
  </svg>
);
const IcoSearch  = (p) => <Ico {...p} d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" extra={<path d="m21 21-4.35-4.35" />} />;
const IcoSparkle = (p) => <Ico {...p} d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />;
const IcoMail    = (p) => <Ico {...p} d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z" extra={<path d="m3.5 7 8.5 6 8.5-6" />} />;
const IcoBook    = (p) => <Ico {...p} d="M12 6.5S10 4.5 4 5v13c6-.5 8 1.5 8 1.5s2-2 8-1.5V5c-6-.5-8 1.5-8 1.5Z" extra={<path d="M12 6.5v13" />} />;
const IcoUser    = (p) => <Ico {...p} d="M20 20v-1.5c0-2.5-3.6-4-8-4s-8 1.5-8 4V20" extra={<circle cx="12" cy="8" r="4" />} />;
const IcoLock    = (p) => <Ico {...p} d="M5 11.5A1.5 1.5 0 0 1 6.5 10h11a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5v-7Z" extra={<path d="M8 10V7.5a4 4 0 1 1 8 0V10" />} />;
const IcoChev    = (p) => <Ico {...p} size={17} d="m9 5 7 7-7 7" />;
const IcoCheck   = (p) => <Ico {...p} d="M20 6 9 17l-5-5" />;
const IcoBrain   = (p) => <Ico {...p} d="M12 5a3 3 0 0 0-6 0 3 3 0 0 0-1 5.8A3 3 0 0 0 7 17a3 3 0 0 0 5 2 3 3 0 0 0 5-2 3 3 0 0 0 2-6.2A3 3 0 0 0 18 5a3 3 0 0 0-6 0Z" extra={<path d="M12 5v14" />} />;
const IcoFlag    = (p) => <Ico {...p} d="M5 21V4m0 0h11l-2 4 2 4H5" />;
const IcoClock   = (p) => <Ico {...p} d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" extra={<path d="M12 7v5l3 2" />} />;
const IcoPlus    = (p) => <Ico {...p} d="M12 5v14M5 12h14" />;
const IcoUsers   = (p) => <Ico {...p} d="M17 20v-1.5c0-2-2.7-3.5-6-3.5s-6 1.5-6 3.5V20" extra={<><circle cx="11" cy="8" r="3.5" /><path d="M19 15.5c1.6.5 2.7 1.5 2.7 2.7V20" /></>} />;
// The faint heraldic watermark behind the hero.
const Crest = () => (
  <svg className="gc-crest" viewBox="0 0 200 220" fill="none" aria-hidden="true">
    <path d="M100 8 190 34v92c0 48-40 74-90 86-50-12-90-38-90-86V34L100 8Z" stroke="#6F5533" strokeWidth="2.5" />
    <path d="M100 26 172 47v78c0 39-32 61-72 71-40-10-72-32-72-71V47l72-21Z" stroke="#6F5533" strokeWidth="1.2" />
    <text x="100" y="145" textAnchor="middle" fill="#6F5533"
      style={{ font: "600 96px 'Cormorant Garamond', Georgia, serif" }}>G</text>
  </svg>
);

const inputStyle = {
  width:"100%", padding:"11px 14px", fontSize:"14px", border:`1.5px solid ${D.border}`,
  borderRadius:"10px", outline:"none", background:D.surface, color:D.text,
  boxSizing:"border-box", fontFamily:FONT, lineHeight:1.6,
};
const labelStyle = {
  display:"block", fontSize:"11px", fontWeight:800, letterSpacing:"0.8px", textTransform:"uppercase",
  color:D.muted, marginBottom:"7px", fontFamily:FONT,
};
const Field = ({ label, hint, children }) => (
  <div style={{ marginBottom:"16px" }}>
    <label style={labelStyle}>{label}</label>
    {children}
    {hint && <p style={{ margin:"6px 2px 0", fontSize:"11.5px", color:D.muted, lineHeight:1.5 }}>{hint}</p>}
  </div>
);

const ROW_META = {
  [ROW_KINDS.STEP]:   { label: "Step",           color: D.muted,   chip: "Step" },
  [ROW_KINDS.HEADER]: { label: "Section header", color: D.accentDark, chip: "━━ Section" },
  [ROW_KINDS.RULE]:   { label: "Critical rule",  color: D.accent,  chip: "! Rule" },
};

// ─── STEPS EDITOR ────────────────────────────────────────────────
const StepsEditor = ({ rows, setRows }) => {
  const setRow = (i, patch) => setRows(rs => rs.map((r, idx) => idx === i ? { ...r, ...patch } : r));
  const removeRow = (i) => setRows(rs => rs.filter((_, idx) => idx !== i));
  const addRow = (kind) => setRows(rs => [...rs, { kind, text: "" }]);
  const move = (i, dir) => setRows(rs => {
    const j = i + dir;
    if (j < 0 || j >= rs.length) return rs;
    const copy = [...rs];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    return copy;
  });

  return (
    <div>
      {rows.length === 0 && (
        <p style={{ margin:"0 0 12px", fontSize:"13px", color:D.muted, fontStyle:"italic" }}>
          No steps yet — add the internal steps staff should follow, in order.
        </p>
      )}
      <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
        {rows.map((r, i) => {
          const meta = ROW_META[r.kind];
          return (
            <div key={i} style={{ border:`1.5px solid ${meta.color}40`, borderRadius:"11px",
              background: r.kind === ROW_KINDS.STEP ? D.surfaceSoft : meta.color + "0D", padding:"10px 12px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px", flexWrap:"wrap" }}>
                <select value={r.kind} onChange={e => setRow(i, { kind: e.target.value })}
                  style={{ ...inputStyle, width:"auto", padding:"5px 10px", fontSize:"12px", fontWeight:700,
                    color: meta.color, borderColor: meta.color + "50" }}>
                  <option value={ROW_KINDS.STEP}>Step</option>
                  <option value={ROW_KINDS.HEADER}>Section header</option>
                  <option value={ROW_KINDS.RULE}>Critical rule</option>
                </select>
                <span style={{ flex:1 }} />
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0}
                  style={{ ...iconBtn, opacity: i === 0 ? 0.3 : 1 }}>↑</button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1}
                  style={{ ...iconBtn, opacity: i === rows.length - 1 ? 0.3 : 1 }}>↓</button>
                <button type="button" onClick={() => removeRow(i)}
                  style={{ ...iconBtn, color: D.danger, borderColor: D.danger + "50" }}>✕</button>
              </div>
              <textarea value={r.text} onChange={e => setRow(i, { text: e.target.value })}
                rows={r.kind === ROW_KINDS.HEADER ? 1 : 2}
                placeholder={
                  r.kind === ROW_KINDS.HEADER ? "Section title (e.g. JACKET STYLE)"
                  : r.kind === ROW_KINDS.RULE ? "The must-do-first rule (auto-flagged with a ! highlight)"
                  : "What to do at this step"
                }
                style={{ ...inputStyle, resize:"vertical", fontSize:"13.5px" }} />
            </div>
          );
        })}
      </div>
      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginTop:"12px" }}>
        <button type="button" onClick={() => addRow(ROW_KINDS.STEP)} style={addBtn}>＋ Step</button>
        <button type="button" onClick={() => addRow(ROW_KINDS.HEADER)} style={addBtn}>＋ Section header</button>
        <button type="button" onClick={() => addRow(ROW_KINDS.RULE)} style={addBtn}>＋ Critical rule</button>
      </div>
      <p style={{ margin:"10px 2px 0", fontSize:"11.5px", color:D.muted, lineHeight:1.5 }}>
        <strong>Section headers</strong> become collapsible dividers. <strong>Critical rules</strong> are highlighted
        with a ! and pinned visually — if you don't start one with "ALWAYS FIRST", "GENERAL RULE", or "FIRST —", it
        will be prefixed with "ALWAYS FIRST:" automatically so the highlight triggers.
      </p>
    </div>
  );
};

const iconBtn = {
  width:"30px", height:"30px", borderRadius:"8px", border:`1.5px solid ${D.border}`,
  background:D.surface, color:D.muted, cursor:"pointer", fontSize:"13px", fontWeight:700,
  display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FONT, flexShrink:0,
};
const addBtn = {
  padding:"8px 14px", borderRadius:"9px", border:`1.5px dashed ${D.accent}80`,
  background:D.accent + "12", color:D.accentDark, cursor:"pointer", fontSize:"12px",
  fontWeight:700, fontFamily:FONT,
};

// ─── PROTOCOL FORM (ADD / EDIT) ──────────────────────────────────
const ProtocolForm = ({ initial, onSave, onCancel, isNew: isNewProp }) => {
  const isNew = isNewProp !== undefined ? isNewProp : !initial;
  const [f, setF] = useState(() => ({
    id:        initial?.id,
    title:     initial?.title || "",
    category:  initial?.category || CATEGORIES[0],
    icon:      initial?.icon || "📋",
    trigger:   initial?.trigger || "",
    approvedLanguage: initial?.approvedLanguage || "",
    avoid:     initial?.avoid || "",
    escalate:  !!initial?.escalate,
    keywords:  initial?.keywords || "",
    tags:      Array.isArray(initial?.tags) ? initial.tags : [],
  }));
  const [rows, setRows] = useState(() => initial ? stepsToRows(initial.steps) : []);
  const [error, setError] = useState("");
  const [aiBusy, setAiBusy] = useState(false);

  const upd = (k, v) => setF(p => ({ ...p, [k]: v }));

  const formatWithAI = async () => {
    if (!f.approvedLanguage.trim() || aiBusy) return;
    setAiBusy(true);
    try {
      const { formatted } = await aiCall("/ai/format", { text: f.approvedLanguage });
      if (formatted) upd("approvedLanguage", formatted);
    } catch (e) {
      alert("AI formatting didn't work: " + (e.message || e));
    } finally {
      setAiBusy(false);
    }
  };

  const submit = () => {
    if (!f.title.trim())   { setError("Please add a title."); return; }
    if (!f.trigger.trim()) { setError("Please fill in \"When to use this.\""); return; }
    setError("");
    onSave({
      id: f.id,                                  // undefined for new → parent assigns
      title: f.title.trim(),
      category: f.category,
      icon: f.icon.trim() || "📋",
      trigger: f.trigger.trim(),
      steps: rowsToSteps(rows),
      approvedLanguage: f.approvedLanguage.trim(),
      avoid: f.avoid.trim(),
      escalate: f.escalate,
      keywords: f.keywords.trim(),
      tags: f.tags,
    }, isNew);
  };

  const EscToggle = ({ value, label, sublabel, active, color, bg, onClick }) => (
    <button type="button" onClick={onClick}
      style={{ flex:1, textAlign:"left", padding:"12px 14px", borderRadius:"11px", cursor:"pointer",
        border:`1.5px solid ${active ? color : D.border}`, background: active ? bg : D.surface,
        fontFamily:FONT, transition:"all 0.15s" }}>
      <div style={{ fontSize:"13px", fontWeight:800, color: active ? color : D.text }}>{label}</div>
      <div style={{ fontSize:"11.5px", color: active ? color : D.muted, marginTop:"2px", lineHeight:1.4 }}>{sublabel}</div>
    </button>
  );

  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      {/* sticky header */}
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface,
        borderBottom:`1px solid ${D.border}`, padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={onCancel}
            style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"8px",
              padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted, fontWeight:600,
              flexShrink:0, fontFamily:FONT }}>
            ← Cancel
          </button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>
            {isNew ? "New Protocol" : "Edit Protocol"}
          </h2>
          <button onClick={submit}
            style={{ background:D.accent, border:`1.5px solid ${D.accent}`, borderRadius:"8px",
              padding:"8px 20px", cursor:"pointer", fontSize:"13px", color:"#fff", fontWeight:700,
              flexShrink:0, fontFamily:FONT }}>
            {isNew ? "Add Protocol" : "Save Changes"}
          </button>
        </div>
      </div>

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"20px 16px 56px" }}>
        {error && (
          <div style={{ background:D.dangerBg, border:`1.5px solid ${D.danger}40`, borderRadius:"11px",
            padding:"11px 16px", marginBottom:"14px", fontSize:"13px", color:D.danger, fontWeight:600 }}>
            {error}
          </div>
        )}

        {/* Basics */}
        <DetailSection title="The Basics" icon="📌" color={D.border}>
          <Field label="Title">
            <input value={f.title} onChange={e => upd("title", e.target.value)}
              placeholder="e.g. Customer Asking for ETA" style={inputStyle} />
          </Field>
          <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
            <div style={{ flex:"1 1 200px" }}>
              <Field label="Category">
                <select value={f.category} onChange={e => upd("category", e.target.value)} style={inputStyle}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
            </div>
            <div style={{ width:"120px" }}>
              <Field label="Icon">
                <input value={f.icon} onChange={e => upd("icon", e.target.value)}
                  placeholder="📋" style={{ ...inputStyle, textAlign:"center", fontSize:"20px" }} />
              </Field>
            </div>
          </div>
          <Field label="Approval Level">
            <div style={{ display:"flex", gap:"10px" }}>
              <EscToggle active={!f.escalate} color={D.success} bg={D.successBg}
                label="✓ Can Handle Directly" sublabel="Staff can resolve without sign-off"
                onClick={() => upd("escalate", false)} />
              <EscToggle active={f.escalate} color={D.danger} bg={D.dangerBg}
                label="⚠ Needs Runi Approval" sublabel="Must check with Runi before promising"
                onClick={() => upd("escalate", true)} />
            </div>
          </Field>
        </DetailSection>

        {/* When to use */}
        <DetailSection title="When to Use This" icon="📌">
          <textarea value={f.trigger} onChange={e => upd("trigger", e.target.value)} rows={3}
            placeholder="Describe the situation this protocol applies to."
            style={{ ...inputStyle, resize:"vertical" }} />
        </DetailSection>

        {/* Findability: tags + keywords */}
        <DetailSection title="Help Staff Find This" icon="🔎" color={D.accent}>
          <Field label="Tags" hint="Symptom-based categories. A protocol can have several — it shows under each in “Browse by Tag.”">
            <div style={{ display:"flex", gap:"7px", flexWrap:"wrap" }}>
              {ALL_TAGS.map(t => {
                const on = f.tags.includes(t);
                return (
                  <button key={t} type="button"
                    onClick={() => upd("tags", on ? f.tags.filter(x => x !== t) : [...f.tags, t])}
                    style={{ padding:"6px 12px", fontSize:"12px", fontWeight:600, borderRadius:"20px",
                      border:`1.5px solid ${on ? D.accent : D.border}`, background: on ? D.accent : D.surface,
                      color: on ? "#fff" : D.muted, cursor:"pointer", fontFamily:FONT }}>
                    {on ? "✓ " : ""}{TAG_META[t]}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Search keywords"
            hint="Words and phrases the customer might actually use — these feed search so staff find this even if the title doesn't match. Separate with commas.">
            <textarea value={f.keywords} onChange={e => upd("keywords", e.target.value)} rows={3}
              placeholder="e.g. ripped, snag, hole, pilling, crotch, seam split"
              style={{ ...inputStyle, resize:"vertical", fontSize:"13.5px" }} />
          </Field>
        </DetailSection>

        {/* What to say */}
        <DetailSection title="What to Say to the Customer" icon="💬" color={D.success}>
          <textarea value={f.approvedLanguage} onChange={e => upd("approvedLanguage", e.target.value)} rows={7}
            placeholder={"Type the response however you like — even rough notes.\n\nThen tap “Format with AI” to turn it into an on-brand, ready-to-copy script.\n\nOr write it yourself with labeled variants:\n\nNo deadline:\n\"...\"\n\nHas a deadline:\n\"...\""}
            style={{ ...inputStyle, resize:"vertical", fontFamily:"Georgia, 'Times New Roman', serif", lineHeight:1.8 }} />
          {AI_BACKEND_URL && (
            <button type="button" onClick={formatWithAI} disabled={aiBusy}
              style={{ marginTop:"10px", display:"inline-flex", alignItems:"center", gap:"7px", padding:"9px 16px",
                background: aiBusy ? D.surfaceSoft : D.accent, color: aiBusy ? D.muted : "#fff",
                border:`1.5px solid ${aiBusy ? D.border : D.accent}`, borderRadius:"9px",
                fontSize:"13px", fontWeight:700, cursor: aiBusy ? "default" : "pointer", fontFamily:FONT }}>
              {aiBusy ? "Formatting…" : "✨ Format with AI"}
            </button>
          )}
          <p style={{ margin:"8px 2px 0", fontSize:"11.5px", color:D.muted, lineHeight:1.5 }}>
            This is the exact wording staff copy to the customer. {AI_BACKEND_URL ? "AI keeps it on-brand; review it before saving." : "Keep it on-brand — lead with empathy, never admit fault before verifying, always give a specific callback window."}
          </p>
        </DetailSection>

        {/* Steps */}
        <DetailSection title="What to Do Internally" icon="📋">
          <StepsEditor rows={rows} setRows={setRows} />
        </DetailSection>

        {/* Avoid */}
        <DetailSection title="Never Do This" icon="🚫" color={D.danger}>
          <textarea value={f.avoid} onChange={e => upd("avoid", e.target.value)} rows={3}
            placeholder="The pitfalls to avoid for this protocol."
            style={{ ...inputStyle, resize:"vertical" }} />
        </DetailSection>
      </div>
    </div>
  );
};

// ─── HOME SCREEN ─────────────────────────────────────────────────
const Home = ({ protocols, staff, agentUser, onAgentLogin, onLogout, onUnlock, onLock, onSelect, onAddNew, onOpenTriage, onFlagQuestion, onOpenQuestions, onOpenChecker, onOpenHistory, onOpenAgents, onOpenTemplates, onOpenSubmit, onOpenApprovals, onOpenLessons, pendingCount = 0, questionCount = 0 }) => {
  const [mode, setMode] = useState("ask");   // "ask" | "browse"
  const [ask, setAsk]   = useState("");
  const [activeTag, setTag] = useState(null);
  const [flagged, setFlagged] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [agentGateOpen, setAgentGateOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [narrow, setNarrow] = useState(() => { try { return window.innerWidth <= 719; } catch { return false; } });
  const askRef = useRef(null);
  useEffect(() => {
    const f = () => { try { setNarrow(window.innerWidth <= 719); } catch {} };
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  const asking = ask.trim().length > 0;
  const ranked = rankProtocols(protocols, ask);
  const flagIt = () => { onFlagQuestion && onFlagQuestion(ask.trim()); setFlagged(true); setAsk(""); };

  const tagCounts = ALL_TAGS
    .map(t => ({ tag: t, label: TAG_META[t], count: protocols.filter(p => (p.tags || []).includes(t)).length }))
    .filter(t => t.count > 0);
  const tagFiltered = !activeTag ? protocols : protocols.filter(p => (p.tags || []).includes(activeTag));

  // Plain JSX values (not nested components) so nothing remounts as you type.
  const chev = <span className="gc-chev"><IcoChev /></span>;

  const topBar = (
    <div className="gc-top">
      <div className="gc-mark"><b>GAGE COURT</b><span>CLOTHIERS</span><i /></div>
      <div className="gc-top-right">
        {TEMPLATES_LIVE && (
          <div className="gc-tabs">
            <button className="gc-tab on" onClick={() => { setMode("ask"); setTag(null); }}>Protocols</button>
            <button className="gc-tab" onClick={onOpenTemplates}>Templates</button>
          </div>
        )}
        <div className="gc-acct-wrap">
          <button className="gc-acct" onClick={() => setMenuOpen(o => !o)} aria-label="Account"><IcoUser size={20} /></button>
          {menuOpen && (
            <div className="gc-menu">
              {staff ? (
                <button onClick={() => { setMenuOpen(false); onLock(); }}><IcoLock size={16} /> Admin — lock</button>
              ) : agentUser ? (
                <button onClick={() => { setMenuOpen(false); onLogout(); }}><IcoUser size={16} /> {agentUser} — log out</button>
              ) : (
                <>
                  <button onClick={() => { setMenuOpen(false); setAgentGateOpen(true); }}><IcoUser size={16} /> Agent sign-in</button>
                  <button onClick={() => { setMenuOpen(false); setGateOpen(true); }}><IcoLock size={16} /> Admin sign-in</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const foot = (
    <div className="gc-foot">
      <button onClick={() => { setMode(mode === "browse" ? "ask" : "browse"); setTag(null); }}>
        <IcoBook size={18} /> {mode === "browse" ? "Back to search" : "Browse all protocols"} {chev}
      </button>
      {staff ? (
        <>
          <button onClick={onOpenApprovals}><IcoCheck size={18} /> Approvals {pendingCount ? <span className="gc-badge">{pendingCount}</span> : null} {chev}</button>
          <button onClick={onOpenLessons}><IcoBrain size={18} /> Learned answers {chev}</button>
          {questionCount > 0 && <button onClick={onOpenQuestions}><IcoFlag size={18} /> Needs answers <span className="gc-badge">{questionCount}</span> {chev}</button>}
          <button onClick={onOpenHistory}><IcoClock size={18} /> Response history {chev}</button>
          <button onClick={onOpenAgents}><IcoUsers size={18} /> Manage agents {chev}</button>
          <button onClick={onAddNew}><IcoPlus size={18} /> Add / edit protocols {chev}</button>
          <button onClick={onLock}><IcoLock size={18} /> Admin — lock {chev}</button>
        </>
      ) : (
        <>
          {agentUser
            ? <button onClick={onLogout}><IcoUser size={18} /> {agentUser} — log out {chev}</button>
            : <button onClick={() => setAgentGateOpen(true)}><IcoUser size={18} /> Agent sign-in {chev}</button>}
          <button onClick={() => setGateOpen(true)}><IcoLock size={18} /> Admin sign-in {chev}</button>
        </>
      )}
    </div>
  );

  const gates = (
    <>
      {gateOpen && <StaffGate onUnlock={onUnlock} onClose={() => setGateOpen(false)} />}
      {agentGateOpen && <AgentGate onLogin={onAgentLogin} onClose={() => setAgentGateOpen(false)} />}
    </>
  );

  // ─── BROWSE MODE ───
  if (mode === "browse") {
    return (
      <div className="gc-page">
        <div className="gc-shell">
          {topBar}
          <div className="gc-hero" style={{ padding: "40px 26px 16px" }}>
            <div className="gc-inner">
              <p className="gc-eyebrow">All Protocols</p>
              <h1 className="gc-h1" style={{ fontSize: "40px" }}>Browse the playbook</h1>
              <div className="gc-rule"><s /><em /><s /></div>
            </div>
          </div>
          <div className="gc-body">
            <div className="gc-body-inner">
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px", justifyContent: "center" }}>
                {tagCounts.map(({ tag, label, count }) => {
                  const active = activeTag === tag;
                  return (
                    <button key={tag} onClick={() => setTag(active ? null : tag)}
                      style={{ padding: "7px 14px", fontSize: "12px", fontWeight: 600, borderRadius: "20px",
                        border: `1.5px solid ${active ? D.accent : D.border}`, background: active ? D.accent : D.surface,
                        color: active ? "#fff" : D.muted, cursor: "pointer", fontFamily: FONT }}>
                      {label} <span style={{ opacity: 0.6 }}>{count}</span>
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: D.muted }}>{activeTag ? TAG_META[activeTag] : "All Protocols"}</p>
                <span style={{ fontSize: "12px", color: D.muted }}>{tagFiltered.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {tagFiltered.map(p => <ProtocolCard key={p.id} p={p} onClick={onSelect} />)}
              </div>
            </div>
          </div>
          {foot}
        </div>
        {gates}
      </div>
    );
  }

  // ─── ASK MODE (default) ───
  return (
    <div className="gc-page">
      <div className="gc-shell">
        {topBar}
        <div className="gc-hero">
          <Crest />
          <div className="gc-inner">
            <p className="gc-eyebrow">Gage Court Clothiers · Protocol Desk</p>
            {TEMPLATES_LIVE && (
              <div className="gc-hero-tabs gc-tabs">
                <button className="gc-tab on">Protocols</button>
                <button className="gc-tab" onClick={onOpenTemplates}>Templates</button>
              </div>
            )}
            <h1 className="gc-h1">How can we help<br />this customer?</h1>
            <div className="gc-rule"><s /><em /><s /></div>
            <div className="gc-search">
              <span className="gc-mag"><IcoSearch size={19} /></span>
              <input ref={askRef} type="text" value={ask} onChange={e => { setAsk(e.target.value); setFlagged(false); }}
                placeholder={narrow ? "Search or paste a message" : "Search a protocol, or paste a customer's message"} />
              {ask && <button className="gc-clear" onClick={() => { setAsk(""); askRef.current && askRef.current.focus(); }}>×</button>}
            </div>
            <div className="gc-cta">
              <button className="gc-btn gc-btn-primary" onClick={onOpenChecker}><IcoSparkle size={19} /> Write a response with AI</button>
              <button className="gc-btn gc-btn-ghost" onClick={onOpenSubmit}><IcoMail size={19} /> Submit for approval</button>
            </div>
            <p className="gc-help">Look up a protocol, get an instant AI reply, or send a response to Runi for approval.</p>
          </div>
        </div>

        {(asking || flagged) && (
          <div className="gc-body">
            <div className="gc-body-inner">
              {asking ? (
                ranked.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "10px 10px 26px" }}>
                    <p style={{ fontSize: "16px", fontWeight: 700, color: D.text, marginBottom: "6px" }}>No protocol matches that.</p>
                    <p style={{ fontSize: "13px", color: D.muted, marginBottom: "18px" }}>Use the assistant, or send the question to Runi.</p>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                      <button className="gc-btn gc-btn-primary" style={{ padding: "11px 20px" }} onClick={onOpenChecker}><IcoSparkle size={17} /> Write a response</button>
                      <button className="gc-btn gc-btn-ghost" style={{ padding: "11px 20px" }} onClick={onOpenSubmit}><IcoMail size={17} /> Submit for approval</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p style={{ margin: "0 0 10px", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: D.muted }}>
                      {ranked.length} matching protocol{ranked.length !== 1 ? "s" : ""}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {ranked.map(r => <ProtocolCard key={r.p.id} p={r.p} onClick={onSelect} />)}
                    </div>
                  </>
                )
              ) : (
                <div style={{ background: D.successBg, border: `1.5px solid ${D.success}40`, borderRadius: "12px",
                  padding: "12px 16px", display: "flex", gap: "10px", alignItems: "center", color: D.success }}>
                  <IcoCheck size={18} />
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>Sent to Runi — he&rsquo;ll add an answer for it.</span>
                </div>
              )}
            </div>
          </div>
        )}
        {foot}
      </div>
      {gates}
    </div>
  );
};

// ─── DETAIL PAGE ─────────────────────────────────────────────────
const Detail = ({ p, onBack, onEdit, staff }) => {
  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      {/* Sticky header */}
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface,
        borderBottom:`1px solid ${D.border}`, padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"flex-start" }}>
          <button onClick={onBack}
            style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"8px",
              padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted, fontWeight:600,
              flexShrink:0, fontFamily:FONT }}>← Back</button>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", alignItems:"center", marginBottom:"5px" }}>
              <span style={{ fontSize:"18px" }}>{p.icon || "📋"}</span>
              <ApprovalBadge escalate={p.escalate} small />
            </div>
            <h2 style={{ margin:0, fontSize: isMobile ? "16px" : "18px", fontWeight:800, color:D.text, lineHeight:1.3 }}>{p.title}</h2>
          </div>
          {staff && (
            <button onClick={() => onEdit(p)}
              style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"8px",
                padding:"7px 14px", cursor:"pointer", fontSize:"13px", color:D.muted, fontWeight:600,
                flexShrink:0, fontFamily:FONT }}>Edit</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"18px 16px 48px" }}>

        {/* Status banner */}
        {p.escalate ? (
          <div style={{ background:D.dangerBg, border:`1.5px solid ${D.danger}40`, borderRadius:"12px",
            padding:"14px 18px", marginBottom:"14px", display:"flex", gap:"12px" }}>
            <span style={{ fontSize:"22px", flexShrink:0 }}>⚠️</span>
            <div>
              <p style={{ margin:"0 0 3px", fontSize:"13px", fontWeight:800, color:D.danger }}>Check with Runi first</p>
              <p style={{ margin:0, fontSize:"13px", color:"#7f1d1d", lineHeight:1.6 }}>
                Document on Monday, tag Runi, and wait for direction before promising the customer anything.
              </p>
            </div>
          </div>
        ) : (
          <div style={{ background:D.successBg, border:`1.5px solid ${D.success}40`, borderRadius:"12px",
            padding:"12px 16px", marginBottom:"14px", display:"flex", gap:"10px", alignItems:"center" }}>
            <span style={{ fontSize:"20px" }}>✅</span>
            <p style={{ margin:0, fontSize:"13px", fontWeight:700, color:D.success }}>You can handle this yourself.</p>
          </div>
        )}

        {/* When to use — compact confirm line */}
        <div style={{ marginBottom:"16px", padding:"0 2px" }}>
          <span style={{ fontSize:"11px", fontWeight:800, color:D.muted, textTransform:"uppercase", letterSpacing:"0.6px" }}>Use this when: </span>
          <span style={{ fontSize:"13.5px", color:D.text, lineHeight:1.6 }}>{p.trigger}</span>
        </div>

        {/* STEP 1 — What to say (each response copyable on its own) */}
        {p.approvedLanguage && (() => {
          const responses = splitResponses(p.approvedLanguage);
          const multi = responses.length > 1;
          return (
            <div style={{ background:D.successBg, borderRadius:"14px", border:`1.5px solid ${D.success}40`,
              overflow:"hidden", marginBottom:"14px" }}>
              <div style={{ padding:"14px 20px", borderBottom:`1px solid ${D.success}25`,
                display:"flex", alignItems:"center", justifyContent:"space-between", background:D.success + "0D",
                gap:"8px", flexWrap:"wrap" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"9px" }}>
                  <StepNum n="1" color={D.success} />
                  <span style={{ fontSize:"12px", fontWeight:800, letterSpacing:"0.8px", textTransform:"uppercase",
                    color:D.success }}>What to say to the customer</span>
                </div>
                {multi && <CopyButton text={p.approvedLanguage} label="Copy all" small />}
              </div>
              <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:"12px" }}>
                {responses.map((r, i) => (
                  <div key={i} style={{ background:D.surface, border:`1.5px solid ${D.success}30`,
                    borderRadius:"12px", padding:"14px 16px" }}>
                    {r.label && (
                      <div style={{ fontSize:"11px", fontWeight:800, letterSpacing:"0.5px", textTransform:"uppercase",
                        color:D.success, marginBottom:"8px" }}>
                        {multi ? `${i + 1}. ` : ""}{r.label}
                      </div>
                    )}
                    <p style={{ margin:"0 0 12px", fontSize:"14px", lineHeight:1.85, color:"#14532d",
                      fontFamily:"Georgia, 'Times New Roman', serif", whiteSpace:"pre-wrap" }}>{r.body}</p>
                    <div style={{ display:"flex", justifyContent:"flex-end" }}>
                      <CopyButton text={r.body} label="Copy this" small />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* STEP 2 — What to do */}
        {(p.steps || []).length > 0 && (
          <div style={{ background:D.surface, borderRadius:"14px", border:`1.5px solid ${D.border}`,
            overflow:"hidden", marginBottom:"14px" }}>
            <div style={{ padding:"14px 20px", borderBottom:`1px solid ${D.border}`, background:D.surfaceSoft,
              display:"flex", alignItems:"center", gap:"9px" }}>
              <StepNum n="2" color={D.accentDark} />
              <span style={{ fontSize:"12px", fontWeight:800, letterSpacing:"0.8px", textTransform:"uppercase",
                color:D.muted }}>What to do</span>
            </div>
            <div style={{ padding:"16px 20px" }}>
              <StepGroups steps={p.steps || []} protocolId={p.id} />
            </div>
          </div>
        )}

        {/* Watch out */}
        {p.avoid && (
          <div style={{ background:D.dangerBg, borderRadius:"14px", border:`1.5px solid ${D.danger}30`,
            overflow:"hidden", marginBottom:"14px" }}>
            <div style={{ padding:"14px 20px", borderBottom:`1px solid ${D.danger}20`,
              display:"flex", alignItems:"center", gap:"8px", background:D.danger + "08" }}>
              <span style={{ fontSize:"15px" }}>🚫</span>
              <span style={{ fontSize:"12px", fontWeight:800, letterSpacing:"0.8px", textTransform:"uppercase",
                color:D.danger }}>Watch out — never do this</span>
            </div>
            <div style={{ padding:"16px 20px" }}>
              <p style={{ margin:0, fontSize:"14px", color:"#7f1d1d", lineHeight:1.7 }}>{p.avoid}</p>
            </div>
          </div>
        )}

        {/* Tags */}
        {(p.tags || []).length > 0 && (
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", marginTop:"18px", alignItems:"center" }}>
            {(p.tags || []).map(t => (
              <span key={t} style={{ fontSize:"11px", fontWeight:600, color:D.muted,
                background:D.surfaceSoft, border:`1px solid ${D.border}`, padding:"3px 11px", borderRadius:"20px" }}>
                {TAG_META[t] || t}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

// ─── TRIAGE WIZARD ───────────────────────────────────────────────
const Triage = ({ protocols, onPick, onClose }) => {
  const [stack, setStack] = useState(["start"]);
  const nodeKey = stack[stack.length - 1];
  const node = TRIAGE[nodeKey];
  const byId = (id) => protocols.find(p => p.id === id);

  const choose = (opt) => {
    if (opt.pid) {
      const p = byId(opt.pid);
      if (p) onPick(p);
    } else if (opt.go && TRIAGE[opt.go]) {
      setStack(s => [...s, opt.go]);
    }
  };
  const back = () => setStack(s => s.length > 1 ? s.slice(0, -1) : s);

  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      {/* sticky header */}
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface,
        borderBottom:`1px solid ${D.border}`, padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={stack.length > 1 ? back : onClose}
            style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"8px",
              padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted, fontWeight:600,
              flexShrink:0, fontFamily:FONT }}>
            {stack.length > 1 ? "← Back" : "← Home"}
          </button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>
            🧭 Find the right protocol
          </h2>
          {stack.length > 1 && (
            <button onClick={() => setStack(["start"])}
              style={{ background:"none", border:`1.5px solid ${D.border}`, borderRadius:"8px",
                padding:"7px 12px", cursor:"pointer", fontSize:"12px", color:D.muted, fontWeight:600,
                flexShrink:0, fontFamily:FONT }}>
              Start over
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"28px 16px 48px" }}>
        <p style={{ margin:"0 0 18px", fontSize:"18px", fontWeight:800, color:D.text, lineHeight:1.4 }}>
          {node.q}
        </p>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {node.options.map((opt, i) => (
            <button key={i} onClick={() => choose(opt)}
              style={{ display:"flex", alignItems:"center", gap:"13px", textAlign:"left",
                padding:"15px 18px", background:D.surface, border:`1.5px solid ${D.border}`,
                borderRadius:"13px", cursor:"pointer", fontFamily:FONT, transition:"all 0.15s",
                boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}
              onMouseOver={e => { e.currentTarget.style.borderColor = D.accent; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = D.border; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}>
              {opt.icon && <span style={{ fontSize:"22px", flexShrink:0 }}>{opt.icon}</span>}
              <span style={{ flex:1, fontSize:"14.5px", fontWeight:600, color:D.text, lineHeight:1.4 }}>{opt.label}</span>
              <span style={{ color:D.accent, fontSize:"18px", flexShrink:0 }}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── QUESTIONS INBOX ("needs answers") ───────────────────────────
const QuestionsView = ({ questions, onAnswer, onDismiss, onAddNew, onClose }) => {
  const fmt = (ts) => { try { return new Date(ts).toLocaleDateString(undefined, { month:"short", day:"numeric" }); } catch { return ""; } };
  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface,
        borderBottom:`1px solid ${D.border}`, padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={onClose}
            style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"8px",
              padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted, fontWeight:600,
              flexShrink:0, fontFamily:FONT }}>← Home</button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>
            Needs Answers{questions.length ? ` (${questions.length})` : ""}
          </h2>
        </div>
      </div>

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"22px 16px 48px" }}>
        <p style={{ margin:"0 0 16px", fontSize:"13px", color:D.muted, lineHeight:1.6 }}>
          When an agent can&rsquo;t find an answer, they flag it and it lands here. Answer one and your reply goes
          straight back to that agent — and the AI learns from it for next time.
        </p>
        {questions.length === 0 ? (
          <div style={{ textAlign:"center", padding:"50px 20px" }}>
            <div style={{ fontSize:"40px", marginBottom:"12px" }}>✅</div>
            <p style={{ fontSize:"16px", fontWeight:700, color:D.text, marginBottom:"6px" }}>No open questions.</p>
            <p style={{ fontSize:"13px", color:D.muted }}>You&rsquo;re all caught up. Flagged questions will appear here.</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {questions.map(q => (
              <div key={q.id} style={{ background:D.surface, border:`1.5px solid ${D.border}`, borderRadius:"14px",
                padding:"16px 18px" }}>
                <div style={{ display:"flex", gap:"8px", alignItems:"flex-start", marginBottom:"12px" }}>
                  <span style={{ fontSize:"18px", flexShrink:0 }}>❓</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ margin:0, fontSize:"14.5px", fontWeight:600, color:D.text, lineHeight:1.5 }}>{q.text}</p>
                    {q.createdAt && <p style={{ margin:"5px 0 0", fontSize:"11.5px", color:D.muted }}>Flagged {fmt(q.createdAt)}{q.agentFullName || q.agent ? ` · by ${q.agentFullName || q.agent}` : ""}</p>}
                  </div>
                </div>
                <div style={{ display:"flex", gap:"8px", justifyContent:"flex-end", flexWrap:"wrap" }}>
                  <button onClick={() => onDismiss(q.id)}
                    style={{ background:"none", border:`1.5px solid ${D.border}`, color:D.muted, padding:"7px 14px",
                      borderRadius:"8px", fontSize:"12.5px", fontWeight:600, cursor:"pointer", fontFamily:FONT }}>
                    Dismiss
                  </button>
                  <button onClick={() => onAnswer(q)}
                    style={{ background:D.accent, border:`1.5px solid ${D.accent}`, color:"#fff", padding:"7px 16px",
                      borderRadius:"8px", fontSize:"12.5px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>
                    Answer this →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── ASSISTANT (paste customer message → AI writes the reply) ─────
// ─── ANSWER A FLAGGED QUESTION (staff) ───────────────────────────
// Answers the specific question, replies to the agent who asked, and teaches the AI.
// Deliberately does NOT create a protocol.
const AnswerQuestionView = ({ q, protocols = [], onSaved, onClose }) => {
  const [answer, setAnswer] = useState("");
  const [guidance, setGuidance] = useState("");
  const [aiBusy, setAiBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [contra, setContra] = useState(null);   // { busy, list, ran }

  const draftWithAI = async () => {
    if (aiBusy) return;
    setAiBusy(true);
    try {
      const compact = protocols.map(p => ({ id: p.id, title: p.title, trigger: p.trigger }));
      const { protocolId } = await aiCall("/ai/route", { message: q.text, protocols: compact });
      const p = protocols.find(x => x.id === protocolId);
      const { response } = await aiCall("/ai/write", { message: q.text, approvedAnswer: p ? p.approvedLanguage : "" });
      setAnswer(response || "");
    } catch (e) { alert("The AI is busy — try again in a moment.\n" + (e.message || e)); }
    finally { setAiBusy(false); }
  };
  const check = async () => {
    if (!answer.trim()) { alert("Write the answer first, then check it."); return; }
    setContra({ busy: true, list: [], ran: false });
    try {
      const compact = protocols.map(p => ({ title: p.title, approvedLanguage: p.approvedLanguage, trigger: p.trigger }));
      const r = await aiCall("/ai/contradictions", { question: q.text, finalAnswer: answer, protocols: compact });
      setContra({ busy: false, list: r.contradictions || [], ran: true });
    } catch (e) { setContra(null); alert("Couldn't run the check — " + (e.message || e)); }
  };
  const save = async () => {
    if (!answer.trim() || saving) return;
    setSaving(true);
    try { await aiCall("/questions/answer", { id: q.id, answer, guidance }); onSaved(); }
    catch (e) { alert("Couldn't save — " + (e.message || e)); }
    finally { setSaving(false); }
  };

  const box = { ...inputStyle, resize:"vertical", fontSize:"14px", lineHeight:1.8 };

  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface, borderBottom:`1px solid ${D.border}`, padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"720px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={onClose} style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"8px", padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted, fontWeight:600, flexShrink:0, fontFamily:FONT }}>← Back</button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>Answer this question</h2>
        </div>
      </div>

      <div style={{ maxWidth:"720px", margin:"0 auto", padding:"20px 16px 48px" }}>
        <p style={{ margin:"0 0 14px", fontSize:"13px", color:D.muted, lineHeight:1.6 }}>
          Your answer goes straight back to {q.agentFullName || q.agent || "the agent"} — in their feed and by email — and the AI learns from it. No protocol is created.
        </p>

        <div style={{ background:D.surface, border:`1.5px solid ${D.accent}55`, borderRadius:"14px", padding:"16px 18px" }}>
          <p style={{ margin:"0 0 5px", ...labelStyle }}>The question{q.agentFullName || q.agent ? ` — from ${q.agentFullName || q.agent}` : ""}</p>
          <p style={{ margin:"0 0 14px", fontSize:"14.5px", color:D.text, lineHeight:1.7, whiteSpace:"pre-wrap", background:D.surfaceSoft, border:`1px solid ${D.border}`, borderRadius:"10px", padding:"12px 14px" }}>{q.text}</p>

          <p style={{ margin:"0 0 5px", ...labelStyle, color:D.success }}>Your answer — what the agent sends</p>
          <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={8}
            placeholder="Write the reply the agent should send — or tap “Draft with AI” for a starting point, then edit it."
            style={{ ...box, fontFamily:"Georgia, 'Times New Roman', serif" }} />
          <button onClick={draftWithAI} disabled={aiBusy}
            style={{ marginTop:"10px", padding:"10px 18px", background:D.surface, color:D.accentDark, border:`1.5px solid ${D.accent}`, borderRadius:"10px", fontSize:"13.5px", fontWeight:700, cursor: aiBusy ? "default" : "pointer", fontFamily:FONT }}>
            {aiBusy ? "Drafting…" : "✨ Draft with AI"}
          </button>

          <p style={{ margin:"16px 0 5px", ...labelStyle }}>Guidance <span style={{ textTransform:"none", fontWeight:600, letterSpacing:0 }}>(optional — the rule the AI should follow going forward)</span></p>
          <textarea value={guidance} onChange={e => setGuidance(e.target.value)} rows={2}
            placeholder="e.g. Always offer the Lakewood tailor first for NJ clients."
            style={{ ...inputStyle, resize:"vertical", fontSize:"13.5px", lineHeight:1.7 }} />

          <div style={{ marginTop:"14px", background:D.surfaceSoft, border:`1px solid ${D.border}`, borderRadius:"11px", padding:"12px 14px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:"10px", flexWrap:"wrap" }}>
              <span style={{ fontSize:"12.5px", fontWeight:700, color:D.text }}>🔍 Check this against our protocols &amp; past approvals</span>
              <button onClick={check} disabled={contra && contra.busy}
                style={{ padding:"8px 14px", background:D.surface, color:D.accentDark, border:`1.5px solid ${D.accent}`, borderRadius:"9px", fontSize:"12.5px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>
                {contra && contra.busy ? "Checking…" : "Find contradictions"}
              </button>
            </div>
            {contra && contra.ran && (
              contra.list.length === 0
                ? <p style={{ margin:"10px 0 0", fontSize:"13px", color:D.success, fontWeight:600 }}>✅ No contradictions found.</p>
                : <div style={{ marginTop:"10px" }}>
                    {contra.list.map((c, i) => (
                      <div key={i} style={{ background:D.dangerBg, border:`1px solid ${D.danger}33`, borderRadius:"9px", padding:"10px 12px", marginBottom:"8px" }}>
                        <p style={{ margin:"0 0 4px", fontSize:"11px", fontWeight:800, letterSpacing:"0.5px", textTransform:"uppercase", color:D.danger }}>Conflicts with: {c.conflictsWith}</p>
                        <p style={{ margin:"0 0 6px", fontSize:"13px", color:D.text, lineHeight:1.6 }}>{c.issue}</p>
                        <p style={{ margin:0, fontSize:"13px", color:"#7f1d1d", fontWeight:700, lineHeight:1.6 }}>❓ {c.question}</p>
                      </div>
                    ))}
                    <p style={{ margin:"8px 0 0", fontSize:"12.5px", color:D.muted }}>Explain the rule in the Guidance box above so the AI follows it.</p>
                  </div>
            )}
          </div>

          <button onClick={save} disabled={saving || !answer.trim()}
            style={{ marginTop:"14px", padding:"12px 22px", background: (saving || !answer.trim()) ? D.surfaceSoft : D.success,
              color: (saving || !answer.trim()) ? D.muted : "#fff", border:"none", borderRadius:"10px",
              fontSize:"14px", fontWeight:700, cursor: (saving || !answer.trim()) ? "default" : "pointer", fontFamily:FONT }}>
            {saving ? "Sending…" : "✓ Send answer & teach AI"}
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckerView = ({ protocols, agentUser, staff, onAgentLogin, onLogout, onSubmitForApproval, onClose }) => {
  const loggedIn = !!agentUser || staff;
  const who = agentUser || (staff ? "Runi" : "");

  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);   // { protocol } | { none:true }
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [logged, setLogged] = useState(false);

  // agent login form
  const [lu, setLu] = useState("");
  const [lp, setLp] = useState("");
  const [lErr, setLErr] = useState(false);
  const [lBusy, setLBusy] = useState(false);
  const doLogin = async () => {
    if (!lu.trim() || !lp || lBusy) return;
    setLBusy(true); setLErr(false);
    const ok = await onAgentLogin(lu.trim(), lp);
    setLBusy(false);
    if (!ok) { setLErr(true); setLp(""); }
  };

  const go = async () => {
    if (!message.trim() || busy) return;
    setBusy(true); setResult(null); setDraft(""); setCopied(false); setLogged(false);
    try {
      const compact = protocols.map(p => ({ id: p.id, title: p.title, trigger: p.trigger }));
      const { protocolId } = await aiCall("/ai/route", { message, protocols: compact });
      const p = protocols.find(x => x.id === protocolId);
      if (!p) { setResult({ none: true }); return; }
      const { response } = await aiCall("/ai/write", { message, approvedAnswer: p.approvedLanguage });
      setResult({ protocol: p }); setDraft(response || "");
    } catch (e) { alert("The AI is busy — please try again in a moment.\n" + (e.message || e)); }
    finally { setBusy(false); }
  };

  const copyReply = () => {
    const text = draft;
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 2000); };
    try { navigator.clipboard.writeText(text).then(done, () => { fallbackCopy(text); done(); }); }
    catch { fallbackCopy(text); done(); }
    if (!logged && result && result.protocol) {
      setLogged(true);
      aiCall("/history", { agent: who, situation: message, protocolId: result.protocol.id,
        protocolTitle: result.protocol.title, reply: draft, verdict: "used" }).catch(() => {});
    }
  };

  const box = { ...inputStyle, resize:"vertical", fontSize:"14px", lineHeight:1.7 };

  // ── Agent sign-in ──
  if (!loggedIn) {
    return (
      <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT, display:"flex",
        alignItems:"center", justifyContent:"center", padding:"20px" }}>
        <div style={{ background:D.surface, borderRadius:"16px", border:`1.5px solid ${D.border}`,
          padding:"28px 24px", maxWidth:"380px", width:"100%" }}>
          <div style={{ fontSize:"30px", textAlign:"center", marginBottom:"10px" }}>👤</div>
          <h2 style={{ margin:"0 0 4px", fontSize:"18px", fontWeight:800, color:D.text, textAlign:"center" }}>Agent sign-in</h2>
          <p style={{ margin:"0 0 18px", fontSize:"13px", color:D.muted, textAlign:"center", lineHeight:1.5 }}>
            Sign in to write responses. Ask Runi for your login.
          </p>
          <input value={lu} autoFocus onChange={e => { setLu(e.target.value); setLErr(false); }}
            placeholder="Username" style={{ ...inputStyle, marginBottom:"10px" }} />
          <input type="password" value={lp} onChange={e => { setLp(e.target.value); setLErr(false); }}
            onKeyDown={e => { if (e.key === "Enter") doLogin(); }}
            placeholder="Passcode" style={{ ...inputStyle, marginBottom: lErr ? "8px" : "16px" }} />
          {lErr && <p style={{ margin:"0 0 14px", fontSize:"12.5px", color:D.danger, fontWeight:600 }}>Wrong username or passcode.</p>}
          <div style={{ display:"flex", gap:"10px" }}>
            <button onClick={onClose} style={{ flex:1, padding:"12px", background:D.surface, color:D.muted,
              border:`1.5px solid ${D.border}`, borderRadius:"10px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>Cancel</button>
            <button onClick={doLogin} disabled={lBusy}
              style={{ flex:1, padding:"12px", background:D.accent, color:"#fff", border:"none",
                borderRadius:"10px", fontWeight:700, cursor: lBusy ? "default" : "pointer", fontFamily:FONT }}>
              {lBusy ? "Checking…" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface, borderBottom:`1px solid ${D.border}`,
        padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={onClose} style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`,
            borderRadius:"8px", padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted,
            fontWeight:600, flexShrink:0, fontFamily:FONT }}>← Home</button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>💬 Response Assistant</h2>
          <span style={{ fontSize:"12px", color:D.muted }}>
            {who}{agentUser ? <> · <button onClick={onLogout} style={{ background:"none", border:"none",
              color:D.accent, cursor:"pointer", fontSize:"12px", textDecoration:"underline", fontFamily:FONT, padding:0 }}>log out</button></> : null}
          </span>
        </div>
      </div>

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"20px 16px 48px" }}>
        <div style={{ background:D.surface, border:`2px solid ${D.accent}`, borderRadius:"14px", padding:"16px 18px", marginBottom:"14px",
          boxShadow:"0 4px 18px rgba(184,149,99,0.12)" }}>
          <p style={{ margin:"0 0 8px", fontSize:"12px", fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase", color:D.accentDark }}>Paste the customer&rsquo;s message</p>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4}
            placeholder="e.g. Hi, I ordered a suit a few weeks ago for my son's wedding next month — any idea when it'll be ready?" style={box} />
          <button onClick={go} disabled={busy || !message.trim()}
            style={{ marginTop:"10px", padding:"12px 22px", background: busy ? D.surfaceSoft : D.accent,
              color: busy ? D.muted : "#fff", border:`1.5px solid ${D.accent}`, borderRadius:"10px",
              fontSize:"14px", fontWeight:700, cursor: busy ? "default" : "pointer", fontFamily:FONT }}>
            {busy ? "Finding the answer & writing…" : "✨ Write a response"}
          </button>
        </div>

        {result && result.none && (
          <div style={{ background:D.dangerBg, border:`1.5px solid ${D.danger}40`, borderRadius:"14px", padding:"16px 18px" }}>
            <p style={{ margin:"0 0 10px", fontSize:"13.5px", color:"#7f1d1d", fontWeight:600 }}>I couldn&rsquo;t find a matching protocol for this one.</p>
            <button onClick={() => onSubmitForApproval(message, "")}
              style={{ padding:"9px 16px", background:D.accent, color:"#fff", border:"none", borderRadius:"9px",
                fontSize:"13px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>📨 Write an answer & send to Runi for approval</button>
          </div>
        )}

        {result && result.protocol && (
          <>
            <div style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"14px", padding:"14px 18px", marginBottom:"14px" }}>
              <p style={{ margin:"0 0 6px", fontSize:"11px", fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase", color:D.muted }}>The customer&rsquo;s message</p>
              <p style={{ margin:0, fontSize:"14px", color:D.text, lineHeight:1.7, whiteSpace:"pre-wrap" }}>{message}</p>
            </div>

            <div style={{ background:D.successBg, border:`1.5px solid ${D.success}40`, borderRadius:"14px", overflow:"hidden", marginBottom:"14px" }}>
              <div style={{ padding:"12px 18px", background:D.success + "0D", borderBottom:`1px solid ${D.success}25`,
                display:"flex", alignItems:"center", justifyContent:"space-between", gap:"8px", flexWrap:"wrap" }}>
                <span style={{ fontSize:"11px", fontWeight:800, letterSpacing:"0.8px", textTransform:"uppercase", color:D.success }}>✍️ Suggested response</span>
                <span style={{ fontSize:"11.5px", color:D.muted }}>based on: {result.protocol.title}</span>
              </div>
              <div style={{ padding:"14px 18px" }}>
                <textarea value={draft} onChange={e => { setDraft(e.target.value); setLogged(false); }} rows={9}
                  style={{ ...box, background:D.surface, fontFamily:"Georgia, 'Times New Roman', serif", lineHeight:1.85 }} />
                <p style={{ margin:"8px 2px 12px", fontSize:"11.5px", color:D.muted }}>Read it against the message above, tweak anything you like, then copy.</p>
                <button onClick={copyReply}
                  style={{ display:"flex", alignItems:"center", gap:"7px", padding:"11px 20px",
                    background: copied ? D.success : D.accent, color:"#fff", border:"none", borderRadius:"10px",
                    fontSize:"14px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>
                  {copied ? "✓ Copied — ready to send" : "Copy response"}
                </button>
              </div>
            </div>

            <div style={{ textAlign:"center" }}>
              <button onClick={() => onSubmitForApproval(message, draft)}
                style={{ background:"none", border:"none", color:D.muted, fontSize:"12.5px", fontWeight:600,
                  cursor:"pointer", fontFamily:FONT, textDecoration:"underline", textUnderlineOffset:"3px" }}>
                Want Runi to review it? 📨 Send this for approval
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ─── SUBMIT FOR APPROVAL (agent) + APPROVALS + LEARNED ANSWERS (staff) ───
function compressImage(file, maxDim = 1400, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      let w = img.width, h = img.height;
      const scale = Math.min(1, maxDim / Math.max(w, h));
      w = Math.round(w * scale); h = Math.round(h * scale);
      const c = document.createElement("canvas"); c.width = w; c.height = h;
      c.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      try { resolve(c.toDataURL("image/jpeg", quality)); } catch (e) { reject(e); }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("bad image")); };
    img.src = url;
  });
}
const timeAgo = (ts) => {
  if (!ts) return "";
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60); if (m < 60) return m + "m ago";
  const h = Math.floor(m / 60); if (h < 24) return h + "h ago";
  return Math.floor(h / 24) + "d ago";
};
const SUB_STATUS = {
  pending:  { label: "⏳ Awaiting Runi", color: D.accentDark, bg: "#FBF3E6" },
  returned: { label: "✏️ Rewrite requested", color: "#B45309", bg: "#FEF3E2" },
  approved: { label: "✅ Approved", color: D.success, bg: D.successBg },
  rejected: { label: "✖ Not used", color: D.danger, bg: D.dangerBg },
};
const latestReturn = (s) => [...((s && s.thread) || [])].reverse().find(t => t.by === "runi" && t.action === "returned") || {};
// Renders the full back-and-forth on a submission (agent answers + Runi's notes).
const ThreadLog = ({ thread }) => {
  if (!thread || thread.length <= 1) return null;
  return (
    <div style={{ marginTop:"10px", borderTop:`1px dashed ${D.border}`, paddingTop:"10px" }}>
      <p style={{ margin:"0 0 8px", fontSize:"10px", fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase", color:D.muted }}>Conversation</p>
      <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
        {thread.map((t, i) => {
          const runi = t.by === "runi";
          const label = runi
            ? (t.action === "approved" ? "Runi · approved" : t.action === "returned" ? "Runi · rewrite requested" : t.action === "rejected" ? "Runi · not used" : "Runi")
            : (i === 0 ? "Agent · first draft" : "Agent · revised");
          const text = runi
            ? (t.action === "approved" ? (t.finalAnswer || "") + (t.feedback ? `\n\nNote: ${t.feedback}` : "")
               : t.action === "returned" ? (t.feedback || "") + (t.suggestion ? `\n\nSuggested rewrite: ${t.suggestion}` : "")
               : (t.feedback || ""))
            : (t.answer || "");
          return (
            <div key={i} style={{ background: runi ? "#FBF3E6" : D.surfaceSoft, border:`1px solid ${runi ? "#e6d5b8" : D.border}`, borderRadius:"9px", padding:"8px 11px" }}>
              <p style={{ margin:"0 0 3px", fontSize:"10.5px", fontWeight:800, color: runi ? D.accentDark : D.muted }}>{label} · {timeAgo(t.at)}</p>
              <p style={{ margin:0, fontSize:"12.5px", color:D.text, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const AgentSignInCard = ({ title, sub, lu, lp, lErr, lBusy, setLu, setLp, setLErr, doLogin, onClose }) => (
  <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT, display:"flex",
    alignItems:"center", justifyContent:"center", padding:"20px" }}>
    <div style={{ background:D.surface, borderRadius:"16px", border:`1.5px solid ${D.border}`, padding:"28px 24px", maxWidth:"380px", width:"100%" }}>
      <div style={{ fontSize:"30px", textAlign:"center", marginBottom:"10px" }}>👤</div>
      <h2 style={{ margin:"0 0 4px", fontSize:"18px", fontWeight:800, color:D.text, textAlign:"center" }}>{title}</h2>
      <p style={{ margin:"0 0 18px", fontSize:"13px", color:D.muted, textAlign:"center", lineHeight:1.5 }}>{sub}</p>
      <input value={lu} autoFocus onChange={e => { setLu(e.target.value); setLErr(false); }} placeholder="Username" style={{ ...inputStyle, marginBottom:"10px" }} />
      <input type="password" value={lp} onChange={e => { setLp(e.target.value); setLErr(false); }}
        onKeyDown={e => { if (e.key === "Enter") doLogin(); }} placeholder="Passcode" style={{ ...inputStyle, marginBottom: lErr ? "8px" : "16px" }} />
      {lErr && <p style={{ margin:"0 0 14px", fontSize:"12.5px", color:D.danger, fontWeight:600 }}>Wrong username or passcode.</p>}
      <div style={{ display:"flex", gap:"10px" }}>
        <button onClick={onClose} style={{ flex:1, padding:"12px", background:D.surface, color:D.muted, border:`1.5px solid ${D.border}`, borderRadius:"10px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>Cancel</button>
        <button onClick={doLogin} disabled={lBusy} style={{ flex:1, padding:"12px", background:D.accent, color:"#fff", border:"none", borderRadius:"10px", fontWeight:700, cursor: lBusy ? "default" : "pointer", fontFamily:FONT }}>{lBusy ? "Checking…" : "Sign in"}</button>
      </div>
    </div>
  </div>
);

const SubmitView = ({ protocols, agentUser, staff, prefill, onAgentLogin, onLogout, onClose }) => {
  const loggedIn = !!agentUser || staff;
  const who = agentUser || (staff ? "Runi" : "");
  const [question, setQuestion] = useState((prefill && prefill.question) || "");
  const [images, setImages] = useState([]);
  const [draft, setDraft] = useState((prefill && prefill.draft) || "");
  const [aiBusy, setAiBusy] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [mine, setMine] = useState([]);
  const [copiedId, setCopiedId] = useState("");
  const [regen, setRegen] = useState({});      // { [id]: regenerated text }
  const [regenBusy, setRegenBusy] = useState("");
  const [revText, setRevText] = useState({});  // { [id]: revised answer being composed }
  const [revBusy, setRevBusy] = useState("");
  const [revAiBusy, setRevAiBusy] = useState("");
  const fileRef = useRef(null);

  const [lu, setLu] = useState(""); const [lp, setLp] = useState("");
  const [lErr, setLErr] = useState(false); const [lBusy, setLBusy] = useState(false);
  const doLogin = async () => {
    if (!lu.trim() || !lp || lBusy) return; setLBusy(true); setLErr(false);
    const ok = await onAgentLogin(lu.trim(), lp); setLBusy(false);
    if (!ok) { setLErr(true); setLp(""); }
  };

  const loadMine = async () => { try { const r = await aiCall("/submissions/mine", null, "GET"); setMine(r.submissions || []); } catch {} };
  useEffect(() => { if (loggedIn) loadMine(); }, [loggedIn]);

  const addFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter(f => /^image\//.test(f.type));
    for (const f of files) {
      if (images.length >= 4) break;
      try { const d = await compressImage(f); setImages(prev => prev.length < 4 ? [...prev, d] : prev); } catch {}
    }
    if (fileRef.current) fileRef.current.value = "";
  };
  const draftWithAI = async () => {
    if (!question.trim() || aiBusy) return;
    setAiBusy(true);
    try {
      const compact = protocols.map(p => ({ id: p.id, title: p.title, trigger: p.trigger }));
      const { protocolId } = await aiCall("/ai/route", { message: question, protocols: compact });
      const p = protocols.find(x => x.id === protocolId);
      const { response } = await aiCall("/ai/write", { message: question, approvedAnswer: p ? p.approvedLanguage : "" });
      setDraft(response || "");
    } catch (e) { alert("The AI is busy — try again in a moment.\n" + (e.message || e)); }
    finally { setAiBusy(false); }
  };
  const submit = async () => {
    if (!question.trim() || !draft.trim() || sending) return;
    setSending(true);
    try {
      await aiCall("/submissions", { question, draftAnswer: draft, images });
      setDone(true); setQuestion(""); setDraft(""); setImages([]);
      loadMine(); setTimeout(() => setDone(false), 5000);
    } catch (e) { alert("Couldn't submit — " + (e.message || e)); }
    finally { setSending(false); }
  };
  // Revise a submission Runi sent back. Prefills with his suggested rewrite (if any), else the last answer.
  const reviseVal = (s) => revText[s.id] !== undefined ? revText[s.id] : (latestReturn(s).suggestion || s.currentAnswer || s.draft || "");
  const sendRevision = async (s) => {
    const answer = (reviseVal(s) || "").trim();
    if (!answer || revBusy) return;
    setRevBusy(s.id);
    try {
      await aiCall("/submissions/revise", { id: s.id, answer });
      setRevText(r => { const c = { ...r }; delete c[s.id]; return c; });
      await loadMine();
    } catch (e) { alert("Couldn't send — " + (e.message || e)); }
    finally { setRevBusy(""); }
  };
  const redraftRevision = async (s) => {
    if (revAiBusy) return;
    setRevAiBusy(s.id);
    try { const { response } = await aiCall("/ai/write", { message: s.question, approvedAnswer: "" }); setRevText(r => ({ ...r, [s.id]: response || "" })); }
    catch (e) { alert("The AI is busy — try again in a moment.\n" + (e.message || e)); }
    finally { setRevAiBusy(""); }
  };
  // Rewrite the approved answer in a fresh way, staying faithful to what Runi approved.
  const regenerate = async (s) => {
    if (regenBusy) return;
    setRegenBusy(s.id);
    try {
      const { response } = await aiCall("/ai/write", { message: s.question, approvedAnswer: s.approvedAnswer });
      setRegen(r => ({ ...r, [s.id]: response || "" }));
    } catch (e) { alert("Couldn't rewrite — " + (e.message || e)); }
    finally { setRegenBusy(""); }
  };
  const copyApproved = (s) => {
    const t = regen[s.id] || s.approvedAnswer || "";
    const done2 = () => { setCopiedId(s.id); setTimeout(() => setCopiedId(""), 2000); };
    try { navigator.clipboard.writeText(t).then(done2, () => { fallbackCopy(t); done2(); }); } catch { fallbackCopy(t); done2(); }
  };

  const box = { ...inputStyle, resize:"vertical", fontSize:"14px", lineHeight:1.7 };

  if (!loggedIn) return (
    <AgentSignInCard title="Sign in to submit" sub="Sign in to send a customer response to Runi for approval. Ask Runi for your login."
      lu={lu} lp={lp} lErr={lErr} lBusy={lBusy} setLu={setLu} setLp={setLp} setLErr={setLErr} doLogin={doLogin} onClose={onClose} />
  );

  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface, borderBottom:`1px solid ${D.border}`, padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={onClose} style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"8px", padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted, fontWeight:600, flexShrink:0, fontFamily:FONT }}>← Home</button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>📨 Submit for approval</h2>
          <span style={{ fontSize:"12px", color:D.muted }}>{who}{agentUser ? <> · <button onClick={onLogout} style={{ background:"none", border:"none", color:D.accent, cursor:"pointer", fontSize:"12px", textDecoration:"underline", fontFamily:FONT, padding:0 }}>log out</button></> : null}</span>
        </div>
      </div>

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"20px 16px 48px" }}>
        <p style={{ margin:"0 0 14px", fontSize:"13px", color:D.muted, lineHeight:1.6 }}>
          Paste the customer&rsquo;s question, add any screenshots, and write a proposed answer. Runi reviews it and either approves it, edits it, or sends it back with notes for you to rewrite — the approved answer is what you send, and it teaches the AI for next time.
        </p>

        <div style={{ background:D.surface, border:`2px solid ${D.accent}`, borderRadius:"14px", padding:"16px 18px", marginBottom:"18px", boxShadow:"0 4px 18px rgba(184,149,99,0.12)" }}>
          <p style={{ margin:"0 0 7px", ...labelStyle, color:D.accentDark }}>Customer&rsquo;s question / situation</p>
          <textarea value={question} onChange={e => setQuestion(e.target.value)} rows={3} placeholder="What did the customer ask? Paste their message here." style={box} />

          <p style={{ margin:"16px 0 7px", ...labelStyle }}>Screenshots (optional)</p>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", alignItems:"center" }}>
            {images.map((d, i) => (
              <div key={i} style={{ position:"relative" }}>
                <img src={d} alt="" style={{ width:"66px", height:"66px", objectFit:"cover", borderRadius:"9px", border:`1.5px solid ${D.border}` }} />
                <button onClick={() => setImages(images.filter((_, j) => j !== i))} style={{ position:"absolute", top:"-7px", right:"-7px", width:"20px", height:"20px", borderRadius:"50%", background:D.danger, color:"#fff", border:"2px solid #fff", cursor:"pointer", fontSize:"11px", lineHeight:1, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:FONT }}>×</button>
              </div>
            ))}
            {images.length < 4 && (
              <button onClick={() => fileRef.current && fileRef.current.click()} style={{ width:"66px", height:"66px", borderRadius:"9px", border:`1.5px dashed ${D.accent}`, background:D.surfaceSoft, color:D.accentDark, cursor:"pointer", fontSize:"22px", fontFamily:FONT }}>+</button>
            )}
            <input ref={fileRef} type="file" accept="image/*" multiple onChange={e => addFiles(e.target.files)} style={{ display:"none" }} />
          </div>

          <p style={{ margin:"16px 0 7px", ...labelStyle }}>Your proposed answer <span style={{ textTransform:"none", fontWeight:600, letterSpacing:0, color:D.danger }}>· required</span></p>
          <textarea value={draft} onChange={e => setDraft(e.target.value)} rows={7} placeholder="Write the reply you'd send — or tap “Draft with AI” to get a starting point, then edit it." style={{ ...box, fontFamily:"Georgia, 'Times New Roman', serif", lineHeight:1.85 }} />
          {(() => { const ready = question.trim() && draft.trim(); return (
          <>
          <div style={{ display:"flex", gap:"10px", marginTop:"10px", flexWrap:"wrap" }}>
            <button onClick={draftWithAI} disabled={aiBusy || !question.trim()} style={{ padding:"11px 18px", background:D.surface, color:D.accentDark, border:`1.5px solid ${D.accent}`, borderRadius:"10px", fontSize:"13.5px", fontWeight:700, cursor: aiBusy ? "default" : "pointer", fontFamily:FONT }}>{aiBusy ? "Drafting…" : "✨ Draft with AI"}</button>
            <button onClick={submit} disabled={sending || !ready} style={{ padding:"11px 20px", background: (sending || !ready) ? D.surfaceSoft : D.accent, color: (sending || !ready) ? D.muted : "#fff", border:`1.5px solid ${(sending || !ready) ? D.border : D.accent}`, borderRadius:"10px", fontSize:"14px", fontWeight:700, cursor: (sending || !ready) ? "default" : "pointer", fontFamily:FONT }}>{sending ? "Sending…" : "Send to Runi for review"}</button>
          </div>
          {!ready && (question.trim() || draft.trim()) && <p style={{ margin:"8px 2px 0", fontSize:"12px", color:D.muted }}>Add both the customer&rsquo;s question and a proposed answer before sending.</p>}
          </>
          ); })()}
          {done && <div style={{ marginTop:"12px", background:D.successBg, border:`1.5px solid ${D.success}40`, borderRadius:"10px", padding:"11px 14px", fontSize:"13px", fontWeight:600, color:D.success }}>✅ Sent to Runi. You&rsquo;ll see his response here once he reviews it.</div>}
        </div>

        <p style={{ margin:"0 0 10px", ...labelStyle }}>Your submissions</p>
        {mine.length === 0 ? (
          <p style={{ fontSize:"13px", color:D.muted }}>Nothing yet — your submitted responses and their status will show up here.</p>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            {mine.map(s => {
              const st = SUB_STATUS[s.status] || SUB_STATUS.pending;
              return (
                <div key={s.id} style={{ background:D.surface, border:`1.5px solid ${D.border}`, borderRadius:"12px", padding:"13px 15px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", gap:"10px", alignItems:"center", marginBottom:"7px" }}>
                    <span style={{ fontSize:"11.5px", fontWeight:800, padding:"3px 9px", borderRadius:"20px", color:st.color, background:st.bg }}>{st.label}</span>
                    <span style={{ fontSize:"11.5px", color:D.muted }}>{timeAgo(s.createdAt)}{s.imageCount ? ` · 📎 ${s.imageCount}` : ""}</span>
                  </div>
                  <p style={{ margin:0, fontSize:"13.5px", color:D.text, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{s.question}</p>
                  {s.status === "returned" && (
                    <div style={{ marginTop:"10px", background:"#FEF3E2", border:"1px solid #f0d9b5", borderRadius:"10px", padding:"11px 13px" }}>
                      <p style={{ margin:"0 0 4px", fontSize:"10.5px", fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase", color:"#B45309" }}>Runi asked you to rewrite this</p>
                      <p style={{ margin:"0 0 10px", fontSize:"13px", color:D.text, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{latestReturn(s).feedback}</p>
                      <p style={{ margin:"0 0 6px", ...labelStyle }}>Your revised answer</p>
                      <textarea value={reviseVal(s)} onChange={e => setRevText(r => ({ ...r, [s.id]: e.target.value }))} rows={6} style={{ ...box, fontFamily:"Georgia, 'Times New Roman', serif" }} />
                      <div style={{ display:"flex", gap:"8px", marginTop:"9px", flexWrap:"wrap" }}>
                        <button onClick={() => redraftRevision(s)} disabled={revAiBusy === s.id} style={{ padding:"9px 15px", background:D.surface, color:D.accentDark, border:`1.5px solid ${D.accent}`, borderRadius:"9px", fontSize:"12.5px", fontWeight:700, cursor: revAiBusy === s.id ? "default" : "pointer", fontFamily:FONT }}>{revAiBusy === s.id ? "Drafting…" : "✨ Redraft with AI"}</button>
                        <button onClick={() => sendRevision(s)} disabled={revBusy === s.id || !reviseVal(s).trim()} style={{ padding:"9px 17px", background: (revBusy === s.id || !reviseVal(s).trim()) ? D.surfaceSoft : D.accent, color: (revBusy === s.id || !reviseVal(s).trim()) ? D.muted : "#fff", border:"none", borderRadius:"9px", fontSize:"13px", fontWeight:700, cursor: (revBusy === s.id || !reviseVal(s).trim()) ? "default" : "pointer", fontFamily:FONT }}>{revBusy === s.id ? "Sending…" : "Resend to Runi"}</button>
                      </div>
                    </div>
                  )}
                  {s.status === "approved" && (
                    <div style={{ marginTop:"10px", background:D.successBg, border:`1px solid ${D.success}33`, borderRadius:"10px", padding:"11px 13px" }}>
                      <p style={{ margin:"0 0 6px", fontSize:"10.5px", fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase", color:D.success }}>Approved answer — send this</p>
                      <p style={{ margin:"0 0 9px", fontSize:"14px", color:D.text, lineHeight:1.8, whiteSpace:"pre-wrap", fontFamily:"Georgia, 'Times New Roman', serif" }}>{regen[s.id] || s.approvedAnswer}</p>
                      {s.feedback && (
                        <div style={{ background:"#FBF3E6", border:"1px solid #e6d5b8", borderRadius:"8px", padding:"9px 11px", marginBottom:"9px" }}>
                          <p style={{ margin:"0 0 3px", fontSize:"10.5px", fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase", color:D.accentDark }}>Feedback from Runi</p>
                          <p style={{ margin:0, fontSize:"13px", color:D.text, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{s.feedback}</p>
                        </div>
                      )}
                      <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                        <button onClick={() => copyApproved(s)} style={{ padding:"8px 15px", background: copiedId === s.id ? D.success : D.accent, color:"#fff", border:"none", borderRadius:"9px", fontSize:"13px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>{copiedId === s.id ? "✓ Copied" : "Copy answer"}</button>
                        <button onClick={() => regenerate(s)} disabled={regenBusy === s.id} style={{ padding:"8px 15px", background:D.surface, color:D.accentDark, border:`1.5px solid ${D.accent}`, borderRadius:"9px", fontSize:"13px", fontWeight:700, cursor: regenBusy === s.id ? "default" : "pointer", fontFamily:FONT }}>{regenBusy === s.id ? "Rewriting…" : "🔄 Regenerate with AI"}</button>
                        {regen[s.id] && <button onClick={() => setRegen(r => ({ ...r, [s.id]: "" }))} style={{ padding:"8px 12px", background:"none", color:D.muted, border:"none", fontSize:"12.5px", fontWeight:600, cursor:"pointer", fontFamily:FONT, textDecoration:"underline" }}>back to original</button>}
                      </div>
                    </div>
                  )}
                  {s.status === "rejected" && s.note && <p style={{ margin:"8px 0 0", fontSize:"12.5px", color:D.danger }}>Note from Runi: {s.note}</p>}
                  <ThreadLog thread={s.thread} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const ApprovalsView = ({ protocols = [], onClose }) => {
  const [subs, setSubs] = useState([]);
  const [showResolved, setShowResolved] = useState(false);
  const [edits, setEdits] = useState({});
  const [notes, setNotes] = useState({});     // feedback to the agent
  const [clar, setClar]   = useState({});     // Runi's explanation of flagged contradictions
  const [contra, setContra] = useState({});   // { [id]: { busy, list, summary, ran } }
  const [busyId, setBusyId] = useState("");
  const [zoom, setZoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkContradictions = async (s) => {
    const finalAnswer = (edits[s.id] || "").trim();
    if (!finalAnswer) { alert("Write the final answer first, then check it."); return; }
    setContra(c => ({ ...c, [s.id]: { busy: true, list: [], summary: "", ran: false } }));
    try {
      const compact = protocols.map(p => ({ title: p.title, approvedLanguage: p.approvedLanguage, trigger: p.trigger }));
      const r = await aiCall("/ai/contradictions", { question: s.question, finalAnswer, protocols: compact });
      setContra(c => ({ ...c, [s.id]: { busy: false, list: r.contradictions || [], summary: r.summary || "", ran: true } }));
    } catch (e) {
      setContra(c => ({ ...c, [s.id]: { busy: false, list: [], summary: "", ran: false } }));
      alert("Couldn't run the check — " + (e.message || e));
    }
  };

  const load = async () => {
    setLoading(true);
    try {
      const r = await aiCall("/submissions" + (showResolved ? "" : "?status=pending"), null, "GET");
      const list = r.submissions || [];
      setSubs(list);
      setEdits(prev => { const e = { ...prev }; list.forEach(s => { if (e[s.id] === undefined) e[s.id] = s.approvedAnswer || s.currentAnswer || s.draft || ""; }); return e; });
    } catch {} finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [showResolved]);

  const approve = async (s) => {
    const finalAnswer = (edits[s.id] || "").trim();
    if (!finalAnswer) { alert("Add the final answer before approving."); return; }
    setBusyId(s.id);
    try {
      await aiCall("/submissions/approve", {
        id: s.id, finalAnswer,
        feedback: (notes[s.id] || "").trim(),
        clarifications: (clar[s.id] || "").trim(),
      });
      setSubs(list => list.filter(x => x.id !== s.id));
    }
    catch (e) { alert("Couldn't approve — " + (e.message || e)); }
    finally { setBusyId(""); }
  };
  // Send it back for a rewrite. Feedback is required; if Runi edited the answer box, that goes along as a suggested rewrite.
  const returnBack = async (s) => {
    const feedback = (notes[s.id] || "").trim();
    if (!feedback) { alert("Add feedback telling the agent what to change, then send it back."); return; }
    const edited = (edits[s.id] || "").trim();
    const original = (s.currentAnswer || s.draft || "").trim();
    const suggestion = edited && edited !== original ? edited : "";   // only send a rewrite if Runi actually changed it
    setBusyId(s.id);
    try {
      await aiCall("/submissions/return", { id: s.id, feedback, suggestion });
      setSubs(list => list.filter(x => x.id !== s.id));
    } catch (e) { alert("Couldn't send back — " + (e.message || e)); }
    finally { setBusyId(""); }
  };
  const reject = async (s) => {
    if (!window.confirm("Reject this submission? The agent will see it wasn't used.")) return;
    setBusyId(s.id);
    try { await aiCall("/submissions/reject", { id: s.id }); setSubs(list => list.filter(x => x.id !== s.id)); }
    catch (e) { alert("Couldn't reject — " + (e.message || e)); }
    finally { setBusyId(""); }
  };
  const box = { ...inputStyle, resize:"vertical", fontSize:"14px", lineHeight:1.8, fontFamily:"Georgia, 'Times New Roman', serif" };
  const pending  = subs.filter(s => s.status === "pending");
  const waiting  = subs.filter(s => s.status === "returned");   // sent back — waiting on the agent
  const resolved = subs.filter(s => s.status === "approved" || s.status === "rejected");

  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface, borderBottom:`1px solid ${D.border}`, padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"720px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={onClose} style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"8px", padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted, fontWeight:600, flexShrink:0, fontFamily:FONT }}>← Home</button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>✅ Approvals{pending.length ? ` (${pending.length})` : ""}</h2>
          <button onClick={() => setShowResolved(v => !v)} style={{ background:"none", border:"none", color:D.accent, cursor:"pointer", fontSize:"12.5px", fontWeight:600, textDecoration:"underline", fontFamily:FONT }}>{showResolved ? "Hide resolved" : "Show resolved"}</button>
        </div>
      </div>

      <div style={{ maxWidth:"720px", margin:"0 auto", padding:"20px 16px 48px" }}>
        {loading ? <p style={{ fontSize:"13px", color:D.muted }}>Loading…</p> : (
          <>
            {pending.length === 0 && <p style={{ fontSize:"14px", color:D.muted, textAlign:"center", padding:"30px 0" }}>🎉 Nothing waiting for approval.</p>}
            {pending.map(s => (
              <div key={s.id} style={{ background:D.surface, border:`1.5px solid ${D.accent}55`, borderRadius:"14px", padding:"16px 18px", marginBottom:"16px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                  <span style={{ fontSize:"13px", fontWeight:800, color:D.accentDark }}>👤 {s.agentFullName || s.agent}</span>
                  <span style={{ fontSize:"11.5px", color:D.muted }}>{timeAgo(s.createdAt)}</span>
                </div>
                <p style={{ margin:"0 0 5px", ...labelStyle }}>Customer&rsquo;s question</p>
                <p style={{ margin:"0 0 12px", fontSize:"14px", color:D.text, lineHeight:1.7, whiteSpace:"pre-wrap", background:D.surfaceSoft, border:`1px solid ${D.border}`, borderRadius:"10px", padding:"11px 13px" }}>{s.question}</p>
                {s.images && s.images.length > 0 && (
                  <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"12px" }}>
                    {s.images.map((d, i) => <img key={i} src={d} alt="" onClick={() => setZoom(d)} style={{ width:"84px", height:"84px", objectFit:"cover", borderRadius:"9px", border:`1.5px solid ${D.border}`, cursor:"zoom-in" }} />)}
                  </div>
                )}
                {(s.currentAnswer || s.draft) && (
                  <>
                    <p style={{ margin:"0 0 5px", ...labelStyle }}>Agent&rsquo;s {(s.thread || []).filter(t => t.by === "agent").length > 1 ? "latest" : "proposed"} answer</p>
                    <p style={{ margin:"0 0 12px", fontSize:"13.5px", color:D.muted, lineHeight:1.75, whiteSpace:"pre-wrap", fontStyle:"italic" }}>{s.currentAnswer || s.draft}</p>
                  </>
                )}
                <ThreadLog thread={s.thread} />
                <p style={{ margin:"14px 0 5px", ...labelStyle, color:D.success }}>Answer — edit &amp; approve, or leave it and send back with feedback</p>
                <textarea value={edits[s.id] || ""} onChange={e => setEdits({ ...edits, [s.id]: e.target.value })} rows={7} style={box} />

                <p style={{ margin:"14px 0 5px", ...labelStyle }}>Feedback to the agent <span style={{ textTransform:"none", fontWeight:600, letterSpacing:0 }}>(teaches the AI on approve · required to send back)</span></p>
                <textarea value={notes[s.id] || ""} onChange={e => setNotes({ ...notes, [s.id]: e.target.value })} rows={2}
                  placeholder="e.g. Never quote a delivery date before the fabric is confirmed — say we'll follow up with a date instead."
                  style={{ ...inputStyle, resize:"vertical", fontSize:"13.5px", lineHeight:1.7 }} />

                <div style={{ marginTop:"14px", background:D.surfaceSoft, border:`1px solid ${D.border}`, borderRadius:"11px", padding:"12px 14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:"10px", flexWrap:"wrap" }}>
                    <span style={{ fontSize:"12.5px", fontWeight:700, color:D.text }}>🔍 Check this against our protocols &amp; past approvals</span>
                    <button onClick={() => checkContradictions(s)} disabled={contra[s.id] && contra[s.id].busy}
                      style={{ padding:"8px 14px", background:D.surface, color:D.accentDark, border:`1.5px solid ${D.accent}`, borderRadius:"9px", fontSize:"12.5px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>
                      {contra[s.id] && contra[s.id].busy ? "Checking…" : "Find contradictions"}
                    </button>
                  </div>
                  {contra[s.id] && contra[s.id].ran && (
                    contra[s.id].list.length === 0 ? (
                      <p style={{ margin:"10px 0 0", fontSize:"13px", color:D.success, fontWeight:600 }}>✅ No contradictions found — consistent with your protocols and past approvals.</p>
                    ) : (
                      <div style={{ marginTop:"10px" }}>
                        {contra[s.id].list.map((c, i) => (
                          <div key={i} style={{ background:D.dangerBg, border:`1px solid ${D.danger}33`, borderRadius:"9px", padding:"10px 12px", marginBottom:"8px" }}>
                            <p style={{ margin:"0 0 4px", fontSize:"11px", fontWeight:800, letterSpacing:"0.5px", textTransform:"uppercase", color:D.danger }}>Conflicts with: {c.conflictsWith}</p>
                            <p style={{ margin:"0 0 6px", fontSize:"13px", color:D.text, lineHeight:1.6 }}>{c.issue}</p>
                            <p style={{ margin:0, fontSize:"13px", color:"#7f1d1d", fontWeight:700, lineHeight:1.6 }}>❓ {c.question}</p>
                          </div>
                        ))}
                        <p style={{ margin:"10px 0 5px", ...labelStyle }}>Your explanation <span style={{ textTransform:"none", fontWeight:600, letterSpacing:0 }}>(the AI will follow this rule going forward)</span></p>
                        <textarea value={clar[s.id] || ""} onChange={e => setClar({ ...clar, [s.id]: e.target.value })} rows={3}
                          placeholder="Explain which rule wins and why — e.g. “The 30-day window starts at first fitting, not delivery. The older protocol is out of date.”"
                          style={{ ...inputStyle, resize:"vertical", fontSize:"13.5px", lineHeight:1.7 }} />
                      </div>
                    )
                  )}
                </div>

                <div style={{ display:"flex", gap:"10px", marginTop:"14px", flexWrap:"wrap" }}>
                  <button onClick={() => approve(s)} disabled={busyId === s.id} style={{ padding:"11px 22px", background:D.success, color:"#fff", border:"none", borderRadius:"10px", fontSize:"14px", fontWeight:700, cursor: busyId === s.id ? "default" : "pointer", fontFamily:FONT }}>{busyId === s.id ? "Saving…" : "✓ Approve & send"}</button>
                  <button onClick={() => returnBack(s)} disabled={busyId === s.id} style={{ padding:"11px 18px", background:D.surface, color:"#B45309", border:`1.5px solid #f0d9b5`, borderRadius:"10px", fontSize:"13.5px", fontWeight:700, cursor: busyId === s.id ? "default" : "pointer", fontFamily:FONT }}>↩ Send back to rewrite</button>
                  <button onClick={() => reject(s)} disabled={busyId === s.id} style={{ padding:"11px 18px", background:D.surface, color:D.danger, border:`1.5px solid ${D.danger}55`, borderRadius:"10px", fontSize:"13.5px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>Reject</button>
                </div>
              </div>
            ))}

            {showResolved && (waiting.length > 0 || resolved.length > 0) && (
              <>
                {waiting.length > 0 && <p style={{ margin:"22px 0 10px", ...labelStyle, color:"#B45309" }}>Sent back — waiting on the agent</p>}
                {[...waiting, ...(resolved.length ? [null] : []), ...resolved].map((s, idx) => {
                  if (s === null) return <p key="hdr" style={{ margin:"22px 0 10px", ...labelStyle }}>Resolved</p>;
                  const st = SUB_STATUS[s.status] || SUB_STATUS.approved;
                  return (
                    <div key={s.id} style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"12px", padding:"13px 15px", marginBottom:"10px" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
                        <span style={{ fontSize:"12.5px", fontWeight:700, color:D.text }}>👤 {s.agentFullName || s.agent}</span>
                        <span style={{ fontSize:"11.5px", fontWeight:800, padding:"2px 8px", borderRadius:"20px", color:st.color, background:st.bg }}>{st.label}</span>
                      </div>
                      <p style={{ margin:"0 0 6px", fontSize:"13px", color:D.muted, whiteSpace:"pre-wrap" }}>{s.question}</p>
                      {s.approvedAnswer && <p style={{ margin:0, fontSize:"13.5px", color:D.text, lineHeight:1.7, whiteSpace:"pre-wrap", fontFamily:"Georgia, 'Times New Roman', serif" }}>{s.approvedAnswer}</p>}
                      <ThreadLog thread={s.thread} />
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
      {zoom && (
        <div onClick={() => setZoom(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50, padding:"20px", cursor:"zoom-out" }}>
          <img src={zoom} alt="" style={{ maxWidth:"100%", maxHeight:"100%", borderRadius:"10px" }} />
        </div>
      )}
    </div>
  );
};

const LessonsView = ({ onClose }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => { setLoading(true); try { const r = await aiCall("/lessons", null, "GET"); setLessons(r.lessons || []); } catch {} finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const del = async (id) => { if (!window.confirm("Remove this from what the AI has learned?")) return; setLessons(l => l.filter(x => x.id !== id)); try { await aiCall("/lessons/delete", { id }); } catch {} };
  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface, borderBottom:`1px solid ${D.border}`, padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"720px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={onClose} style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"8px", padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted, fontWeight:600, flexShrink:0, fontFamily:FONT }}>← Home</button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>🧠 Learned answers{lessons.length ? ` (${lessons.length})` : ""}</h2>
        </div>
      </div>
      <div style={{ maxWidth:"720px", margin:"0 auto", padding:"20px 16px 48px" }}>
        <p style={{ margin:"0 0 16px", fontSize:"13px", color:D.muted, lineHeight:1.6 }}>
          Every answer you approve lands here. When an agent drafts a response, the AI pulls up the closest of these and follows your wording and judgment — so the more you approve, the more it sounds like you.
        </p>
        {loading ? <p style={{ fontSize:"13px", color:D.muted }}>Loading…</p> :
          lessons.length === 0 ? <p style={{ fontSize:"14px", color:D.muted, textAlign:"center", padding:"30px 0" }}>Nothing learned yet — approve a submission and it&rsquo;ll appear here.</p> :
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            {lessons.map(l => (
              <div key={l.id} style={{ background:D.surface, border:`1.5px solid ${D.border}`, borderRadius:"12px", padding:"14px 16px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"7px" }}>
                  <span style={{ fontSize:"11px", fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase", color:D.muted }}>Q&nbsp;·&nbsp;{timeAgo(l.createdAt)}{l.agent ? ` · via ${l.agent}` : ""}</span>
                  <button onClick={() => del(l.id)} style={{ background:"none", border:"none", color:D.danger, cursor:"pointer", fontSize:"12px", fontWeight:600, fontFamily:FONT }}>Remove</button>
                </div>
                <p style={{ margin:"0 0 9px", fontSize:"13.5px", color:D.text, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{l.question}</p>
                <p style={{ margin:0, fontSize:"14px", color:D.text, lineHeight:1.8, whiteSpace:"pre-wrap", fontFamily:"Georgia, 'Times New Roman', serif", background:D.successBg, border:`1px solid ${D.success}33`, borderRadius:"9px", padding:"11px 13px" }}>{l.answer}</p>
                {l.guidance && (
                  <div style={{ marginTop:"9px", background:"#FBF3E6", border:"1px solid #e6d5b8", borderRadius:"9px", padding:"10px 12px" }}>
                    <p style={{ margin:"0 0 3px", fontSize:"10.5px", fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase", color:D.accentDark }}>Your guidance — the AI follows this rule</p>
                    <p style={{ margin:0, fontSize:"13px", color:D.text, lineHeight:1.65, whiteSpace:"pre-wrap" }}>{l.guidance}</p>
                  </div>
                )}
              </div>
            ))}
          </div>}
      </div>
    </div>
  );
};

// ─── HISTORY REVIEW (staff) ──────────────────────────────────────
const HistoryView = ({ onClose }) => {
  const [history, setHistory] = useState(null);
  const [err, setErr] = useState("");
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    (async () => {
      try { const r = await aiCall("/history", null, "GET"); setHistory(r.history || []); }
      catch (e) { setErr(e.message || String(e)); setHistory([]); }
    })();
  }, []);

  const fmt = (ts) => { try { return new Date(ts).toLocaleString(undefined, { month:"short", day:"numeric", hour:"numeric", minute:"2-digit" }); } catch { return ""; } };
  const scoreColor = (s) => s >= 70 ? D.success : s >= 40 ? "#d97706" : D.danger;
  const remove = async (id) => {
    setHistory(h => (h || []).filter(x => x.id !== id));
    try { await aiCall("/history/delete", { id }); } catch {}
  };

  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface, borderBottom:`1px solid ${D.border}`,
        padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={onClose} style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`,
            borderRadius:"8px", padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted,
            fontWeight:600, flexShrink:0, fontFamily:FONT }}>← Home</button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>Response History</h2>
        </div>
      </div>

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"20px 16px 48px" }}>
        <p style={{ margin:"0 0 16px", fontSize:"13px", color:D.muted, lineHeight:1.6 }}>
          Every response your agents ran through the checker — with its score. Low scores are worth a look.
        </p>
        {history === null && <p style={{ fontSize:"13px", color:D.muted }}>Loading…</p>}
        {history && history.length === 0 && (
          <div style={{ textAlign:"center", padding:"50px 20px" }}>
            <div style={{ fontSize:"40px", marginBottom:"12px" }}>📭</div>
            <p style={{ fontSize:"15px", fontWeight:700, color:D.text }}>No checks logged yet.</p>
            {err && <p style={{ fontSize:"12px", color:D.danger, marginTop:"8px" }}>({err})</p>}
          </div>
        )}
        {history && history.length > 0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {history.map(h => (
              <div key={h.id} onClick={() => setOpenId(openId === h.id ? null : h.id)}
                style={{ background:D.surface, border:`1.5px solid ${D.border}`, borderRadius:"12px", padding:"14px 16px", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <span style={{ fontSize:"15px", fontWeight:800, color: h.score > 0 ? scoreColor(h.score) : D.muted, minWidth:"46px" }}>{h.score > 0 ? h.score + "%" : "✍️"}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"13.5px", fontWeight:700, color:D.text }}>{h.agent} <span style={{ color:D.muted, fontWeight:400 }}>· {h.protocolTitle || "—"}</span></div>
                    <div style={{ fontSize:"11.5px", color:D.muted, marginTop:"2px" }}>{fmt(h.createdAt)}</div>
                  </div>
                  <span style={{ fontSize:"11px", fontWeight:700, color: h.verdict === "good" ? D.success : D.danger }}>
                    {h.verdict === "used" ? "used" : h.verdict === "good" ? "sent" : "needs work"}
                  </span>
                </div>
                {openId === h.id && (
                  <div style={{ marginTop:"12px", borderTop:`1px solid ${D.border}`, paddingTop:"12px" }}>
                    <p style={{ margin:"0 0 4px", fontSize:"11px", fontWeight:800, textTransform:"uppercase", color:D.muted }}>Situation</p>
                    <p style={{ margin:"0 0 10px", fontSize:"13px", color:D.text, lineHeight:1.6 }}>{h.situation || "—"}</p>
                    <p style={{ margin:"0 0 4px", fontSize:"11px", fontWeight:800, textTransform:"uppercase", color:D.muted }}>Reply they sent</p>
                    <p style={{ margin:0, fontSize:"13px", color:D.text, lineHeight:1.7, whiteSpace:"pre-wrap",
                      fontFamily:"Georgia, 'Times New Roman', serif" }}>{h.reply || "—"}</p>
                    <div style={{ marginTop:"12px", textAlign:"right" }}>
                      <button onClick={(e) => { e.stopPropagation(); remove(h.id); }}
                        style={{ background:"none", border:`1.5px solid ${D.danger}60`, color:D.danger,
                          padding:"5px 12px", borderRadius:"8px", fontSize:"11.5px", fontWeight:600, cursor:"pointer", fontFamily:FONT }}>
                        Remove entry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── MANAGE AGENTS (staff) ───────────────────────────────────────
const AgentsView = ({ onClose }) => {
  const [agents, setAgents] = useState(null);
  const [nn, setNn] = useState("");
  const [nu, setNu] = useState("");
  const [np, setNp] = useState("");
  const [ne, setNe] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [emailEdits, setEmailEdits] = useState({});
  const [nameEdits, setNameEdits] = useState({});
  const [savedU, setSavedU] = useState("");

  const load = async () => {
    try { const r = await aiCall("/agents", null, "GET"); setAgents(r.agents || []); }
    catch (e) { setErr(e.message || String(e)); setAgents([]); }
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    if (busy) return;
    if (!nn.trim() || !nu.trim() || !np || !ne.trim()) { setErr("Full name, username, passcode and email are all required."); return; }
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(ne.trim())) { setErr("That email doesn't look right."); return; }
    setBusy(true); setErr("");
    try { await aiCall("/agents", { username: nu.trim(), passcode: np, email: ne.trim(), fullName: nn.trim() }); setNn(""); setNu(""); setNp(""); setNe(""); await load(); }
    catch (e) { setErr(/409/.test(e.message || "") ? "That username already exists." : "Couldn't add — " + (e.message || e)); }
    finally { setBusy(false); }
  };
  const saveAgent = async (u) => {
    const email = (emailEdits[u] !== undefined ? emailEdits[u] : "").trim();
    const fullName = (nameEdits[u] !== undefined ? nameEdits[u] : "").trim();
    const payload = { username: u };
    if (emailEdits[u] !== undefined) payload.email = email;
    if (nameEdits[u] !== undefined) payload.fullName = fullName;
    try {
      await aiCall("/agents/update", payload);
      setSavedU(u); setTimeout(() => setSavedU(""), 1800);
      setEmailEdits(e => { const c = { ...e }; delete c[u]; return c; });
      setNameEdits(e => { const c = { ...e }; delete c[u]; return c; });
      await load();
    } catch (e) { alert("Couldn't save — " + (e.message || e)); }
  };
  const del = async (u) => {
    if (!window.confirm("Remove " + u + "'s login? They won't be able to sign in.")) return;
    try { await aiCall("/agents/delete", { username: u }); await load(); } catch {}
  };
  const fmt = (ts) => { try { return new Date(ts).toLocaleDateString(undefined, { month:"short", day:"numeric" }); } catch { return ""; } };

  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface, borderBottom:`1px solid ${D.border}`,
        padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={onClose} style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`,
            borderRadius:"8px", padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted,
            fontWeight:600, flexShrink:0, fontFamily:FONT }}>← Home</button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>Manage Agents</h2>
        </div>
      </div>

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"20px 16px 48px" }}>
        <div style={{ background:D.surface, border:`1.5px solid ${D.border}`, borderRadius:"14px", padding:"16px 18px", marginBottom:"18px" }}>
          <p style={{ margin:"0 0 12px", fontSize:"12px", fontWeight:800, letterSpacing:"0.6px", textTransform:"uppercase", color:D.muted }}>Add an agent login <span style={{ textTransform:"none", fontWeight:600, letterSpacing:0 }}>— all fields required</span></p>
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            <input value={nn} onChange={e => { setNn(e.target.value); setErr(""); }} placeholder="Full name (e.g. Sarah Cohen)"
              style={{ ...inputStyle, flex:"1 1 180px" }} />
            <input value={ne} onChange={e => { setNe(e.target.value); setErr(""); }} placeholder="Email (for approvals)" type="email"
              style={{ ...inputStyle, flex:"1 1 200px" }} />
            <input value={nu} onChange={e => { setNu(e.target.value); setErr(""); }} placeholder="Username (e.g. sarah)"
              style={{ ...inputStyle, flex:"1 1 150px" }} />
            <input value={np} onChange={e => { setNp(e.target.value); setErr(""); }} placeholder="Passcode"
              onKeyDown={e => { if (e.key === "Enter") add(); }} style={{ ...inputStyle, flex:"1 1 130px" }} />
            <button onClick={add} disabled={busy}
              style={{ padding:"11px 20px", background:D.accent, color:"#fff", border:"none", borderRadius:"10px",
                fontSize:"13.5px", fontWeight:700, cursor: busy ? "default" : "pointer", fontFamily:FONT }}>
              {busy ? "Adding…" : "Add"}
            </button>
          </div>
          {err && <p style={{ margin:"10px 2px 0", fontSize:"12.5px", color:D.danger, fontWeight:600 }}>{err}</p>}
          <p style={{ margin:"10px 2px 0", fontSize:"11.5px", color:D.muted, lineHeight:1.5 }}>
            The agent signs in with their username + passcode. Their full name shows on submissions, and approved answers are emailed to them.
          </p>
        </div>

        <p style={{ margin:"0 0 10px", fontSize:"11px", fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:D.muted }}>Agents</p>
        {agents === null && <p style={{ fontSize:"13px", color:D.muted }}>Loading…</p>}
        {agents && agents.length === 0 && <p style={{ fontSize:"13px", color:D.muted }}>No agents yet — add one above.</p>}
        {agents && agents.length > 0 && (
          <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
            {agents.map(a => (
              <div key={a.username} style={{ background:D.surface, border:`1.5px solid ${D.border}`, borderRadius:"11px", padding:"12px 16px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <span style={{ fontSize:"16px" }}>👤</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:"14px", fontWeight:700, color:D.text }}>{a.fullName || a.username}</div>
                    <div style={{ fontSize:"11.5px", color:D.muted }}>@{a.username} · added {fmt(a.createdAt)}{a.email ? "" : " · ⚠️ no email"}</div>
                  </div>
                  <button onClick={() => del(a.username)}
                    style={{ background:"none", border:`1.5px solid ${D.danger}60`, color:D.danger, padding:"5px 12px",
                      borderRadius:"8px", fontSize:"11.5px", fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Remove</button>
                </div>
                <div style={{ display:"flex", gap:"8px", marginTop:"9px", alignItems:"center", flexWrap:"wrap" }}>
                  <input placeholder="Full name"
                    value={nameEdits[a.username] !== undefined ? nameEdits[a.username] : (a.fullName || "")}
                    onChange={e => setNameEdits({ ...nameEdits, [a.username]: e.target.value })}
                    onKeyDown={e => { if (e.key === "Enter") saveAgent(a.username); }}
                    style={{ ...inputStyle, flex:"1 1 150px", padding:"8px 11px", fontSize:"12.5px" }} />
                  <input type="email" placeholder="Email for approval notifications"
                    value={emailEdits[a.username] !== undefined ? emailEdits[a.username] : (a.email || "")}
                    onChange={e => setEmailEdits({ ...emailEdits, [a.username]: e.target.value })}
                    onKeyDown={e => { if (e.key === "Enter") saveAgent(a.username); }}
                    style={{ ...inputStyle, flex:"1 1 190px", padding:"8px 11px", fontSize:"12.5px" }} />
                  <button onClick={() => saveAgent(a.username)}
                    style={{ padding:"8px 14px", background: savedU === a.username ? D.success : D.surfaceSoft,
                      color: savedU === a.username ? "#fff" : D.accentDark, border:`1.5px solid ${savedU === a.username ? D.success : D.accent}`,
                      borderRadius:"9px", fontSize:"12.5px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>
                    {savedU === a.username ? "✓ Saved" : "Save"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── TEMPLATES VIEW ──────────────────────────────────────────────
const TemplatesView = ({ templates, staff, onEdit, onDelete, onAdd, onClose }) => {
  const [search, setSearch] = useState("");
  const q = search.trim().toLowerCase();
  const filtered = !q ? templates : templates.filter(t =>
    [t.title, t.body, t.group].some(x => (x || "").toLowerCase().includes(q)));
  const groupNames = [
    ...TEMPLATE_GROUP_ORDER.filter(g => filtered.some(t => t.group === g)),
    ...[...new Set(filtered.map(t => t.group))].filter(g => !TEMPLATE_GROUP_ORDER.includes(g)),
  ];

  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface, borderBottom:`1px solid ${D.border}`,
        padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={onClose} style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`,
            borderRadius:"8px", padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted,
            fontWeight:600, flexShrink:0, fontFamily:FONT }}>← Protocols</button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>📄 Templates</h2>
          {staff && (
            <button onClick={onAdd} style={{ background:D.accent, border:`1.5px solid ${D.accent}`, borderRadius:"8px",
              padding:"7px 14px", cursor:"pointer", fontSize:"13px", color:"#fff", fontWeight:700, flexShrink:0, fontFamily:FONT }}>＋ New</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"18px 16px 48px" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates…"
          style={{ width:"100%", padding:"13px 16px", fontSize:"14px", border:`1.5px solid ${D.border}`,
            borderRadius:"11px", outline:"none", background:D.surface, color:D.text, boxSizing:"border-box",
            fontFamily:FONT, marginBottom:"18px" }} />

        {filtered.length === 0 && <p style={{ fontSize:"13px", color:D.muted }}>No templates match that.</p>}

        {groupNames.map(g => (
          <div key={g} style={{ marginBottom:"22px" }}>
            <p style={{ margin:"0 0 10px", fontSize:"11px", fontWeight:700, letterSpacing:"1.5px",
              textTransform:"uppercase", color:D.accent }}>{g}</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {filtered.filter(t => t.group === g).map(t => (
                <div key={t.id} style={{ background:D.surface, border:`1.5px solid ${D.border}`, borderRadius:"14px", overflow:"hidden" }}>
                  <div style={{ padding:"12px 16px", borderBottom:`1px solid ${D.border}`, background:D.surfaceSoft,
                    display:"flex", alignItems:"center", justifyContent:"space-between", gap:"8px", flexWrap:"wrap" }}>
                    <span style={{ fontSize:"13.5px", fontWeight:700, color:D.text }}>{t.title}</span>
                    <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
                      {staff && <button onClick={() => onEdit(t)} style={{ background:"none", border:`1.5px solid ${D.border}`,
                        color:D.muted, padding:"4px 10px", borderRadius:"7px", fontSize:"11.5px", fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Edit</button>}
                      {staff && <button onClick={() => { if (window.confirm("Delete this template?")) onDelete(t.id); }}
                        style={{ background:"none", border:`1.5px solid ${D.danger}55`, color:D.danger, padding:"4px 10px",
                          borderRadius:"7px", fontSize:"11.5px", fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Delete</button>}
                      <CopyButton text={t.body} label="Copy" small />
                    </div>
                  </div>
                  <div style={{ padding:"14px 16px" }}>
                    <p style={{ margin:0, fontSize:"13.5px", lineHeight:1.75, color:D.text, whiteSpace:"pre-wrap" }}>{t.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── TEMPLATE EDITOR (staff) ─────────────────────────────────────
const TemplateForm = ({ initial, isNew, groups, onSave, onCancel }) => {
  const [group, setGroup] = useState(initial?.group || (groups[0] || ""));
  const [title, setTitle] = useState(initial?.title || "");
  const [body, setBody]   = useState(initial?.body || "");
  const [err, setErr] = useState("");
  const submit = () => {
    if (!title.trim()) { setErr("Add a title."); return; }
    if (!body.trim())  { setErr("Add the message body."); return; }
    onSave({ id: initial?.id, group: (group || "Other").trim(), title: title.trim(), body: body }, isNew);
  };
  return (
    <div style={{ minHeight:"100vh", background:D.background, fontFamily:FONT }}>
      <div style={{ position:"sticky", top:0, zIndex:20, background:D.surface, borderBottom:`1px solid ${D.border}`,
        padding:"12px 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", display:"flex", gap:"12px", alignItems:"center" }}>
          <button onClick={onCancel} style={{ background:D.surfaceSoft, border:`1.5px solid ${D.border}`, borderRadius:"8px",
            padding:"7px 12px", cursor:"pointer", fontSize:"13px", color:D.muted, fontWeight:600, flexShrink:0, fontFamily:FONT }}>← Cancel</button>
          <h2 style={{ margin:0, flex:1, fontSize:"17px", fontWeight:800, color:D.text }}>{isNew ? "New Template" : "Edit Template"}</h2>
          <button onClick={submit} style={{ background:D.accent, border:`1.5px solid ${D.accent}`, borderRadius:"8px",
            padding:"8px 20px", cursor:"pointer", fontSize:"13px", color:"#fff", fontWeight:700, flexShrink:0, fontFamily:FONT }}>{isNew ? "Add" : "Save"}</button>
        </div>
      </div>
      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"20px 16px 56px" }}>
        {err && <div style={{ background:D.dangerBg, border:`1.5px solid ${D.danger}40`, borderRadius:"11px",
          padding:"11px 16px", marginBottom:"14px", fontSize:"13px", color:D.danger, fontWeight:600 }}>{err}</div>}
        <Field label="Group"><input value={group} onChange={e => setGroup(e.target.value)} list="tpl-groups" placeholder="e.g. Garment Ready — by location" style={inputStyle} />
          <datalist id="tpl-groups">{groups.map(g => <option key={g} value={g} />)}</datalist>
        </Field>
        <Field label="Title"><input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Suit Ready — Baltimore" style={inputStyle} /></Field>
        <Field label="Message (what gets copied)">
          <textarea value={body} onChange={e => setBody(e.target.value)} rows={12}
            placeholder="The message text. Use [Customer name] / [your name] / [time] as placeholders."
            style={{ ...inputStyle, resize:"vertical", lineHeight:1.7 }} />
        </Field>
      </div>
    </div>
  );
};

// ─── STAFF SIGN-IN MODAL ─────────────────────────────────────────
const StaffGate = ({ onUnlock, onClose }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState(false);
  const submit = () => { if (onUnlock(code)) onClose(); else { setErr(true); setCode(""); } };
  return (
    <div onClick={onClose}
      style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(23,23,23,0.45)",
        display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", fontFamily:FONT }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:D.surface, borderRadius:"16px", border:`1.5px solid ${D.border}`,
          padding:"26px 24px", maxWidth:"360px", width:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ fontSize:"30px", textAlign:"center", marginBottom:"10px" }}>🔒</div>
        <h2 style={{ margin:"0 0 4px", fontSize:"18px", fontWeight:800, color:D.text, textAlign:"center" }}>Admin sign-in</h2>
        <p style={{ margin:"0 0 18px", fontSize:"13px", color:D.muted, textAlign:"center", lineHeight:1.5 }}>
          Enter the admin passcode to manage protocols, agents, and review responses.
        </p>
        <input type="password" value={code} autoFocus
          onChange={e => { setCode(e.target.value); setErr(false); }}
          onKeyDown={e => { if (e.key === "Enter") submit(); }}
          placeholder="Passcode"
          style={{ width:"100%", padding:"13px 16px", fontSize:"15px", boxSizing:"border-box",
            border:`1.5px solid ${err ? D.danger : D.border}`, borderRadius:"11px", outline:"none",
            background:D.surface, color:D.text, fontFamily:FONT, marginBottom: err ? "8px" : "16px" }} />
        {err && <p style={{ margin:"0 0 14px", fontSize:"12.5px", color:D.danger, fontWeight:600 }}>Incorrect passcode. Try again.</p>}
        <div style={{ display:"flex", gap:"10px" }}>
          <button onClick={onClose}
            style={{ flex:1, padding:"12px", background:D.surface, color:D.muted, border:`1.5px solid ${D.border}`,
              borderRadius:"10px", fontSize:"13px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>
            Cancel
          </button>
          <button onClick={submit}
            style={{ flex:1, padding:"12px", background:D.accent, color:"#fff", border:"none",
              borderRadius:"10px", fontSize:"13px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── AGENT SIGN-IN MODAL ─────────────────────────────────────────
const AgentGate = ({ onLogin, onClose }) => {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    if (!u.trim() || !p || busy) return;
    setBusy(true); setErr(false);
    const ok = await onLogin(u.trim(), p);
    setBusy(false);
    if (ok) onClose(); else { setErr(true); setP(""); }
  };
  return (
    <div onClick={onClose}
      style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(23,23,23,0.45)",
        display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", fontFamily:FONT }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:D.surface, borderRadius:"16px", border:`1.5px solid ${D.border}`,
          padding:"26px 24px", maxWidth:"360px", width:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ fontSize:"30px", textAlign:"center", marginBottom:"10px" }}>👤</div>
        <h2 style={{ margin:"0 0 4px", fontSize:"18px", fontWeight:800, color:D.text, textAlign:"center" }}>Agent sign-in</h2>
        <p style={{ margin:"0 0 18px", fontSize:"13px", color:D.muted, textAlign:"center", lineHeight:1.5 }}>
          Sign in with the username and passcode your manager gave you.
        </p>
        <input value={u} autoFocus onChange={e => { setU(e.target.value); setErr(false); }}
          placeholder="Username"
          style={{ width:"100%", padding:"13px 16px", fontSize:"15px", boxSizing:"border-box",
            border:`1.5px solid ${D.border}`, borderRadius:"11px", outline:"none",
            background:D.surface, color:D.text, fontFamily:FONT, marginBottom:"10px" }} />
        <input type="password" value={p} onChange={e => { setP(e.target.value); setErr(false); }}
          onKeyDown={e => { if (e.key === "Enter") submit(); }} placeholder="Passcode"
          style={{ width:"100%", padding:"13px 16px", fontSize:"15px", boxSizing:"border-box",
            border:`1.5px solid ${err ? D.danger : D.border}`, borderRadius:"11px", outline:"none",
            background:D.surface, color:D.text, fontFamily:FONT, marginBottom: err ? "8px" : "16px" }} />
        {err && <p style={{ margin:"0 0 14px", fontSize:"12.5px", color:D.danger, fontWeight:600 }}>Wrong username or passcode.</p>}
        <div style={{ display:"flex", gap:"10px" }}>
          <button onClick={onClose}
            style={{ flex:1, padding:"12px", background:D.surface, color:D.muted, border:`1.5px solid ${D.border}`,
              borderRadius:"10px", fontSize:"13px", fontWeight:700, cursor:"pointer", fontFamily:FONT }}>Cancel</button>
          <button onClick={submit} disabled={busy}
            style={{ flex:1, padding:"12px", background:D.accent, color:"#fff", border:"none",
              borderRadius:"10px", fontSize:"13px", fontWeight:700, cursor: busy ? "default" : "pointer", fontFamily:FONT }}>
            {busy ? "Checking…" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── ROOT APP ────────────────────────────────────────────────────
// Backfill keywords/tags onto stored protocols by id, WITHOUT overwriting any
// existing content or resurrecting deleted items. Safe on both the hosted build
// and the artifact. Returns [migratedList, changed].
const SEED_BY_ID = Object.fromEntries(APPROVED_PROTOCOLS.map(p => [p.id, p]));
const migrateProtocols = (list) => {
  let changed = false;
  const out = list.map(p => {
    const seed = SEED_BY_ID[p.id];
    const next = { ...p };
    if (p.keywords === undefined) { next.keywords = seed?.keywords ?? ""; changed = true; }
    if (p.tags === undefined)     { next.tags = seed?.tags ?? []; changed = true; }
    return next;
  });
  return [out, changed];
};

export default function App() {
  const [protocols, setProtocols] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [templateForm, setTemplateForm] = useState(null); // null | { initial, isNew }
  const [questions, setQuestions] = useState([]);   // "needs answers" inbox (from backend)
  const [selected, setSelected]   = useState(null);
  const [formState, setFormState] = useState(null); // null | { initial, isNew, questionId }
  const [triageOpen, setTriage]   = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [checkerOpen, setCheckerOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [showAgents, setShowAgents]   = useState(false);
  const [submitOpen, setSubmitOpen]   = useState(false);
  const [approvalsOpen, setApprovalsOpen] = useState(false);
  const [lessonsOpen, setLessonsOpen] = useState(false);
  const [answerQ, setAnswerQ] = useState(null);   // flagged question being answered
  const [submitPrefill, setSubmitPrefill] = useState(null);   // {question, draft} carried from the assistant
  const [pendingCount, setPendingCount] = useState(0);
  const [agentUser, setAgentUser] = useState("");
  const [staff, setStaff]         = useState(false);
  const [loaded, setLoaded]       = useState(false);

  const loadQuestions = async () => {
    try { const r = await aiCall("/questions", null, "GET"); setQuestions(r.questions || []); } catch {}
  };
  const loadPending = async () => {
    try { const r = await aiCall("/submissions", null, "GET"); setPendingCount(r.pending || 0); } catch {}
  };

  useEffect(() => {
    try { document.title = "Protocol Desk"; } catch {}
    // Inject the brand stylesheet once (carries the responsive breakpoints).
    try {
      if (!document.getElementById("gc-css")) {
        const el = document.createElement("style");
        el.id = "gc-css"; el.textContent = GC_CSS;
        document.head.appendChild(el);
      }
      if (!document.querySelector('meta[name="viewport"]')) {
        const m = document.createElement("meta");
        m.name = "viewport"; m.content = "width=device-width, initial-scale=1";
        document.head.appendChild(m);
      }
    } catch {}
    (async () => {
      let isStaff = false;
      try { const rs = await window.storage.get("gc-staff"); if (rs?.value === "1") { setStaff(true); SESSION.staff = true; isStaff = true; } } catch {}
      try {
        const ru = await window.storage.get("gc-agent-user");
        const rp = await window.storage.get("gc-agent-pass");
        if (ru?.value) { setAgentUser(ru.value); SESSION.agentUser = ru.value; SESSION.agentPass = rp?.value || ""; }
      } catch {}
      try {
        const rt = await window.storage.get("gc-templates-v1");
        const t = rt?.value ? JSON.parse(rt.value) : null;
        if (Array.isArray(t) && t.length) { setTemplates(t); }
        else { setTemplates(RAW_TEMPLATES); try { await window.storage.set("gc-templates-v1", JSON.stringify(RAW_TEMPLATES)); } catch {} }
      } catch { setTemplates(RAW_TEMPLATES); }
      try {
        const r = await window.storage.get("gc-protocols-v20");
        if (r?.value) {
          const s = JSON.parse(r.value);
          if (Array.isArray(s) && s.length > 0) {
            const [migrated, changed] = migrateProtocols(s);
            setProtocols(migrated);
            if (changed) { try { await window.storage.set("gc-protocols-v20", JSON.stringify(migrated)); } catch {} }
            setLoaded(true);
            if (isStaff) { loadQuestions(); loadPending(); }
            return;
          }
        }
      } catch {}
      setProtocols(APPROVED_PROTOCOLS);
      try { await window.storage.set("gc-protocols-v20", JSON.stringify(APPROVED_PROTOCOLS)); } catch {}
      setLoaded(true);
      if (isStaff) { loadQuestions(); loadPending(); }
    })();
  }, []);

  const save = async (list) => {
    try { await window.storage.set("gc-protocols-v20", JSON.stringify(list)); } catch {}
  };
  const saveTemplates = async (list) => { try { await window.storage.set("gc-templates-v1", JSON.stringify(list)); } catch {} };
  const nextTemplateId = () => "t" + (Math.max(0, ...templates.map(t => parseInt(String(t.id).replace(/\D/g, ""), 10)).filter(n => !isNaN(n))) + 1);
  const handleSaveTemplate = async (tpl, isNew) => {
    const updated = isNew ? [...templates, { ...tpl, id: nextTemplateId() }] : templates.map(t => t.id === tpl.id ? tpl : t);
    setTemplates(updated); await saveTemplates(updated); setTemplateForm(null);
  };
  const handleDeleteTemplate = async (id) => {
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated); await saveTemplates(updated);
  };
  // Flagged questions now live on the shared backend, so Runi sees them from any device.
  const addQuestion = async (text) => {
    const t = (text || "").trim(); if (!t) return;
    try { await aiCall("/questions", { text: t }); } catch {}
  };
  const resolveQuestion = async (id) => {
    setQuestions(qs => qs.filter(q => q.id !== id));
    try { await aiCall("/questions/resolve", { id }); } catch {}
  };
  const agentLogin = async (user, pass) => {
    const name = await agentLoginCall(user, pass);
    if (name) {
      setAgentUser(name);
      try { window.storage.set("gc-agent-user", name); window.storage.set("gc-agent-pass", pass); } catch {}
      return true;
    }
    return false;
  };
  const agentLogout = () => {
    setAgentUser(""); SESSION.agentUser = ""; SESSION.agentPass = "";
    try { window.storage.set("gc-agent-user", ""); window.storage.set("gc-agent-pass", ""); } catch {}
  };
  const unlockStaff = (code) => {
    if (code === STAFF_PASSCODE) { setStaff(true); SESSION.staff = true; try { window.storage.set("gc-staff", "1"); } catch {} loadQuestions(); loadPending(); return true; }
    return false;
  };
  const lockStaff = () => { setStaff(false); SESSION.staff = false; try { window.storage.set("gc-staff", "0"); } catch {} };

  const handleSave = async (protocol, isNew, questionId) => {
    let updated, saved;
    if (isNew) {
      saved = { ...protocol, id: nextId(protocols) };
      updated = [saved, ...protocols];
    } else {
      saved = protocol;
      updated = protocols.map(p => p.id === protocol.id ? protocol : p);
    }
    setProtocols(updated);
    await save(updated);
    if (questionId) await resolveQuestion(questionId);   // answering a flagged question clears it
    setFormState(null);
    setSelected(saved);   // land on the saved protocol's detail page
  };

  if (!loaded) return (
    <div style={{ height:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
      background:D.background, fontFamily:FONT }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"32px", marginBottom:"12px" }}>👔</div>
        <p style={{ color:D.muted, fontSize:"14px" }}>Loading protocols…</p>
      </div>
    </div>
  );

  // Form (add / edit / answer-a-question) — staff only
  if (formState && staff) {
    return (
      <ProtocolForm
        initial={formState.initial}
        isNew={formState.isNew}
        onSave={(protocol, isNew) => handleSave(protocol, isNew, formState.questionId)}
        onCancel={() => setFormState(null)}
      />
    );
  }

  if (answerQ && staff) {
    return (
      <AnswerQuestionView
        q={answerQ}
        protocols={protocols}
        onSaved={async () => { setAnswerQ(null); await loadQuestions(); setShowQuestions(true); }}
        onClose={() => { setAnswerQ(null); setShowQuestions(true); }}
      />
    );
  }

  if (showQuestions && staff) {
    return (
      <QuestionsView
        questions={questions}
        onAnswer={(q) => { setShowQuestions(false); setAnswerQ(q); }}
        onDismiss={resolveQuestion}
        onClose={() => setShowQuestions(false)}
      />
    );
  }

  if (templateForm && staff) {
    return (
      <TemplateForm
        initial={templateForm.initial}
        isNew={templateForm.isNew}
        groups={[...new Set([...TEMPLATE_GROUP_ORDER, ...templates.map(t => t.group)])]}
        onSave={handleSaveTemplate}
        onCancel={() => setTemplateForm(null)}
      />
    );
  }

  if (templatesOpen) {
    return (
      <TemplatesView
        templates={templates}
        staff={staff}
        onEdit={(t) => setTemplateForm({ initial: t, isNew: false })}
        onDelete={handleDeleteTemplate}
        onAdd={() => setTemplateForm({ initial: null, isNew: true })}
        onClose={() => setTemplatesOpen(false)}
      />
    );
  }

  if (checkerOpen) {
    return (
      <CheckerView
        protocols={protocols}
        agentUser={agentUser}
        staff={staff}
        onAgentLogin={agentLogin}
        onLogout={agentLogout}
        onSubmitForApproval={(question, draft) => { setCheckerOpen(false); setSubmitPrefill({ question, draft }); setSubmitOpen(true); }}
        onClose={() => setCheckerOpen(false)}
      />
    );
  }

  if (historyOpen && staff) {
    return <HistoryView onClose={() => setHistoryOpen(false)} />;
  }

  if (submitOpen) {
    return (
      <SubmitView
        protocols={protocols}
        agentUser={agentUser}
        staff={staff}
        prefill={submitPrefill}
        onAgentLogin={agentLogin}
        onLogout={agentLogout}
        onClose={() => { setSubmitOpen(false); setSubmitPrefill(null); }}
      />
    );
  }

  if (approvalsOpen && staff) {
    return <ApprovalsView protocols={protocols} onClose={() => { setApprovalsOpen(false); loadPending(); }} />;
  }

  if (lessonsOpen && staff) {
    return <LessonsView onClose={() => setLessonsOpen(false)} />;
  }

  if (showAgents && staff) {
    return <AgentsView onClose={() => setShowAgents(false)} />;
  }

  if (triageOpen) {
    return (
      <Triage
        protocols={protocols}
        onPick={(p) => { setSelected(p); setTriage(false); }}
        onClose={() => setTriage(false)}
      />
    );
  }

  if (selected) {
    return (
      <Detail
        p={selected}
        staff={staff}
        onBack={() => setSelected(null)}
        onEdit={(p) => setFormState({ initial: p, isNew: false, questionId: null })}
      />
    );
  }

  return (
    <Home
      protocols={protocols}
      staff={staff}
      agentUser={agentUser}
      onAgentLogin={agentLogin}
      onLogout={agentLogout}
      onUnlock={unlockStaff}
      onLock={lockStaff}
      onSelect={setSelected}
      onAddNew={() => setFormState({ initial: null, isNew: true, questionId: null })}
      onOpenTriage={() => setTriage(true)}
      onFlagQuestion={addQuestion}
      onOpenQuestions={() => { setShowQuestions(true); loadQuestions(); }}
      onOpenChecker={() => setCheckerOpen(true)}
      onOpenHistory={() => setHistoryOpen(true)}
      onOpenAgents={() => setShowAgents(true)}
      onOpenTemplates={() => setTemplatesOpen(true)}
      onOpenSubmit={() => { setSubmitPrefill(null); setSubmitOpen(true); }}
      onOpenApprovals={() => { setApprovalsOpen(true); loadPending(); }}
      onOpenLessons={() => setLessonsOpen(true)}
      pendingCount={pendingCount}
      questionCount={questions.length}
    />
  );
}
