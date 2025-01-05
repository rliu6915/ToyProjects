# Phonebook

This project includes frontend. 
* It adds names and numbers to phonebook. 
* It prevents the user from being able to add names that already exist in the phonebook by showing alert. 
* It fetches the data from the server using axios library and effect hook. It communicates between frontend and backend by seperating the codes into their own modules in services folder. 
* It can delete entries from phonebook by showing a window to confirm you want to delete. 
* It can check if the person is existing in the server when adding a new entry. If the person exists, it will show a window asking you to confirm and replace the old information with the new one. 
* When a person is added or a number is changed or a person is deleted, show notification.
* When openning the application in two browsers, if you delete a person in browser 1 a short while before attempting to change the person's phone number in browser 2, show the error message that the person has been removed.
