import json
import re

# Full raw text from before
with open("./raw.txt", "r", encoding="utf-8") as f:
    raw_text = f.read()

# Note titles to split at
note_titles = [
    "Chest pain MDM",
    "STEMI MDM",
    "NSTEMI MDM",
    "CHF exacerbation MDM",
    "Volume overload MDM",
    "Cardiac arrest MDM",
    "ROSC MDM",
    "Lower Abdominal pain F non preg MDM",
    "Abdominal pain M MDM",
    "Testicular Pain MDM",
    "RUQ abdominal pain MDM",
    "RLQ abdominal pain MDM",
    "Epigastric abdominal pain MDM",
    "Rectal bleed",
    "Lower GI bleed",
    "UGIB",
    "Nausea/Vomiting MDM",
    "Gastroenteritis MDM",
    "Acute Diarrhea MDM",
    "Syncope low risk MDM",
    "Syncope - admit MDM",
    "Seizure MDM",
    "Stroke MDM",
    "Headache MDM",
    "AMS MDM",
    "Weakness MDM",
    "SOB MDM",
    "COPD exacerbation",
    "Cough MDM",
    "URI MDM",
    "Skin infection MDM",
    "Abscess MDM",
    "Diabetic Foot infection - admit MDM",
    "Rash MDM",
    "Allergic rash MDM",
    "Laceration MDM",
    "Upper back pain MDM",
    "Lower back pain MDM",
    "Fracture MDM",
    "Dislocation MDM",
    "Joint pain MDM",
    "Blunt Trauma-no serious injury MDM",
    "MVA Discharge MDM",
    "Extremity Penetrating Trauma MDM",
    "Urinary Retention Male MDM",
    "Flank Pain MDM",
    "Infected Obstructed kidney stone",
    "Pyelonephritis",
    "UTI Female nonpregnant MDM",
    "STD MDM",
    "Dizziness - low risk peripheral vertigo MDM",
    "Dizziness- high risk central vertigo MDM",
    "Vaginal Bleeding non pregnant MDM",
    "Vaginal bleeding pregnant MDM",
    "Symptomatic Anemia MDM",
    "Tachycardia-discharge MDM",
    "Bradycardia - dicharge MDM",
    "Asymptomatic HTN",
    "Corneal Abrasion MDM",
    "Eye redness benign MDM",
    "Subconjunctival hemorrhage MDM",
    "Swollen Eye MDM",
    "Vision loss painless MDM",
    "Painful vision loss nontraumatic MDM",
    "Sore throat MDM",
    "PTA discharged MDM",
    "Dental Pain MDM",
    "Acute Otitis media MDM",
    "Otitis Externa MDM",
    "Epistaxis",
    "Hyperglycemia MDM",
    "DKA MDM",
    "Hypoglycemia MDM",
    "Renal failure MDM",
    "AVF hemorrhage MDM",
    "Hyperkalemia MDM",
    "Hyponatremia MDM",
    "Psych MDM",
    "Panic attack/anxiety MDM",
    "Drug intoxication MDM",
    "Alcohol intoxication MDM",
    "Alcohol withdrawal MDM",
    "Sickle Cell - pain crisis MDM",
    "Sickle cell - acute chest syndrome"
]

# Build a regex to split the text based on the titles
pattern = '|'.join(re.escape(title) for title in note_titles)
split_notes = re.split(f'({pattern})', raw_text)

# Recombine each title with its corresponding note content
notes = []
i = 1
while i < len(split_notes):
    title = split_notes[i].strip()
    content = split_notes[i + 1].strip()
    notes.append({
        "name": title,
        "tags": ["mdm", "general"],
        "group": "mdm sample documentation",
        "note": content
    })
    i += 2

# Save to JSON
with open("mdm.json", "w", encoding="utf-8") as f:
    json.dump(notes, f, indent=2, ensure_ascii=False)

print("Success")