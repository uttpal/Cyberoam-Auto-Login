self.port.on("user", handleMessage);

function handleMessage(message) {
    document.getElementsByName('username')[0].value = message;
}

self.port.on("pass", handle);

function handle(pass) {
    document.getElementsByName('password')[0].value = pass;
    document.getElementById('logincaption').click();
}
