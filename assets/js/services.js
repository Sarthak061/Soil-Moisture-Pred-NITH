window.onload = function () {
    firebase.database().ref().on("value", function (snapshot) {
        var listData = snapshot.val();
        let arrListData = Object.entries(listData).map((e) => ({
                        [e[0]]: e[1],
        }));
        let name = localStorage.getItem('service-name');
        for (let i = 0; i < arrListData.length; i++) {
            if (name == arrListData[i][Object.keys(arrListData[i])].service) {

                document.getElementById("service-title").innerHTML = arrListData[i][Object.keys(arrListData[i])].head;
                document.getElementById("service-image").innerHTML = `
                        <img src="assets/img/services/${arrListData[i][Object.keys(arrListData[i])].img}" alt="..." class="col-12">`;
                document.getElementById("service-detail").innerHTML = arrListData[i][Object.keys(arrListData[i])].details;
            }
        }
        localStorage.clear();
    }, function (error) {
        console.log("Error: " + error.code);
    });
};
