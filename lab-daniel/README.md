# HTTP-Server Lab
### Daniel Pillay


## Functions:

-```handleget(res)```: 
    - Will handle the functionality to the pathname ```http://localhost:3000/``` and return back the ```index.html``` file link that says "cowsay".  
# HTTP Server: Lab-07
### Daniel Pillay


## Functions:

1. ```handleGet(res)```:
   
 - Will handle the functionality to the pathname ```http://localhost:3000/``` and return back the ```index.html``` file link that says "cowsay".  

2. ```cowsayGet(res)```
 - Will handle the functionality to the pathname ```http://localhost:3000/cowsay``` that will return back the actual ASCII cow.

3. ```cowsPost(req, res)```
 - Will handle the functionality to the pathname ```http://localhost:3000/api/cowsay``` that allows the client to input their own message which will be relayed to the actual ASCII cow.

4. ```bodyParse()```
 - Will handle the functionality of returning an error, or the actual JSON body that is being retrieved with the function listed above.
