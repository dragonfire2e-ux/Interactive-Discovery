# Interactive Discovery

CCT360 Project 1, "The Curious Case"
By Brandon Trickett and Ibraheem Ahmed

## Concept

You are the night guard at the Hartwell Museum of Natural History. Specimen 17, a creature nobody has identified, has disappeared from its case. Explore the museum, collect seven clues in your notebook, and accuse the curator, the security trainer or the staff biologist.

## Scenes

1. Lobby (intro, empty case, parallax background)
2. Hall of Habitats (forest case, desert case, dark ocean case)
3. Archive (scroll down to uncover a hidden page)
4. Security Office (locked until you find the keycard log)
5. The Accusation (choose a suspect, six possible endings)

## Interactions

- Observe buttons on the forest and desert cases (4 second countdown, then the clue appears)
- Flashlight that follows the mouse over the dark ocean case
- Scroll-triggered torn page in the archive
- Locked security office and locked accusation
- Clickable camera monitor (three clicks to rewind the tape)
- Sign-out sheet, empty case, notebook, suspect cards, Start over

## State

- Seven clues are saved with localStorage, so a refresh keeps your progress
- The office unlocks only with the keycard log clue
- Accusing needs at least 3 clues, and a correct accusation needs at least 5
- The ending depends on who you accuse and which clues you hold

## Files

- index.html
- css/style.css
- js/script.js
- images/ (11 images)

## Credits

| File | Source |
| --- | --- |
| forest.jpg | WWF-UK, https://www.wwf.org.uk/learn/fascinating-facts/forests |
| ocean.jpg | Magnific free photos, https://www.magnific.com/free-photos-vectors/dark-underwater |
| desert.jpg | Smithsonian Magazine, https://www.smithsonianmag.com/science-nature/what-really-turned-sahara-desert-green-oasis-wasteland-180962668/ |
| gizmo.jpg | Still from the film Gremlins, via Wicked Horror, http://wickedhorror.com/features/defining-creature-feature-importance-horror/ |
| shark.jpg | Goblin Shark, Endless Ocean Wiki, https://endlessocean.fandom.com/wiki/Goblin_Shark |
| creature.jpg | Artwork by José L Hernández, ArtStation, https://www.artstation.com/artwork/A9LLdo |
| lobby.jpg | Magnific free photos, https://www.magnific.com/free-photos-vectors/museum-lobby |
| emptycase.jpg | Magnific free photos, https://www.magnific.com/free-photos-vectors/museum-display-case-empty |
| trainer.jpg | Generated with Meta AI |
| researcher.jpg | Generated with Media.io AI, https://www.media.io/ai/ai-tools/ai-character-generator/ai-scientist-headshot-generator |
| curator.jpg | Photo of a friend, used with permission |

All code written by the group using JavaScript and CSS covered in CCT360 classes 1 to 5, plus setTimeout and localStorage.
