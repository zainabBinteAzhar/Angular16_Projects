# Angular16

BreedDogs_NgRx process:

App Initialization:

Angular app initializes, and the AppModule is loaded.
Both interceptors (LimitImagesInterceptor and LoaderInterceptor) are registered globally in AppModule under HTTP_INTERCEPTORS.
Image Fetching:

User navigates to the Breed Component.
The BreedComponent dispatches the loadImages action to load images from the API.
The BreedEffects listens for the loadImages action and triggers the API call.
The HTTP request goes through the LimitImagesInterceptor:
Limits the number of images to 5 by modifying the request.
The request then passes through the LoaderInterceptor:
Shows a loader spinner while waiting for the API response.
The modified request is sent to the server.
API Response Handling:

The server responds with 5 images (due to the limit set by the interceptor).
The response passes through the LoaderInterceptor:
The loader is hidden once the response is received.
The response is passed to the BreedEffects, which dispatches the loadImagesSuccess action.
The images are stored in the NgRx Store.
Displaying Images:

The BreedComponent selects the images from the NgRx store using the selectImages selector.
The images are displayed in the BreedComponent.
Deleting Images:

User clicks on the Delete button in the BreedComponent.
The deleteImage method is called, and the image is moved to the History Component.
The BreedComponent dispatches the deleteImage action to update the store.
The store updates the list of images and the deleted images list.
Restoring Images:

User clicks the Restore button in the HistoryComponent.
The restoreImage method is called, restoring the first deleted image.
The image is moved back to the BreedComponent.
The HistoryComponent dispatches the restoreImage action to update the store.
The store updates the images list by moving the restored image to the top.
Interceptor Actions:

LimitImagesInterceptor ensures only the first 5 images are returned in the API response.
LoaderInterceptor shows a spinner during the HTTP request and hides it once the response is received.
<!-- *********************************************************************************************** -->