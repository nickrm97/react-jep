# Nick's fun survey app

## How things work:

### Create
Processed and posted to the API on `Form.tsx`. To render this change instantly, the new question is sent up through the `addQuestion()` function given in props, and added to the `data` array on `index.tsx`

### Read
There's a get request on `index.tsx`. #fun #APIs #cool

### Update
When the edit button on `RatingQuestion` is pressed , `RatingQuestion.tsx` goes into edit mode (stored in state as a boolean), rendering a `EditQuestion` component. 

On submit, the new title is sent up to `RatingQuestion.tsx` via `updateTitle()` (passed in through props). The patch request is submitted, and edit mode is turned off. Since we have the title of a `RatingQuestion` in state, we don't need to go to the data array on index to update the title! We can just `setState({title})

### Delete
When the delete button on `RatingQuestion` is pressed and confirmed, the id of the question to be deleted is given to `deleteQuestion()` on `index.tsx` (passed in through props). This removes the question object from `data` in state (so that it refreshes), and performs a delete request to the API.