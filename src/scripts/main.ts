import $ from 'jquery';

console.log("Running main.ts...")

// Define functions that call the Python app.
function python_sum(a: number, b: number, output_element: HTMLSpanElement) {
    return $.ajax({
        type: "POST",
        url: '/python_sum',
        contentType: 'application/json',
        data: JSON.stringify({
            a: a,
            b: b
        }),
        traditional: true,
        success: function (data) {
            // optional log of output JSON
            // console.log(data);
            
            let output = JSON.parse(data);

            if (output["error_msg"] != "") {
                console.error(output["error_msg"]);
            }
            else {
                output_element.innerHTML = output["output"];
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Set up HTML elements in the page. They need to be casted to HTMLInputElement in order to call the .value attribute.
    const a_input = <HTMLInputElement>document.getElementById("a_input");
    const b_input = <HTMLInputElement>document.getElementById("b_input");
    const calculate_button = document.getElementById("calculate_button");
    const output_element = document.getElementById("output_element");

    // Set up event listeners.
    calculate_button.addEventListener("click", function () {
        python_sum(parseFloat(a_input.value), parseFloat(b_input.value), output_element);
    });

});

console.log("Successfully ran main.ts!")