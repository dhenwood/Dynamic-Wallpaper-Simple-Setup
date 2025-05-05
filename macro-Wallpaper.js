import xapi from 'xapi';

const username = "dynamicWallpaper" // local username account
const password = "C!sco123" // local password account
var ipAddress = "192.168.0.15"


xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if(event.WidgetId == 'staticImages' && event.Type == 'pressed'){
    if (event.Value == '1'){
      const url = "https://www.employees.org/~dhenwood/WbxWallpaper/wallpaperForestRiver.zip"
      updateWallpaper(url)
    }else if (event.Value == '2'){
      const url = "https://www.employees.org/~dhenwood/WbxWallpaper/wallpaperBeachSand.zip"
      updateWallpaper(url)
    }else if (event.Value == '3'){
      const url = "https://www.employees.org/~dhenwood/WbxWallpaper/wallpaperWaterfall.zip"
      updateWallpaper(url)
    }
    clearPanel();
  }else if(event.WidgetId == 'liveVideoTime' && event.Type == 'pressed'){
    if (event.Value == '1'){
      var video = "Smoke360"
      const url = `https://www.employees.org/~dhenwood/video/time.html?ipAddress=${ipAddress}&username=${username}&password=${password}&video=${video}`
      console.log("url: " + url)
      xapi.command("UserInterface WebView Display", {Url: url, Title: "Live Wallpaper"})
    }else if (event.Value == '2'){
      var video = "webexDesk"
      const url = `https://www.employees.org/~dhenwood/video/time.html?ipAddress=${ipAddress}&username=${username}&password=${password}&video=${video}`
      console.log("url: " + url)
      xapi.command("UserInterface WebView Display", {Url: url, Title: "Live Wallpaper"})
    }else if (event.Value == '3'){
      var video = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny"
      const url = `https://www.employees.org/~dhenwood/video/time.html?ipAddress=${ipAddress}&username=${username}&password=${password}&video=${video}`
      console.log("url: " + url)
      xapi.command("UserInterface WebView Display", {Url: url, Title: "Live Wallpaper"})
    }
    clearPanel();
  }else if(event.WidgetId == 'liveVideoObtp' && event.Type == 'pressed'){
    if (event.Value == '1'){
      var video = "Oregon"
      const url = `https://www.employees.org/~dhenwood/video/obtp.html?ipAddress=${ipAddress}&username=${username}&password=${password}&video=${video}`
      clearPanel();
      xapi.command("UserInterface WebView Display", {Url: url, Title: "Live Wallpaper"})
      notifyUI("Updating Wallpaper", "This video is large, so it may take a while to load ⏱️", 8)
    }else if (event.Value == '2'){
      var video = "LakeFire"
      const url = `https://www.employees.org/~dhenwood/video/obtp.html?ipAddress=${ipAddress}&username=${username}&password=${password}&video=${video}`
      clearPanel();
      xapi.command("UserInterface WebView Display", {Url: url, Title: "Live Wallpaper"})
    }else if (event.Value == '3'){
      var video = "Utah"
      const url = `https://www.employees.org/~dhenwood/video/obtp.html?ipAddress=${ipAddress}&username=${username}&password=${password}&video=${video}`
      clearPanel();
      xapi.command("UserInterface WebView Display", {Url: url, Title: "Live Wallpaper"})
      notifyUI("Updating Wallpaper", "This video is large, so it may take a while to load ⏱️", 8)
    }
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
  xapi.command("UserInterface Extensions Widget UnsetValue", {WidgetId: "liveVideoTime"})
  xapi.command("UserInterface Extensions Widget UnsetValue", {WidgetId: "liveVideoObtp"})
}

function notifyUI(title, message, duration){
  xapi.Command.UserInterface.Message.Prompt.Display({
    Title: title,
    Text: message,
    Duration: duration
  })
}

async function init(){
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
