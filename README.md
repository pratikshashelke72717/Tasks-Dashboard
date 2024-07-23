# Tasks-Dashboard

--Run Project in .net core----
#Open Folder
#Then run TaskManagementSystem.sln file
#After that create database and give database name in appsetting
#then run Add-Migartion command and update database
#then click run application

---Front End ---
#After runing Backencode run react code
#write commant npm start
#then URL Open like "http://localhost:3001"
#give this path program.cs file ..this file in TaskManagementsystem folder in .net core setup 
#then open program.cs gile and whatever localhost is open after npm start give this link in "builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .WithOrigins("http://localhost:3001") // Adjust to your frontend URL
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});"

#Then again run application 

Login Id/Password
Admin : Email :admin.i@gmail.com
              Password :Pratik@123
TeamLeader : Email :jane.smith@example.com
                       Password:hashedpassword2
Employee :Email :pratik.i@gmail.com
                 Password :Pratik@1232
