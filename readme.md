## Refactor and discussion exercice
In the "badCode.js" file we have a bad javascript code, so in refactor folder I create a refactor of the code with good practices.

## Step 1

### What do you think is wrong with the code, if anything?
This code has all software layers in the same site, we can see that the controller layer interacts with the bussines logic and with the repo layer (store database), that makes that when we need to change some thing of an independent layer we will need to refactor all code.
Also don't uses environment or constant files for handle urls or static values.
Also at line 40 it returns to client all response of the call made by superagent post, so that can cause an exception.
At time to store info in database it dont validate anythink from the income data, so that can cause problems.

This code uses a old javascript features of ES5, like indexOf inside of includes, anonymous functions with function(){} inside of ()=>, declare variables with "var" and not with "const".
Another think is that the error messages responses are incorrect, because for example in line 22 -> res.status(500).send(err || { message: 'No shop found' }); send the error object that rejects the mongodb client so you can expose private informationto the users.


### Can you see any potential problems that could lead to exceptions

Yes, in line 40, res.json(invitationResponse); it returns all http result from superagent.post without filter, so it will create an exception.
Also in line 38 we can see an empty return, it should be in front res.status of line 34.

### How would you refactor this code to:
First of all we need to separate the code for software layers and features. We have a lot of different ways to do it, personally I like to have a subrouter for each feature, then the router handle request body validators with middlewers and then redirect to controllers that the their only function are  recieve and send back the http request, and call a service for execute business logic, and business logic services executes repo services. 
So in that way we have all in different folders and is very clear. 
Also we can reuse the services in different parts of aplication because each service is an independent piece of code, that makes very easy to test too with a testing framework.
Is important that the request body objects never go away of controllers in that case all services are independent of http framework. Imagine that we are use Express Framework and we want to switch to another one, so we only need to update controllers, all the other part can work without refactor, and that is very nice.

So in that case we need to create a controller named invitation.controller.js, a invitation.service.js and shop.repo.js (the names can be changed).

### How might you use the latest JavaScript features to refactor the code?

Update anonymous functions() => {} for arrow functions, replace indexOf for includes(), replace var for const, superagent is deprecated, so update for node-fetch, axios or another http library.

## Step 2
See in refactor folder