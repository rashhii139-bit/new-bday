Birthday website

PERSONAL DETAILS

Open script.js and edit the birthdayDetails object near the top of the file.
It contains the trait cards, observations, photo timeline, birthday wishes,
surprise messages, and checklist items. The page builds these sections from
that data automatically.

GROWTH PHOTOS

The timeline uses kid.jpeg followed by grown.jpeg from this folder. To change
the photos or captions, edit birthdayDetails.growthTimeline in script.js.

SONG

The player uses Jab_We_Met_Kogda_my_vstretilis_-_Tum_Se_Hi_(mp3.pm).mp3 from
this folder and only starts when its play button is tapped.

TEST LOCALLY

Open index.html directly in a browser, or run a local static server from this
folder, for example:

  py -m http.server 8000

Then visit http://localhost:8000. Stop the server with Ctrl+C.

GITHUB PAGES

This is a static HTML/CSS/JavaScript site with no backend or build step. Keep
these files at the same published paths in the repository. The existing
GitHub Pages URL remains the same.