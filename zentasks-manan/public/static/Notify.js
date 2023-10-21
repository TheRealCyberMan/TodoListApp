function createNotification() {
  // check if the browser supports notifications
  if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
  }

  // check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
      var notification = new Notification("Hello get notified", {
          body: 'This is the notification body!',
          icon: 'icon.png'
      });
  }

  else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
          // If the user accepts, let's create a notification
          if (permission === "granted") {
              var notification = new Notification("Hi there!", {
                  body: 'This is the notification body!',
                  icon: 'icon.png' 
              });
          }
      });
  }


}
createNotification();
t