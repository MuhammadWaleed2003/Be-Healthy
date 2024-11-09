
let jsonOBJ = localStorage.getItem('selectedTime')?JSON.parse(localStorage.getItem('selectedTime')):{}
let jsonTime=localStorage.getItem('timeTable')?JSON.parse(localStorage.getItem('timeTable')):{}
showTable()
$("#service").on("click", function () {
    if ($("#service").val() == "nutritionist") {
        $("#doctor").html('            <option value="any"disabled selected> Any</option><option value="Saad Agha">Saad Agha </option>')
    }
    if ($("#service").val() == "medical") {
        $("#doctor").html('            <option value="any"disabled selected> Any</option><option value="Asma Zahid">Asma Zahid</option>')
    }
    if ($("#service").val() == "sport-massage") {
        $("#doctor").html('<option value="any"disabled selected> Any</option><option value="Sayyam Asad">Sayyam Asad </option>')
    }
})

$(".appointment").on("click", function () {
    if ($("#service").val() == null) {

        $("#service").css({ border: "2px solid red" })
    }
    if ($("#doctor").val() == null) {

        $("#doctor").css({ border: "2px solid red" })
    }
    if ($("#service").val() != null && $("#doctor").val() != null) {
        $("#doctor").css({ border: "1px solid black" })
        $("#service").css({ border: "1px solid black" })
        let doctor=$("#doctor").val()

        $("#time").html(makeJsonTime(doctor))
    }

})

function makeJsonTime(doctor){
    let timeData =[];
    let timeTable='<div class="bordering  btn-warning text-white"><label for="timeline" class="p-2" >Nov , Fri</label></div><div class="bordering "><input type="radio"  name="timeline" value="10:00 am"><span>10:00 am</span></div><div class="bordering "><input type="radio"  name="timeline" value="11:00 am"><span>11:00 am</span></div><div class="bordering "><input type="radio"  name="timeline" value="12:00 noon"><span>12:00 noon</span></div><div class="bordering  "><input type="radio"  name="timeline" value="01:00 pm"><span>01:00 pm</span></div><div class="bordering"><input type="radio"  name="timeline" value="02:00 pm"><span>02:00 pm</span></div><div class="bordering"><input type="radio"  name="timeline" value="03:00 am"><span>03:00 pm</span></div><div class="bordering "> <input type="radio"  name="timeline" value="04:00 am"><span>04:00 pm</span></div><div class="bordering"> <input type="radio"  name="timeline" value="05:00 am"><span>05:00 pm</span></div>'  
    if(jsonTime[doctor]){
return jsonTime[doctor] 
    }
timeData.push(timeTable)
jsonTime[doctor]=timeData
console.log(jsonTime)

return jsonTime[doctor]
}

$(".confirm").on("click", function () {
    if (!($("input[type='radio'][name='timeline']:checked").val())) {
        $(".timeline").css({ border: '2px solid red' })
    } else {
        // $(".timeline").css({ border: '0px solid red' })

        $("table").append('<tr class="border p-4"><td class="p-4 ser">' + $("#service").val() + '</td><td class="p-4 doc>' + $("#doctor").val() + '</td><td class="p-4 tim">' + $("input[type='radio'][name='timeline']:checked").val() + '</td><td class="d-flex align-items-center"><button class=" btn btn-warning removing">Remove</button></td></tr>')
      strikeThrough()
//    if(jsonOBJ){
//     for(let service in jsonOBJ){
        
//         $.each(jsonOBJ[service], function(timeindex,time){
//             if(service=="nutritionist"){
//                 var doctorname="Saad Agha"
//             }
//             if(service=="medical"){
//                 var doctorname="Asma Zahid"
//             }
//             if(service=="sport-massage"){
//                 var doctorname="Sayyam Asad"
//             }
//            let tableHTML= `<tr class="border p-4"><td class="p-4">${service}</td><td class="p-4">${doctorname}</td><td class="p-4">${time}</td><td class="d-flex align-items-center"><button class=" btn btn-warning removing">Remove</button></td></tr>`
//            $("table").append(tableHTML)

//         })
       
//     }

//    }
     

    }


})
function showTable(){ 
    if(jsonOBJ){ 
        for(let service in jsonOBJ){
             $.each(jsonOBJ[service], function(timeindex,time){ 
                if(service=="nutritionist"){ var doctorname="Saad Agha" } 
                if(service=="medical"){ var doctorname="Asma Zahid" } 
                if(service=="sport-massage"){ var doctorname="Sayyam Asad" } 
                let tableHTML= `<tr class="border p-4"><td class="p-4 ser">${service}</td><td class="p-4 doc">${doctorname}</td><td class="p-4 tim">${time}</td><td class="d-flex align-items-center"><button class=" btn btn-warning removing">Remove</button></td></tr>`
                 $("table").append(tableHTML) }) } } }


function strikeThrough(){
    let a = $("input[type='radio'][name='timeline']:checked").val()
 $("input[type='radio'][name='timeline']:checked").attr("disabled", true)
    let data = [];
    if (jsonOBJ[$("#service").val()]) {
        data = jsonOBJ[$("#service").val()]
    }
    data.push(a)
    jsonOBJ[$("#service").val()] = data
    console.log(jsonOBJ)

    saveData('selectedTime',jsonOBJ)

    $("input[type='radio'][name='timeline']:checked").siblings("span").addClass("text-decoration-line-through")
      
    let doctor=$("#doctor").val()
    console.log(doctor)
    console.log(jsonTime)

  jsonTime[doctor]=$('#time').html()
  saveData('timeTable',jsonTime)
}

$(document).on("click",".removing", function () {
// let doc=$(this).siblings("doc").html()
// let ser=$(this).siblings("ser").html()
// let tim=$(this).siblings("tim").html()
// console.log(doc)
// console.log(ser)
// console.log(tim)
    $(this).closest("tr").remove()
})

function saveData(key,data){
    localStorage.setItem(key,JSON.stringify(data))
}

