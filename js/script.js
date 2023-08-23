const time = document.getElementById('time')

setInterval(() => {
    const currentTime = new Date
    const hour = String(currentTime.getHours()).padStart(2,'0')
    const minutes = String(currentTime.getMinutes()).padStart(2,'0')
    document.getElementById('hour').textContent = hour
    document.getElementById('minutes').textContent = minutes
}, 1000);


function active(){
    
}