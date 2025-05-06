# Dynamic Wallpaper Simple Setup

This article explains the steps to deploying the Dynamic Wallpaper experience on a Cisco video device as detailed here: https://github.com/dhenwood/Dynamic-Wallpaper

![example](https://github.com/dhenwood/Dynamic-Wallpaper-Simple-Setup/blob/main/Navigator%20Example.png)

### Step 1
Download the macro and UIExtension by selecting the green "Code" button at the top right, and then selecting "Download ZIP". Once downloaded, unzip the file on your computer.

### Step 2
Browse to the video codec you wish to install this on and login.

### Step 3
Select "UI Extension Editor" from the left hand menu.

### Step 4
From the top right menu buttons, select the icon with 3 horizontal lines, and then "Merge from file".

### Step 5
Select the "wallpaperPageId.xml" from your computer (where you unzipped the original file).

### Step 6
Select the "Blue" upload button from the top menu to upload to the video device. At this stage, a new button should appear on your video device titled Wallpaper.

### Step 7
Select the back arrow from the top left and then select "Macros Editor" from the left hand menu.

### Step 8
Select "Import from file" in the top left.

### Step 9
Select the "macro-Wallpaper.js" file from your computer (where you unzipped the original file).

### Step 10
In the first few lines of the macro, **change the IP address** to reflect the IP address of the codec. Change the username and password if desired - if the username you supply does not exist on the local device, the macro will create it. The value **mode** is used to determine if the UI should show the Time and Calendar or just the Time. If you do not have the device setup with a calendar, change this to "time".

### Step 11
On the left hand side, select the icon with the box and arrow to upload the macro to the video device .

### Step 12
Toggle the switch to Enable in order to active the macro.

### Step 13
On the Navigator, launch the Wallpaper button and select the desired wallpaper. **NOTE**: the Ocean and Utah videos are large in size so may take up to a minute to load.
