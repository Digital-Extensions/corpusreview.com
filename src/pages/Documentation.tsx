import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Play, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VideoScript {
  narration: string;
  curation: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string | null;
  duration: string;
  script: VideoScript | null;
}

interface VideoSection {
  id: string;
  title: string;
  description: string;
  videos: Video[];
}

// Script content for all 14 videos
const scripts: Record<string, VideoScript> = {
  "keeping-track": {
    narration: `OPENING
"This short video shows how to mark and organize significant material in Corpus Review."

CONTEXT
"This is useful when reviewing a document set where critical details appear across many files."

DEMONSTRATION
"We'll begin with a corpus already loaded."

[Open Office_Visit_2024-02-19.pdf. Select text "INR 3.1, supratherapeutic"]

"A passage is selected and highlighted."

[Show highlight color picker, select yellow]

"A color is assigned to distinguish this type of finding."

[Show tag being added: "INR Value"]

"A tag is applied to reflect the subject matter."

[Navigate to ED_Encounter_2024-03-11.pdf, create highlight on "Presentation to ED delayed until 1845"]

"In a different document, another passage is marked."

"The same classification is applied."

[Open Highlights tab. Show filtered list displaying both highlights together]

"Both marked passages now appear in a single view."

STRUCTURAL INSIGHT
"This structure ensures that findings remain visible regardless of where they originated in the corpus."

SUMMARY
"This approach supports structured review while preserving the location of each original passage."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Mid-Review

DOCUMENTS NEEDED:
• Office_Visit_2024-02-19.pdf - First highlight demonstration
• ED_Encounter_2024-03-11.pdf - Second highlight demonstration

CATEGORIES TO SHOW:
• Standard of Care (Red)
• Key Timeline Event (Blue)
• Clinical Decision (Orange)

TAGS TO SHOW:
• INR Value
• Key Timeline Event
• Patient Complaint

PRE-EXISTING STATE:
• No highlights on target passages (created fresh on camera)

ACTIONS ON CAMERA:
1. Open Office_Visit_2024-02-19.pdf
2. Select text passage
3. Create yellow highlight
4. Add tag "INR Value"
5. Navigate to ED_Encounter_2024-03-11.pdf
6. Select different passage
7. Create red highlight
8. Add tag "Key Timeline Event"
9. Switch to Highlights tab
10. Show both highlights in filtered view

FINAL STATE:
Two new highlights created, visible together in Highlights tab`
  },
  "defensible-chronology": {
    narration: `OPENING
"This short video shows how to build a chronology from documents in Corpus Review."

CONTEXT
"This is useful when events are distributed across multiple records and must be assembled into a timeline."

DEMONSTRATION
"We'll begin with a corpus containing records from several sources."

[Open Office_Visit_2024-02-19.pdf. Scroll to relevant section.]

"A document is opened and reviewed."

[Highlight "Warfarin reduced from 5mg to 4mg daily". Click Chronology button in toolbar.]

"A passage is highlighted, and a chronology entry is created."

[Show chronology entry form with date field populated: 2024-02-19]

"The date is recorded with the entry."

[Navigate to ED_Encounter_2024-03-11.pdf. Highlight "Patient fell at home approximately 0630"]

"In another document, a second event is identified."

[Click Chronology button, enter date and time: 2024-03-11 06:30]

"Another chronology entry is added."

[Open Notes & Reports tab. Show chronology document with both entries listed in sequence.]

"The entries appear in chronological order, each linked to its source."

[Click one chronology link - navigate back to source page]

"Each entry references the original document and page."

STRUCTURAL INSIGHT
"This structure ensures that the timeline remains connected to the underlying records."

SUMMARY
"This approach supports chronological analysis while preserving the source of each event."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Mid-Review

DOCUMENTS NEEDED:
• Office_Visit_2024-02-19.pdf - First chronology entry
• ED_Encounter_2024-03-11.pdf - Second chronology entry
• Nursing_Expert_Chronology_DRAFT.pdf - Shows chronology output

CATEGORIES TO SHOW:
• Key Timeline Event (Blue)
• Clinical Decision (Orange)
• Standard of Care (Red)

TAGS TO SHOW:
• Medication Change
• Fall Risk

PRE-EXISTING STATE:
• Nursing_Expert_Chronology_DRAFT.pdf should exist with partial chronology
• Some existing highlights on other pages (background context)

ACTIONS ON CAMERA:
1. Open Office_Visit_2024-02-19.pdf
2. Highlight medication change text
3. Click Chronology button
4. Enter date (2024-02-19)
5. Navigate to ED_Encounter_2024-03-11.pdf
6. Highlight fall event text
7. Click Chronology button
8. Enter date and time (2024-03-11 06:30)
9. Switch to Notes & Reports tab
10. Open chronology document
11. Click a source link to demonstrate navigation

FINAL STATE:
Chronology document shows sequential entries with clickable source links`
  },
  "linking-conclusions": {
    narration: `OPENING
"This short video shows how to link notes and conclusions to source documents in Corpus Review."

CONTEXT
"This is useful when preparing reports that must reference specific material in the record."

DEMONSTRATION
"We'll begin with a document under review."

[Highlight text: "Small acute intracerebral hemorrhage, left temporal lobe" in CT_Head_Report_2024-03-11.pdf]

"A finding is highlighted in the source document."

[Right-click or use menu to create a linked note]

"A note is created from this selection."

[Note editor opens with link already embedded]

"The note contains a reference to the source page."

[Type additional text in the note: "CT imaging confirmed hemorrhage on evening of admission."]

"Commentary is added alongside the reference."

[Click the embedded link in the note - navigate back to CT report page]

"The link navigates to the original location."

[Open Notes & Reports tab. Show note listed under parent document.]

"Notes remain attached to their source documents in the file tree."

STRUCTURAL INSIGHT
"This structure ensures that conclusions remain grounded in the underlying material."

SUMMARY
"This approach supports report preparation while preserving the connection to source pages."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Mid-Review

DOCUMENTS NEEDED:
• CT_Head_Report_2024-03-11.pdf - Source for linked note

CATEGORIES TO SHOW:
• Key Timeline Event (Blue)
• Standard of Care (Red)
• Expert Reference (Purple)

TAGS TO SHOW:
• Imaging

PRE-EXISTING STATE:
• Some existing highlights on CT report (can be minimal)
• Note_001 attached to ED_Encounter (visible in tree as example)

ACTIONS ON CAMERA:
1. Open CT_Head_Report_2024-03-11.pdf
2. Highlight the hemorrhage finding text
3. Create linked note from selection
4. Add commentary text to the note
5. Click the embedded source link
6. Observe navigation back to source page
7. Switch to Notes & Reports tab
8. Show note listed under parent document

FINAL STATE:
New note attached to CT report, containing source link and commentary`
  },
  "refinding-evidence": {
    narration: `OPENING
"This short video shows how to locate previously identified material in Corpus Review."

CONTEXT
"This is useful when returning to a case after time has passed."

DEMONSTRATION
"We'll begin by reopening a project from earlier review."

[Show project opening from home screen. Project shows "Last Used: 6 weeks ago"]

[Open Highlights tab. Show list of all highlights with document names, dates, and tags visible.]

"Highlights created during review are listed with their source documents."

[Click filter button. Select tag "INR Value" from filter panel.]

"A filter is applied to show highlights matching a specific tag."

[Filtered list shows only INR-related highlights]

"The matching highlights appear with their original context."

[Click one highlight - navigate directly to source page with highlight visible]

"Selecting an entry navigates to the source location."

[Show Search tab. Type "supratherapeutic" in search field.]

"A text search locates passages across the corpus."

[Search results show matching documents and pages]

"Results include both documents and notes containing the term."

STRUCTURAL INSIGHT
"This structure ensures that prior work remains accessible regardless of when it was created."

SUMMARY
"This approach supports returning to a case while preserving the context of earlier review."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Complete Review (corpus fully worked)

DOCUMENTS NEEDED:
• Office_Visit_2024-02-19.pdf - Destination for highlight click
• Lab_Results_INR_History.pdf - Visible in filtered results
• Note_002 - Visible in search results (contains "supratherapeutic")

CATEGORIES TO SHOW:
All categories from corpus should be visible with badges applied

TAGS TO SHOW:
• INR Value
• Medication Change
• Fall Risk
• Patient Complaint
• Imaging

PRE-EXISTING HIGHLIGHTS:
• Office_Visit_2024-02-19.pdf: INR 3.1 highlight (yellow, tagged "INR Value")
• Office_Visit_2024-02-19.pdf: Warfarin reduced highlight (blue, tagged "Medication Change")
• ED_Encounter_2024-03-11.pdf: Multiple highlights
• CT_Head_Report_2024-03-11.pdf: Hemorrhage finding highlight

PRE-EXISTING NOTES:
• Note_001 (Timeline Gap Analysis) attached to ED_Encounter
• Note_002 (Anticoagulation Management) - contains "supratherapeutic"

ACTIONS ON CAMERA:
1. Open project from home screen
2. Navigate to Highlights tab
3. Observe full highlight list
4. Click filter button
5. Select "INR Value" tag filter
6. View filtered results
7. Click a highlight entry
8. Observe navigation to source page
9. Navigate to Search tab
10. Type search term "supratherapeutic"
11. View search results showing documents and notes

FINAL STATE:
No changes - this video demonstrates retrieval, not creation`
  },
  "organizing-documents": {
    narration: `OPENING
"This short video shows how to organize documents using categories in Corpus Review."

CONTEXT
"This is useful when working with productions that contain mixed document types."

DEMONSTRATION
"We'll begin with a corpus that has been imported but not yet organized."

[Hover over a document in the tree. The "+ Category" button appears.]

"Each document can be assigned one or more categories."

[Click + Category on Office_Visit_2024-02-19.pdf. The category dialog opens.]

"Categories are selected from a list, or created as needed."

[Click to assign "Clinical Decision" (orange). The chip appears on the document.]

"The category is applied. The document remains in its original location."

[Repeat for ED_Encounter_2024-03-11.pdf, assigning both "Key Timeline Event" and "Standard of Care".]

"Multiple categories can be assigned to the same document."

[Open the Categories tab. Show the filter interface with categories listed.]

"The Categories tab displays all assigned categories across the corpus."

[Click to filter by "Key Timeline Event". The document list updates.]

"Filtering by category shows documents that match, without moving or copying files."

STRUCTURAL INSIGHT
"This structure preserves the original folder hierarchy while adding a classification layer on top."

SUMMARY
"This approach supports organized review while keeping document locations intact."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Fresh Start (transitioning to Mid-Review)

DOCUMENTS NEEDED:
• Office_Visit_2024-02-19.pdf - Primary demo document
• ED_Encounter_2024-03-11.pdf - Show multiple categories
• CT_Head_Report_2024-03-11.pdf - Visible in filter results (pre-existing category)

CATEGORIES TO SHOW:
• Standard of Care (Red)
• Key Timeline Event (Blue)
• Clinical Decision (Orange)
• Needs Follow-up (Yellow)

TAGS TO SHOW:
None required for this video

PRE-EXISTING STATE:
• No highlights needed
• No notes needed
• CT_Head_Report may have "Key Timeline Event" pre-assigned

ACTIONS ON CAMERA:
1. Hover over document to reveal + Category button
2. Click + Category on Office_Visit_2024-02-19.pdf
3. Select "Clinical Decision" from the category dialog
4. Click + Category on ED_Encounter_2024-03-11.pdf
5. Select "Key Timeline Event"
6. Select "Standard of Care" (showing multiple assignment)
7. Navigate to Categories tab
8. Click to filter by "Key Timeline Event"
9. Observe filtered results

FINAL STATE:
Two documents categorized, Categories tab shows filter active`
  },
  "highlighting-tagging": {
    narration: `OPENING
"This short video shows how to create highlights and apply tags in Corpus Review."

CONTEXT
"This is useful when marking passages that will be referenced later in notes or reports."

DEMONSTRATION
"We'll begin with a document open for review."

[Select text: "Patient fell at home approximately 0630"]

"Text is selected in the document."

[A highlight toolbar appears. Click to apply a blue highlight.]

"A highlight color is chosen from the toolbar."

[The highlight is applied. A tag input appears.]

"The highlighted passage can be tagged for later retrieval."

[Type "Fall Risk" and press enter to apply the tag.]

"Tags are typed directly and assigned to the highlight."

[Select another passage: "Presentation to ED delayed until 1845". Apply a red highlight.]

"A second passage is highlighted with a different color."

[Apply the tag "Key Timeline Event".]

"The same tagging process applies."

[Navigate to the Highlights tab. Show the list of highlights grouped by document.]

"The Highlights tab displays all marked passages across the corpus."

[Click the filter button. Select "Fall Risk" from the tag filter.]

"Highlights can be filtered by tag, color, or date."

STRUCTURAL INSIGHT
"This structure ensures that marked passages remain connected to their source location."

SUMMARY
"This approach supports targeted retrieval while preserving the original reading context."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Mid-Review

DOCUMENTS NEEDED:
• ED_Encounter_2024-03-11.pdf - Primary demo document (open in viewer)

CATEGORIES TO SHOW:
• Key Timeline Event (Blue)
• Standard of Care (Red)

TAGS TO SHOW:
• Fall Risk (pre-existing in system)
• Key Timeline Event (pre-existing)
• INR Value (visible in tag list)
• Patient Complaint (visible in tag list)

PRE-EXISTING STATE:
• Some highlights may exist on other documents
• Target passages should start clean (no highlights)

ACTIONS ON CAMERA:
1. Select text "Patient fell at home approximately 0630"
2. Click blue highlight color in toolbar
3. Type "Fall Risk" in tag field
4. Press enter to apply tag
5. Select text "Presentation to ED delayed until 1845"
6. Click red highlight color
7. Type "Key Timeline Event" in tag field
8. Press enter to apply tag
9. Navigate to Highlights tab
10. Click filter button
11. Select "Fall Risk" from tag filter
12. Observe filtered results

FINAL STATE:
ED_Encounter has two new highlights, Highlights tab shows filtered view`
  },
  "linking-notes": {
    narration: `OPENING
"This short video shows how to create notes that link back to source documents in Corpus Review."

CONTEXT
"This is useful when building analysis that must remain traceable to specific passages."

DEMONSTRATION
"We'll begin with a document containing highlighted passages."

[In the document tree, create a new note attached to the document. A note appears with a green header.]

"A note is created as a child of the source document."

[The note editor opens. It shows a blank rich text field with formatting toolbar.]

"The note provides a rich text editor."

[Type: "Key concern: 12+ hour delay between fall (0630) and ED presentation (1845)."]

"Text is entered in the note."

[Select the highlighted passage in the source document. Copy or use a link command. Return to the note and paste or insert the link.]

"A link to the source passage is inserted."

[The link appears as clickable text in the note.]

"The link references the exact location in the source document."

[Click the link. The viewer navigates to the highlighted passage.]

"Clicking the link navigates to the referenced passage."

[Return to the Notes & Reports tab. Show the note listed under its parent document.]

"Notes appear in the tree beneath their source documents."

STRUCTURAL INSIGHT
"This structure ensures that analysis remains connected to the underlying evidence."

SUMMARY
"This approach supports note-taking while preserving direct references to source material."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Mid-Review

DOCUMENTS NEEDED:
• ED_Encounter_2024-03-11.pdf - Source document for note (open in viewer)

CATEGORIES TO SHOW:
• Key Timeline Event (Blue)
• Standard of Care (Red)

TAGS TO SHOW:
• Fall Risk
• Key Timeline Event

PRE-EXISTING HIGHLIGHTS:
• "Patient fell at home approximately 0630" (Blue, Fall Risk tag)
• "Presentation to ED delayed until 1845" (Red, Key Timeline Event tag)

PRE-EXISTING NOTES:
None - the note is created during this video

ACTIONS ON CAMERA:
1. View ED_Encounter document with visible highlights
2. Create new note (right-click or button)
3. Note appears in tree with green header
4. Type analysis text in note editor
5. Navigate to/select the highlighted passage
6. Copy or create link to passage
7. Paste/insert link into note
8. Show the formatted link in the note
9. Click the link
10. Observe navigation to source passage
11. Open Notes & Reports tab
12. Show note nested under parent document

FINAL STATE:
New note (Note_001) attached to ED_Encounter with working source link`
  },
  "side-by-side": {
    narration: `OPENING
"This short video shows how to view multiple documents side-by-side in Corpus Review."

CONTEXT
"This is useful when comparing records from different sources or dates."

DEMONSTRATION
"We'll begin with a document open in the viewer."

[Click the Grid view button in the toolbar. The layout shifts to show a grid arrangement.]

"The view mode is changed to Grid."

[Open a second document from the tree: CT_Head_Report_2024-03-11.pdf. It appears in its own card.]

"A second document is opened. Both documents are visible simultaneously."

[Open a third document: Office_Visit_2024-02-19.pdf. Three cards are now visible.]

"Additional documents can be added to the view."

[Click and drag one card to reposition it.]

"Cards can be arranged within the grid."

[Switch to Freeform view. The cards become freely positionable and can overlap.]

"Freeform view allows overlapping and free positioning."

[Drag one card to partially overlap another.]

"Documents can be stacked or positioned as needed."

[Scroll or navigate within one document while the others remain visible.]

"Each document maintains independent navigation."

STRUCTURAL INSIGHT
"This structure supports comparison without closing or losing place in other documents."

SUMMARY
"This approach supports multi-document review while keeping each source accessible."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Mid-Review

DOCUMENTS NEEDED:
• ED_Encounter_2024-03-11.pdf - Initial document, ED record
• CT_Head_Report_2024-03-11.pdf - Same-day imaging report
• Office_Visit_2024-02-19.pdf - Earlier visit for context

CATEGORIES TO SHOW:
• Key Timeline Event (Blue)
• Standard of Care (Red)
• Clinical Decision (Orange)

TAGS TO SHOW:
Not prominently featured in this video

PRE-EXISTING STATE:
Documents may have highlights from earlier videos - adds authenticity but not required

ACTIONS ON CAMERA:
1. Start with single document open
2. Click Grid view mode button
3. Open CT_Head_Report from tree (appears in grid)
4. Open Office_Visit_2024-02-19 from tree (third card appears)
5. Drag or resize cards in grid
6. Switch to Freeform view
7. Drag cards to overlap/arrange freely
8. Scroll within one document independently

FINAL STATE:
Three documents visible in Freeform view, cards arranged for comparison`
  },
  "lawyers-chronology": {
    narration: `OPENING
"This short video shows how to prepare a case chronology in Corpus Review."

CONTEXT
"This is useful when assembling a timeline from documents scattered across multiple productions."

DEMONSTRATION
"We'll begin with a corpus that has been partially reviewed."

[Navigate to Office_Visit_2024-02-19.pdf, show the highlighted INR value]

"A relevant passage is located in the medical records."

[Highlight the date and key event text if not already highlighted]

"The date and clinical event are highlighted."

[Click the Chronology button in the toolbar]

"A chronology entry is inserted, linked to the source page."

[Navigate to ED_Encounter_2024-03-11.pdf]

"The next document in the sequence is opened."

[Locate the fall timestamp and presentation time, highlight them]

"Key timestamps are identified and marked."

[Insert another chronology entry]

"Each entry references its source document and page number."

[Return to the Draft Chronology document, show entries accumulating]

"The chronology builds as review progresses."

[Click one of the linked entries, demonstrate navigation back to source]

"Each entry links directly to the underlying record."

STRUCTURAL INSIGHT
"This structure ensures that every chronology entry remains connected to specific pages in the source material."

SUMMARY
"This approach supports timeline preparation while preserving direct references to the documents."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Mid-Review

DOCUMENTS NEEDED:
• Office_Visit_2024-02-19.pdf - First chronology entry (INR highlighted yellow)
• ED_Encounter_2024-03-11.pdf - Fall and presentation times (highlighted blue)
• Draft Chronology.crd - Where entries accumulate (starts empty)

CATEGORIES TO SHOW:
• Key Timeline Event (Blue)
• Standard of Care (Red)
• Clinical Decision (Orange)

TAGS TO SHOW:
• INR Value
• Fall Risk
• Key Timeline Event

PRE-EXISTING HIGHLIGHTS:
• Office_Visit_2024-02-19.pdf: "INR 3.1, supratherapeutic" (Yellow)
• ED_Encounter_2024-03-11.pdf: "Patient fell at home approximately 0630" (Blue)

ACTIONS ON CAMERA:
1. Navigate to Office_Visit_2024-02-19.pdf
2. View existing highlight, click Chronology button
3. Navigate to ED_Encounter_2024-03-11.pdf
4. Highlight fall timestamp
5. Click Chronology button to insert entry
6. Return to Draft Chronology document
7. Click linked entry to navigate back to source

FINAL STATE:
Draft Chronology contains 3-4 linked entries, each shows date and source link`
  },
  "experts-tracing": {
    narration: `OPENING
"This short video shows how to trace clinical events across multiple records in Corpus Review."

CONTEXT
"This is useful when following a patient's course through different providers and facilities."

DEMONSTRATION
"We'll begin with records from multiple encounters open in grid view."

[Highlight visible in first document showing INR value and bruising]

"The first record shows a clinical finding—elevated INR with bruising noted."

[Move cursor to second document, show phone call note about daughter's concern]

"A subsequent phone encounter documents a family concern."

[Move to third document, show the fall and ED presentation]

"The emergency department record captures the resulting event."

[Use highlight filter panel, filter by "Patient Complaint" tag]

"Highlights are filtered by tag to show related findings across documents."

[Show filtered results appearing across all three visible documents]

"All patient complaints are now visible in sequence."

[Click on one filtered highlight to navigate to that location]

"Each filtered result links to its location in the source record."

[Add a tag "Clinical Progression" to connect the highlighted passages]

"A tag is applied to group related clinical events."

STRUCTURAL INSIGHT
"This structure supports tracing a clinical course across records from different sources."

SUMMARY
"This approach supports clinical analysis while keeping each finding linked to its original record."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Mid-Review (Grid view active with 3 documents)

DOCUMENTS NEEDED:
• Office_Visit_2024-02-19.pdf - Starting clinical finding
• Office_Visit_2024-03-10_Phone.pdf - Interim communication
• ED_Encounter_2024-03-11.pdf - Resulting event

CATEGORIES TO SHOW:
• Key Timeline Event (Blue)
• Patient Communication (Green)
• Clinical Decision (Orange)

TAGS TO SHOW:
• INR Value
• Patient Complaint
• Fall Risk
• Clinical Progression (created during video)

PRE-EXISTING HIGHLIGHTS:
• Office_Visit_2024-02-19.pdf: "Patient reports new bruising" (Pink, "Patient Complaint")
• Office_Visit_2024-03-10_Phone.pdf: "Daughter called concerned" (Green, "Patient Complaint")
• ED_Encounter_2024-03-11.pdf: "Patient fell at home" (Blue, "Fall Risk")

ACTIONS ON CAMERA:
1. Show grid view with three documents side by side
2. Point to highlighted finding in first document
3. Point to corresponding entry in second document
4. Point to outcome in third document
5. Open highlight filter panel
6. Filter by "Patient Complaint" tag
7. Show filtered highlights across documents
8. Click filtered result to navigate
9. Add "Clinical Progression" tag to connect events

FINAL STATE:
Three documents in grid, filter active, new tag applied`
  },
  "experts-opinions": {
    narration: `OPENING
"This short video shows how to link expert opinions to primary source material in Corpus Review."

CONTEXT
"This is useful when preparing reports where each conclusion must reference specific documents."

DEMONSTRATION
"We'll begin with an expert report in progress."

[Show a sentence in the notes document: "The 12-hour delay between fall and presentation affected outcome."]

"An opinion statement is written in the report draft."

[Navigate to ED_Encounter_2024-03-11.pdf, locate the timestamps]

"The supporting document is opened."

[Highlight the relevant passage showing "0630" fall time and "1845" presentation]

"The passage supporting this statement is highlighted."

[Copy the source link from the highlight]

"A link to the source location is copied."

[Return to the notes document, insert the link after the opinion statement]

"The link is inserted in the report, following the statement."

[Click the inserted link to demonstrate navigation]

"The link navigates directly to the referenced page and passage."

[Show the bidirectional relationship—highlight panel shows the connection]

"The highlight remains connected to both the source document and the report."

STRUCTURAL INSIGHT
"This structure ensures that each opinion in a report references its underlying documentation."

SUMMARY
"This approach supports report preparation while preserving traceability to the primary records."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Mid-Review (closer to Complete)

DOCUMENTS NEEDED:
• Expert Opinion Draft.crd - Report being written
• ED_Encounter_2024-03-11.pdf - Source for timeline claim

CATEGORIES TO SHOW:
• Expert Reference (Purple)
• Key Timeline Event (Blue)
• Standard of Care (Red)

TAGS TO SHOW:
• Fall Risk
• Key Timeline Event
• Physician Order

PRE-EXISTING HIGHLIGHTS:
• ED_Encounter: "Patient fell at home approximately 0630" (Blue)
• ED_Encounter: "Presentation to ED delayed until 1845" (Red)

PRE-EXISTING NOTES:
Expert Opinion Draft.crd containing:
"DRAFT EXPERT OPINION - Dr. Chen
Regarding the timing of presentation:
The 12-hour delay between fall and presentation affected outcome.
[link will be inserted here during video]"

ACTIONS ON CAMERA:
1. Show Expert Opinion Draft.crd with opinion statements
2. Navigate to ED_Encounter_2024-03-11.pdf
3. Locate and highlight the supporting timestamps
4. Copy the source link
5. Return to Expert Opinion Draft.crd
6. Paste link after the opinion statement
7. Click the link to demonstrate navigation back to source
8. Show in highlight panel that connection exists

FINAL STATE:
Expert Opinion contains statements with working source links`
  },
  "evolving-documents": {
    narration: `OPENING
"This short video shows how to manage evolving document sets in Corpus Review."

CONTEXT
"This is useful when additional documents arrive after review has begun."

DEMONSTRATION
"We'll begin with a corpus where review is underway."

[Show the Productions folder in the file tree, containing previously reviewed documents]

"Existing documents have been categorized and annotated."

[New documents appear in the tree—a supplemental production folder]

"A supplemental production is added to the corpus."

[The new folder appears: "Supplemental_Production_2024-04/"]

"The new documents appear in the file tree alongside existing material."

[Open one of the new documents: Progress_Notes_2024-03-13.pdf]

"A new document is opened for review."

[Show the document has no categories or highlights yet]

"The document has not yet been categorized."

[Apply existing category "Key Timeline Event" to the new document]

"Existing categories are applied to the new material."

[Navigate to the Categories tab, filter by "Key Timeline Event"]

"The filter now includes both original and supplemental documents."

[Show the filtered results containing documents from both productions]

"Documents from different productions appear together when they share categories."

[Return to a previously created note, add a reference to the new document]

"Existing notes can reference the new documents."

STRUCTURAL INSIGHT
"This structure supports ongoing review as document sets expand over time."

SUMMARY
"This approach supports late-arriving documents while maintaining the existing review structure."`,
    curation: `PROJECT: Thompson v. Northside Medical - Document Review

STARTING STATE: Mid-Review

DOCUMENTS NEEDED:
• Existing Medical Records (with categories applied)
• Supplemental_Production_2024-04/ (new folder added during video)
  - Progress_Notes_2024-03-13.pdf
  - Progress_Notes_2024-03-14.pdf
  - Revised_Discharge_Summary.pdf
• Note_001 (Timeline Gap Analysis) - existing note

CATEGORIES TO SHOW:
• Key Timeline Event (Blue)
• Standard of Care (Red)
• Clinical Decision (Orange)
• Needs Follow-up (Yellow)

TAGS TO SHOW:
• INR Value
• Fall Risk
• Patient Complaint

PRE-EXISTING HIGHLIGHTS:
• ED_Encounter_2024-03-11.pdf: "Patient fell at home" (Blue, "Key Timeline Event")
• ED_Encounter_2024-03-11.pdf: "Presentation to ED delayed" (Red)

PRE-EXISTING NOTES:
Note_001 (attached to ED_Encounter):
"Timeline Gap Analysis
Key concern: 12+ hour delay between fall and ED presentation.
See: [link to Office_Visit_2024-03-10_Phone.pdf]"

ACTIONS ON CAMERA:
1. Show existing corpus with categories applied
2. Supplemental production folder appears in tree
3. Open new document (Progress_Notes_2024-03-13.pdf)
4. Note absence of categories on new document
5. Apply "Key Timeline Event" category
6. Navigate to Categories tab
7. Filter by "Key Timeline Event"
8. Show results including both old and new documents
9. Open existing note, add reference to new document

FINAL STATE:
New documents integrated, filter shows mixed results, note updated`
  },
};

const sections: VideoSection[] = [
  {
    id: "core-challenges",
    title: "Core Review Challenges",
    description:
      "Common problems faced by professionals working with large document sets.",
    videos: [
      {
        id: "keeping-track",
        title: "Keeping track of what matters across thousands of pages",
        description:
          "How to maintain focus and organization when evidence is scattered across hundreds of files.",
        youtubeId: null,
        duration: "1:30",
        script: scripts["keeping-track"],
      },
      {
        id: "defensible-chronology",
        title: "Building a defensible chronology from scattered documents",
        description:
          "Constructing timelines where every entry links back to its source.",
        youtubeId: null,
        duration: "2:00",
        script: scripts["defensible-chronology"],
      },
      {
        id: "linking-conclusions",
        title: "Linking conclusions back to exact source pages",
        description:
          "Ensuring every assertion in your work product traces to specific evidence.",
        youtubeId: null,
        duration: "1:45",
        script: scripts["linking-conclusions"],
      },
      {
        id: "refinding-evidence",
        title: "Re-finding critical evidence weeks or months later",
        description:
          "Returning to a case and locating previously identified evidence instantly.",
        youtubeId: null,
        duration: "1:30",
        script: scripts["refinding-evidence"],
      },
    ],
  },
  {
    id: "structured-review",
    title: "How Corpus Review Supports Structured Review",
    description:
      "Demonstrations of how Corpus Review approaches document organization and analysis.",
    videos: [
      {
        id: "organizing-documents",
        title: "Organizing documents without losing context",
        description:
          "Categorizing and tagging while preserving the relationships between files.",
        youtubeId: null,
        duration: "2:00",
        script: scripts["organizing-documents"],
      },
      {
        id: "highlighting-tagging",
        title: "Highlighting and tagging with intent",
        description:
          "Using color-coded highlights and tags to mark evidence systematically.",
        youtubeId: null,
        duration: "1:45",
        script: scripts["highlighting-tagging"],
      },
      {
        id: "linking-notes",
        title: "Linking notes, documents, and excerpts",
        description:
          "Creating connections between your analysis and the underlying evidence.",
        youtubeId: null,
        duration: "2:00",
        script: scripts["linking-notes"],
      },
      {
        id: "side-by-side",
        title: "Viewing Related Material Side-by-Side",
        description:
          "Using document caddies to compare and cross-reference materials.",
        youtubeId: null,
        duration: "1:30",
        script: scripts["side-by-side"],
      },
    ],
  },
  {
    id: "use-cases",
    title: "Example Applications",
    description:
      "Short examples of how different professionals apply Corpus Review to their work.",
    videos: [
      {
        id: "lawyers-chronology",
        title: "Preparing a chronology for pleadings or trial",
        description:
          "Building a timeline from medical records for litigation support.",
        youtubeId: null,
        duration: "2:30",
        script: scripts["lawyers-chronology"],
      },
      {
        id: "experts-tracing",
        title: "Tracing clinical events across records",
        description:
          "Following a patient's treatment history through multiple facilities and providers.",
        youtubeId: null,
        duration: "2:00",
        script: scripts["experts-tracing"],
      },
      {
        id: "experts-opinions",
        title: "Linking opinions to primary source material",
        description:
          "Ensuring expert conclusions are grounded in documented evidence.",
        youtubeId: null,
        duration: "1:45",
        script: scripts["experts-opinions"],
      },
      {
        id: "evolving-documents",
        title: "Managing evolving document sets",
        description:
          "Handling late-produced documents without disrupting existing analysis.",
        youtubeId: null,
        duration: "1:30",
        script: scripts["evolving-documents"],
      },
    ],
  },
];

const ScriptModal = ({
  video,
  open,
  onOpenChange,
}: {
  video: Video;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-xl">{video.title}</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Duration: {video.duration} • Script Preview
          </p>
        </DialogHeader>

        {video.script ? (
          <Tabs defaultValue="narration" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="narration">Narration Script</TabsTrigger>
              <TabsTrigger value="curation">Corpus Setup</TabsTrigger>
            </TabsList>
            <TabsContent value="narration">
              <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {video.script.narration}
                  </pre>
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="curation">
              <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                    {video.script.curation}
                  </pre>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FileText className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">Script in development</p>
            <p className="text-sm mt-1">
              The narration script and corpus setup for this video are being
              prepared.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const VideoCard = ({ video }: { video: Video }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const hasVideo = video.youtubeId !== null;
  const hasScript = video.script !== null;
  const youtubeUrl = video.youtubeId
    ? `https://www.youtube.com/watch?v=${video.youtubeId}`
    : null;

  const handleClick = () => {
    if (hasVideo && youtubeUrl) {
      window.open(youtubeUrl, "_blank", "noopener,noreferrer");
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`border border-border rounded-lg p-5 bg-card transition-colors cursor-pointer ${
          hasVideo || hasScript
            ? "hover:border-border/80"
            : "hover:border-border/60"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded flex items-center justify-center transition-colors ${
              hasVideo
                ? "bg-muted group-hover:bg-accent/10"
                : hasScript
                  ? "bg-muted/50"
                  : "bg-muted/30"
            }`}
          >
            {hasVideo ? (
              <Play className="w-4 h-4 text-muted-foreground" />
            ) : (
              <FileText
                className={`w-4 h-4 ${hasScript ? "text-muted-foreground" : "text-muted-foreground/50"}`}
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium transition-colors ${
                hasVideo || hasScript
                  ? "text-foreground hover:text-accent"
                  : "text-foreground/70"
              }`}
            >
              {video.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {video.description}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {hasVideo
                ? video.duration
                : hasScript
                  ? "Script ready • Click to preview"
                  : "Coming soon"}
            </p>
          </div>
        </div>
      </div>

      <ScriptModal video={video} open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-20 border-b border-border">
          <div className="container-narrow text-center">
            <h1 className="heading-section text-foreground mb-4">
              See how Corpus Review helps professionals master large case
              document sets.
            </h1>
            <p className="prose-legal text-lg text-muted-foreground max-w-2xl mx-auto">
              Short, task-focused demonstrations showing how Corpus Review
              supports evidence-driven review and reporting.
            </p>
          </div>
        </section>

        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="py-12 md:py-16 border-b border-border last:border-b-0"
          >
            <div className="container-narrow">
              <div className="mb-8">
                <h2 className="heading-section text-foreground mb-2">
                  {section.title}
                </h2>
                <p className="prose-legal">{section.description}</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {section.videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
