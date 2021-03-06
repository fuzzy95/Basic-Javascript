setTimeout(() => {
    console.log('Two seconds are up!');
}, 2000);

const names = ['Jack', 'Vladimir', 'Joe'];

const shortNames = names.filter((name) => {
    return name.length <= 4;
});

const geoCode = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude : 0,
            longitude : 0
        }
        callback(data);
    }, 2000);
}

 geoCode('Dhaka', (dataCall) => {
     console.log(dataCall);
 });

const add = (x, y, callback) => {
    setTimeout(() => {
        callback(x + y);
    }, 1000);
};

add(1, 4, (sum) => {
    console.log(sum) 
})