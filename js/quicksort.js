let ctx = $('#myChart')[0].getContext('2d');
let myBarChart;
let intervalTime;
$('#sortBtn').hide();

$('#sortBtn').click(function(){
    quickSort(myBarChart.data.datasets[0].data, 0, myBarChart.data.datasets[0].data.length - 1);
});

$(document).on('submit', '#form', function () {
    resetCanvas();
    let size = $('#array-size').val();
    intervalTime = $('#interval-time').val();
    let data = [];
    for(let i=0; i < size; i++){
        data.push(Math.floor(Math.random() * 101));
    }
    createChart(data);
    for(var i=0; i < myBarChart.data.datasets[0].data.length; i++){
        myBarChart.data.datasets[0].backgroundColor[i] = "green";
    }
    myBarChart.update();
    $('#sortBtn').show();

    return false;
});

function quickSort(arr, left, right){
    var len = arr.length,
        pivot,
        partitionIndex;
    setTimeout(function(){
        if(left < right){
            pivot = right;
            partitionIndex = partition(arr, pivot, left, right);
            //sort left and right
            quickSort(arr, left, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, right);
        }
    }, intervalTime);

    $('#sortBtn').hide();
}

function partition(arr, pivot, left, right){
    var pivotValue = arr[pivot],
        partitionIndex = left;

    for(var i = left; i < right; i++){
        if(arr[i] < pivotValue){
            swap(i, partitionIndex);
            partitionIndex++;
        }
    }
    swap(right, partitionIndex);
    return partitionIndex;
}

function swap(i, j){
    let temp = myBarChart.data.datasets[0].data[i];
    myBarChart.data.datasets[0].data[i] = myBarChart.data.datasets[0].data[j];
    myBarChart.data.datasets[0].data[j] = temp;
    myBarChart.update();
}

function createChart(data) {
    myBarChart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: data,
            datasets: [{
                label: "Number",
                backgroundColor: [],
                data: data,
            }]
        },

        options: {}
    });
}

function resetCanvas(){
    $('#myChart').remove();
    $('#canvasDiv').append('<canvas id="myChart"><canvas>');
    ctx = $('#myChart')[0].getContext('2d');
}