var data={};
$(document).ready(function() {
            $.ajax({
            url: "../source.json",
            success: function (dataTest) {
                console.log(dataTest);
                data=dataTest;
                loadData(data);
             }
        });
});

$('#addContact').on('click',function() {
    $('#formPage').removeClass('hide');
    $('#contactTable').removeClass('show');
    $('#contactTable').addClass('hide');
    $('#formPage').addClass('show');
});
$('#cancelbtn').on('click',function() {
    $('#formPage').removeClass('show');
    $('#formPage').addClass('hide');
    $('#contactTable').removeClass('hide');
    $('#contactTable').addClass('show');
});
$('#savebtn').on('click',updateData);
$('#dashboard').on('click',function() {
    $('#content').removeClass('show');
    $('#content').addClass('hide');
});
$('#contact').on('click',function() {
    $('#content').removeClass('hide');
    $('#content').addClass('show');
});
function updateData(e) {
    e.preventDefault();
    var temp={};
    temp.fname=$( "input[id='fname']").val();
    temp.lname=$( "input[id='lname']").val();
    temp.wemail=$( "input[id='wemail']").val();
    temp.pemail=$( "input[id='pemail']").val();
    temp.wcontact=$( "input[id='wcontact']").val();
    temp.pcontact=$( "input[id='pcontact']").val();
    if(temp.fname === ''){alert('Please provide first name !!!'); return;}
    if(temp.lname === ''){alert('Please provide last name !!!'); return;}
    if( !validateEmail(temp.wemail)){alert('Please provide valid work email id !!!');return;}
    if( !validateEmail(temp.pemail)){alert('Please provide valid personal email id !!!');return;}
    if( !validatePhone(temp.wcontact)){alert('Please provide valid work phone number !!!');return;}
    if( !validatePhone(temp.pcontact)){alert('Please provide valid personal phone number !!!');return;}
    data.contactInfo.push(temp);
    cleartext();
    loadData(data);
    console.log(data.contactInfo);
}

function cleartext(){
    $( "input[id='fname']").val('');
    $( "input[id='lname']").val('');
    $( "input[id='wemail']").val('');
    $( "input[id='pemail']").val('');
    $( "input[id='wcontact']").val('');
    $( "input[id='pcontact']").val('');
    $('#formPage').removeClass('show');
    $('#formPage').addClass('hide');
    $('#contactTable').removeClass('hide');
    $('#contactTable').addClass('show');
}

function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}
function validatePhone(ph) {
  if(parseInt(ph).toString().length == 10){return true;}
  else{return false;}
}

function loadData(dataToShow){
    $('#tableWrapper').empty();
    printHeader();
    printActualData(dataToShow);
}

function printActualData (dataToShow) {
    $('#tableWrapper')
    for(var i=0;i<dataToShow.contactInfo.length;i++){
        if(name=dataToShow.contactInfo[i] != undefined){
            var name=dataToShow.contactInfo[i].fname + ' ' + dataToShow.contactInfo[i].lname;
            var work_email=dataToShow.contactInfo[i].wemail;
            var personal_email=dataToShow.contactInfo[i].pemail;
            var work_contact=dataToShow.contactInfo[i].wcontact;
            var personal_contact=dataToShow.contactInfo[i].pcontact;

            var myHTML="<div class='col-md-2'>"
                        +(i+1)
                        +"</div><div class='col-md-3' style='height:40px;'>"
                        +name
                        +"</div><div class='col-md-4'><div>Work: "
                        +work_email
                        +"</div><div>Personal: "
                        +personal_email
                        +"</div></div><div class='col-md-3'><div>Work: "
                        +work_contact
                        +"</div><div>Personal: "
                        +personal_contact
                        +"</div></div>";
            $('#tableWrapper').append($("<div/>").attr("class", "col-md-12").html(myHTML));  
        }
    }
}
function printHeader(){
    var myHTML="<div class='col-md-2'>#</div><div class='col-md-3'>Name</div><div class='col-md-4'>Email</div><div class='col-md-3'>Contact No.</div>";
    $('#tableWrapper').append($("<div/>").attr("class", "col-md-12").html(myHTML));    
}

$(search_input)
      .change( function () {
        var filter = $(this).val().toLowerCase();
        if(filter.length > 3) {
            var fnameSet=data.contactInfo.map(function(obj){return obj.fname;});
            var res=fnameSet.map(function(obj,index) {
                if(obj.toLowerCase().indexOf(filter)>-1){return index;}
                else return -1;
            });
            var targetData={contactInfo:[]};

            for(i=0;i<res.length;i++){
                targetData.contactInfo.push(data.contactInfo[res[i]]);
            }
            loadData(targetData);
        }
        })
    .keyup( function () {
        $(this).change();
    });
