# DevOps Bootcamp
Hi! Welcome to DevOps Bootcamp. We hope you enjoy the DevOps learning journey, It is quite a pipeline!

The structure of our DevOps bootcamp is designed to provide a comprehensive and hands-on learning experience. Throughout the program, you will engage in a dynamic blend of theoretical learning and practical execution, allowing you to internalize theoretical concepts and immediately apply them in real-world scenarios. 

This project contains two applications:
 1. Stationery.Api - .Net 6 WebApi
 2. Stationery.UI - React App

# Lesson 1: Project Set Up & Powershell

**Outcome:**

 - Build projects locally
 - Setup a repository for a project
 - Use Powershell for automation

**SCENARIO:** Company ABC has reached out to you to provide your expertise in DevOps. The organization presently maintains a group of developers engaged in a unified project. The existing workflow involves each programmer duplicating their work directory upon task completion and sending it to their team lead or the succeeding programmer. Regrettably, this approach to code collaboration has introduced challenges in maintaining version control, leading to occasional instances of overwritten work and even loss of progress.

 1. You've been tasked with establishing a repository utilizing git as the chosen version control system. The company has opted for GitLab as the platform to host their remote repository.
 2. The team has requested that configuration files be automatically excluded whenever an individual performs a push or pull action from the remote repository.

## Task 1: Run The Source Code Locally

The source code file has been sent to you by the team lead via email. Setting up and running the code locally to verify its functionality would be prudent. 

Your first task is to run the code locally. The team lead has specified the following programming frameworks that the code runs on:
 - .Net 6 
	`dotnet --list-sdks`
	
 - Node.js
	`node -v`
	
 - Sql server 2022 *(We will host this for you. You don't have to worry
   about this one right now.)*

## Task 2: Set Up a Repository
After confirming that the code runs, it is time to set up a repsoitory for the source code on Gitlab.
> Remember to add a .gitignore file
## Task 3: Automate Processes using Powershell
The company is also interested in automating some of their repetitive everyday tasks on their system e.g. moving files around, renaming files etc. In order for the company to entrust you with this role they have asked you to demonstrate a few script commands using powershell.

**All the following tasks must be done using Powershell**

Base directory: FullStatckApp/

 1. **Create a new folder** in the Base directory named "Evidence."
 2. Within the Evidence folder, **create** a text file named "Confession.txt" and populate it with the text "I can script."
 3. Commit your changes
 4. **Rename** the Confession.txt file to "Appeal.txt"
 5. **Copy** the recently renamed text file into a new directory labeled "New_Evidence". The New_Evidence folder will be in the base directory.
 6. Commit your changes
 7. **Delete** the Evidence folder
 8. List all the directories that are in the base directory and pipe the results into New_Evidence/directories.text
 9. **Zip** the New_Evidence folder
 10. Commit your changes and push to repostory 

The company has looked at the evidence you presented and they are happy. You are now required to build your project and publish artifacts. The process should be automated using powershell. Create a powershell script that builds, publishes an artifact and zips the artifact

>Try out using $LASTEXITCODE checks

>Notice the CLIs you are using
