var checkBoxArray = [];

function getUsers() {
    fetch('http://localhost:3000/users')
    .then((res) => res.json())
    .then((data) => {
        let output = ''
        
        data.forEach(user => {
            output += `
            <div class="task decoration_input_outset">
                <div class="task_main">
                    <label class="task_will_cleared">
                        <input type="checkbox" value="${user.id}" name="todos" class="custom_checkbox">
                        <span class="checkmark"></span>
                        <span class="text_label">${user.firstName}</span>
                    </label>
                </div>
                <div class="task_right">
                    <button class="delete_button decoration_input_outset delete" name="deleteBtn" data-myId="${user.id}">
                        <?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="92px" height="92px" viewBox="0 0 92 92" xml:space="preserve"><path id="XMLID_732_" d="M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3c-1.8-1.8-1.8-4.6 0-6.4L39.6 46 21.3 27.7c-1.8-1.8-1.8-4.6 0-6.4 1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z"/><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="cross" dc:description="cross" dc:publisher="Iconscout" dc:date="2017-09-24" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Amit Jakhu</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
                    </button>
                </div>
            </div>
            `
        });

        document.getElementById("total_totos").innerText = data.length;
        document.getElementById("output").innerHTML = output
        Array.from(document.querySelectorAll('.delete')).forEach(function(item) {
            item.addEventListener('click', function() {
                deleteTask(item.dataset.myid);
            })
        })

        Array.from(document.getElementsByName('todos')).forEach(function(item) {
            item.addEventListener('click', function() {
                if(item.checked == true){
                    checkBoxArray.push(item.value);
                }else{
                    const index = checkBoxArray.indexOf(item.value);
                    if (index > -1) {
                        checkBoxArray.splice(index, 1);
                    }
                }
                console.log(getCheckedBoxes("todos"));
                document.getElementById('selected_totos').innerText = checkBoxArray.length
            })
        })
                
        // Pass the checkbox name to the function
        function getCheckedBoxes(chkboxName) {
            var checkboxes = document.getElementsByName(chkboxName);
            var checkboxesChecked = [];
            // loop over them all
            for (var i=0; i<checkboxes.length; i++) {
            // And stick the checked ones onto an array...
            if (checkboxes[i].checked) {
                checkboxesChecked.push(checkboxes[i].value);
            }
            }
            // Return the array if it is non-empty, or null
            return checkboxesChecked.length > 0 ? checkboxesChecked : null;
        }
      

        var multiClearBtn = document.getElementById('clear_button')

        multiClearBtn.addEventListener('click', function() {
            multiDelete(checkBoxArray)
            document.getElementById('selected_totos').innerText = 0
        })


    })
    .catch((err) => console.log(err))   
}

function addTask (task){
    user = {firstName:task}
    

    fetch('http://localhost:3000/users', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json())
    .then(res => {
        getUsers();
    });
}

function deleteTask(id) {
    fetch(`http://localhost:3000/users/${id}`, {
        method: 'delete',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(res => {
        getUsers();
    });
}


getUsers();



var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementById("todo_btn_submit"); //first button
var output = document.getElementById("output"); //completed-tasks
var todo_input_text = document.getElementById('todo_input_text')


var item = document.getElementsByTagName("li");


addButton.addEventListener('click', function () {
    if(todo_input_text.value.length > 0){
        addTask(todo_input_text.value);
        todo_input_text.value = ''
    }
})


function multiDelete(arr) {
    arr.forEach(elt => {
        fetch(`http://localhost:3000/users/${elt}`, {
        method: 'delete',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(res => {
        getUsers();
    });
    })
}
