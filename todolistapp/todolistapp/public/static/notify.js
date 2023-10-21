window.onload = function() {
  var notification = document.createElement('div');
  notification.innerHTML = 'Welcome to ZenTasks';
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.left = '20px';
  notification.style.padding = '10px';
  notification.style.backgroundColor = 'lightgray';
  notification.style.border = '1px solid gray';

  // automatically disappear after 10 seconds
  setTimeout(function() {
    notification.remove();
  }, 10000);

  // disappear on user click
  notification.addEventListener('click', function() {
    notification.remove();
  });

  document.body.appendChild(notification);
};