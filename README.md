Example of an to do website.
---
### Parts
In order to make the information persistent A data base was created to store each todo list items
1. Website
2. Server
3. Database

---
#### Website
>The website utilizes Bootstrap and HTML to create the visuals of the website. It uses sweetalert2 to provide the custom popup. Finally, it uses Javascript and JQuery to make the website interactive and to pass data to the back end server.
---
#### Server
> The server should has RESTful calls to the database that was created. The end points for these calls are:
1. GET: /todo
2. PUT: /todo/:taskID(**replace with id**)/?
3. POST: /todo?
4. PUT: /todo/delete?
> The post requires the taskID to be entered as part of the query instead of a parameter.
---
#### Database
> The database that we are using is SQLite. This is the table where the data is stored in:

##### tblTasks
| Name | Type |
| ----------- | ----------- |
| TaskName | Title |
| DueDate | Text |
| Location | Text |
| Instructions | Text |
| Status | Text |
| TaskID | Text |
---

#### How to run
- To start the server type `node index.js`
- Then, open the html inside a browser






