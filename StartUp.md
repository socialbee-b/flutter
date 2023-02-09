# Getting Started

Here you'll find information on how to locally build and run this application. 

## Prerequisites

You'll need to download both VSCode [here](https://code.visualstudio.com/download) and intelliJ [here](https://www.jetbrains.com/idea/download/#section=windows). 
If you did not previously have IntelliJ on your local machine, you will also need to install a JDK. we used JDK-11 for this project. The download can be found [here](https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html).

Addidionally, we utilized DBeaver [here](https://dbeaver.io/download/) for our local environment. 

When deployed, AWS is utilized to host both the site and the server. 

## Cloning and Building

Once you have the appropriate applications installed, clone the GitHub repo locally. Cloning instructions can be found [here](https://help.github.com/articles/cloning-a-repository/). 
Please note: there are two repositories on this organization. One holds the frontend and the other holds the backend. If you want to successfully run this application to its fullest potential, you will need both repositories.

Open the flutter folder in VSCode and the fluttrbackend folder in IntelliJ. 

You will need to set your environment variables in both VSCode in a .env file and in IntelliJ edit configurations and add your environment variables there.

Once everything is in place, run maven refresh in IntelliJ (this can be found in the upper right hand corner of IntelliJ).
Press the GREEN play button in IntelliJ to spin up your back end spring project. If everything runs smoothly, the last line in your console should read: Started SocialMediaApplication

 Afterwards, direct yourself to VSCode. Here you will need to run ```npm install``` to add all dependencies listed in the package.json file. 
 Once these dependencies install, you will be able to run ```npm start``` in your terminal and spin up this application.
 
 If spinup is successful, you will be redirected to your default browser on a localhost environment where you can successfully utilize the Fluttr application.
