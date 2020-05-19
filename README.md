# Share-A-Recipe: Front-End Client Application

## Links
[Front-End App](https://ztosyl.github.io/recipesharer-client/)
[API](https://evening-shore-06537.herokuapp.com)

## Technologies Used

### Styling

For styling, I used primarily HTML and CSS/SaSS. Handlebars.js was also used to
input a lot of the HTML that was added to the page due to user actions. Additionally,
I used bootstrap for a lot of modules on the site and to organize elements on the screen;
I stacked a transparent-background bootstrap navbar on another accent-colored one to create the double-navigation bar effect at the top. Two fonts were used for the site, both taken from Google Fonts.

### API

AJAX was used for communication with the API.

### Updating the document
JQuery was used to update the document in response to user actions. Messaging
to the user giving them information about their actions was delivered via bootstrap
modals. Handlebars also facilitated posting API data in response to user requests. I
used both templates and custom-written helpers to complete this. I used JQuery and CSS
to show/hide elements based on authentication.

### Taking and using user input
Forms for update and creation of recipes were put into bootstrap modals which opened when
users indicated they wanted to complete the action. Comment creation forms were embedded
into the handlebars code when the user opens a full recipe. The form data was parsed by
getFormFields, a function that was provided to me by General Assembly.

## Unsolved Issues

### Comment/Rating Spam
The way the program works now, someone in theory could spam someone else's page with comments
and/or ratings. A change that could be made for this is to allow one user one comment or
rating per recipe, to prevent this.

### No photos
Another feature I wanted to implement but was unable to was the integration of AWS services,
allowing users to upload photos of the result of each recipe if they wanted to.

### Ingredient/Step entry
Currently, the ingredient and step entry for Create and Update forms is contigent on the user
inputting both correctly (each ingredient/step on a new line). I'd like the program to be able
to do slightly better quality control on these entries, and possibly allow the user to enter
them individually as opposed to in one large textarea.

## Planning

### Authentication

I had built the API first and ensured it was functional and then started this front-end client
application. I began with making buttons for authentication actions, and ensuring they hid/showed
at appropriate times. I also created a 'messaging' div at the top of the page to display text upon
success or failure of various actions (to be replaced by a modal later.)

### CRUD Actions

Following this, developed two buttons for two separate 'GET' actions from the API: one to get all
recipes posted, and another to get only the current user's recipes posted. I created an extremely
basic not styled handlebars template to display the data, so that I would know if the action was
successful or not. I had to start with the INDEX (get all) function first, because I would need
to get all of the recipes in order to sort through them for a more granular search.

Once that was completed, in order to find a user's recipe, I had to call on their stored id (which
was stored upon successful sign in) and only display recipes gotten by the INDEX action that matched that ID. After those basic searches were complete, I began work on post and delete.

Post required a large form, and while creating it I discovered my need to give specific instructions to the user (put everything on a new line), so I added small text to say this.

After verifying posting worked correctly, I had to decide a way to implement delete (and eventually update) buttons that corresponded to one specific recipe, and a way to make it clear to both the user and the program that it was only meant for that recipe.

I started by having the preview recipe that is on the current version, but having the rest collapsed, and the user could expand the recipe by clicking a button. However, this did not work with the bootstrap setup I had, so I pivoted to having the chosen recipe take up the full page.

Another decision I made is not showing the Update or Delete if the viewer did not own the recipe. There was an error provided for us on the API-side that would throw if an unauthorized user attempted to delete or update a resource they did not own, however I personally found it more elegant to just handle that on the front end by not even allowing unauthorized users to attempt to delete or update content that wasn't theirs.

The update form was nearly identical to the create one, however I wanted to implement the ability for the user to leave some fields blank and only update the fields filled. In order to do that, I communicated with the API to receive the pre-update version of the recipe, and then compared it against the data in the form, and any blank spaces in the form I filled in with old data. By doing that, the form data was complete, and all fields the user filled in were updated and the ones they didn't were left untouched.

### Styling

At this point I did some more serious styling, because it would be easier to integrate features like comments and ratings into an existing template than try to make them all work at the end.

I added the recipe sections, the double navbars, and put all forms and authentication (except sign out) into modals. I also added a modal that would confirm if the user actually wanted to delete a recipe when the delete button was pressed.

### Search Functions

When coming up with this project, something I really wanted to include in terms of a feature were granular search functions. So, I created two more simple ones using the same logic as the 'Search for Your Recipes' one, which were Search by Meal and Search by Difficulty. These were simple due to the drop-down nature of the fields; the user could only pick one of many options. I made the searches drop-downs as well and associated a class with each selection, and set a keyword for the function to search for in the related field in the recipes. All recipes that had that keyword were shown.

I added two more, slightly more complex, which were search by title and search by ingredient. For ingredient, started by making a search function that was designed to take one word and look for that word in the ingredients of all recipes, and return the ones that matched. I was able to update this, however, to include multiple-word searches by turning the query into an array of words split by a space, and search for recipes with ingredients that included all words typed into the query.

For search by title, I had a similar approach, because I wanted the function to check by individual words and not just words in the order that they were typed (for ex., a search for 'grilled sandwich' should ping both 'grilled cheese sandwich' and 'grilled peanut butter sandwich'). Both of these functions are also not case sensitive.

### Comments and ratings

I created comments and their pathways in the API, and thens started to connect them to modules in the front end. It made logical sense to have them display only on the full page recipe, so I added them to the associated handlebars template. I added a form next to them to input comments; similar to the Update/Delete logic earlier, I hid the comment form if the person looking at the recipe was the owner (so a user could not comment on their own recipe). For comment entry, I created a comment in the database and added it to the associated recipe, and had the page live-update upon success, featuring the new comment.

For ratings, I added a "form" next to the comments to input those. This form consisted of five outlines of stars, that when the user would click on one it would fill itself and all of them to the left, indicating the star-rating the user wished to give. This click would send a value to an invisible input in a form, and when the user clicked the "submit rating" the form would submit and add the rating to the recipe.

As far as ratings display, at first I had the nearest full-integer average of star ratings submitted for a given recipe displayed underneath the title both in the preview form and the full-page form, such as 'Rating: 4'. Eventually, however, I wrote a handlebars helper that took in a recipe's ratings array and returned a string containing the number of stars corresponding to that integer, such as 'Rating: ★★★★'.

### Finishing touches

After this I added some more styling changes, the most important being all user messaging was delivered via one modal called the 'messaging modal', with a 'messaging' div whose contents updated based on the response the user was meant to receive.

I also color-cooridnated buttons, font-colors, and the background colors of the modals.

## User Stories and Wireframes

### User Stories
As a user, I'd like to post a recipe I like.
As a user, I'd like to be able to sign out once I'm done.
As a user, I'd like to be able to delete a recipe I no longer want posted.
As a user, I'd like to browse recipes posted by other users.
As a user, I'd like to leave a comment on a recipe posted by another user.

### Wireframes
[Main page on top, Post form on bottom](https://i.imgur.com/eXXo78D.jpg)
