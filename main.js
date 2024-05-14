window.onload = function() {
    var form = document.querySelector(".form-calculator");
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formTarget= event.target;
        var formElements  = formTarget.elements;

        let errorBlock = document.querySelector(".error-block");
        errorBlock.innerHTML = "";

        var firstNumber = formTarget.firstNumber.value;
        var secondNumber = formTarget.secondNumber.value;
        var operations = formTarget.operations.value;

        const xhr = new XMLHttpRequest();

        var formData = JSON.stringify({
            firstNumber:firstNumber,
            secondNumber:secondNumber,
            operations:operations});

        xhr.open("POST", "/api/",);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            var response;
            if(xhr.readyState == 4){
                switch (xhr.status){
                    case 200:
                        response = xhr.response;
                        let res = document.querySelector(".result input")
                        res.value = response;
                        break;
                    case 400:
                        response = xhr.response;
                        let errorBlock = document.querySelector(".error-block");
                        let errorHtml = "";
                        response.forEach(function (item,index,response){
                            errorHtml += " <div class='error' style='color: red'>"+ item +"</div>";
                        })
                        errorBlock.innerHTML = errorHtml;
                        break;
                }
            }else{
                return;
            }
        };
        xhr.send(formData);

    });
};