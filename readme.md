## Refactor and discussion exercises
In the "badCode.js" file we have a bad javascript code, so in refactor folder I create a refactor of the code with good practices.
## Step 1 ### What do you think is wrong with the code, if anything?
This code has all software layers in the same site, we can see that the controller layer interacts with the business logic and with the repo layer (store database), this makes that when we need to change something in a independent layer we will need to refactor all code.
Also, don't uses environment or constant files for handling urls or static values.

Also at line 40 it returns to the client all responses to the call made by superagent post, so that can cause an exception.
At time to store info in the database, it doesn't validate anything from the income data, so that can cause problems.
This code uses an old javascript feature of ES5, like indexOf inside of includes, anonymous functions with function() {} inside of () =>, declare variables with "var" and not with "const".
Another thing is that the error message responses are incorrect, because for example, in line 22 -> res. Status(500). Send (err || {message: 'No shop found'}); send the error object that rejects the mongodb client so you can expose private information to the users.


### Can you see any potential problems that could lead to exceptions
Yes, in line 40, res.json(invitationResponse); it returns all http result from superagent Post without filter, so it will create an exception.
Also in line 38 we can see an empty return, it should be in front res. Status on line 34.

### How would you refactor this code to:
First of all we need to separate the code for software layers and features. We have a lot of different ways to do it, personally I like to have a subrouter for each feature, then, the router handle request body validators with middleware and then redirect to controllers. Their only function are receive and send back the http request, and call a service for execute business logic, and business logic services executes repo services.
So in that way we have all in different folders and is very clear.
Also, we can reuse the services in different parts of application because each service is an independent piece of code, that makes very easy to test too with a testing framework.
Is important that the request body objects never go away of controllers in that case all services are independent of http framework. Imagine that we are using Express Framework and we want to switch to another one, so we only need to update controllers, all the other part can work without refactor, and that is very nice.

So in that case we need to create a controller named invitation.controller.js, a invitation.service.js and shop.repo.js (the names can be changed).

this will be the flow:  CONTROLLER -> SERVICE -> REPO
                                   <-          <-

### How might you use the latest JavaScript features to refactor the code?

Update anonymous functions() => {} for arrow functions, replace indexOf for includes(), replace var for const, superagent is deprecated, so update for node-fetch, axios or another http library.

## Step 2
See in refactor folder