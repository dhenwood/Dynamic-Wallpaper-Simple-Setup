import xapi from 'xapi';

const username = "dynamicWallpaper" // local username account
const password = "C!sco123" // local password account
var ipAddress = "192.168.0.19" // update to reflect the video device IP address
const mode = "obtp" // if OBTP is setup, set to 'obtp', otherwise set to 'time'


xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == 'staticImages' && event.Type == 'pressed'){
    const selectedButton = event.Value
    const url = `https://www.employees.org/~dhenwood/WbxWallpaper/${selectedButton}.zip`
    updateWallpaper(url)
    clearPanel();

  }else if(event.WidgetId == 'landscapeVideos' && event.Type == 'pressed'){
    const video = event.Value
    const url = `https://www.employees.org/~dhenwood/video/${mode}.html?ipAddress=${ipAddress}&username=${username}&password=${password}&video=${video}`
    xapi.command("UserInterface WebView Display", {Url: url, Title: "Dynamic Wallpaper"})
    if(video == "Oregon" || video == "Utah"){
      notifyUI("Updating Wallpaper", "This video is large, so it may take a while to load ⏱️", 8)
    }
    clearPanel();

  }else if(event.WidgetId == 'otherVideos' && event.Type == 'pressed'){
    var video = event.Value
    if (video == "BigBuckBunny"){
      video = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny"
    }
    const url = `https://www.employees.org/~dhenwood/video/${mode}.html?ipAddress=${ipAddress}&username=${username}&password=${password}&video=${video}`
    xapi.command("UserInterface WebView Display", {Url: url, Title: "Dynamic Wallpaper"})
    clearPanel();

  }else if(event.WidgetId == 'screensaverClose' && event.Type == 'pressed'){
      xapi.command("WebEngine DeleteStorage")
      clearPanel();
  }
});

function updateWallpaper(url){
  xapi.command("Provisioning Service Fetch", {URL: url})
  notifyUI("Updating Wallpaper", "It just takes a moment...", 8)
  clearPanel();
}

function clearPanel(){
  xapi.command("UserInterface Extensions Widget UnsetValue", {WidgetId: "staticImages"})
  xapi.command("UserInterface Extensions Widget UnsetValue", {WidgetId: "landscapeVideos"})
  xapi.command("UserInterface Extensions Widget UnsetValue", {WidgetId: "otherVideos"})
}

function notifyUI(title, message, duration){
  xapi.Command.UserInterface.Message.Prompt.Display({
    Title: title,
    Text: message,
    Duration: duration
  })
}

async function init(){
  // Check if allowDeviceCertificateStatus is enabled
  const allowDeviceCertificateStatus = await xapi.Config.WebEngine.Features.AllowDeviceCertificate.get()
  if(allowDeviceCertificateStatus == "False"){
    xapi.Config.WebEngine.Features.AllowDeviceCertificate.set("True");
    notifyUI("A reboot is required", "The AllowDeviceCertificate toggle has been set to true, but requires a reboot to apply", 12)
  }
  
  // Check if local user account exists. If not, create local account.
  try {
    await xapi.Command.UserManagement.User.Get({ Username: username });
    console.log("User " + username + " already exists. No need to create an account")
  }
  catch(err) {
    console.log("User " + username + " does not exist. Creating local account")
    xapi.Command.UserManagement.User.Add({ Username: username, Passphrase: password, Role: "User"});
  }
}

init();
